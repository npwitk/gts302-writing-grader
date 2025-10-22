import { useState } from 'react';
import Header from './components/Header';
import ApiKeyInput from './components/ApiKeyInput';
import TextTypeSelector from './components/TextTypeSelector';
import TextInput from './components/TextInput';
import ResultsDisplay from './components/ResultsDisplay';
import PracticeMode from './components/PracticeMode';
import { TEXT_TYPES } from './data/rubric';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [textType, setTextType] = useState(TEXT_TYPES.LAB_REPORT);
  const [userText, setUserText] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [results, setResults] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleApiKeyChange = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('openai_api_key', key);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  };

  const handleGradeSubmission = async () => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key first.');
      return;
    }

    if (!userText.trim()) {
      alert('Please enter your text to grade.');
      return;
    }

    setIsGrading(true);
    setResults(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: getSystemPrompt(textType)
            },
            {
              role: 'user',
              content: `Please grade the following ${textType} according to the GTS302 rubric:\n\n${userText}`
            }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to grade text');
      }

      const data = await response.json();
      const gradingResult = JSON.parse(data.choices[0].message.content);
      setResults(gradingResult);
    } catch (error) {
      console.error('Error grading text:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* API Key Input */}
          <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />

          {/* Text Type Selector */}
          <TextTypeSelector textType={textType} onTextTypeChange={setTextType} />

          {/* Practice Mode */}
          <PracticeMode
            textType={textType}
            apiKey={apiKey}
            onGenerateTopic={setCurrentTopic}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Text Input */}
            <div className="space-y-6">
              <TextInput
                userText={userText}
                onTextChange={setUserText}
                textType={textType}
                onGrade={handleGradeSubmission}
                isGrading={isGrading}
                currentTopic={currentTopic}
              />
            </div>

            {/* Right Column: Results Only */}
            <div className="space-y-6">
              {results && <ResultsDisplay results={results} />}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>GTS302 Technical Writing - Writing Assessment Tool</p>
          <p className="mt-2">This tool uses your OpenAI API key to grade writing according to course rubrics.</p>
          <p className="mt-1 text-xs text-gray-500">Your API key is stored locally and never sent to any server except OpenAI.</p>
        </div>
      </footer>
    </div>
  );
}

// Generate system prompt based on text type
function getSystemPrompt(textType) {
  const basePrompt = `You are an expert grader for GTS302 Technical Writing course. Your task is to grade student writing according to the official course rubric.

The rubric has three main categories, each scored 1-5:
1. CONTENT/TASK (5 points): Comprehensiveness, relevance, format, task understanding
2. STRUCTURE (5 points): Primary and secondary structure correctness
3. LANGUAGE (5 points): Clarity of meaning and grammatical accuracy

TOTAL SCORE: Out of 15 points

For each category, provide:
- A score (1-5)
- Specific feedback explaining the score
- Strengths identified
- Areas for improvement

Your response MUST be a valid JSON object with this exact structure:
{
  "contentScore": number (1-5),
  "contentFeedback": "detailed feedback string",
  "contentStrengths": ["strength 1", "strength 2"],
  "contentImprovements": ["improvement 1", "improvement 2"],

  "structureScore": number (1-5),
  "structureFeedback": "detailed feedback string",
  "structureStrengths": ["strength 1", "strength 2"],
  "structureImprovements": ["improvement 1", "improvement 2"],

  "languageScore": number (1-5),
  "languageFeedback": "detailed feedback string",
  "languageStrengths": ["strength 1", "strength 2"],
  "languageImprovements": ["improvement 1", "improvement 2"],

  "totalScore": number (out of 15),
  "overallFeedback": "overall summary string",
  "wordCount": number
}`;

  const textTypeSpecificPrompts = {
    [TEXT_TYPES.LAB_REPORT]: `
Text Type: Science Lab Report

REQUIRED PRIMARY STRUCTURE (TIMMRDC):
1. Title (phrase, not sentence; title case; no articles)
2. Introduction (format: "The purpose of this experiment is to {verb}...")
3. Materials and Equipment (list of noun phrases; precise measurements)
4. Method (past tense; passive voice; no "I/we"; precise)
5. Results (observable facts only; no interpretation; may include graphics)
6. Discussion (explain WHY; compare to theories; comment on methods)
7. Conclusion (link to purpose; interpret data; state discoveries)

CRITICAL REQUIREMENTS:
- Method section MUST use past passive voice (was/were + past participle)
- Results MUST be objective facts only (no bias, emotion, or interpretation)
- Results and Conclusions are DIFFERENT (results = what you see; conclusions = what it means)
- Title must be a phrase, NOT a sentence
- NO use of "I" or "we" anywhere

Grading Focus:
- Content: Are all sections present? Is content relevant? Minimum 150 words?
- Structure: Primary structure correct (at least 3/5)? Secondary structure (logical connections, proper paragraph structure)?
- Language: Past passive in Method? Clear meaning? Major errors (tense/verbs) vs minor (prepositions/articles)?`,

    [TEXT_TYPES.INSTRUCTIONS]: `
Text Type: Instructions

REQUIRED PRIMARY STRUCTURE:
1. Title (simple, clear; "How to..." OR "Gerund + Object" format)
2. Steps (chronological; imperative mood; one action per step)

OPTIONAL SECONDARY STRUCTURE (improves content score):
- Introduction (brief, uses words: steps/procedure/process/directions)
- Graphics (correspond to steps; placed appropriately)
- Hazard Alerts (CAUTION/WARNING/DANGER in ALL CAPS BOLD before dangerous steps)

CRITICAL REQUIREMENTS for STEPS:
- Use imperative mood (command verb + object)
- Start with verb OR dependent clause/phrase + verb
- ONE action per step (unless simultaneous)
- Short sentences
- May include sub-steps if needed
- May include explanations after steps (why, what happens, details, what NOT to do)

For RECIPE type:
- MUST include ingredients list before steps
- Should have equipment list
- At least 8 steps expected
- At least 2 explanations expected
- At least 1 graphic expected
- At least 1 CAUTION expected

Grading Focus:
- Content: All elements included? Relevant? Good visual layout? Appropriate graphics?
- Structure: Primary correct? Steps in logical order? Proper use of sub-steps and explanations?
- Language: Imperative mood used correctly? Clear vocabulary? Grammar accuracy?`,

    [TEXT_TYPES.PROGRESS_REPORT]: `
Text Type: Progress Report

REQUIRED FORMAT: Memo format
- To: (recipients)
- From: (writer)
- Date: (report date)
- Subject: (report number and topic)

REQUIRED PRIMARY STRUCTURE:
1. Introduction (NO heading)
   - State report topic
   - Indicate which report number this is
   - Describe the project
   - Give reporting period
   - State purpose
   - Outline report

2. Work Completed (WITH heading including period: "WORK COMPLETED (dates)")
   - What has been done
   - Use PAST TENSE
   - Use subheadings if 2+ categories
   - Be specific and clear

3. Work Scheduled (WITH heading: "WORK SCHEDULED")
   - What needs to be done next
   - Use FUTURE TENSE
   - Be specific

4. Problems/Projections (WITH heading: "PROBLEMS / PROJECTIONS")
   - Explain difficulties
   - Give revised completion date if delayed
   - MUST state estimated completion date in final sentence

CRITICAL REQUIREMENTS:
- Must use memo format
- Correct verb tenses for each section (past for completed, future for scheduled)
- Must include reporting period in Work Completed heading
- Must state completion date in Problems/Projections
- Be specific and clear (not vague like "enough" or "new machine" but precise details)

Grading Focus:
- Content: Memo format? Sufficient specific details? Good use of white space?
- Structure: All four sections present? Correct headings? Proper subheadings if needed?
- Language: Correct verb tenses? Subject-verb agreement? Clear meaning? Grammar accuracy?`
  };

  return basePrompt + '\n\n' + (textTypeSpecificPrompts[textType] || '');
}

export default App;
