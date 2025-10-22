import { useState } from 'react';

export default function ApiKeyInput({ apiKey, onApiKeyChange }) {
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(!apiKey);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleClear = () => {
    onApiKeyChange('');
    setIsEditing(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            OpenAI API Key
            <span className="text-red-500 ml-1">*</span>
          </label>

          {isEditing ? (
            <div className="flex gap-2">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="sk-..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
              >
                {showKey ? '👁️' : '👁️‍🗨️'}
              </button>
              <button
                onClick={handleSave}
                disabled={!apiKey}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm text-gray-600">
                {showKey ? apiKey : '••••••••••••••••••••••••••••••••'}
              </div>
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
              >
                {showKey ? '👁️' : '👁️‍🗨️'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-sm font-medium text-red-700 transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Your API key is stored locally in your browser and only sent to OpenAI for grading.
            Get your API key from{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              OpenAI Platform
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
