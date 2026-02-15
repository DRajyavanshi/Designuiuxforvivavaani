import { Link, useParams } from "react-router";
import { TrendingUp, TrendingDown, Award, BarChart3, Download, Home, Brain, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface QuestionResult {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  response: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

const mockResults: QuestionResult[] = [
  {
    id: 'q1',
    question: 'Explain the concept of machine learning and how it differs from traditional programming.',
    type: 'conceptual',
    difficulty: 'basic',
    response: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
    score: 92,
    feedback: 'Excellent explanation! You clearly articulated the core concept and highlighted the key distinction from traditional programming.',
    strengths: ['Clear definition', 'Good comparison', 'Concise explanation'],
    improvements: ['Could mention specific examples', 'Discuss learning algorithms']
  },
  {
    id: 'q2',
    question: 'What are the key differences between supervised and unsupervised learning?',
    type: 'analytical',
    difficulty: 'intermediate',
    response: 'Supervised learning uses labeled data where the model learns from input-output pairs, while unsupervised learning works with unlabeled data to find patterns.',
    score: 85,
    feedback: 'Good understanding of the fundamental differences. Your answer covers the main distinction well.',
    strengths: ['Correct distinction', 'Clear explanation'],
    improvements: ['Provide examples of each type', 'Discuss use cases']
  },
  {
    id: 'q3',
    question: 'Describe a real-world application where you would use neural networks and explain why.',
    type: 'application',
    difficulty: 'advanced',
    response: 'Image recognition in medical diagnostics, because neural networks can identify patterns in medical images that might be difficult for humans to detect.',
    score: 78,
    feedback: 'Good application choice with valid reasoning. Consider elaborating on the specific neural network architecture.',
    strengths: ['Relevant application', 'Practical reasoning'],
    improvements: ['Mention specific architecture (CNN)', 'Discuss training requirements']
  },
  {
    id: 'q4',
    question: 'What is overfitting in machine learning and how can you prevent it?',
    type: 'conceptual',
    difficulty: 'intermediate',
    response: 'Overfitting occurs when a model learns the training data too well, including noise and outliers, leading to poor generalization.',
    score: 72,
    feedback: 'Correct definition of overfitting, but the prevention methods were not fully addressed.',
    strengths: ['Accurate definition', 'Mentioned generalization'],
    improvements: ['Discuss prevention techniques (regularization, cross-validation)', 'Provide examples']
  },
  {
    id: 'q5',
    question: 'Explain the working principle of a decision tree algorithm.',
    type: 'factual',
    difficulty: 'basic',
    response: 'A decision tree makes decisions by splitting data based on features, creating a tree-like structure of decisions.',
    score: 68,
    feedback: 'Basic understanding shown but lacks depth in explanation of the splitting criteria and decision-making process.',
    strengths: ['Basic structure understanding'],
    improvements: ['Explain splitting criteria (Gini, entropy)', 'Discuss leaf nodes and predictions']
  }
];

export function Results() {
  const { sessionId } = useParams();
  
  const averageScore = Math.round(
    mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length
  );
  
  const topicPerformance = [
    { topic: 'Conceptual Understanding', score: 82, color: 'bg-blue-500' },
    { topic: 'Analytical Thinking', score: 85, color: 'bg-purple-500' },
    { topic: 'Application Knowledge', score: 78, color: 'bg-green-500' },
    { topic: 'Factual Recall', score: 68, color: 'bg-orange-500' }
  ];

  const difficultyAnalysis = [
    { level: 'Basic', answered: 2, average: 80, successRate: 100 },
    { level: 'Intermediate', answered: 2, average: 79, successRate: 100 },
    { level: 'Advanced', answered: 1, average: 78, successRate: 100 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return <Award className="w-6 h-6 text-green-600" />;
    if (score >= 75) return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
    if (score >= 60) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4"
        >
          <Award className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Session Complete!
        </h2>
        <p className="text-gray-600 text-lg">
          Here's your comprehensive performance report
        </p>
      </div>

      {/* Overall Score Card */}
      <motion.div
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <p className="text-xl mb-2 opacity-90">Overall Performance</p>
          <div className="text-7xl font-bold mb-4">{averageScore}%</div>
          <div className="flex items-center justify-center gap-8 text-sm opacity-90">
            <div>
              <p className="font-semibold">Questions Answered</p>
              <p className="text-2xl">{mockResults.length}/5</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div>
              <p className="font-semibold">Success Rate</p>
              <p className="text-2xl">100%</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div>
              <p className="font-semibold">Time Spent</p>
              <p className="text-2xl">12m 34s</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Topic Performance */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Topic Performance</h3>
          </div>
          <div className="space-y-4">
            {topicPerformance.map((topic, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{topic.topic}</span>
                  <span className="text-gray-900 font-bold">{topic.score}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${topic.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.score}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Difficulty Analysis */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Difficulty Breakdown</h3>
          </div>
          <div className="space-y-4">
            {difficultyAnalysis.map((level, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900">{level.level}</span>
                  <span className="text-sm text-gray-600">
                    {level.answered} question{level.answered !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Average Score</p>
                    <p className="text-lg font-bold text-gray-900">{level.average}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Success Rate</p>
                    <p className="text-lg font-bold text-gray-900">{level.successRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Question Results */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Detailed Results</h3>
        <div className="space-y-6">
          {mockResults.map((result, index) => (
            <div key={result.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Question {index + 1}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {result.type}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {result.difficulty}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{result.question}</p>
                </div>
                <div className={`flex items-center gap-2 ${getScoreBg(result.score)} px-4 py-2 rounded-lg ml-4`}>
                  {getPerformanceIcon(result.score)}
                  <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Your Response:</p>
                <p className="text-gray-700">{result.response}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-900 mb-1">AI Feedback:</p>
                <p className="text-blue-900">{result.feedback}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-900">Strengths</span>
                  </div>
                  <ul className="space-y-1">
                    {result.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold text-orange-900">Areas for Improvement</span>
                  </div>
                  <ul className="space-y-1">
                    {result.improvements.map((improvement, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900">Recommendations for Improvement</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Strengthen conceptual foundations:</strong> Review basic machine learning concepts and algorithms to build a stronger foundation
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Practice with examples:</strong> Include specific real-world examples when explaining concepts to demonstrate practical understanding
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Expand on technical details:</strong> Dive deeper into technical aspects like algorithms, architectures, and implementation details
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Focus on prevention methods:</strong> When discussing problems like overfitting, always mention prevention and mitigation strategies
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Report (PDF)
        </button>
        <Link
          to="/"
          className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
