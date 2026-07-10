import type { CheckpointQuestion, CheckpointQuiz } from "../../types";
import { argentinianSayings } from "../stories/argentinianSayingsTextingStories";

type StoryQuizSeed = {
  storyNumber: number;
  storyTitle: string;
  storyId: string;
  sayingNumbers: [number, number, number, number, number];
};

type UsageContext = {
  situation: string;
  cue: string;
  when: string;
};

const usageContexts: Record<number, UsageContext> = {
  1: { situation: "A corrupt organizer stole money from the club, and now the receipts are coming out.", cue: "Everyone eventually pays for what they did.", when: "someone's bad actions finally bring consequences." },
  2: { situation: "A scammer keeps changing his name online, but the group is collecting proof against him.", cue: "Sooner or later, every wrongdoer gets caught.", when: "someone thinks they can escape forever but cannot." },
  3: { situation: "The plan is simple, but your friend keeps inventing imaginary risks and impossible complications.", cue: "Do not invent problems where there are none.", when: "someone overcomplicates a simple situation." },
  4: { situation: "A new business wants to grow slowly instead of burning all its money on one huge launch.", cue: "Slow and steady beats rushing and burning out.", when: "discipline matters more than speed." },
  5: { situation: "A supplier says he will deliver tomorrow, but refuses to put anything in writing.", cue: "Words disappear; proof and action matter.", when: "spoken promises need written confirmation." },
  6: { situation: "A man loses every debate but always changes the rules so he can claim he did not lose.", cue: "Someone refuses to admit defeat.", when: "a person twists every argument into a tie." },
  7: { situation: "The office fridge was full yesterday, and today there are crumbs and wrappers everywhere.", cue: "Where something happened, traces remain.", when: "evidence remains after abundance or activity." },
  8: { situation: "A neighbor is yelling nonsense, and arguing only makes him louder.", cue: "Some people are not worth arguing with.", when: "it is wiser to let an unreasonable person think they are right." },
  9: { situation: "The teacher leaves the room for ten minutes, and the students start throwing paper balls.", cue: "When authority leaves, people misbehave.", when: "people act up because the boss or parent is gone." },
  10: { situation: "At dinner, one guest pushes ahead of everyone to serve himself first.", cue: "Someone rudely puts themselves first.", when: "a person places themselves ahead of the group." },
  11: { situation: "A politician promises ten impossible things but never explains how he will do them.", cue: "It is empty talk with no action.", when: "someone talks beautifully but does nothing." },
  12: { situation: "A tourist pays for premium yerba and receives a dusty cheap mix in a fancy bag.", cue: "Someone was tricked with something bad passed off as good.", when: "a person is deceived by fake quality." },
  13: { situation: "Your friend says the laziest student will finish the whole project tonight.", cue: "That is almost impossible.", when: "something is extremely unlikely." },
  14: { situation: "After losing his job, his keys, and his plan, your cousin walks around unsure what to do next.", cue: "Someone is directionless and lost.", when: "a person has no clear plan or handle on life." },
  15: { situation: "Someone receives free concert tickets and complains that the seats are not perfect.", cue: "Do not criticize a gift.", when: "a person is being picky about something free." },
  16: { situation: "Two roommates keep touching each other's shelves, food, and laundry until both get angry.", cue: "Everyone should stay in their own space.", when: "people need boundaries or personal space." },
  17: { situation: "Three cousins describe the same family lunch completely differently because each had a different problem there.", cue: "Everyone tells the story according to their own experience.", when: "personal experience shapes someone's version of events." },
  18: { situation: "A competitor who started far behind catches up in sales and is clearly aiming for first place.", cue: "If someone catches up, they want to win.", when: "a person who was behind becomes a real threat." },
  19: { situation: "A designer says she works better alone because group chats slow her down.", cue: "Sometimes it is better to do things alone.", when: "independence is useful." },
  20: { situation: "Your friend insists he needs nobody, but then cannot reach the one spot on his own back with sunscreen.", cue: "Independence has limits; sometimes help is needed.", when: "someone self-reliant still needs support." },
  21: { situation: "You criticize people who arrive late, and the late friend suddenly gets offended.", cue: "If the criticism fits, accept it.", when: "someone recognizes themselves in a criticism." },
  22: { situation: "A boss has been rude since his first job, and nobody believes he will suddenly become kind.", cue: "Bad habits learned early are hard to change.", when: "someone's old habits seem permanent." },
  23: { situation: "A vendor tries to pressure you, but you calmly refuse to be intimidated.", cue: "Nobody intimidates me.", when: "someone sets a strong boundary." },
  24: { situation: "You are planning a surprise party, and one friend almost mentions it in front of the birthday girl.", cue: "Do not reveal the secret.", when: "someone might expose hidden information." },
  25: { situation: "A team was losing badly, then one lucky call completely changed the match.", cue: "Luck changed completely.", when: "fortune flips from bad to good or good to bad." },
  26: { situation: "A musician wants to start the show, but the bar owner has not paid the agreed deposit.", cue: "Secure the money first.", when: "someone should get paid before acting." },
  27: { situation: "A serious actor accepts a ridiculous commercial because the payment is huge.", cue: "People will do things for money.", when: "money motivates unexpected behavior." },
  28: { situation: "The deal almost closed, but one missing signature ruined everything.", cue: "It almost happened but failed over one small detail.", when: "a tiny missing piece prevents success." },
  29: { situation: "Your friend invites you to a cabin five hours past the last town and with no signal.", cue: "A very remote place.", when: "somewhere feels like the middle of nowhere." },
  30: { situation: "A partner is smiling too much in the meeting and seems to have a hidden condition ready.", cue: "Someone has hidden intentions.", when: "a person is secretly planning something." },
  31: { situation: "A rude neighbor keeps causing trouble, then his own loud party gets shut down by the building manager.", cue: "Karma punishes without visible force.", when: "consequences arrive naturally." },
  32: { situation: "Your friend says 'I am not jealous' and then accidentally lists every jealous thought she has.", cue: "People reveal truths when they talk.", when: "someone's speech exposes what they really feel." },
  33: { situation: "One extra guest arrives for dinner, and the host immediately adds another plate.", cue: "There is room to share food with one more person.", when: "hospitality stretches to include someone else." },
  34: { situation: "An employee starts dating drama with the boss's cousin at the same place where he needs his job.", cue: "Do not create problems where you work or depend on people.", when: "someone risks trouble in the place that sustains them." },
  35: { situation: "For the final pitch, the team uses every contact, every peso, and every idea they have.", cue: "Give everything you have.", when: "someone commits all resources to a goal." },
  36: { situation: "A watch says 'luxury Swiss edition' but the brand name is misspelled.", cue: "Extremely fake.", when: "something is obviously not genuine." },
  37: { situation: "Trying to cancel the contract requires six forms, three offices, and one password nobody has.", cue: "Very difficult.", when: "a task feels almost impossible." },
  38: { situation: "Your cousin exits the wrong subway station and cannot understand the map at all.", cue: "Completely lost or confused.", when: "someone has no idea where they are or what is happening." },
  39: { situation: "A two-minute announcement turns into a forty-minute speech.", cue: "Very long or taking forever.", when: "something lasts much longer than expected." },
  40: { situation: "The intern who broke the printer sweats every time the manager asks who used it.", cue: "Extremely nervous.", when: "someone looks guilty or exposed." },
  41: { situation: "A guest keeps interrupting every conversation and nobody can relax around him.", cue: "Very annoying or hard to deal with.", when: "a person feels unbearably heavy socially." },
  42: { situation: "A dog with a stolen steak runs through a room full of hungry cats.", cue: "Extremely dangerous in a funny way.", when: "a situation is comically risky." },
  43: { situation: "The delivery app says five minutes, but the driver has not moved for half an hour.", cue: "Very slow.", when: "something is painfully delayed." },
  44: { situation: "The leftover meat is so stiff nobody can cut it with a normal knife.", cue: "Very tough or hard.", when: "food, a person, or a problem is unusually hard." },
  45: { situation: "The inheritance paperwork includes ex-partners, missing receipts, and three conflicting lawyers.", cue: "Extremely complicated or messy.", when: "a situation is tangled and hard to understand." },
  46: { situation: "A man loudly tells a crude joke at a formal dinner with his girlfriend's grandparents.", cue: "Very out of place or socially inappropriate.", when: "someone behaves in a wildly inappropriate way." },
  47: { situation: "Two exes get stuck in an elevator with their new partners.", cue: "Extremely awkward or uncomfortable.", when: "a situation feels painfully uncomfortable." },
  48: { situation: "A boy says he was home all night, but his own selfie shows him at the party.", cue: "Liars get caught quickly.", when: "a lie collapses fast." },
  49: { situation: "A man threatens to sue everyone every week but never actually does anything.", cue: "Loud threats often do not turn into action.", when: "someone makes noise but probably will not act." },
  50: { situation: "A student studies ten minutes every day and improves more than the friend who crams once a month.", cue: "Slowly and steadily, you go far.", when: "small consistent steps lead to progress." },
};

const storyQuizSeeds: StoryQuizSeed[] = [
  { storyNumber: 1, storyTitle: "The Festival Plan", storyId: "argentinian-sayings-1-the-festival-plan", sayingNumbers: [1, 2, 3, 4, 5] },
  { storyNumber: 2, storyTitle: "The Rooftop Party", storyId: "argentinian-sayings-2-the-rooftop-party", sayingNumbers: [6, 7, 8, 9, 10] },
  { storyNumber: 3, storyTitle: "The Market Scam", storyId: "argentinian-sayings-3-the-market-scam", sayingNumbers: [11, 12, 13, 14, 15] },
  { storyNumber: 4, storyTitle: "The Coworking Race", storyId: "argentinian-sayings-4-the-coworking-race", sayingNumbers: [16, 17, 18, 19, 20] },
  { storyNumber: 5, storyTitle: "The Secret Rehearsal", storyId: "argentinian-sayings-5-the-secret-rehearsal", sayingNumbers: [21, 22, 23, 24, 25] },
  { storyNumber: 6, storyTitle: "The Hidden Investor", storyId: "argentinian-sayings-6-the-hidden-investor", sayingNumbers: [26, 27, 28, 29, 30] },
  { storyNumber: 7, storyTitle: "The Asado Rescue", storyId: "argentinian-sayings-7-the-asado-rescue", sayingNumbers: [31, 32, 33, 34, 35] },
  { storyNumber: 8, storyTitle: "The Bogus Tour", storyId: "argentinian-sayings-8-the-bogus-tour", sayingNumbers: [36, 37, 38, 39, 40] },
  { storyNumber: 9, storyTitle: "The Family Bureaucracy", storyId: "argentinian-sayings-9-the-family-bureaucracy", sayingNumbers: [41, 42, 43, 44, 45] },
  { storyNumber: 10, storyTitle: "The Stage Comeback", storyId: "argentinian-sayings-10-the-stage-comeback", sayingNumbers: [46, 47, 48, 49, 50] },
];

function getSaying(number: number) {
  const saying = argentinianSayings.find((item) => item.number === number);
  if (!saying) throw new Error(`Missing Argentinian saying #${number}`);
  return saying;
}

function optionsFor(seed: StoryQuizSeed) {
  return seed.sayingNumbers.map((number) => getSaying(number).saying);
}

function blankLastWord(saying: string) {
  const words = saying.split(/\s+/);
  const punctuation = saying.match(/[.!?]+$/)?.[0] ?? "";
  const answer = words[words.length - 1].replace(/[.!?¡¿,;:]+$/g, "");
  words[words.length - 1] = `____${punctuation}`;
  return { promptText: words.join(" "), answer };
}

function multipleChoiceQuestion(seed: StoryQuizSeed, number: number, index: number): CheckpointQuestion {
  const saying = getSaying(number);
  const context = usageContexts[number];
  return {
    id: `argentinian-sayings-${seed.storyNumber}-mc-${index + 1}`,
    type: "multiple-choice",
    prompt: `Which saying fits this situation? ${context.situation}`,
    options: optionsFor(seed),
    correctAnswer: saying.saying,
    explanation: `${saying.saying} fits because ${context.cue.toLowerCase()}`,
    points: 1,
    skillTag: "saying-in-context",
  };
}

function trueFalseQuestion(seed: StoryQuizSeed, number: number, index: number): CheckpointQuestion {
  const saying = getSaying(number);
  const isCorrectUse = index % 2 === 0;
  const betterNumber = seed.sayingNumbers[(seed.sayingNumbers.indexOf(number) + 1) % seed.sayingNumbers.length];
  const contextNumber = isCorrectUse ? number : betterNumber;
  const context = usageContexts[contextNumber];
  const betterSaying = getSaying(contextNumber);

  return {
    id: `argentinian-sayings-${seed.storyNumber}-tf-${index + 1}`,
    type: "true-false",
    prompt: `True or false: "${saying.saying}" is the best saying for this situation. ${context.situation}`,
    options: ["True", "False"],
    correctAnswer: isCorrectUse ? "True" : "False",
    explanation: isCorrectUse
      ? `${saying.saying} is correct here because ${context.cue.toLowerCase()}`
      : `False. A better choice from this lesson is "${betterSaying.saying}" because ${context.cue.toLowerCase()}`,
    points: 1,
    skillTag: "use-or-not",
  };
}

function matchPairsQuestion(seed: StoryQuizSeed, index: number): CheckpointQuestion {
  const pairMode = index % 4;
  const pairs = seed.sayingNumbers.map((number) => {
    const saying = getSaying(number);
    const context = usageContexts[number];
    const right =
      pairMode === 0
        ? context.cue
        : pairMode === 1
          ? `Use when ${context.when}`
          : pairMode === 2
            ? context.situation
            : saying.explanation;

    return { left: saying.saying, right };
  });

  return {
    id: `argentinian-sayings-${seed.storyNumber}-match-${index + 1}`,
    type: "match-pairs",
    prompt: `Match each saying from Sayings Story ${seed.storyNumber} to the correct ${pairMode === 3 ? "meaning" : "situation cue"}.`,
    pairs,
    explanation: `These are the five sayings taught with Sayings Story ${seed.storyNumber}.`,
    points: 5,
    skillTag: "match-saying-context",
  };
}

function orderWordsQuestion(seed: StoryQuizSeed, number: number, index: number): CheckpointQuestion {
  const saying = getSaying(number);
  const context = usageContexts[number];

  return {
    id: `argentinian-sayings-${seed.storyNumber}-order-${index + 1}`,
    type: "order-words",
    prompt: `Order the saying that fits this situation: ${context.situation}`,
    nativePrompt: context.cue,
    wordBank: saying.saying.split(/\s+/),
    correctAnswer: saying.saying,
    explanation: `${saying.saying} is the saying that matches this context.`,
    points: 1,
    skillTag: "build-saying",
  };
}

function fillBlankQuestion(seed: StoryQuizSeed, number: number, index: number): CheckpointQuestion {
  const saying = getSaying(number);
  const context = usageContexts[number];
  const blank = blankLastWord(saying.saying);

  return {
    id: `argentinian-sayings-${seed.storyNumber}-blank-${index + 1}`,
    type: "fill-blank",
    prompt: `Complete the saying that fits this situation: ${context.situation}\n${blank.promptText}`,
    nativePrompt: context.cue,
    correctAnswer: blank.answer,
    correctAnswers: [blank.answer, blank.answer.toLowerCase()],
    explanation: `The full saying is "${saying.saying}"`,
    points: 1,
    skillTag: "complete-saying",
  };
}

function makeQuestions(seed: StoryQuizSeed): CheckpointQuestion[] {
  const numbers = seed.sayingNumbers;
  return [
    ...numbers.slice(0, 4).map((number, index) => multipleChoiceQuestion(seed, number, index)),
    ...numbers.slice(0, 4).map((number, index) => trueFalseQuestion(seed, number, index)),
    ...[0, 1, 2, 3].map((index) => matchPairsQuestion(seed, index)),
    ...numbers.slice(1, 5).map((number, index) => orderWordsQuestion(seed, number, index)),
    ...numbers.slice(0, 4).map((number, index) => fillBlankQuestion(seed, number, index)),
  ];
}

function makeQuiz(seed: StoryQuizSeed): CheckpointQuiz {
  const sayings = seed.sayingNumbers.map((number) => getSaying(number).saying);

  return {
    id: `argentinian-sayings-${seed.storyNumber}-usage-quiz`,
    title: `Sayings Quiz ${seed.storyNumber}`,
    subtitle: `Choose the right Argentinian saying for real-life situations from ${seed.storyTitle}.`,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "upper-intermediate",
    tags: ["Argentinian Sayings", "quiz", `sayings-${seed.sayingNumbers[0]}-${seed.sayingNumbers[4]}`],
    estimatedMinutes: 15,
    skoolSectionName: "Argentinian Sayings",
    relatedCourse: seed.storyId,
    activityType: "quiz",
    data: {
      description: `Practice these five sayings in new contexts: ${sayings.join("; ")}.`,
      passScore: 75,
      feedbackMode: "immediate",
      questions: makeQuestions(seed),
    },
  };
}

export const argentinianSayingsUsageQuizzes: CheckpointQuiz[] = storyQuizSeeds.map(makeQuiz);
