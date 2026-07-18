/**
 * Creates the Session 2 feedback Google Form (Learning Machines camp).
 *
 * How to use:
 *   1. Go to https://script.google.com → New project.
 *   2. Replace the default code with this file's contents.
 *   3. Run ▶ createSession2FeedbackForm (approve the authorization prompt).
 *   4. Open the Execution log and copy the three URLs it prints.
 *
 * Run it ONCE — running again creates a duplicate form.
 * The form lands in your Drive root; move it wherever you like.
 *
 * Mirrors docs/make-session-1-feedback-form.gs: nothing required, no email
 * collection, anonymous by default. The assignment-option question that had
 * to be added to the Session 1 form by hand is built in here from the start.
 */
function createSession2FeedbackForm() {
  var form = FormApp.create('Session 2 Feedback: How Machines Imagine');

  form.setDescription(
    'Thanks for being the diffusion model with us. This takes about three minutes. ' +
    'Every question is optional, and you can leave your name blank — honest and anonymous beats complete. ' +
    'Responses are read only by facilitators and never quoted publicly without permission.');
  form.setConfirmationMessage('Thank you — this shapes Saturday\'s video session. See you next week.');
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
    .setTitle('Before this session, how familiar were you with how image generators work inside?')
    .setChoiceValues([
      'This was my first look at the mechanics',
      'I knew some of the vocabulary but not the moving parts',
      'I mostly knew this and came to see how it was taught',
      'I have a technical background in AI or machine learning']);

  /* ---------- The shared activity ---------- */
  form.addSectionHeaderItem().setTitle('The shared activity');

  var qRounds = form.addCheckboxItem()
    .setTitle('Which parts made something click for you?')
    .setHelpText('Choose all that apply.')
    .setChoiceValues([
      'From tokens to pixels (the blurry-image walkthrough)',
      'WordNet and ImageNet (the human pre-work under everything)',
      'Diffusion as denoising (chiseling an image out of noise)',
      'The doctor default (the live test of what gets filled in)',
      'Drawing the prompt in the Human Diffusion Canvas',
      'Comparing the room\'s drawings with each other and the machine\'s',
      'Aurora\'s guest talk',
      'The debrief discussion',
      'Nothing has clicked yet — and that is useful for us to know']);

  var qGrid = form.addGridItem()
    .setTitle('For each idea, where are you now?')
    .setRows([
      'An image model works with pixel data, not objects or scenes',
      'Human labeling (WordNet, ImageNet) sits underneath generation',
      'Diffusion means denoising from a gray field toward the prompt',
      'One prompt can produce many plausible images, shaped by learned defaults',
      'Unspecified details get filled in from training defaults'])
    .setColumns(['Clearer than before', 'About the same', 'More tangled than before']);

  var qOneSentence = form.addParagraphTextItem()
    .setTitle('In one sentence: when an image model generates a picture, what is it actually doing?')
    .setHelpText('No grading — this tells us what the session actually taught.');

  var qFuzzy = form.addParagraphTextItem()
    .setTitle('What is still fuzzy or unanswered?');

  /* ---------- The tools ---------- */
  form.addSectionHeaderItem().setTitle('The tools');

  var qTool = form.addMultipleChoiceItem()
    .setTitle('Which tool did you spend the most time with?')
    .setChoiceValues([
      'Human Diffusion Canvas',
      'Diffusion Step-Through Viewer',
      'The Squint Test (feature extraction)',
      'Image–Caption Match Lab',
      'Default Test Comparison Viewer',
      'I worked mainly in the Image Default Test Board',
      'I did not get to the tools']);

  var qExport = form.addMultipleChoiceItem()
    .setTitle('Did you get an export out of the Human Diffusion Canvas?')
    .setChoiceValues([
      'Yes — a PNG',
      'Yes — a GIF',
      'Tried, but the export did not work',
      'I did not try to export',
      'I did not use the canvas']);

  var qFriction = form.addParagraphTextItem()
    .setTitle('Any tool friction?')
    .setHelpText('We already know about the canvas brush color not changing between steps and the brush size being overridable — anything beyond those? Anything confusing, broken, unreadable, or hard to use while the session was running.');

  /* ---------- Guest spotlight ---------- */
  form.addSectionHeaderItem().setTitle('Guest spotlight');

  var qGuest = form.addParagraphTextItem()
    .setTitle('One thing from Aurora\'s talk that stuck with you?')
    .setHelpText('An idea, a work, a question it raised — anything.');

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

  var qAssignment = form.addMultipleChoiceItem()
    .setTitle('Which assignment option are you planning to take on?')
    .setHelpText('All six routes are on the assignment page, and all count as full participation.')
    .setChoiceValues([
      'Make one image-generation artifact (the session ask)',
      'Run the default test',
      'Run my own Human Diffusion Canvas with other people',
      'Find where spatial reasoning breaks',
      'Adapt the marker version for a classroom',
      'Analyze a frozen example (no AI)',
      'Not sure yet']);

  var qKeep = form.addParagraphTextItem()
    .setTitle('What should we make sure to keep?');

  var qChange = form.addParagraphTextItem()
    .setTitle('What should we change before Saturday\'s video session?');

  var qVideo = form.addParagraphTextItem()
    .setTitle('What question about video generators do you want answered?')
    .setHelpText('Next week asks: how does a model keep a moving image coherent from frame to frame?');

  var qRecommend = form.addMultipleChoiceItem()
    .setTitle('Would you recommend this session to a colleague or friend?')
    .setChoiceValues(['Definitely', 'Probably', 'Not sure yet', 'No — and we would genuinely like to know why above']);

  var qElse = form.addParagraphTextItem()
    .setTitle('Anything else?');

  /* Optional: create a linked response spreadsheet (uncomment to use)
  var ss = SpreadsheetApp.create('Session 2 Feedback (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  */

  /* Build a prefilled URL — it exposes the entry.N field ids needed to
     wire the on-site form. Sample values are placeholders, nothing is submitted. */
  var prefill = form.createResponse()
    .withItemResponse(qName.createResponse('x'))
    .withItemResponse(qAttend.createResponse('Live on Zoom'))
    .withItemResponse(qFamiliar.createResponse('This was my first look at the mechanics'))
    .withItemResponse(qRounds.createResponse(['From tokens to pixels (the blurry-image walkthrough)']))
    .withItemResponse(qGrid.createResponse([
      'Clearer than before', 'Clearer than before', 'Clearer than before',
      'Clearer than before', 'Clearer than before']))
    .withItemResponse(qOneSentence.createResponse('x'))
    .withItemResponse(qFuzzy.createResponse('x'))
    .withItemResponse(qTool.createResponse('Human Diffusion Canvas'))
    .withItemResponse(qExport.createResponse('Yes — a GIF'))
    .withItemResponse(qFriction.createResponse('x'))
    .withItemResponse(qGuest.createResponse('x'))
    .withItemResponse(qPace.createResponse('About right'))
    .withItemResponse(qChat.createResponse('Worked well for me'))
    .withItemResponse(qTech.createResponse('x'))
    .withItemResponse(qComfort.createResponse('Yes'))
    .withItemResponse(qConcerns.createResponse('x'))
    .withItemResponse(qAssignment.createResponse('Make one image-generation artifact (the session ask)'))
    .withItemResponse(qKeep.createResponse('x'))
    .withItemResponse(qChange.createResponse('x'))
    .withItemResponse(qVideo.createResponse('x'))
    .withItemResponse(qRecommend.createResponse('Definitely'))
    .withItemResponse(qElse.createResponse('x'))
    .toPrefilledUrl();

  Logger.log('EDIT URL (for you):            ' + form.getEditUrl());
  Logger.log('SHARE URL (for participants):  ' + form.getPublishedUrl());
  Logger.log('PREFILLED URL (paste back to Claude to wire the site form): ' + prefill);
}
