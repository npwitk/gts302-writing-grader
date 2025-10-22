// Detailed structure requirements for each text type

export const LAB_REPORT_STRUCTURE = {
  name: 'Science Lab Report',
  mnemonic: 'TIMMRDC',
  primaryStructure: [
    {
      name: 'Title',
      required: true,
      requirements: [
        'Never a complete sentence (must be a phrase)',
        'Articles (a, an, the) are usually omitted',
        'Use correct title case capitalization',
        'Clearly and briefly indicate what the report is about'
      ]
    },
    {
      name: 'Introduction',
      required: true,
      requirements: [
        'Standard format: "The purpose of this experiment is {infinitive verb}..."',
        'Use infinitive verb (to + verb) as the object',
        'Clearly state the experimental purpose'
      ]
    },
    {
      name: 'Materials and Equipment',
      required: true,
      requirements: [
        'Write as a list of items (noun phrases)',
        'Be precise with measurements and specifications',
        'List items as noun phrases, not complete sentences',
        'Equipment NEVER has an "s" on the end',
        'Use columns to save space if necessary'
      ]
    },
    {
      name: 'Method',
      required: true,
      requirements: [
        'Include all information required for exact repetition',
        'Do NOT write instructions to the reader',
        'Use past tense (lab is already finished)',
        'Maintain objectivity using passive voice verbs',
        'Do NOT use "I" or "we"',
        'Use precise measurements',
        'Formula: was/were + past participle'
      ]
    },
    {
      name: 'Results',
      required: true,
      requirements: [
        'Focus on observable data only (the FACTS)',
        'Include graphics (tables, charts, diagrams) to show results',
        'Maintain objectivity - describe facts without bias or emotion',
        'NO interpretation in this section',
        'Results ≠ Conclusions'
      ]
    },
    {
      name: 'Discussion',
      required: true,
      requirements: [
        'Include comments, explanation, and ideas about the results',
        'Explain WHY you got the results',
        'Compare results to existing theories',
        'Comment on the suitability of methods used',
        'Apply knowledge and reasoning to the evidence'
      ]
    },
    {
      name: 'Conclusion',
      required: true,
      requirements: [
        'Link back to the purpose/introduction',
        'Interpret the data and explain what the facts mean',
        'Comment on success or lack of success of experiment',
        'State what scientific discoveries were made',
        'Explain what was learned',
        'Add closing thoughts or suggestions for further study'
      ]
    }
  ],
  secondaryStructure: [
    'Proper use of past tense and passive voice in Method section',
    'Logical connections between sentences',
    'Proper paragraph structure',
    'Clear separation between observable results and interpretations',
    'Appropriate use of graphics and visual aids'
  ],
  commonMistakes: [
    'Using active voice or present tense in Method section',
    'Including interpretation in Results section',
    'Title as a complete sentence',
    'Using "I" or "we" in the report',
    'Not linking Conclusion back to Introduction',
    'Confusing results with conclusions'
  ]
};

export const INSTRUCTIONS_STRUCTURE = {
  name: 'Instructions',
  primaryStructure: [
    {
      name: 'Title',
      required: true,
      requirements: [
        'Simple and clear',
        'Tell the reader exactly what the instructions are about',
        'Two formats: "How to..." OR "Gerund (-ing) + Object"'
      ]
    },
    {
      name: 'Steps',
      required: true,
      requirements: [
        'Chronological order',
        'Use imperative mood (command verb + object)',
        'Start with imperative verb OR dependent clause/phrase + imperative',
        'One action per step (exception: two if simultaneous)',
        'Short sentences',
        'Include sufficient, precise details',
        'May include sub-steps if major step is too broad',
        'May include explanations after steps (why, what will happen, more details, what not to do, quick definitions)'
      ]
    }
  ],
  secondaryStructure: [
    {
      name: 'Introduction',
      optional: true,
      requirements: [
        'Inform reader briefly about the process',
        'May include: background, purpose, scope, organization, advice',
        'Use words like: steps, procedure, process, directions, instructions'
      ]
    },
    {
      name: 'Graphics',
      optional: true,
      requirements: [
        'Help readers do the steps',
        'Make each graphic correspond to specific step(s)',
        'Let reader know when to look at each graphic',
        'Place graphic next to the step or refer to it in text',
        'Include plenty of white space',
        'Do NOT include useless or confusing graphics'
      ]
    },
    {
      name: 'Hazard Alerts',
      optional: true,
      requirements: [
        'CAUTION: Reader could damage equipment (place before dangerous step)',
        'WARNING: Reader could get hurt (place before dangerous step)',
        'DANGER: Life-threatening situations',
        'Write in ALL CAPS and BOLDFACE',
        'Place BEFORE the reader makes the mistake',
        'Explain WHY it is dangerous',
        'Use text boxes and white space',
        'Be clear and concise'
      ]
    }
  ],
  recipeSpecific: {
    required: ['Ingredients list before steps'],
    optional: ['Equipment list', 'Introduction', 'Graphics'],
    notes: 'At least 8 steps, at least 2 explanations, at least 1 graphic, at least 1 CAUTION for recipe assignments'
  },
  commonMistakes: [
    'Not using imperative mood in steps',
    'Including multiple actions in one step',
    'Confusing instructions with tips/advice',
    'Poor visual layout',
    'Missing or incorrectly placed hazard alerts',
    'Complicated safety information sentences'
  ]
};

export const PROGRESS_REPORT_STRUCTURE = {
  name: 'Progress Report',
  format: 'Memo format',
  memoHeader: {
    required: true,
    elements: ['To:', 'From:', 'Date:', 'Subject:']
  },
  primaryStructure: [
    {
      name: 'Introduction',
      required: true,
      requirements: [
        'No heading for introduction',
        'State report topic',
        'Indicate which progress report this is (e.g., "third progress report")',
        'Describe the project being reported on',
        'Give the reporting period',
        'State the purpose of the report',
        'Outline what the report will cover'
      ]
    },
    {
      name: 'Work Completed',
      required: true,
      requirements: [
        'Include heading with report period (e.g., "WORK COMPLETED (September 1 – October 21, 2025)")',
        'Cover what has been done during this reporting period',
        'Use past tense verbs (simple past or present perfect)',
        'Use subheadings if work falls under 2+ categories',
        'Be specific and clear with details'
      ]
    },
    {
      name: 'Work Scheduled',
      required: true,
      requirements: [
        'Include heading: "WORK SCHEDULED"',
        'Cover work yet to be done',
        'Use future tense verbs',
        'Describe next steps to finish the project',
        'Use subheadings if needed',
        'Be specific about planned activities'
      ]
    },
    {
      name: 'Problems/Projections',
      required: true,
      requirements: [
        'Include heading: "PROBLEMS / PROJECTIONS"',
        'Explain any difficulties that may affect the project',
        'Give revised completion date if problems caused delay',
        'MUST state estimated completion date of entire project in final sentence',
        'Describe actual or potential problems, delays, or changes',
        'Be honest about challenges faced'
      ]
    }
  ],
  secondaryStructure: [
    'Proper use of white space and block paragraphs',
    'Use of subheadings to organize content',
    'Logical flow between sections',
    'Specific and clear details throughout',
    'Appropriate verb tenses for each section'
  ],
  styleTips: [
    'Be specific and clear (e.g., "Fill your tires to 32 pounds per square inch" not "Put enough air in your tires")',
    'Provide enough detail (e.g., include department, model, price, date, purpose when mentioning equipment)',
    'Make it easy to understand, accurate, and include all important information'
  ],
  commonMistakes: [
    'Not using memo format',
    'Wrong verb tenses in sections',
    'Vague or unclear details',
    'Not stating completion date in Problems/Projections',
    'Missing reporting period in Work Completed heading',
    'Poor use of white space and formatting'
  ]
};

export const TEXT_TYPE_STRUCTURES = {
  'Science Lab Report': LAB_REPORT_STRUCTURE,
  'Instructions': INSTRUCTIONS_STRUCTURE,
  'Progress Report': PROGRESS_REPORT_STRUCTURE
};
