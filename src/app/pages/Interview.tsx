import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Mic, MicOff, Volume2, SkipForward, CheckCircle2, Clock, Brain } from "lucide-react";
import { motion } from "motion/react";

interface Question {
  id: string;
  text: string;
  type: 'conceptual' | 'analytical' | 'factual' | 'application';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface Response {
  questionId: string;
  transcribedText: string;
  score: number;
}

// Mock questions
const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Explain the concept of machine learning and how it differs from traditional programming.',
    type: 'conceptual',
    difficulty: 'basic'
  },
  {
    id: 'q2',
    text: 'What are the key differences between supervised and unsupervised learning?',
    type: 'analytical',
    difficulty: 'intermediate'
  },
  {
    id: 'q3',
    text: 'Describe a real-world application where you would use neural networks and explain why.',
    type: 'application',
    difficulty: 'advanced'
  },
  {
    id: 'q4',
    text: 'What is overfitting in machine learning and how can you prevent it?',
    type: 'conceptual',
    difficulty: 'intermediate'
  },
  {
    id: 'q5',
    text: 'Explain the working principle of a decision tree algorithm.',
    type: 'factual',
    difficulty: 'basic'
  }
];

export function Interview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [transcribedText, setTranscribedText] = useState('');

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recording timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const playQuestion = () => {
    setIsPlayingQuestion(true);
    // Simulate TTS playback
    setTimeout(() => {
      setIsPlayingQuestion(false);
    }, 3000);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscribedText('');
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Simulate STT transcription
    const mockTranscription = "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Unlike traditional programming where we write specific rules, machine learning algorithms identify patterns in data to make decisions.";
    setTranscribedText(mockTranscription);
    
    // Simulate evaluation
    setTimeout(() => {
      const mockScore = 75 + Math.floor(Math.random() * 20);
      setResponses(prev => [...prev, {
        questionId: currentQuestion.id,
        transcribedText: mockTranscription,
        score: mockScore
      }]);
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTranscribedText('');
    } else {
      // Session complete
      navigate(`/results/${sessionId}`);
    }
  };

  const skipQuestion = () => {
    setResponses(prev => [...prev, {
      questionId: currentQuestion.id,
      transcribedText: '',
      score: 0
    }]);
    nextQuestion();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conceptual': return 'bg-blue-100 text-blue-700';
      case 'analytical': return 'bg-purple-100 text-purple-700';
      case 'factual': return 'bg-green-100 text-green-700';
      case 'application': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-xl font-bold text-gray-900">
                {currentQuestionIndex + 1} / {mockQuestions.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Answered</p>
              <p className="text-xl font-bold text-gray-900">{responses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-xl font-bold text-gray-900">{formatTime(sessionTime)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Session Progress</span>
          <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(currentQuestion.type)}`}>
              {currentQuestion.type}
            </span>
          </div>
          <button
            onClick={playQuestion}
            disabled={isPlayingQuestion}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
          >
            <Volume2 className="w-4 h-4" />
            {isPlayingQuestion ? 'Playing...' : 'Play Question'}
          </button>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {currentQuestion.text}
        </h3>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-6">
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gradient-to-br from-blue-600 to-purple-600 hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? (
              <MicOff className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </motion.button>

          {isRecording && (
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-red-500 rounded-full"
                    animate={{
                      height: [20, 40, 20],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
              <p className="text-red-600 font-semibold">Recording: {formatTime(recordingTime)}</p>
            </div>
          )}

          {!isRecording && !transcribedText && (
            <p className="text-gray-600">Click the microphone to start recording your answer</p>
          )}
        </div>

        {/* Transcribed Text */}
        {transcribedText && (
          <motion.div
            className="mt-6 bg-gray-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-bold text-gray-900">Your Response:</h4>
              {currentResponse && (
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
                  Score: {currentResponse.score}/100
                </div>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{transcribedText}</p>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {currentResponse ? (
          <button
            onClick={nextQuestion}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {currentQuestionIndex < mockQuestions.length - 1 ? (
              <>
                Next Question
                <SkipForward className="w-5 h-5" />
              </>
            ) : (
              <>
                View Results
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={skipQuestion}
            className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            Skip Question
            <SkipForward className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Speak clearly and naturally. The AI will transcribe your response and provide 
          detailed feedback on accuracy, completeness, and clarity.
        </p>
      </div>
    </div>
  );
}
