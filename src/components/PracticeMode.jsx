import { useState } from 'react';

export default function PracticeMode({ textType, apiKey, onGenerateTopic }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [videoWatchCount, setVideoWatchCount] = useState(0);

  // Predefined cooking/instruction video IDs (short, suitable for practice)
  const instructionVideos = [
    { id: 'qFjnW3A4PpQ', title: 'How to Make Scrambled Eggs', duration: '3:45' },
    { id: '8SC_2pgByog', title: 'How to Tie a Tie', duration: '2:30' },
    { id: 'nothvIGnmenU', title: 'How to Make Paper Airplane', duration: '2:15' },
    { id: 'hou0lU8WMgo', title: 'How to Make French Toast', duration: '4:20' },
    { id: 'hWi3NwDLbcM', title: 'How to Fold a Fitted Sheet', duration: '3:00' },
  ];

  const getRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * instructionVideos.length);
    return instructionVideos[randomIndex];
  };

  const handleGenerateTopic = async () => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key first.');
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = getTopicGenerationPrompt(textType);

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
              content: 'You are a GTS302 Technical Writing instructor creating practice topics for students.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const topic = JSON.parse(data.choices[0].message.content);
      setCurrentTopic(topic);
      onGenerateTopic(topic);
    } catch (error) {
      console.error('Error generating topic:', error);
      alert(`Error generating topic: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartVideoExercise = () => {
    const video = getRandomVideo();
    setVideoUrl(`https://www.youtube.com/embed/${video.id}`);
    setCurrentTopic({
      title: 'Write Instructions Based on Video',
      description: `Watch the video "${video.title}" (${video.duration}) twice, take notes, then write step-by-step instructions without referring back to the video.`,
      videoTitle: video.title,
      requirements: [
        'Watch the video twice',
        'Take brief notes during viewing',
        'Write instructions from memory',
        'Use proper imperative mood',
        'Include all major steps',
        'Add at least one CAUTION/WARNING if applicable'
      ]
    });
    setShowVideo(true);
    setVideoWatchCount(0);
    setNotes('');
    onGenerateTopic({
      title: `Instructions: ${video.title}`,
      description: `Based on the video you watched`,
      videoTitle: video.title
    });
  };

  const handleVideoEnd = () => {
    setVideoWatchCount(prev => prev + 1);
    if (videoWatchCount < 1) {
      alert('Video ended. You can watch it one more time. After that, write your instructions from your notes!');
    } else {
      alert('Second viewing complete! Now close the video and write your instructions using only your notes.');
    }
  };

  const handleCloseVideo = () => {
    if (videoWatchCount < 2) {
      const confirm = window.confirm(
        `You've only watched the video ${videoWatchCount} time(s). Are you sure you want to close it? (Recommended: 2 viewings)`
      );
      if (!confirm) return;
    }
    setShowVideo(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            Practice Mode - Exam Simulation
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Generate random topics or video exercises to practice like the real exam
          </p>
        </div>
      </div>

      {/* Instructions Mode - Video Exercise */}
      {textType === 'Instructions' && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            Video-Based Instructions Exercise
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            Simulate the real exam: Watch a video twice, take notes, then write instructions from memory.
          </p>
          <button
            onClick={handleStartVideoExercise}
            disabled={isGenerating}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Get Random Video Exercise
          </button>
        </div>
      )}

      {/* Generate Topic Button for Progress Reports and Lab Reports */}
      {(textType === 'Progress Report' || textType === 'Science Lab Report') && (
        <button
          onClick={handleGenerateTopic}
          disabled={isGenerating}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isGenerating ? (
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
              Generating...
            </>
          ) : (
            'Generate Random Practice Topic'
          )}
        </button>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentTopic?.videoTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Views: {videoWatchCount}/2 (Watch twice, then write from memory)
                  </p>
                </div>
                <button
                  onClick={handleCloseVideo}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
                >
                  Close Video
                </button>
              </div>

              {/* YouTube Video */}
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  onEnded={handleVideoEnd}
                ></iframe>
              </div>

              {/* Notes Section */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Notes (Take brief notes while watching)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write brief notes here... (e.g., ingredients, main steps, key details)"
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Keep notes brief - just key points. You'll write full instructions from these notes after closing the video.
                </p>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900 mb-2">
                  Instructions:
                </p>
                <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                  <li>Watch the video carefully (you can watch it twice)</li>
                  <li>Take brief notes in the box below</li>
                  <li>After watching, close this window</li>
                  <li>Write your instructions using only your notes</li>
                  <li>Do NOT reopen the video while writing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Current Topic */}
      {currentTopic && !showVideo && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            Current Practice Topic
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-green-800">
                {currentTopic.title}
              </p>
              <p className="text-sm text-green-700 mt-1">
                {currentTopic.description}
              </p>
            </div>

            {notes && currentTopic.videoTitle && (
              <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs font-semibold text-blue-800 mb-1">Your Notes:</p>
                <p className="text-xs text-blue-700 whitespace-pre-wrap">{notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getTopicGenerationPrompt(textType) {
  if (textType === 'Progress Report') {
    return `Generate a unique, realistic practice topic for a Progress Report in memo format.

The topic should be:
- About a project or initiative (NOT moving offices, as that's the example)
- Suitable for a university student to imagine and write about
- Specific enough to write 4 sections: Introduction, Work Completed, Work Scheduled, Problems/Projections
- Creative and engaging

Examples of good topics:
- Developing a mobile app for the university
- Organizing a campus sustainability initiative
- Planning a student exchange program
- Building a new campus recreation center
- Launching a student mentorship program

Return a JSON object with this structure:
{
  "title": "Concise title of the project",
  "description": "Brief description of what the project is about",
  "context": "Background information the student needs to know",
  "requirements": [
    "List of 4-5 specific things they should include",
    "E.g., mention specific deliverables",
    "E.g., include budget figures",
    "E.g., mention team members or departments"
  ]
}

Make it different from common examples!`;
  }

  if (textType === 'Science Lab Report') {
    return `Generate a unique, realistic practice topic for a Science Lab Report (TIMMRDC structure).

The topic should be:
- A simple experiment that a student could imagine conducting
- Not too complex or requiring specialized knowledge
- Suitable for demonstrating all TIMMRDC sections
- Different from plant growth experiments (that's the example)

Examples of good topics:
- Testing water temperature effects on sugar dissolution
- Investigating battery life of different brands
- Measuring sound insulation of different materials
- Testing pH levels of common household liquids
- Observing crystal formation in different solutions

Return a JSON object with this structure:
{
  "title": "Title of the experiment (as a phrase, not sentence)",
  "description": "Brief description of what the experiment investigates",
  "context": "Background information about the scientific concept",
  "requirements": [
    "What they should include in Materials",
    "What the Method should describe",
    "What kind of Results to expect",
    "What the Discussion should explain"
  ]
}

Make it creative and interesting!`;
  }

  return '';
}
