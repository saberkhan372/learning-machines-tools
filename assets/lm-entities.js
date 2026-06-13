/* lm-entities.js — shared entity extraction + live Wikipedia verification
 * Used by the Truth Sieve tools. No dependencies; network calls only on demand.
 *
 * Design notes:
 *  - extract() pulls multi-word proper-noun PHRASES (e.g. "Battle of Shady Pines",
 *    "Treaty of Versailles"), not single tokens, and also catches internal-capital
 *    names like "iPhone" / "eBay" that a first-letter test would miss.
 *  - lookup() checks a phrase EXISTS as a real, specific article (not a disambiguation).
 *  - pageText() + appearsOn() power the real co-occurrence test: every other anchor
 *    must actually appear on the primary subject's page — that is what catches
 *    "Lincoln used an iPhone in 1865" (his page has "Civil War" and "1865", never "iPhone").
 */
(function (global) {
  'use strict';

  // Capitalized words that are only capitalized because they start a sentence / are glue.
  const STOPWORDS = new Set([
    'The','A','An','In','On','At','During','After','Before','When','While','Since','Until',
    'Records','This','That','These','Those','It','Its','He','She','They','We','I','His','Her','Their',
    'Furthermore','Moreover','Additionally','However','Meanwhile','Although','Though','Despite',
    'Throughout','Across','By','For','From','To','And','But','As','Then','Thus','Hence','Also',
    'According','Confirmed','Built','Won','Signed','Delivered','Used','Coordinated'
  ]);
  // Lowercase connectors allowed to sit inside a proper-noun phrase.
  const CONNECTORS = new Set(['of','the','and','de','von','van','del','der','di','da','la','le','el','bin','al']);

  function splitSentences(text) {
    return text.match(/[^.!?]+[.!?]*/g) || [text];
  }

  function isEntityToken(tok, isSentenceStart) {
    const bare = tok.replace(/[^A-Za-z0-9'’-]/g, '');
    if (!bare || bare.length < 2) return false;
    if (/[a-z][A-Z]/.test(bare)) return true;          // iPhone, eBay, MacBook
    if (/^[A-Z]{2,}$/.test(bare)) return true;          // NASA, FBI, UN
    if (/^[A-Z][a-z]+/.test(bare)) {                    // Lincoln, Versailles
      if (isSentenceStart && STOPWORDS.has(bare)) return false;
      return true;
    }
    return false;
  }

  function extract(text) {
    const phrases = [], years = [], numbers = [];
    splitSentences(text).forEach(function (sent) {
      const toks = sent.trim().split(/\s+/);
      let cur = [];
      const flush = function () {
        if (!cur.length) return;
        // drop trailing connectors
        while (cur.length && CONNECTORS.has(cur[cur.length - 1].toLowerCase())) cur.pop();
        const phrase = cur.join(' ').replace(/[^A-Za-z0-9'’\- ]/g, '').trim();
        if (phrase.length > 1) phrases.push(phrase);
        cur = [];
      };
      toks.forEach(function (tok, i) {
        const bare = tok.replace(/[.,;:!?()"]/g, '');
        if (/^\d{4}$/.test(bare)) { flush(); const n = +bare; if (n >= 1000 && n <= 2100) years.push(bare); return; }
        if (/^\d{2,}$/.test(bare)) { flush(); numbers.push(bare); return; }
        if (isEntityToken(tok, i === 0)) {
          cur.push(bare);
        } else if (cur.length && CONNECTORS.has(bare.toLowerCase())) {
          cur.push(bare.toLowerCase());     // keep glue, may be trimmed on flush
        } else {
          flush();
        }
      });
      flush();
    });
    const uniq = arr => arr.filter((v, i) => arr.indexOf(v) === i);
    return { phrases: uniq(phrases), years: uniq(years), numbers: uniq(numbers) };
  }

  // --- live Wikipedia ------------------------------------------------------

  function summaryUrl(title) {
    return 'https://en.wikipedia.org/api/rest_v1/page/summary/' +
      encodeURIComponent(title.replace(/ /g, '_'));
  }

  async function lookup(title) {
    try {
      const res = await fetch(summaryUrl(title), { headers: { accept: 'application/json' } });
      if (!res.ok) return { exists: false };
      const d = await res.json();
      if (d.type === 'disambiguation') return { exists: false, disambiguation: true, title: d.title };
      return {
        exists: true,
        title: d.title,
        extract: d.extract || '',
        url: d.content_urls && d.content_urls.desktop ? d.content_urls.desktop.page : null
      };
    } catch (e) {
      return { exists: false, error: true };
    }
  }

  // Full plain-text of an article, for co-occurrence checking.
  async function pageText(title) {
    try {
      const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1' +
        '&redirects=1&format=json&origin=*&titles=' + encodeURIComponent(title);
      const res = await fetch(url);
      if (!res.ok) return '';
      const d = await res.json();
      const pages = d.query && d.query.pages;
      if (!pages) return '';
      const first = pages[Object.keys(pages)[0]];
      return (first && first.extract) ? first.extract : '';
    } catch (e) {
      return '';
    }
  }

  // Does an anchor appear in a body of text? Tries the full phrase, then its
  // most distinctive single word (so "American Civil War" still matches "Civil War").
  function appearsOn(haystack, anchor) {
    if (!haystack) return false;
    const h = haystack.toLowerCase();
    const a = anchor.toLowerCase();
    if (h.indexOf(a) !== -1) return true;
    const words = a.split(/\s+/).filter(w => !CONNECTORS.has(w) && w.length > 3);
    if (!words.length) return false;
    // longest content word is the most distinctive (surname / keyword)
    words.sort((x, y) => y.length - x.length);
    return h.indexOf(words[0]) !== -1;
  }

  global.LMEntities = { extract, lookup, pageText, appearsOn, STOPWORDS, CONNECTORS };
})(window);
