import { MIN_WORD_COUNT } from '../data/rubric';

export default function TextInput({ userText, onTextChange, textType, onGrade, isGrading, currentTopic }) {
  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;
  const isMinimumMet = wordCount >= MIN_WORD_COUNT;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {currentTopic && (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-xs font-semibold text-blue-900">
            📌 Current Topic: {currentTopic.title}
          </p>
          {currentTopic.videoTitle && (
            <p className="text-xs text-blue-700 mt-1">
              Based on: {currentTopic.videoTitle}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-gray-700">
          Your {textType}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              isMinimumMet
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {wordCount} / {MIN_WORD_COUNT} words
          </span>
        </div>
      </div>

      <textarea
        value={userText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={`Paste your ${textType.toLowerCase()} here...`}
        rows={20}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-y"
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {!isMinimumMet && `${MIN_WORD_COUNT - wordCount} more words needed to meet minimum`}
        </p>
        <button
          onClick={onGrade}
          disabled={isGrading || !userText.trim()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          {isGrading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Grading...
            </>
          ) : (
            <>
              <span>📝</span>
              Grade My Writing
            </>
          )}
        </button>
      </div>
    </div>
  );
}
