export default function Header() {
  return (
    <header className="bg-white shadow-md border-b-4 border-indigo-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              GTS302 Writing Grader
            </h1>
            <p className="text-gray-600 mt-1">
              AI-Powered Assessment Tool for Technical Writing
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-200">
              <p className="text-sm font-semibold text-indigo-800">Score Range</p>
              <p className="text-xs text-indigo-600 mt-1">
                Content (5) + Structure (5) + Language (5) = 15 points
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
