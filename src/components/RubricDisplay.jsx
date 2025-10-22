import { RUBRIC, RUBRIC_CATEGORIES } from '../data/rubric';
import { TEXT_TYPE_STRUCTURES } from '../data/textTypeStructures';

export default function RubricDisplay({ textType }) {
  const structure = TEXT_TYPE_STRUCTURES[textType];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📚</span>
        Grading Rubric
      </h2>

      {/* Rubric Categories */}
      <div className="space-y-4 mb-6">
        {Object.entries(RUBRIC).map(([category, data]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              <span>{category}</span>
              <span className="text-sm text-indigo-600 font-bold">
                /{data.maxScore} points
              </span>
            </h3>

            <div className="text-xs text-gray-600 space-y-1 mb-3">
              {Object.entries(data.criteria).map(([key, value]) => (
                <div key={key} className="flex gap-1">
                  <span className="font-semibold capitalize">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Score descriptors in compact format */}
            <div className="grid grid-cols-5 gap-1 text-xs">
              {[1, 2, 3, 4, 5].map((score) => (
                <div
                  key={score}
                  className={`p-2 rounded text-center ${
                    score === 1
                      ? 'bg-red-50 text-red-800'
                      : score === 2
                      ? 'bg-orange-50 text-orange-800'
                      : score === 3
                      ? 'bg-yellow-50 text-yellow-800'
                      : score === 4
                      ? 'bg-green-50 text-green-800'
                      : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  <div className="font-bold">{score}</div>
                  <div className="text-[10px] mt-1">
                    {data.descriptors[score].title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Text Type Structure */}
      {structure && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            {textType} Structure Requirements
          </h3>

          <div className="bg-indigo-50 rounded-lg p-4 mb-3">
            <p className="text-sm font-semibold text-indigo-900 mb-2">
              Primary Structure (Required):
            </p>
            <ol className="text-xs text-indigo-800 space-y-1 list-decimal list-inside">
              {structure.primaryStructure.map((section, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{section.name}</span>
                  {section.requirements && section.requirements.length > 0 && (
                    <ul className="ml-6 mt-1 space-y-0.5 list-disc list-inside text-indigo-700">
                      {section.requirements.slice(0, 2).map((req, ridx) => (
                        <li key={ridx}>{req}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {structure.mnemonic && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
              <p className="text-sm font-semibold text-yellow-900">
                Mnemonic: <span className="font-mono text-lg">{structure.mnemonic}</span>
              </p>
            </div>
          )}

          {structure.commonMistakes && (
            <details className="text-xs">
              <summary className="font-semibold text-gray-700 cursor-pointer hover:text-indigo-600">
                Common Mistakes to Avoid
              </summary>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600 ml-2">
                {structure.commonMistakes.map((mistake, idx) => (
                  <li key={idx}>{mistake}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
