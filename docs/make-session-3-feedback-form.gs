/**
 * Creates the Session 3 feedback Google Form (Learning Machines camp).
 *
 * How to use:
 *   1. Go to https://script.google.com → New project.
 *   2. Replace the default code with this file's contents.
 *   3. Run ▶ createSession3FeedbackForm (approve the authorization prompt).
 *   4. Open the Execution log and copy the edit, share, and prefilled URLs.
 *
 * Run it ONCE — running again creates a duplicate form.
 * Every question is optional; email collection and sign-in are disabled.
 */
function createSession3FeedbackForm() {
  var form = FormApp.create('Session 3 Feedback: How Machines Move');

  form.setDescription(
    'Thanks for investigating video with us. This takes about three minutes. ' +
    'Every question is optional, and you can leave your name blank — honest and anonymous beats complete. ' +
    'Responses are read only by facilitators and never quoted publicly without permission.');
  form.setConfirmationMessage('Thank you — this helps shape the optional Studio / Showcase and future Learning Machines sessions.');
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);
  try { form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT); }
  catch (e) { try { form.setCollectEmail(false); } catch (e2) {} }
  try { form.setRequireLogin(false); } catch (e) {}

  form.addSectionHeaderItem().setTitle('About you');

  var qName = form.addTextItem()
    .setTitle('Name or display name')
    .setHelpText('Optional — leave blank to stay anonymous.');

  var qAttend = form.addMultipleChoiceItem()
    .setTitle('How did you attend?')
    .setChoiceValues(['Live on Zoom', 'Watched the recording', 'Some of each']);

  var qParticipationMode = form.addCheckboxItem()
    .setTitle('How did you participate today?')
    .setHelpText('Choose every mode that applies. Watching or listening is a valid form of participation.')
    .setChoiceValues([
      'Spoke aloud',
      'Used the chat',
      'Drew or used a tool',
      'Used private writing or a poll',
      'Mainly watched or listened'
    ]);

  form.addSectionHeaderItem().setTitle('The session');

  var qClick = form.addCheckboxItem()
    .setTitle('Which parts made something click for you?')
    .setHelpText('Choose any that apply.')
    .setChoiceValues([
      'The text → image → video synthesis',
      'Point correspondence (tracking a point across existing frames)',
      'Temporal Telephone Run A / Run B comparison',
      'The curated video-failure hunt',
      'The labor, consent, and provenance map',
      'The one-tool studio',
      'Dr. Emily Thomforde\'s guest talk',
      'The Q&A or closing synthesis',
      'Nothing has clicked yet — useful for us to know'
    ]);

  var qGrid = form.addGridItem()
    .setTitle('For each idea, where are you now?')
    .setRows([
      'Tracking points in existing video is different from generating new frames',
      'Video coherence depends on relationships staying consistent across time',
      'A visible failure supports an observation but does not by itself prove its cause',
      'Smooth or plausible video is not evidence that an event happened',
      'Provenance can document a chain but does not itself establish consent'
    ])
    .setColumns(['Clearer than before', 'About the same', 'More tangled than before']);

  var qSentence = form.addParagraphTextItem()
    .setTitle('In one or two sentences: what does a video model have to keep coherent across time?')
    .setHelpText('No grading — this tells us what the session actually taught.');

  var qEvidenceSentence = form.addParagraphTextItem()
    .setTitle('Complete the sentence: “Smooth video is not evidence because…”')
    .setHelpText('A short answer is enough. We are checking the session’s central claim, not grading your wording.');

  var qFuzzy = form.addParagraphTextItem()
    .setTitle('What is still fuzzy, unresolved, or worth testing next?');

  form.addSectionHeaderItem().setTitle('Activities and tools');

  var qTool = form.addCheckboxItem()
    .setTitle('Which tools or routes did you use?')
    .setHelpText('Choose any that apply.')
    .setChoiceValues([
      'Point Correspondence Lab',
      'Temporal Telephone',
      'Video Failure Gallery Viewer',
      'Frame-by-Frame Coherence Viewer',
      'Video Test Report',
      'A frozen / no-AI example',
      'I mainly listened or watched'
    ]);

  var qRunCompare = form.addMultipleChoiceItem()
    .setTitle('Could you compare saved Run A and Run B sequences in Temporal Telephone?')
    .setChoiceValues([
      'Yes — both runs saved and played back',
      'Partly — I completed only one run',
      'Tried, but something did not work',
      'I did not use Temporal Telephone'
    ]);

  var qFinished = form.addCheckboxItem()
    .setTitle('What did you finish during the session?')
    .setHelpText('Choose any that apply. Partial work and watch / listen routes count.')
    .setChoiceValues([
      'An exact-break observation',
      'A bounded claim supported by a frame or comparison',
      'One piece of missing provenance evidence',
      'A sentence about classroom use',
      'A five-frame Run A / Run B comparison',
      'I mainly watched or listened'
    ]);

  var qFriction = form.addParagraphTextItem()
    .setTitle('Any tool friction?')
    .setHelpText('Anything confusing, broken, hard to read, hard to draw, or hard to recover from? Name the tool and device if useful.');

  form.addSectionHeaderItem().setTitle('Guest spotlight');

  var qGuest = form.addParagraphTextItem()
    .setTitle('What idea or question from Dr. Emily Thomforde\'s talk stayed with you?');

  form.addSectionHeaderItem().setTitle('Format, access, and consent');

  var qPace = form.addMultipleChoiceItem()
    .setTitle('How was the pace?')
    .setChoiceValues(['Too fast', 'About right', 'Too slow', 'It varied — say more below']);

  var qParticipate = form.addMultipleChoiceItem()
    .setTitle('Could you participate in the way you wanted?')
    .setChoiceValues(['Yes', 'Mostly', 'No — tell us more below', 'I mostly watched, and that felt fine']);

  var qConcerns = form.addParagraphTextItem()
    .setTitle('Anything facilitators should know about?')
    .setHelpText('Access, pacing, recording, likeness, consent, a difficult example, or anything else that affected participation.');

  form.addSectionHeaderItem().setTitle('Optional Studio / Showcase');

  var qFollowup = form.addMultipleChoiceItem()
    .setTitle('Which follow-up would you actually use?')
    .setChoiceValues([
      'A downloadable classroom activity pack',
      'The recording plus concise facilitator notes',
      'A live studio / co-design session',
      'A short office hour for questions',
      'None of these / not sure yet'
    ]);

  var qStudio = form.addMultipleChoiceItem()
    .setTitle('Would you present something at an August Learning Machines Studio / Showcase?')
    .setChoiceValues([
      'Yes — I would like a presentation slot',
      'Maybe — I want more details first',
      'I would attend but not present',
      'No / not this time'
    ]);

  var qBring = form.addParagraphTextItem()
    .setTitle('What might you bring or develop for the Studio?')
    .setHelpText('A tool, experiment, classroom activity, creative artifact, critique, or question — a rough idea is enough.');

  var qSupport = form.addCheckboxItem()
    .setTitle('What would help you participate?')
    .setHelpText('Choose any that apply.')
    .setChoiceValues([
      'A clear date and time',
      'A short presentation template',
      'A practice / feedback session',
      'A partner or small-group format',
      'A no-slides option',
      'An asynchronous way to share',
      'Accessibility or technical support'
    ]);

  form.addSectionHeaderItem().setTitle('Anything else');

  var qKeep = form.addParagraphTextItem().setTitle('What should we make sure to keep?');
  var qChange = form.addParagraphTextItem().setTitle('What should we change next time?');
  var qRecommend = form.addMultipleChoiceItem()
    .setTitle('Would you recommend Learning Machines to a colleague or friend?')
    .setChoiceValues(['Definitely', 'Probably', 'Not sure yet', 'No — and we would genuinely like to know why above']);
  var qElse = form.addParagraphTextItem().setTitle('Anything else?');

  // The sample response exposes each entry.N id without submitting anything.
  var prefill = form.createResponse()
    .withItemResponse(qName.createResponse('x'))
    .withItemResponse(qAttend.createResponse('Live on Zoom'))
    .withItemResponse(qParticipationMode.createResponse(['Drew or used a tool']))
    .withItemResponse(qClick.createResponse(['The text → image → video synthesis']))
    .withItemResponse(qGrid.createResponse([
      'Clearer than before', 'Clearer than before', 'Clearer than before',
      'Clearer than before', 'Clearer than before']))
    .withItemResponse(qSentence.createResponse('x'))
    .withItemResponse(qEvidenceSentence.createResponse('x'))
    .withItemResponse(qFuzzy.createResponse('x'))
    .withItemResponse(qTool.createResponse(['Temporal Telephone']))
    .withItemResponse(qRunCompare.createResponse('Yes — both runs saved and played back'))
    .withItemResponse(qFinished.createResponse(['An exact-break observation']))
    .withItemResponse(qFriction.createResponse('x'))
    .withItemResponse(qGuest.createResponse('x'))
    .withItemResponse(qPace.createResponse('About right'))
    .withItemResponse(qParticipate.createResponse('Yes'))
    .withItemResponse(qConcerns.createResponse('x'))
    .withItemResponse(qFollowup.createResponse('A downloadable classroom activity pack'))
    .withItemResponse(qStudio.createResponse('Maybe — I want more details first'))
    .withItemResponse(qBring.createResponse('x'))
    .withItemResponse(qSupport.createResponse(['A clear date and time']))
    .withItemResponse(qKeep.createResponse('x'))
    .withItemResponse(qChange.createResponse('x'))
    .withItemResponse(qRecommend.createResponse('Definitely'))
    .withItemResponse(qElse.createResponse('x'))
    .toPrefilledUrl();

  Logger.log('EDIT URL (for you):            ' + form.getEditUrl());
  Logger.log('SHARE URL (for participants):  ' + form.getPublishedUrl());
  Logger.log('PREFILLED URL (for wiring the site form): ' + prefill);
}
