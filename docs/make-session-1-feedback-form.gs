/**
 * Creates the Session 1 feedback Google Form (Learning Machines camp).
 *
 * How to use:
 *   1. Go to https://script.google.com → New project.
 *   2. Replace the default code with this file's contents.
 *   3. Run ▶ createSession1FeedbackForm (approve the authorization prompt).
 *   4. Open the Execution log and copy the three URLs it prints.
 *
 * Run it ONCE — running again creates a duplicate form.
 * The form lands in your Drive root; move it wherever you like.
 *
 * Mirrors docs/session-1-feedback-form.md: nothing required, no email
 * collection, anonymous by default.
 */
function createSession1FeedbackForm() {
  var form = FormApp.create('Session 1 Feedback: Human Language Model');

  form.setDescription(
    'Thanks for making the machine with us. This takes about three minutes. ' +
    'Every question is optional, and you can leave your name blank — honest and anonymous beats complete. ' +
    'Responses are read only by facilitators and never quoted publicly without permission.');
  form.setConfirmationMessage('Thank you — this shapes Saturday\'s images session. See you next week.');
  form.setLimitOneResponsePerUser(false);   // true would force sign-in and break anonymity
  form.setShowLinkToRespondAgain(false);
  try { form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT); }
  catch (e) { try { form.setCollectEmail(false); } catch (e2) {} }
  try { form.setRequireLogin(false); } catch (e) {} // only applies on Workspace domains

  /* ---------- About you ---------- */
  form.addSectionHeaderItem().setTitle('About you');

  var qName = form.addTextItem()
    .setTitle('Name or display name')
    .setHelpText('Optional — leave blank to stay anonymous.');

  var qAttend = form.addMultipleChoiceItem()
    .setTitle('How did you attend?')
    .setChoiceValues(['Live on Zoom', 'Watched the recording', 'Some of each']);

  var qFamiliar = form.addMultipleChoiceItem()
    .setTitle('Before this session, how familiar were you with how language models work inside?')
    .setChoiceValues([
      'This was my first look at the mechanics',
      'I knew some of the vocabulary but not the moving parts',
      'I mostly knew this and came to see how it was taught',
      'I have a technical background in AI or machine learning']);

  /* ---------- The shared activity ---------- */
  form.addSectionHeaderItem().setTitle('The shared activity');

  var qRounds = form.addCheckboxItem()
    .setTitle('Which rounds made something click for you?')
    .setHelpText('Choose all that apply.')
    .setChoiceValues([
      'Training data and tokens (the tiny paragraph world)',
      'Prediction (building the sentence one word at a time)',
      'Temperature (safe versus surprising sampling)',
      'Attention (what "it" points to)',
      'Alignment (scoring the two apologies)',
      'The debrief discussion',
      'Nothing has clicked yet — and that is useful for us to know']);

  var qGrid = form.addGridItem()
    .setTitle('For each idea, where are you now?')
    .setRows([
      'Text becomes tokens before the model sees it',
      'A response is generated one token at a time',
      'Temperature is risk in sampling, not deeper thinking',
      'Attention routes between tokens when context changes',
      'Fluent is not the same as useful or true'])
    .setColumns(['Clearer than before', 'About the same', 'More tangled than before']);

  var qOneSentence = form.addParagraphTextItem()
    .setTitle('In one sentence: when a language model writes, what is it actually doing?')
    .setHelpText('No grading — this tells us what the session actually taught.');

  var qFuzzy = form.addParagraphTextItem()
    .setTitle('What is still fuzzy or unanswered?');

  /* ---------- The tool studio ---------- */
  form.addSectionHeaderItem().setTitle('The tool studio');

  var qTool = form.addMultipleChoiceItem()
    .setTitle('Which tool did you spend the most time with?')
    .setChoiceValues([
      'Tokenizer + Temperature Visualizer',
      'Count the Next Token',
      'Next-Token Prediction Game',
      'ELIZA Simulator',
      'I worked mainly in the Text Experiment Board',
      'I did not get to the tools']);

  var qClaim = form.addMultipleChoiceItem()
    .setTitle('Did you land a claim on the Text Experiment Board?')
    .setChoiceValues(['Yes, finished one', 'Started one', 'No — and that is fine']);

  var qFriction = form.addParagraphTextItem()
    .setTitle('Any tool friction?')
    .setHelpText('Anything confusing, broken, unreadable, or hard to use while the session was running.');

  /* ---------- Format and pacing ---------- */
  form.addSectionHeaderItem().setTitle('Format and pacing');

  var qPace = form.addMultipleChoiceItem()
    .setTitle('How was the pace?')
    .setChoiceValues(['Too fast', 'About right', 'Too slow', 'It varied — say more below']);

  var qChat = form.addMultipleChoiceItem()
    .setTitle('Participating through Zoom chat:')
    .setChoiceValues([
      'Worked well for me',
      'Okay, with some friction',
      'Hard to follow or keep up with',
      'I mostly watched, and that felt fine']);

  var qTech = form.addParagraphTextItem()
    .setTitle('Any technical trouble?')
    .setHelpText('Shared slides, audio, links, screen readability.');

  /* ---------- Comfort and consent ---------- */
  form.addSectionHeaderItem().setTitle('Comfort and consent');

  var qComfort = form.addMultipleChoiceItem()
    .setTitle('Could you participate the way you wanted — camera off, chat only, or just watching?')
    .setChoiceValues(['Yes', 'Mostly', 'No — tell us more below']);

  var qConcerns = form.addParagraphTextItem()
    .setTitle('Anything facilitators should know about?')
    .setHelpText('An example or prompt that felt off, concerns about the recording, data, or consent, or anything that made participation harder.');

  /* ---------- Looking ahead ---------- */
  form.addSectionHeaderItem().setTitle('Looking ahead');

  var qKeep = form.addParagraphTextItem()
    .setTitle('What should we make sure to keep?');

  var qChange = form.addParagraphTextItem()
    .setTitle('What should we change before Saturday\'s images session?');

  var qImages = form.addParagraphTextItem()
    .setTitle('What question about image generators do you want answered?')
    .setHelpText('Next week asks: what does an image model fill in when you don\'t specify?');

  var qRecommend = form.addMultipleChoiceItem()
    .setTitle('Would you recommend this session to a colleague or friend?')
    .setChoiceValues(['Definitely', 'Probably', 'Not sure yet', 'No — and we would genuinely like to know why above']);

  var qElse = form.addParagraphTextItem()
    .setTitle('Anything else?');

  /* Optional: create a linked response spreadsheet (uncomment to use)
  var ss = SpreadsheetApp.create('Session 1 Feedback (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  */

  /* Build a prefilled URL — it exposes the entry.N field ids needed to
     wire the on-site form. Sample values are placeholders, nothing is submitted. */
  var prefill = form.createResponse()
    .withItemResponse(qName.createResponse('x'))
    .withItemResponse(qAttend.createResponse('Live on Zoom'))
    .withItemResponse(qFamiliar.createResponse('This was my first look at the mechanics'))
    .withItemResponse(qRounds.createResponse(['Training data and tokens (the tiny paragraph world)']))
    .withItemResponse(qGrid.createResponse([
      'Clearer than before', 'Clearer than before', 'Clearer than before',
      'Clearer than before', 'Clearer than before']))
    .withItemResponse(qOneSentence.createResponse('x'))
    .withItemResponse(qFuzzy.createResponse('x'))
    .withItemResponse(qTool.createResponse('Tokenizer + Temperature Visualizer'))
    .withItemResponse(qClaim.createResponse('Yes, finished one'))
    .withItemResponse(qFriction.createResponse('x'))
    .withItemResponse(qPace.createResponse('About right'))
    .withItemResponse(qChat.createResponse('Worked well for me'))
    .withItemResponse(qTech.createResponse('x'))
    .withItemResponse(qComfort.createResponse('Yes'))
    .withItemResponse(qConcerns.createResponse('x'))
    .withItemResponse(qKeep.createResponse('x'))
    .withItemResponse(qChange.createResponse('x'))
    .withItemResponse(qImages.createResponse('x'))
    .withItemResponse(qRecommend.createResponse('Definitely'))
    .withItemResponse(qElse.createResponse('x'))
    .toPrefilledUrl();

  Logger.log('EDIT URL (for you):            ' + form.getEditUrl());
  Logger.log('SHARE URL (for participants):  ' + form.getPublishedUrl());
  Logger.log('PREFILLED URL (paste back to Claude to wire the site form): ' + prefill);
}
