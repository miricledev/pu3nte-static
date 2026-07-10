import type { CheckpointQuestion, CheckpointQuiz } from "../../types";
import { colombianSayings } from "../stories/colombianSayingsTextingStories";

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
  1: {
    situation: "Your teammate keeps joining the planning chat only to criticize every idea without helping.",
    cue: "Someone is not helping and is getting in the way.",
    when: "a useless or negative contribution blocks the group.",
  },
  2: {
    situation: "A friend keeps sending discouraging comments about your project, but offers no useful advice.",
    cue: "Something does not add value and should not take value away.",
    when: "a person or action subtracts instead of helping.",
  },
  3: {
    situation: "Someone wants to leave an expensive phone alone on a café table while ordering.",
    cue: "Do not make yourself an easy target.",
    when: "someone is creating an unnecessary risk.",
  },
  4: {
    situation: "A seller gives a very weak excuse for charging double, and you clearly do not believe it.",
    cue: "That excuse is not believable.",
    when: "someone tries to sell you a lie or a bad excuse.",
  },
  5: {
    situation: "The owner of the small event disappears and expects everyone else to solve the problems.",
    cue: "Take care of your own responsibility.",
    when: "the person responsible for something needs to handle it.",
  },
  6: {
    situation: "A stranger offers you a brand-new laptop for almost nothing if you pay immediately.",
    cue: "It sounds too good to be true.",
    when: "a deal seems suspiciously generous.",
  },
  7: {
    situation: "Two friends are splitting costs for a trip and want every payment written down clearly.",
    cue: "Money and agreements should be clear.",
    when: "people need transparent accounts or expectations.",
  },
  8: {
    situation: "Someone gets the perfect job lead by accident right after worrying there were no options.",
    cue: "What is meant for you finds a way.",
    when: "luck or destiny seems to bring the right opportunity.",
  },
  9: {
    situation: "A new intern wants to lead the entire campaign on day one, but still needs practice.",
    cue: "That person is not ready yet.",
    when: "someone needs more experience before taking on a big role.",
  },
  10: {
    situation: "A friend is worried the last concert ticket will disappear, but the seller already promised to save it.",
    cue: "What is meant for you will be saved.",
    when: "someone needs patience because their opportunity is being held.",
  },
  11: {
    situation: "Your cousin says he finished a six-month course in two days and is now an expert.",
    cue: "That sounds unbelievable.",
    when: "a claim sounds exaggerated or suspicious.",
  },
  12: {
    situation: "You skipped breakfast and lunch, and now you feel like you could eat everything in the kitchen.",
    cue: "Someone is extremely hungry.",
    when: "hunger is dramatic and urgent.",
  },
  13: {
    situation: "After hiking for hours, everyone happily eats plain bread because there is nothing else.",
    cue: "When you really need something, you cannot be picky.",
    when: "need makes simple things acceptable.",
  },
  14: {
    situation: "A friend drops a wrapped arepa on a clean table, laughs, and eats it anyway.",
    cue: "A little dirt will not kill you.",
    when: "someone jokes about something being slightly dirty but harmless.",
  },
  15: {
    situation: "Someone wins a free cooking course but hates cooking and never attends.",
    cue: "A person gets an opportunity they cannot use.",
    when: "luck goes to someone who does not appreciate it.",
  },
  16: {
    situation: "A tourist exits the metro, walks the wrong way, and has no idea what neighborhood he is in.",
    cue: "Someone is completely lost.",
    when: "a person is very confused or disoriented.",
  },
  17: {
    situation: "A clever vendor tricks a naïve buyer into paying twice the normal price.",
    cue: "Sharp people take advantage of naïve people.",
    when: "someone street-smart exploits someone too trusting.",
  },
  18: {
    situation: "A friend posts her address publicly, then complains that strangers showed up.",
    cue: "You cannot create the risk and then complain.",
    when: "someone exposes themselves to a problem.",
  },
  19: {
    situation: "An employee never asks for the refund he deserves, so the company never gives it.",
    cue: "If you do not ask, you do not get.",
    when: "someone needs to speak up to receive something.",
  },
  20: {
    situation: "A teenager ignores every warning about a fake online store and loses his money.",
    cue: "Ignoring advice brings consequences.",
    when: "someone refuses good guidance.",
  },
  21: {
    situation: "You warned your coworker the deadline was today, so she cannot say nobody told her.",
    cue: "You were warned.",
    when: "someone had enough warning to avoid a problem.",
  },
  22: {
    situation: "The older neighbor solves the plumbing problem because he has seen the same issue for years.",
    cue: "Experience teaches more than cleverness.",
    when: "age and experience matter.",
  },
  23: {
    situation: "A student copies homework and later receives the penalty for cheating.",
    cue: "Actions have consequences.",
    when: "someone must pay for what they did.",
  },
  24: {
    situation: "The person who broke the printer acts nervous every time the manager asks about it.",
    cue: "Guilty people act nervous.",
    when: "someone fears being discovered because they did something wrong.",
  },
  25: {
    situation: "A coworker accidentally reveals the secret plan because he keeps talking too much.",
    cue: "Talking too much gets someone in trouble.",
    when: "someone exposes themselves with their own words.",
  },
  26: {
    situation: "You know a rumor, but saying it in the group chat could create a bigger fight.",
    cue: "Sometimes it is better to stay quiet.",
    when: "silence prevents problems.",
  },
  27: {
    situation: "An angry stranger insults your outfit online, and your friend tells you not to waste energy replying.",
    cue: "Ignore foolish comments.",
    when: "someone should not engage with nonsense or insults.",
  },
  28: {
    situation: "Everyone can see the business is failing, but the owner insists everything is perfect.",
    cue: "Someone refuses to see the obvious.",
    when: "the truth is visible but someone denies it.",
  },
  29: {
    situation: "Three people explain the danger, but your cousin refuses to listen to any warning.",
    cue: "Someone refuses to hear advice.",
    when: "a person chooses not to listen.",
  },
  30: {
    situation: "A team rushes all morning, makes mistakes, and ends exhausted without finishing faster.",
    cue: "Rushing only creates tiredness.",
    when: "speed creates stress instead of progress.",
  },
  31: {
    situation: "You already sent the wrong email to the client, so now you need to own it and fix it.",
    cue: "What is done is done; face it.",
    when: "someone must accept a mistake and move forward.",
  },
  32: {
    situation: "The outdoor party gets rain, but the hosts smile, move the music inside, and keep going.",
    cue: "Stay positive in difficulty.",
    when: "people need a good attitude during bad circumstances.",
  },
  33: {
    situation: "Your phone breaks, and then your charger disappears five minutes later.",
    cue: "One problem arrives on top of another.",
    when: "a bad situation gets an extra problem.",
  },
  34: {
    situation: "The small car is already full, and then two more relatives ask for a ride.",
    cue: "There were already too many problems or people, then another arrived.",
    when: "an already crowded situation becomes more crowded.",
  },
  35: {
    situation: "You miss the bus, spill coffee, and then it starts raining on you.",
    cue: "When luck is bad, everything goes wrong.",
    when: "a person is having a terrible run of bad luck.",
  },
  36: {
    situation: "Several people mention the same rumor about the restaurant closing, so you suspect there may be truth.",
    cue: "A rumor may have some truth behind it.",
    when: "repeated rumors point to something real.",
  },
  37: {
    situation: "A baker known for being late arrives on time, but everyone still assumes he will delay things.",
    cue: "A reputation keeps speaking for you.",
    when: "past fame or reputation shapes what people expect.",
  },
  38: {
    situation: "The person who always lies accuses everyone else of lying first.",
    cue: "People accuse others of what they do themselves.",
    when: "someone projects their own behavior onto others.",
  },
  39: {
    situation: "A designer misses the deadline and blames the computer, the chair, and the weather.",
    cue: "Incompetent people blame the tool.",
    when: "someone blames everything except their own work.",
  },
  40: {
    situation: "A manipulative client pressures only the newest employee because he knows she is afraid to say no.",
    cue: "People know who they can manipulate.",
    when: "someone targets a person they think is easier to pressure.",
  },
  41: {
    situation: "A man criticizes everyone for being messy, but his own desk is the messiest in the office.",
    cue: "People do not see their own flaws.",
    when: "someone notices others' defects but ignores their own.",
  },
  42: {
    situation: "A child negotiates prices exactly like her business-owner mother.",
    cue: "Children often resemble their parents.",
    when: "a child shows a parent's traits.",
  },
  43: {
    situation: "Your shy friend finally meets a group that loves the same strange board games.",
    cue: "Everyone has a place or person where they fit.",
    when: "someone finds the right match or environment.",
  },
  44: {
    situation: "One friend talks about plants for hours, another talks only about motorcycles, and both are happy.",
    cue: "Everyone has their own obsession.",
    when: "people each have their own favorite topic or way of being.",
  },
  45: {
    situation: "Each sibling chooses a different solution because each one has a different problem.",
    cue: "Everyone handles the problem that affects them.",
    when: "people act according to their own needs.",
  },
  46: {
    situation: "A shopper rejects every good apartment and finally has to take the worst one left.",
    cue: "Choosing too much can leave you with the worst option.",
    when: "someone is too picky and risks losing good choices.",
  },
  47: {
    situation: "A freelancer accepts six projects at once and cannot do any of them well.",
    cue: "Trying to do everything means doing little well.",
    when: "someone takes on too much at the same time.",
  },
  48: {
    situation: "A boy lies about finishing the report, but the teacher asks one question and exposes him.",
    cue: "Lies get exposed quickly.",
    when: "a lie is likely to fall apart fast.",
  },
  49: {
    situation: "The plan is simple, but someone keeps inventing extra problems that do not exist.",
    cue: "Do not overcomplicate things.",
    when: "someone creates unnecessary complications.",
  },
  50: {
    situation: "After a failure, the team refuses to go backward and chooses to keep improving.",
    cue: "Keep moving forward.",
    when: "someone needs determination and forward motion.",
  },
};

const storyQuizSeeds: StoryQuizSeed[] = [
  { storyNumber: 1, storyTitle: "The Pop-Up Problem", storyId: "colombian-sayings-1-clean-business", sayingNumbers: [1, 2, 3, 4, 5] },
  { storyNumber: 2, storyTitle: "The Dream Deal", storyId: "colombian-sayings-2-dream-deal", sayingNumbers: [6, 7, 8, 9, 10] },
  { storyNumber: 3, storyTitle: "The Market Mission", storyId: "colombian-sayings-3-market-hunger", sayingNumbers: [11, 12, 13, 14, 15] },
  { storyNumber: 4, storyTitle: "The Lost Tourist", storyId: "colombian-sayings-4-lost-phone", sayingNumbers: [16, 17, 18, 19, 20] },
  { storyNumber: 5, storyTitle: "The Office Leak", storyId: "colombian-sayings-5-office-leak", sayingNumbers: [21, 22, 23, 24, 25] },
  { storyNumber: 6, storyTitle: "The Neighborhood Chat", storyId: "colombian-sayings-6-neighborhood-chat", sayingNumbers: [26, 27, 28, 29, 30] },
  { storyNumber: 7, storyTitle: "The Event Disaster", storyId: "colombian-sayings-7-event-disaster", sayingNumbers: [31, 32, 33, 34, 35] },
  { storyNumber: 8, storyTitle: "The Influencer Rumor", storyId: "colombian-sayings-8-influencer-rumor", sayingNumbers: [36, 37, 38, 39, 40] },
  { storyNumber: 9, storyTitle: "The Family Match", storyId: "colombian-sayings-9-family-dating", sayingNumbers: [41, 42, 43, 44, 45] },
  { storyNumber: 10, storyTitle: "The Focus Sprint", storyId: "colombian-sayings-10-startup-focus", sayingNumbers: [46, 47, 48, 49, 50] },
];

function getSaying(number: number) {
  const saying = colombianSayings.find((item) => item.number === number);
  if (!saying) throw new Error(`Missing Colombian saying #${number}`);
  return saying;
}

function optionsFor(seed: StoryQuizSeed) {
  return seed.sayingNumbers.map((number) => getSaying(number).saying);
}

function blankLastWord(saying: string) {
  const words = saying.split(/\s+/);
  const lastWord = words[words.length - 1].replace(/[.!?¡¿,;:]+$/g, "");
  words[words.length - 1] = "____" + (saying.endsWith(".") ? "." : saying.endsWith("!") ? "!" : "");
  return { promptText: words.join(" "), answer: lastWord };
}

function wordBankFor(saying: string) {
  return saying.split(/\s+/);
}

function multipleChoiceQuestion(seed: StoryQuizSeed, number: number, index: number): CheckpointQuestion {
  const saying = getSaying(number);
  const context = usageContexts[number];
  return {
    id: `colombian-sayings-${seed.storyNumber}-mc-${index + 1}`,
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
  const sameSet = seed.sayingNumbers;
  const isCorrectUse = index % 2 === 0;
  const betterNumber = sameSet[(sameSet.indexOf(number) + 1) % sameSet.length];
  const contextNumber = isCorrectUse ? number : betterNumber;
  const context = usageContexts[contextNumber];
  const betterSaying = getSaying(contextNumber);

  return {
    id: `colombian-sayings-${seed.storyNumber}-tf-${index + 1}`,
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
    id: `colombian-sayings-${seed.storyNumber}-match-${index + 1}`,
    type: "match-pairs",
    prompt: `Match each saying from Story ${seed.storyNumber} to the correct ${pairMode === 3 ? "meaning" : "situation cue"}.`,
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
    id: `colombian-sayings-${seed.storyNumber}-order-${index + 1}`,
    type: "order-words",
    prompt: `Order the saying that fits this situation: ${context.situation}`,
    nativePrompt: context.cue,
    wordBank: wordBankFor(saying.saying),
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
    id: `colombian-sayings-${seed.storyNumber}-blank-${index + 1}`,
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
    id: `colombian-sayings-${seed.storyNumber}-usage-quiz`,
    title: `Sayings Story ${seed.storyNumber} | Usage Quiz`,
    subtitle: `Choose the right Colombian saying for real-life situations from ${seed.storyTitle}.`,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "upper-intermediate",
    tags: ["Colombian Sayings", "quiz", `sayings-${seed.sayingNumbers[0]}-${seed.sayingNumbers[4]}`],
    estimatedMinutes: 15,
    skoolSectionName: "Colombian Sayings",
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

export const colombianSayingsUsageQuizzes: CheckpointQuiz[] = storyQuizSeeds.map(makeQuiz);
