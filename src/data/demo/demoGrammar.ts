import type { GrammarMasteryLesson } from "../../types";

// Demo only. Future grammar lessons should add objects with this same GrammarMasteryLesson shape.
export const demoGrammarLessons: GrammarMasteryLesson[] = [
  {
    id: "demo-spanish-ser-estar",
    title: "Demo: Ser vs Estar",
    subtitle: "A tiny grammar flow for identity vs state.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "grammar", "ser", "estar"],
    estimatedMinutes: 6,
    activityType: "grammar",
    data: {
      grammarTopic: "Ser vs Estar",
      grammarFamily: "Spanish verbs",
      intro: {
        shortExplanation: "Use ser for identity and stable descriptions. Use estar for states, feelings, and location.",
        pattern: "ser = identity/origin/essential description · estar = state/location/condition",
        quickRules: ["Soy estudiante = identity.", "Estoy cansado = temporary state.", "Estoy en casa = location."],
        examples: [
          {
            targetText: "Soy Ana.",
            translation: "I am Ana.",
            note: "Identity uses ser.",
            highlightedParts: [{ text: "Soy", label: "ser", explanation: "Soy identifies who the person is." }],
          },
          {
            targetText: "Estoy cansada.",
            translation: "I am tired.",
            note: "A current feeling uses estar.",
            highlightedParts: [{ text: "Estoy", label: "estar", explanation: "Estoy describes a current state." }],
          },
        ],
        commonMistakes: [
          { wrong: "Soy cansado.", correct: "Estoy cansado.", explanation: "Tired is a state, so use estar." },
        ],
      },
      sections: [
        {
          id: "recognise",
          title: "Recognise the Pattern",
          instructions: "Choose why the sentence uses ser or estar.",
          type: "choose-explanation",
          showExplanations: "immediate",
          items: [
            {
              id: "se1",
              prompt: "Why do we use ser in: Soy profesor?",
              options: ["Profession / identity", "Temporary mood", "Location"],
              correctOption: "Profession / identity",
              explanation: "Professions and identity use ser.",
              skillTag: "recognition",
              grammarFocus: "ser identity",
            },
            {
              id: "se2",
              prompt: "Why do we use estar in: Estoy en casa?",
              options: ["Location", "Origin", "Permanent identity"],
              correctOption: "Location",
              explanation: "Location uses estar, even when the place is not temporary.",
              skillTag: "recognition",
              grammarFocus: "estar location",
            },
          ],
        },
        {
          id: "produce",
          title: "Produce the Form",
          instructions: "Write the natural Spanish sentence.",
          type: "mini-translation",
          showExplanations: "immediate",
          items: [
            {
              id: "se3",
              prompt: "Translate: I am tired.",
              targetAnswer: "Estoy cansado.",
              acceptedAnswers: ["estoy cansado", "estoy cansada"],
              explanation: "A current feeling uses estar.",
              skillTag: "production",
              grammarFocus: "estar state",
            },
            {
              id: "se4",
              prompt: "Correct the sentence: Soy en casa.",
              sourceSentence: "Soy en casa.",
              targetAnswer: "Estoy en casa.",
              acceptedAnswers: ["estoy en casa"],
              explanation: "Location uses estar.",
              skillTag: "correction",
              grammarFocus: "estar location",
            },
          ],
        },
      ],
      finalChallenge: {
        id: "final",
        title: "Mixed Challenge",
        instructions: "Build the final sentence from the tiles.",
        type: "word-order",
        items: [
          {
            id: "se5",
            prompt: "Build: I am in the house.",
            words: ["Estoy", "en", "la", "casa"],
            targetAnswer: "Estoy en la casa",
            explanation: "Location uses estar.",
            skillTag: "word-order",
            grammarFocus: "estar location",
          },
        ],
      },
      completionMessage: "Now use ser/estar in your Skool speaking task.",
    },
  },
  {
    id: "demo-english-present-simple",
    title: "Demo: Presente simple",
    subtitle: "Una práctica corta para hábitos, rutinas y verdades generales en inglés.",
    languageTarget: "english",
    learnerNativeLanguage: "spanish",
    level: "beginner",
    tags: ["demo", "grammar", "present simple"],
    estimatedMinutes: 5,
    activityType: "grammar",
    data: {
      grammarTopic: "Present Simple",
      grammarFamily: "English tenses",
      intro: {
        shortExplanation: "Usa el presente simple en inglés para hábitos, rutinas, hechos y verdades generales.",
        pattern: "I/you/we/they work · he/she/it works · las preguntas suelen usar do/does",
        quickRules: ["Agrega -s con he/she/it.", "Usa do/does para muchas preguntas.", "Úsalo para rutinas y hechos generales."],
        examples: [
          {
            targetText: "She works every day.",
            translation: "Ella trabaja todos los días.",
            highlightedParts: [{ text: "works", label: "he/she/it + s", explanation: "Con he/she/it normalmente se agrega -s." }],
          },
          {
            targetText: "Do you like coffee?",
            translation: "¿Te gusta el café?",
            highlightedParts: [{ text: "Do", label: "auxiliar de pregunta", explanation: "Usa do para formar muchas preguntas en presente simple." }],
          },
        ],
        commonMistakes: [
          { wrong: "She work every day.", correct: "She works every day.", explanation: "Con he/she/it necesitas la forma con -s." },
        ],
      },
      sections: [
        {
          id: "form",
          title: "Elige la forma",
          instructions: "Escoge la forma correcta del presente simple.",
          type: "multiple-choice",
          items: [
            {
              id: "ps1",
              prompt: "Completa la frase: She ___ English every day.",
              options: ["studies", "study", "studying"],
              correctOption: "studies",
              explanation: "She usa la forma de tercera persona singular: studies.",
              skillTag: "forma",
              grammarFocus: "third person s",
            },
            {
              id: "ps2",
              prompt: "Completa la pregunta: ___ you like coffee?",
              options: ["Do", "Does", "Are"],
              correctOption: "Do",
              explanation: "Usa do con you en preguntas del presente simple.",
              skillTag: "preguntas",
              grammarFocus: "do support",
            },
          ],
        },
        {
          id: "transform",
          title: "Transforma la frase",
          instructions: "Cambia la frase siguiendo la instrucción.",
          type: "negative-question-transform",
          items: [
            {
              id: "ps3",
              prompt: "Escribe esta frase en negativo: I like tea.",
              sourceSentence: "I like tea.",
              targetAnswer: "I do not like tea.",
              acceptedAnswers: ["i do not like tea", "i don't like tea"],
              explanation: "Usa do not / don't antes del verbo base.",
              skillTag: "negativo",
              grammarFocus: "do not",
            },
          ],
        },
      ],
      finalChallenge: {
        id: "final",
        title: "Reto mixto",
        instructions: "Une cada forma con su uso.",
        type: "match-pairs",
        items: [
          {
            id: "ps4",
            prompt: "Une cada frase con la idea gramatical correcta.",
            pairs: [
              { left: "She works.", right: "he/she/it + s" },
              { left: "Do you work?", right: "pregunta en presente simple" },
            ],
            explanation: "El presente simple cambia según el sujeto y la estructura de pregunta.",
            skillTag: "repaso",
            grammarFocus: "present simple forms",
          },
        ],
      },
      completionMessage: "Ahora usa el presente simple en tu tarea de speaking en Skool.",
    },
  },
];
