/**
 * Creates or updates the Session 3 feedback Google Form.
 *
 * Recommended: edit the existing form in place
 *   1. Open the existing Google Form editor.
 *   2. Open its Apps Script project (three-dot menu -> Script editor).
 *   3. Replace the default code with this file.
 *   4. Run updateExistingSession3FeedbackForm().
 *
 * If this is a standalone Apps Script project, paste the form editor ID below.
 * It is the value between /d/ and /edit in the editor URL. If the ID is blank,
 * the script looks for exactly one Drive form named SESSION_3_FORM_TITLE.
 *
 * The updater makes a timestamped form copy and exports existing responses to a
 * private spreadsheet before replacing the questions. It preserves the original
 * form itself, its participant URL, accepting-responses state, and response
 * destination. Every question remains optional; email and sign-in are disabled.
 *
 * IMPORTANT: rebuilding questions creates new entry.N field IDs. After running
 * the updater, copy the logged PREFILLED URL so pages/session-3-feedback.html can
 * be rewired to the updated form.
 */

var SESSION_3_FORM_TITLE = 'Session 3 Feedback: How Machines Move';
var SESSION_3_FORM_ID = ''; // Optional: paste the ID from the existing /edit URL.

function updateExistingSession3FeedbackForm() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  var form;
  var wasAcceptingResponses;

  try {
    form = getExistingSession3FeedbackForm_();
    wasAcceptingResponses = form.isAcceptingResponses();
    form.setAcceptingResponses(false);

    var backup = backupExistingSession3Feedback_(form);
    clearFormItems_(form);
    var questions = buildSession3FeedbackForm_(form);
    var prefilledUrl = createSession3PrefilledUrl_(form, questions);

    logSession3FeedbackLinks_(form, prefilledUrl, backup);
  } finally {
    if (form && typeof wasAcceptingResponses === 'boolean') {
      form.setAcceptingResponses(wasAcceptingResponses);
    }
    lock.releaseLock();
  }
}

/** Use only when there is no existing Session 3 feedback form. */
function createSession3FeedbackForm() {
  var form = FormApp.create(SESSION_3_FORM_TITLE);
  var questions = buildSession3FeedbackForm_(form);
  var prefilledUrl = createSession3PrefilledUrl_(form, questions);
  logSession3FeedbackLinks_(form, prefilledUrl, null);
}

/** Read-only helper: prints the URLs for the existing form. */
function logSession3FeedbackLinks() {
  var form = getExistingSession3FeedbackForm_();
  logSession3FeedbackLinks_(form, '', null);
}

function getExistingSession3FeedbackForm_() {
  var activeForm = FormApp.getActiveForm();
  if (activeForm) return activeForm;

  if (SESSION_3_FORM_ID) return FormApp.openById(SESSION_3_FORM_ID.trim());

  var matches = DriveApp.getFilesByName(SESSION_3_FORM_TITLE);
  var ids = [];
  while (matches.hasNext()) ids.push(matches.next().getId());

  if (ids.length === 1) return FormApp.openById(ids[0]);
  if (ids.length === 0) {
    throw new Error(
      'No existing form named "' + SESSION_3_FORM_TITLE + '" was found. ' +
      'Run this from the form\'s bound Apps Script project or paste its editor ID into SESSION_3_FORM_ID.'
    );
  }

  throw new Error(
    'Found ' + ids.length + ' forms named "' + SESSION_3_FORM_TITLE + '". ' +
    'Paste the correct editor ID into SESSION_3_FORM_ID. Candidate IDs: ' + ids.join(', ')
  );
}

function buildSession3FeedbackForm_(form) {
  form.setTitle(SESSION_3_FORM_TITLE);
  form.setDescription(
    'Thanks for investigating video with us. This takes about four minutes. ' +
    'Every question is optional, and you can leave your name blank. Responses are read only by facilitators. ' +
    'We will not quote or identify you publicly from this feedback form without separate permission.'
  );
  form.setConfirmationMessage(
    'Thank you — this will shape the Session 3 follow-up materials and the optional August Studio / Showcase.'
  );
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT);
  } catch (e) {
    try { form.setCollectEmail(false); } catch (ignored) {}
  }
  try { form.setRequireLogin(false); } catch (ignored) {}

  form.addSectionHeaderItem().setTitle('About you');

  var qName = form.addTextItem()
    .setTitle('Name or display name')
    .setHelpText('Optional — leave blank to stay anonymous.');

  var qParticipation = form.addCheckboxItem()
    .setTitle('How did you attend or participate?')
    .setHelpText('Choose every mode that applies. Watching or listening is a full participation route.')
    .setChoiceValues([
      'Attended live on Zoom',
      'Watched or plan to watch the recording',
      'Spoke aloud',
      'Used the chat',
      'Drew in Coherence Animator',
      'Shared an assignment or animation',
      'Used private writing or another tool',
      'Mainly watched or listened'
    ]);

  form.addSectionHeaderItem().setTitle('What happened in Session 3');

  var qParts = form.addCheckboxItem()
    .setTitle('Which parts made something click or gave you a useful question?')
    .setHelpText('Choose any that apply.')
    .setChoiceValues([
      'Assignment reviews and participant projects',
      'The Session 2 feedback discussion',
      'The text → image → video synthesis',
      'Coherence Animator: Run A and Run B',
      'Sharing and comparing the animations',
      'Timing, keyframes, and foreground/background insights',
      'The tour of video tools and follow-up options',
      'Dr. Emily Thomforde\'s guest talk',
      'The Q&A or closing discussion',
      'Nothing has clicked yet — useful for us to know'
    ]);

  var qClarity = form.addGridItem()
    .setTitle('For each idea, where are you now?')
    .setRows([
      'Video coherence concerns relationships staying consistent across time',
      'A stable reference may improve consistency but does not guarantee it',
      'Coherence Animator is a teaching analogy, not a literal video-model architecture',
      'Animation ideas such as timing, keyframes, and layers can guide observation without proving how a model works',
      'Smooth video is not evidence that an event happened'
    ])
    .setColumns(['Clearer than before', 'About the same', 'More tangled than before', 'I did not encounter this']);

  var qAnimator = form.addParagraphTextItem()
    .setTitle('What did Coherence Animator or the animation discussion help you notice — and what is still fuzzy?')
    .setHelpText('A short observation or unresolved question is enough. You can also say what the activity did not demonstrate.');

  form.addSectionHeaderItem().setTitle('Guest spotlight');

  var qGuest = form.addParagraphTextItem()
    .setTitle('What idea or question from Dr. Emily Thomforde\'s “Axiology of Mystery” talk stayed with you?');

  form.addSectionHeaderItem().setTitle('Format and access');

  var qAccess = form.addMultipleChoiceItem()
    .setTitle('Could you participate in the way you wanted?')
    .setChoiceValues([
      'Yes — the pace and access worked for me',
      'Mostly',
      'No — the pace got in the way',
      'No — a tool or access issue got in the way',
      'I mostly watched, and that felt fine'
    ]);

  var qFriction = form.addParagraphTextItem()
    .setTitle('Anything facilitators should know about?')
    .setHelpText('Tool friction, pacing, access, recording, likeness, consent, or anything else that affected participation.');

  form.addSectionHeaderItem().setTitle('What comes next');

  var qFollowup = form.addMultipleChoiceItem()
    .setTitle('Which follow-up would you actually use?')
    .setChoiceValues([
      'A downloadable classroom activity pack',
      'The recording plus a concise written recap',
      'A live Studio / co-design session',
      'A short office hour for questions',
      'None of these / not sure yet'
    ]);

  var qStudio = form.addMultipleChoiceItem()
    .setTitle('Would you join an August Learning Machines Studio / Showcase?')
    .setChoiceValues([
      'Yes — I would like to present something',
      'Maybe — I want more details first',
      'I would attend but not present',
      'No / not this time'
    ]);

  var qDate = form.addMultipleChoiceItem()
    .setTitle('Which Saturday works better for the optional Studio / Showcase?')
    .setChoiceValues([
      'Saturday, August 8',
      'Saturday, August 15',
      'Either works for me',
      'Neither works for me',
      'Not planning to attend'
    ]);

  var qBring = form.addParagraphTextItem()
    .setTitle('What might you bring, develop, or need in order to participate?')
    .setHelpText('A tool, experiment, classroom activity, creative artifact, critique, question, support need, or rough idea.');

  form.addSectionHeaderItem().setTitle('Last word');

  var qKeepChange = form.addParagraphTextItem()
    .setTitle('What should we keep, change, or carry into the next version?');

  var qRecommend = form.addMultipleChoiceItem()
    .setTitle('Would you recommend Learning Machines to a colleague or friend?')
    .setChoiceValues(['Definitely', 'Probably', 'Not sure yet', 'No — and we would genuinely like to know why']);

  return {
    name: qName,
    participation: qParticipation,
    parts: qParts,
    clarity: qClarity,
    animator: qAnimator,
    guest: qGuest,
    access: qAccess,
    friction: qFriction,
    followup: qFollowup,
    studio: qStudio,
    date: qDate,
    bring: qBring,
    keepChange: qKeepChange,
    recommend: qRecommend
  };
}

function createSession3PrefilledUrl_(form, q) {
  return form.createResponse()
    .withItemResponse(q.name.createResponse('x'))
    .withItemResponse(q.participation.createResponse(['Attended live on Zoom', 'Drew in Coherence Animator']))
    .withItemResponse(q.parts.createResponse(['Coherence Animator: Run A and Run B']))
    .withItemResponse(q.clarity.createResponse([
      'Clearer than before',
      'Clearer than before',
      'Clearer than before',
      'Clearer than before',
      'Clearer than before'
    ]))
    .withItemResponse(q.animator.createResponse('x'))
    .withItemResponse(q.guest.createResponse('x'))
    .withItemResponse(q.access.createResponse('Yes — the pace and access worked for me'))
    .withItemResponse(q.friction.createResponse('x'))
    .withItemResponse(q.followup.createResponse('The recording plus a concise written recap'))
    .withItemResponse(q.studio.createResponse('Maybe — I want more details first'))
    .withItemResponse(q.date.createResponse('Either works for me'))
    .withItemResponse(q.bring.createResponse('x'))
    .withItemResponse(q.keepChange.createResponse('x'))
    .withItemResponse(q.recommend.createResponse('Definitely'))
    .toPrefilledUrl();
}

function clearFormItems_(form) {
  var items = form.getItems();
  for (var i = items.length - 1; i >= 0; i--) form.deleteItem(items[i]);
}

function backupExistingSession3Feedback_(form) {
  var stamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone() || 'America/Los_Angeles',
    'yyyy-MM-dd HHmm'
  );
  var copy = DriveApp.getFileById(form.getId()).makeCopy(form.getTitle() + ' — backup ' + stamp);
  var responseBackupUrl = '';
  var responses = form.getResponses();

  if (responses.length) {
    var items = form.getItems().filter(function(item) {
      return item.getType() !== FormApp.ItemType.SECTION_HEADER &&
        item.getType() !== FormApp.ItemType.PAGE_BREAK &&
        item.getType() !== FormApp.ItemType.IMAGE &&
        item.getType() !== FormApp.ItemType.VIDEO;
    });
    var spreadsheet = SpreadsheetApp.create(form.getTitle() + ' — response backup ' + stamp);
    var sheet = spreadsheet.getSheets()[0];
    var rows = [['Timestamp'].concat(items.map(function(item) { return item.getTitle(); }))];

    responses.forEach(function(response) {
      var byId = {};
      response.getItemResponses().forEach(function(itemResponse) {
        var value = itemResponse.getResponse();
        byId[itemResponse.getItem().getId()] = Array.isArray(value) ? value.join(' | ') : String(value || '');
      });
      rows.push([response.getTimestamp()].concat(items.map(function(item) {
        return byId[item.getId()] || '';
      })));
    });

    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
    sheet.setFrozenRows(1);
    responseBackupUrl = spreadsheet.getUrl();
  }

  return {
    formCopyUrl: copy.getUrl(),
    responseBackupUrl: responseBackupUrl,
    responseCount: responses.length
  };
}

function logSession3FeedbackLinks_(form, prefilledUrl, backup) {
  Logger.log('Participant form:');
  Logger.log(form.getPublishedUrl());
  Logger.log('Form editor:');
  Logger.log(form.getEditUrl());
  if (form.getDestinationId()) {
    Logger.log('Response spreadsheet:');
    Logger.log('https://docs.google.com/spreadsheets/d/' + form.getDestinationId() + '/edit');
  }
  if (prefilledUrl) {
    Logger.log('PREFILLED URL — send this back to rewire the site:');
    Logger.log(prefilledUrl);
  }
  if (backup) {
    Logger.log('Backup form (' + backup.responseCount + ' existing responses):');
    Logger.log(backup.formCopyUrl);
    if (backup.responseBackupUrl) {
      Logger.log('Private response backup:');
      Logger.log(backup.responseBackupUrl);
    }
  }
}
