/**
 * Learning Machines — Session 1 Feedback Reader + Session 2 Planning
 *
 * HOW TO USE
 * 1. Open the Google Sheet that receives your Session 1 feedback form responses.
 * 2. Extensions → Apps Script → paste this file (replace any default content).
 * 3. Fill in CONFIG below (email, sheet name).
 * 4. Run summariseSession1() to get a facilitator summary in the Execution Log.
 * 5. Run buildSession2PlanDoc() to create a Google Doc planning outline.
 * 6. Optional: set an onFormSubmit trigger (Triggers → Add trigger) so the
 *    sheet pings you every time a new response arrives.
 *
 * BEFORE YOUR FIRST RUN
 * - In your Google Form editor, add the "Which assignment option are you
 *   planning to take on?" question, then copy its entry ID (inspect the
 *   form source, or use the Apps Script Logger via getFormEntryIds() below).
 * - Update the ASSIGNMENT_COL header string in HEADERS to match exactly what
 *   Google Sheets uses as the column header for that question.
 */

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const CONFIG = {
  SHEET_NAME:        'Form Responses 1',  // exact name of the responses tab
  FACILITATOR_EMAIL: '',                  // set to receive email summaries
  SESSION_1_TITLE:   'Session 1 · Text',
  SESSION_2_DATE:    'Saturday July 18 · 9–11 am PT',
  SESSION_2_TITLE:   'Session 2 · Images',
  SESSION_2_CORE_Q:  'When an image model generates a picture, what is it actually deciding?',
};

// ─── COLUMN HEADERS ─────────────────────────────────────────────────────────
// These must match the exact text Google Sheets uses as column headers.
// If a question text wraps or truncates, open the sheet and copy the header.

const HEADERS = {
  TIMESTAMP:          'Timestamp',
  NAME:               'Name or display name',
  ATTENDANCE:         'How did you attend?',
  FAMILIARITY:        'Before this session, how familiar were you with how language models work inside?',
  CLICKED:            'Which rounds made something click for you?',
  CLARITY_TOKENS:     'Text becomes tokens before the model sees it',
  CLARITY_TOKEN_SEQ:  'A response is generated one token at a time',
  CLARITY_TEMP:       'Temperature is risk in sampling, not deeper thinking',
  CLARITY_ATTN:       'Attention routes between tokens when context changes',
  CLARITY_FLUENT:     'Fluent is not the same as useful or true',
  ONE_SENTENCE:       'In one sentence: when a language model writes, what is it actually doing?',
  STILL_FUZZY:        'What is still fuzzy or unanswered?',
  TOOL_USED:          'Which tool did you spend the most time with?',
  BOARD_CLAIM:        'Did you land a claim on the Text Experiment Board?',
  TOOL_FRICTION:      'Any tool friction?',
  PACE:               'How was the pace?',
  ZOOM_CHAT:          'Participating through Zoom chat:',
  TECH_TROUBLE:       'Any technical trouble?',
  COMFORT:            'Could you participate the way you wanted',
  FOR_FACILITATORS:   'Anything facilitators should know about?',
  KEEP:               'What should we make sure to keep?',
  CHANGE:             'What should we change before Saturday\'s images session?',
  IMG_QUESTION:       'What question about image generators do you want answered?',
  RECOMMEND:          'Would you recommend this session to a colleague or friend?',
  ANYTHING_ELSE:      'Anything else?',
  ASSIGNMENT_OPTION:  'Which assignment option are you planning to take on?',
};

// ─── MAIN: SUMMARISE SESSION 1 FEEDBACK ─────────────────────────────────────

function summariseSession1() {
  const rows = _getRows();
  if (!rows.length) { Logger.log('No responses yet.'); return; }

  const n = rows.length;
  Logger.log(`\n═══ ${CONFIG.SESSION_1_TITLE} Feedback Summary (${n} response${n === 1 ? '' : 's'}) ═══\n`);

  // Attendance
  _logFreq('How did you attend?', _col(rows, HEADERS.ATTENDANCE));

  // Familiarity
  _logFreq('Prior familiarity', _col(rows, HEADERS.FAMILIARITY));

  // What clicked
  _logFreq('What clicked (multi-select)', _col(rows, HEADERS.CLICKED), true);

  // Clarity grid
  Logger.log('\n── Clarity grid (% Clearer / Same / More tangled) ──');
  [
    HEADERS.CLARITY_TOKENS,
    HEADERS.CLARITY_TOKEN_SEQ,
    HEADERS.CLARITY_TEMP,
    HEADERS.CLARITY_ATTN,
    HEADERS.CLARITY_FLUENT,
  ].forEach(h => _logClarity(h, rows));

  // Pace
  _logFreq('Pace', _col(rows, HEADERS.PACE));

  // Zoom chat
  _logFreq('Zoom chat', _col(rows, HEADERS.ZOOM_CHAT));

  // Tool used
  _logFreq('Tool used', _col(rows, HEADERS.TOOL_USED));

  // Board claim
  _logFreq('Experiment Board claim', _col(rows, HEADERS.BOARD_CLAIM));

  // Assignment option (new question — may be empty until you add to the form)
  const assignmentVals = _col(rows, HEADERS.ASSIGNMENT_OPTION).filter(Boolean);
  if (assignmentVals.length) {
    _logFreq('Assignment option picked', assignmentVals);
  } else {
    Logger.log('\nAssignment option: question not yet added to the form, or no responses yet.');
  }

  // Recommend
  _logFreq('Would recommend', _col(rows, HEADERS.RECOMMEND));

  // Free text blocks
  _logFreeText('One-sentence answer to the core question', rows, HEADERS.ONE_SENTENCE);
  _logFreeText('Still fuzzy / unanswered', rows, HEADERS.STILL_FUZZY);
  _logFreeText('Tool friction', rows, HEADERS.TOOL_FRICTION);
  _logFreeText('Tech trouble', rows, HEADERS.TECH_TROUBLE);
  _logFreeText('For facilitators (comfort / consent)', rows, HEADERS.FOR_FACILITATORS);
  _logFreeText('What to keep', rows, HEADERS.KEEP);
  _logFreeText('What to change for Session 2', rows, HEADERS.CHANGE);
  _logFreeText('Questions about image generators', rows, HEADERS.IMG_QUESTION);
  _logFreeText('Anything else', rows, HEADERS.ANYTHING_ELSE);

  Logger.log('\n═══ End of summary ═══\n');

  if (CONFIG.FACILITATOR_EMAIL) {
    _emailSummary(n);
  }
}

// ─── MAIN: BUILD SESSION 2 PLANNING DOC ─────────────────────────────────────

function buildSession2PlanDoc() {
  const rows = _getRows();
  const n = rows.length;

  const doc = DocumentApp.create(`${CONFIG.SESSION_2_TITLE} Planning — from Session 1 feedback`);
  const body = doc.getBody();

  body.appendParagraph(`${CONFIG.SESSION_2_TITLE} Planning`)
    .setHeading(DocumentApp.ParagraphHeading.TITLE);

  body.appendParagraph(`Generated from ${n} Session 1 feedback response${n === 1 ? '' : 's'} · ${new Date().toDateString()}`)
    .setItalic(true);

  body.appendHorizontalRule();

  // ── What participants said to change ──
  body.appendParagraph('1. What participants said to change').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  const changes = _col(rows, HEADERS.CHANGE).filter(Boolean);
  if (changes.length) {
    changes.forEach(t => body.appendListItem(t).setGlyphType(DocumentApp.GlyphType.BULLET));
  } else {
    body.appendParagraph('No responses yet.').setItalic(true);
  }

  // ── What participants said to keep ──
  body.appendParagraph('2. What to keep').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  const keep = _col(rows, HEADERS.KEEP).filter(Boolean);
  if (keep.length) {
    keep.forEach(t => body.appendListItem(t).setGlyphType(DocumentApp.GlyphType.BULLET));
  } else {
    body.appendParagraph('No responses yet.').setItalic(true);
  }

  // ── Concepts that need revisiting ──
  body.appendParagraph('3. Concepts that may need bridging into Session 2').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(
    'Flag concepts where more than 30% of responses are "More tangled than before" — revisit briefly at the Session 2 opening bridge.'
  ).setItalic(true);

  const clarityHeaders = [
    [HEADERS.CLARITY_TOKENS,    'Text becomes tokens'],
    [HEADERS.CLARITY_TOKEN_SEQ, 'Response is generated one token at a time'],
    [HEADERS.CLARITY_TEMP,      'Temperature is risk in sampling'],
    [HEADERS.CLARITY_ATTN,      'Attention routes between tokens'],
    [HEADERS.CLARITY_FLUENT,    'Fluent ≠ useful or true'],
  ];
  clarityHeaders.forEach(([h, label]) => {
    const vals = _col(rows, h).filter(Boolean);
    if (!vals.length) return;
    const tangled = vals.filter(v => v === 'More tangled than before').length;
    const pct = Math.round((tangled / vals.length) * 100);
    const flag = pct >= 30 ? '⚑ REVISIT' : '✓ ok';
    body.appendListItem(`${flag} — ${label}: ${pct}% more tangled (${tangled}/${vals.length})`)
      .setGlyphType(DocumentApp.GlyphType.BULLET);
  });

  // ── Questions about image generators ──
  body.appendParagraph('4. Questions participants have about image generators').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Use these to shape the Session 2 framing and debrief prompts.').setItalic(true);
  const imgQs = _col(rows, HEADERS.IMG_QUESTION).filter(Boolean);
  if (imgQs.length) {
    imgQs.forEach(t => body.appendListItem(t).setGlyphType(DocumentApp.GlyphType.BULLET));
  } else {
    body.appendParagraph('No responses yet.').setItalic(true);
  }

  // ── Assignment options picked ──
  body.appendParagraph('5. Assignment options picked (for async share seeding)').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(
    'Participants doing the classroom-adaptation or ELIZA-comparison options may have richer artifacts to seed the Session 2 opening discussion.'
  ).setItalic(true);
  const asgn = _col(rows, HEADERS.ASSIGNMENT_OPTION).filter(Boolean);
  if (asgn.length) {
    const freq = _frequency(asgn);
    Object.entries(freq).sort((a, b) => b[1] - a[1]).forEach(([val, count]) => {
      body.appendListItem(`${count}× ${val}`).setGlyphType(DocumentApp.GlyphType.BULLET);
    });
  } else {
    body.appendParagraph('Assignment question not yet added to the form, or no responses yet.').setItalic(true);
  }

  // ── Session 2 facilitation prep checklist ──
  body.appendParagraph('6. Session 2 facilitation prep checklist').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  const checks = [
    `Review the Image Default Test Board with a "doctor", "classroom", and "beautiful home" vague prompt`,
    `Prepare 3–5 pre-generated outputs with visible defaults to use on the No-AI pathway`,
    `Open the Diffusion Step-Through Viewer and confirm it loads on the shared machine`,
    `Open the Feature Extraction (Squint Test) tool and pick 2–3 contrasting images`,
    `Add a 2-min bridge at the start: text becomes tokens; images become pixels, features, learned patterns`,
    `Check feedback for any comfort or consent issues that need addressing in the opening norms`,
    `Seed the async thread with one participant quote from the "one-sentence" question to open the bridge`,
    `If any concept was "more tangled" for 30%+, add a one-slide explainer to the bridge`,
    `Confirm the A/B/C Comparison Board is loaded and ready for pilot-evidence capture`,
    `Send Session 2 reminder with link to ${CONFIG.SESSION_2_DATE}`,
  ];
  checks.forEach(t => body.appendListItem(t).setGlyphType(DocumentApp.GlyphType.CHECKBOX));

  // ── Session 2 core question ──
  body.appendParagraph('7. Session 2 core question').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(`"${CONFIG.SESSION_2_CORE_Q}"`).setBold(true);

  doc.saveAndClose();
  const url = doc.getUrl();
  Logger.log(`\nSession 2 planning doc created:\n${url}`);
  return url;
}

// ─── TRIGGER: ON FORM SUBMIT ─────────────────────────────────────────────────
// Install via: Triggers → Add trigger → onFormSubmit → From form → On form submit

function onFormSubmit(e) {
  if (!CONFIG.FACILITATOR_EMAIL) return;
  const resp = e.namedValues || {};
  const name = (resp[HEADERS.NAME] || ['anonymous'])[0] || 'anonymous';
  const rec = (resp[HEADERS.RECOMMEND] || [''])[0];
  const flag = rec.startsWith('No') ? ' ⚑ NEGATIVE REC' : '';
  const comfort = (resp[HEADERS.COMFORT] || [''])[0];
  const comfortFlag = comfort.startsWith('No') ? ' ⚑ COMFORT ISSUE' : '';
  GmailApp.sendEmail(
    CONFIG.FACILITATOR_EMAIL,
    `[LM S1 Feedback]${flag}${comfortFlag} New response from ${name}`,
    `A new Session 1 feedback response arrived.\n\nName: ${name}\nRecommend: ${rec}\nComfort: ${comfort}\n\nOpen the sheet to read it in full.`
  );
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function _getRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error(`Sheet "${CONFIG.SHEET_NAME}" not found.`);
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
}

function _col(rows, header) {
  return rows.map(r => (r[header] || '').toString().trim());
}

function _frequency(arr) {
  return arr.reduce((acc, val) => {
    val.split(', ').forEach(v => {
      const k = v.trim();
      if (k) acc[k] = (acc[k] || 0) + 1;
    });
    return acc;
  }, {});
}

function _logFreq(label, arr, multiSelect) {
  const vals = arr.filter(Boolean);
  if (!vals.length) { Logger.log(`\n${label}: no responses`); return; }
  const freq = _frequency(vals);
  Logger.log(`\n── ${label} (n=${vals.length}) ──`);
  Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => Logger.log(`  ${v}  ${k}`));
}

function _logClarity(header, rows) {
  const vals = _col(rows, header).filter(Boolean);
  if (!vals.length) return;
  const clearer = vals.filter(v => v === 'Clearer than before').length;
  const same    = vals.filter(v => v === 'About the same').length;
  const tangled = vals.filter(v => v === 'More tangled than before').length;
  const pct = n => Math.round((n / vals.length) * 100);
  // shorten the header label for display
  const label = header.length > 48 ? header.slice(0, 48) + '…' : header;
  Logger.log(`  ${label}`);
  Logger.log(`    ↑ Clearer ${pct(clearer)}%  · Same ${pct(same)}%  · ↓ Tangled ${pct(tangled)}%  (n=${vals.length})`);
}

function _logFreeText(label, rows, header) {
  const vals = _col(rows, header).filter(Boolean);
  if (!vals.length) return;
  Logger.log(`\n── ${label} ──`);
  vals.forEach((t, i) => Logger.log(`  ${i + 1}. ${t}`));
}

function _emailSummary(n) {
  const rows = _getRows();
  let body = `Session 1 feedback summary — ${n} response${n === 1 ? '' : 's'}\n\n`;
  body += `Run summariseSession1() in Apps Script for the full breakdown.\n`;
  body += `Run buildSession2PlanDoc() to generate the Session 2 planning document.\n\n`;
  const changes = _col(rows, HEADERS.CHANGE).filter(Boolean);
  if (changes.length) {
    body += `WHAT TO CHANGE (${changes.length} responses):\n`;
    changes.forEach(t => { body += `• ${t}\n`; });
  }
  GmailApp.sendEmail(
    CONFIG.FACILITATOR_EMAIL,
    `[Learning Machines] Session 1 feedback — ${n} response${n === 1 ? '' : 's'}`,
    body
  );
}

// ─── UTILITY: FIND FORM ENTRY IDS ────────────────────────────────────────────
// Run this once to log your form's entry IDs — useful for updating the
// entry.ASSIGNMENT_OPTION placeholder in session-1-feedback.html.

function getFormEntryIds() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formUrl = ss.getFormUrl();
  if (!formUrl) { Logger.log('No form linked to this sheet.'); return; }
  const form = FormApp.openByUrl(formUrl);
  form.getItems().forEach(item => {
    Logger.log(`${item.getTitle()} → entry.${item.asTextItem ? '' : ''}${item.getId()}`);
  });
}
