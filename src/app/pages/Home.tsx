import { Link } from "react-router";
import { Upload as UploadIcon, Mic, BarChart3, FileText, CheckCircle2, Brain } from "lucide-react";

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Master Your Viva with Viva Vaani
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Experience realistic oral examinations powered by advanced AI. Upload your study materials, 
          engage in voice-based interviews, and receive comprehensive feedback to enhance your preparation.
        </p>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
        >
          <UploadIcon className="w-5 h-5" />
          Start Your Practice Session
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<FileText className="w-8 h-8" />}
          title="PDF Processing"
          description="Upload your study materials in PDF format. Our AI extracts and analyzes content to generate relevant questions."
          gradient="from-blue-500 to-cyan-500"
        />
        <FeatureCard
          icon={<Brain className="w-8 h-8" />}
          title="Smart Question Generation"
          description="AI-powered question generation covering conceptual, analytical, and application-based topics with varying difficulty."
          gradient="from-purple-500 to-pink-500"
        />
        <FeatureCard
          icon={<Mic className="w-8 h-8" />}
          title="Voice Interaction"
          description="Natural voice-based interviews with text-to-speech questions and speech-to-text answer capture."
          gradient="from-green-500 to-emerald-500"
        />
        <FeatureCard
          icon={<Brain className="w-8 h-8" />}
          title="Cross-Questioning"
          description="Experience realistic cross-examination with dynamic questions that test your knowledge from multiple perspectives."
          gradient="from-pink-500 to-rose-500"
        />
        <FeatureCard
          icon={<CheckCircle2 className="w-8 h-8" />}
          title="Evaluation"
          description="Receive detailed feedback on accuracy, completeness, relevance, and clarity of your responses."
          gradient="from-orange-500 to-red-500"
        />
        <FeatureCard
          icon={<BarChart3 className="w-8 h-8" />}
          title="Guidance"
          description="Get personalized recommendations, performance analytics, and insights to improve your preparation."
          gradient="from-indigo-500 to-blue-500"
        />
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Upload Materials"
            description="Upload your PDF study materials and let our AI process the content."
          />
          <StepCard
            number="2"
            title="Start Interview"
            description="Begin your voice-based interview with AI-generated questions."
          />
          <StepCard
            number="3"
            title="Voice Responses"
            description="Answer questions naturally using your voice, just like a real viva."
          />
          <StepCard
            number="4"
            title="Follow-up Questions"
            description="AI generates adaptive follow-up questions based on your responses to deepen understanding."
          />
          <StepCard
            number="5"
            title="Cross-Questioning"
            description="Experience realistic cross-examination that tests your knowledge from multiple angles."
          />
          <StepCard
            number="6"
            title="Evaluation and Guidance"
            description="Receive comprehensive feedback, detailed analysis, and personalized recommendations to improve your knowledge."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Preparation?</h3>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of students who are mastering their oral examinations with AI
        </p>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
      <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h4 className="text-lg font-bold mb-2 text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}