import { TEXT_TYPES } from '../data/rubric';

export default function TextTypeSelector({ textType, onTextTypeChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Select Text Type
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(TEXT_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onTextTypeChange(value)}
            className={`
              p-4 rounded-lg border-2 transition-all
              ${
                textType === value
                  ? 'border-indigo-600 bg-indigo-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
              }
            `}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">
                {key === 'LAB_REPORT' && '🔬'}
                {key === 'INSTRUCTIONS' && '📋'}
                {key === 'PROGRESS_REPORT' && '📊'}
              </div>
              <div
                className={`text-sm font-semibold ${
                  textType === value ? 'text-indigo-900' : 'text-gray-700'
                }`}
              >
                {value}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {key === 'LAB_REPORT' && 'TIMMRDC Structure'}
                {key === 'INSTRUCTIONS' && 'Steps & Procedures'}
                {key === 'PROGRESS_REPORT' && 'Memo Format'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
