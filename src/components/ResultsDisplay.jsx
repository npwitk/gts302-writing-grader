export default function ResultsDisplay({ results }) {
  const getScoreColor = (score) => {
    if (score === 5) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score === 4) return 'bg-green-100 text-green-800 border-green-300';
    if (score === 3) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (score === 2) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getScoreLabel = (score) => {
    if (score === 5) return 'Excellent';
    if (score === 4) return 'Good';
    if (score === 3) return 'Average';
    if (score === 2) return 'Poor';
    return 'Very Poor';
  };

  const getTotalScoreColor = (total) => {
    const percentage = (total / 15) * 100;
    if (percentage >= 90) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (percentage >= 75) return 'bg-green-100 text-green-800 border-green-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (percentage >= 50) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>✅</span>
        Grading Results
      </h2>

      {/* Total Score */}
      <div className={`rounded-lg p-6 mb-6 border-2 ${getTotalScoreColor(results.totalScore)}`}>
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">
            {results.totalScore}/15
          </div>
          <div className="text-lg font-semibold">
            {((results.totalScore / 15) * 100).toFixed(1)}%
          </div>
          {results.wordCount && (
            <div className="text-sm mt-2 opacity-80">
              Word Count: {results.wordCount}
            </div>
          )}
        </div>
      </div>

      {/* Overall Feedback */}
      {results.overallFeedback && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span>💬</span>
            Overall Feedback
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {results.overallFeedback}
          </p>
        </div>
      )}

      {/* Detailed Scores */}
      <div className="space-y-4">
        {/* Content Score */}
        <CategoryScore
          title="Content/Task"
          score={results.contentScore}
          feedback={results.contentFeedback}
          strengths={results.contentStrengths}
          improvements={results.contentImprovements}
          getScoreColor={getScoreColor}
          getScoreLabel={getScoreLabel}
        />

        {/* Structure Score */}
        <CategoryScore
          title="Structure"
          score={results.structureScore}
          feedback={results.structureFeedback}
          strengths={results.structureStrengths}
          improvements={results.structureImprovements}
          getScoreColor={getScoreColor}
          getScoreLabel={getScoreLabel}
        />

        {/* Language Score */}
        <CategoryScore
          title="Language"
          score={results.languageScore}
          feedback={results.languageFeedback}
          strengths={results.languageStrengths}
          improvements={results.languageImprovements}
          getScoreColor={getScoreColor}
          getScoreLabel={getScoreLabel}
        />
      </div>

      {/* Download/Print Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
        <button
          onClick={() => window.print()}
          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors"
        >
          🖨️ Print Results
        </button>
        <button
          onClick={() => {
            const resultsText = formatResultsAsText(results);
            navigator.clipboard.writeText(resultsText);
            alert('Results copied to clipboard!');
          }}
          className="flex-1 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md font-medium transition-colors"
        >
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

function CategoryScore({
  title,
  score,
  feedback,
  strengths,
  improvements,
  getScoreColor,
  getScoreLabel,
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className={`px-4 py-2 rounded-full font-bold border-2 ${getScoreColor(score)}`}>
          {score}/5 - {getScoreLabel(score)}
        </div>
      </div>

      {feedback && (
        <div className="mb-3">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback}</p>
        </div>
      )}

      {strengths && strengths.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-green-700 mb-1">✅ Strengths:</p>
          <ul className="text-xs text-green-800 space-y-1 list-disc list-inside ml-2">
            {strengths.map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {improvements && improvements.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-orange-700 mb-1">📈 Areas for Improvement:</p>
          <ul className="text-xs text-orange-800 space-y-1 list-disc list-inside ml-2">
            {improvements.map((improvement, idx) => (
              <li key={idx}>{improvement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function formatResultsAsText(results) {
  return `
GTS302 WRITING ASSESSMENT RESULTS
==================================

TOTAL SCORE: ${results.totalScore}/15 (${((results.totalScore / 15) * 100).toFixed(1)}%)
Word Count: ${results.wordCount}

OVERALL FEEDBACK:
${results.overallFeedback}

---

CONTENT/TASK: ${results.contentScore}/5
${results.contentFeedback}

Strengths:
${results.contentStrengths?.map((s) => `- ${s}`).join('\n') || 'N/A'}

Areas for Improvement:
${results.contentImprovements?.map((i) => `- ${i}`).join('\n') || 'N/A'}

---

STRUCTURE: ${results.structureScore}/5
${results.structureFeedback}

Strengths:
${results.structureStrengths?.map((s) => `- ${s}`).join('\n') || 'N/A'}

Areas for Improvement:
${results.structureImprovements?.map((i) => `- ${i}`).join('\n') || 'N/A'}

---

LANGUAGE: ${results.languageScore}/5
${results.languageFeedback}

Strengths:
${results.languageStrengths?.map((s) => `- ${s}`).join('\n') || 'N/A'}

Areas for Improvement:
${results.languageImprovements?.map((i) => `- ${i}`).join('\n') || 'N/A'}
  `.trim();
}
