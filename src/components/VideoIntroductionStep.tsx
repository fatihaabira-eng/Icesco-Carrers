import React, { useState } from "react";

interface VideoIntroductionProps {
  formData: {
    videoIntroSubmitted: boolean;
  };
  navigate: (path: string) => void;
  setCurrentStep: (step: number) => void;
}

const VideoIntroductionStep: React.FC<VideoIntroductionProps> = ({
  formData,
  navigate,
  setCurrentStep,
}) => {
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Simulate error for demonstration (replace with actual error handling in /record page)
  // setCameraError('Failed to access camera or microphone. Please ensure permissions are granted and try again.');

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Video Introduction</h2>
      <div className="p-6 rounded-lg border bg-white shadow-sm">
        <p className="text-gray-700 mb-6">
          Record a 2-minute video introducing yourself, your experience, and your
          motivation for applying. Ensure you're in a quiet place with a working
          camera and microphone.
        </p>

        {cameraError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">{cameraError}</span>
            </div>
            <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
              <li>Check your browser permissions and allow access to camera and microphone.</li>
              <li>If you previously denied access, refresh the page and allow permissions.</li>
              <li>Use Chrome, Edge, or Firefox on HTTPS or localhost.</li>
              <li>Ensure no other app is using your camera or microphone.</li>
              <li>Try restarting your browser or device.</li>
            </ul>
          </div>
        )}

        {!formData.videoIntroSubmitted ? (
          <div className="text-center">
            <button
              onClick={() => navigate("/record")}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg font-medium transition mx-auto"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              Record Video
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="font-medium">
                  Video recorded successfully!
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/record")}
              className="mr-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Re-record
            </button>
            <button
              onClick={() => setCurrentStep(10)}
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg font-medium transition"
            >
              Continue to Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoIntroductionStep;
