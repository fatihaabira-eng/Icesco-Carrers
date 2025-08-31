import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, Upload, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Record: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    async function setupMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Failed to access camera or microphone. Please ensure permissions are granted and try again.');
      }
    }
    setupMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev >= 120) { // 2 minutes
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = () => {
    if (!stream) {
      setError('No media stream available. Please check camera and microphone permissions.');
      return;
    }

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      setIsRecording(false);
      setTimer(0);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleUpload = async () => {
    if (!recordedBlob) return;

    try {
      // Store video in localStorage for the application form
      const reader = new FileReader();
      reader.onload = function() {
        const base64data = (reader.result as string).split(',')[1];
        localStorage.setItem('recordedVideoBlob', base64data);
        
        // Also update the form data to indicate video has been submitted
        const savedFormData = localStorage.getItem('applicationFormData');
        if (savedFormData) {
          try {
            const formData = JSON.parse(savedFormData);
            formData.videoIntroSubmitted = true;
            formData.videoFile = { name: 'introduction.webm', hasFile: true };
            localStorage.setItem('applicationFormData', JSON.stringify(formData));
            console.log('Updated form data with video info');
          } catch (error) {
            console.error('Error updating form data:', error);
          }
        }
        
        // Show success message and redirect back to apply page
        console.log('Video stored for application form:', recordedBlob);
        alert('Video submitted successfully!');
        navigate('/apply?step=10'); // Go back to step 8 to show success state
      };
      reader.readAsDataURL(recordedBlob);

    } catch (err) {
      setError('Failed to process video. Please try again.');
    }
  };

  const handleRerecord = () => {
    setRecordedBlob(null);
    setTimer(0);
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs} / 02:00`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Record Your Introduction</h1>
          <button
            onClick={() => navigate('/apply')}
            className="flex items-center px-4 py-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Form
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Instructions Sidebar */}
          <div className="md:col-span-1 bg-teal-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-teal-700 mb-4">Recording Guidance</h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>
                <span className="font-semibold">Introduce Yourself:</span> What’s your name and background?
              </li>
              <li>
                <span className="font-semibold">Motivation:</span> Why are you applying for this opportunity?
              </li>
              <li>
                <span className="font-semibold">Skills & Experience:</span> What unique skills or experience do you bring?
              </li>
              <li>
                <span className="font-semibold">Achievements:</span> Share something you’re proud of in your career or studies.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Ensure you're in a quiet place with good lighting. Test your camera and microphone before recording.
            </p>
          </div>

          {/* Recording Area */}
          <div className="md:col-span-2">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isRecording}
                className="w-full h-full object-cover"
                src={recordedBlob ? URL.createObjectURL(recordedBlob) : undefined}
              />
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatTime(timer)}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-4">
              {!recordedBlob ? (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  } ${!stream ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!stream}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleRerecord}
                    className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Re-record
                  </button>
                  <button
                    onClick={handleUpload}
                    className="flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload & Submit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;