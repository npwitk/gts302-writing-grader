// GTS302 Writing Rubric Data Structure

export const RUBRIC_CATEGORIES = {
  CONTENT: 'Content/Task',
  STRUCTURE: 'Structure',
  LANGUAGE: 'Language'
};

export const SCORE_DESCRIPTORS = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
};

export const RUBRIC = {
  [RUBRIC_CATEGORIES.CONTENT]: {
    maxScore: 5,
    criteria: {
      content: 'Is everything included and is it relevant? Is minimum word count met?',
      format: 'How is the text organized visually in terms of whitespace/margins/graphics/layout?',
      task: 'Was the question answered properly? Is it the right type of text? Overall how well was it answered?'
    },
    descriptors: {
      1: {
        title: 'Very Poor',
        content: 'Severely incomprehensive and/or irrelevant.',
        format: 'Seriously incorrect.',
        task: 'Clearly misunderstood / not achieved.'
      },
      2: {
        title: 'Poor',
        content: 'Significantly incomprehensive and/or irrelevant.',
        format: 'Some obvious issues.',
        task: 'Partially misunderstood/achieved.'
      },
      3: {
        title: 'Average',
        content: 'Minor issues only with comprehensiveness and relevance.',
        format: 'Adequate.',
        task: 'Adequately understood / achieved.'
      },
      4: {
        title: 'Good',
        content: 'Relevant and comprehensive.',
        format: 'Correct or very minor issues.',
        task: 'Well understood / achieved.'
      },
      5: {
        title: 'Excellent',
        content: 'Fully relevant and comprehensive.',
        format: 'Fully correct and very well executed.',
        task: 'Very well understood / achieved.'
      }
    }
  },
  [RUBRIC_CATEGORIES.STRUCTURE]: {
    maxScore: 5,
    criteria: {
      primary: 'Is primary structure correct (minimum score of 3)?',
      secondary: 'Is secondary structure correct (if all correct 5)?'
    },
    descriptors: {
      1: {
        title: 'Very Poor',
        description: 'Serious errors in primary and secondary structure indicate a clear misunderstanding of this text type.'
      },
      2: {
        title: 'Poor',
        description: 'Some understanding of text type is apparent, but at least one serious error in primary structure remains.'
      },
      3: {
        title: 'Average',
        description: 'Primary structure is correct or almost correct, but clear errors or inadequacies in secondary structure remain.'
      },
      4: {
        title: 'Good',
        description: 'Primary structure is correct. Some errors in secondary structure remain.'
      },
      5: {
        title: 'Excellent',
        description: 'Primary and secondary structure correct for this text type.'
      }
    }
  },
  [RUBRIC_CATEGORIES.LANGUAGE]: {
    maxScore: 5,
    criteria: {
      meaning: 'Is everything understandable (minimum 3)?',
      accuracy: 'Number and type of grammar mistakes. How many mistakes are there? Are they major (tense/verb forms) or minor (plurals, prepositions, determiners)?'
    },
    descriptors: {
      1: {
        title: 'Very Poor',
        description: 'Poor level of English throughout such that meaning is generally unclear or indiscernible.'
      },
      2: {
        title: 'Poor',
        description: 'Serious issues with English that sometimes interfere with meaning.'
      },
      3: {
        title: 'Average',
        description: 'Frequent issues with accuracy, but meaning is discernible throughout.'
      },
      4: {
        title: 'Good',
        description: 'A few issues with accuracy, and meaning is clear throughout.'
      },
      5: {
        title: 'Excellent',
        description: 'Meaning is fully clear, and accuracy is perfect or close to perfect.'
      }
    }
  }
};

export const TEXT_TYPES = {
  LAB_REPORT: 'Science Lab Report',
  INSTRUCTIONS: 'Instructions',
  PROGRESS_REPORT: 'Progress Report'
};

// Minimum word count
export const MIN_WORD_COUNT = 150;
