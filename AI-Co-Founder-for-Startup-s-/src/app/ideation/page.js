'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import { Lightbulb, Zap, PlusCircle, Trash2, RefreshCw } from 'lucide-react';

export default function Ideation() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [marketAnalysis, setMarketAnalysis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Startup Ideation Assistant. I can help you generate innovative startup ideas, validate them with market data, and analyze competitors. What interests you or what problems would you like to solve?",
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    try {
      // Call the real API
      const response = await fetch('/api/ideation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: inputMessage,
          userId: user?._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedIdeas(data.ideas);

        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.message,
          timestamp: new Date(),
          ideas: data.ideas
        };

        setChatMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(data.message || 'Failed to generate ideas');
      }
    } catch (error) {
      console.error('Error generating response:', error);

      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I encountered an error while generating ideas. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeMarket = async (idea) => {
    setSelectedIdea(idea);
    setActiveTab('analysis');
    setIsLoading(true);

    try {
      // Call the API to get market analysis
      const response = await fetch('/api/ideation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: idea.title,
          userId: user?._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMarketAnalysis(data.marketAnalysis);
      } else {
        throw new Error(data.message || 'Failed to analyze market');
      }
    } catch (error) {
      console.error('Error analyzing market:', error);
      // Fallback to basic analysis
      setMarketAnalysis({
        marketSize: idea.marketSize,
        growthRate: idea.growthRate,
        competitors: [
          {
            name: "Competitor A",
            marketShare: "25%",
            strengths: ["Strong brand", "Large user base", "Established partnerships"],
            weaknesses: ["Slow innovation", "Poor user experience", "High costs"],
            opportunities: "Market expansion, technology upgrade"
          },
          {
            name: "Competitor B",
            marketShare: "18%",
            strengths: ["Innovative technology", "Agile development", "Customer focus"],
            weaknesses: ["Limited funding", "Small team", "Geographic constraints"],
            opportunities: "Funding rounds, geographic expansion"
          }
        ],
        trends: [
          "AI/ML integration accelerating",
          "Sustainability becoming priority",
          "Personalization demand increasing",
          "Mobile-first approach essential"
        ],
        risks: [
          "Regulatory changes",
          "Technology disruption",
          "Market saturation",
          "Economic downturn impact"
        ],
        recommendations: [
          "Focus on unique AI capabilities",
          "Build strong partnerships early",
          "Invest in user experience",
          "Develop scalable infrastructure"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickIdeas = [
    "Sustainable living solutions",
    "Mental health and wellness",
    "Remote work productivity",
    "Financial literacy for young adults",
    "Pet care and wellness",
    "Home automation and security",
    "Local business digitization",
    "Elderly care technology"
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111827] mb-2 flex items-center">
          <Lightbulb className="mr-3 text-[#1E3A8A]" size={32} />
          Startup Ideation
        </h1>
        <p className="text-[#6B7280]">
          Generate, validate, and refine your startup ideas with AI.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-[#E5E7EB] mb-8">
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-6 py-3 text-sm font-medium transition-saas border-b-2 ${activeTab === 'generate'
              ? 'border-[#1E3A8A] text-[#1E3A8A]'
              : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]'
            }`}
        >
          Generate Ideas
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-6 py-3 text-sm font-medium transition-saas border-b-2 ${activeTab === 'saved'
              ? 'border-[#1E3A8A] text-[#1E3A8A]'
              : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]'
            }`}
        >
          Saved Ideas
        </button>
      </div>

      {activeTab === 'generate' ? (
        <div className="space-y-8">
          {/* Generation Form */}
          <div className="card-saas p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Industry</label>
                <input
                  type="text"
                  placeholder="e.g. Fintech, Edtech, SaaS"
                  className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-saas outline-none"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. Small businesses, Gen Z, Doctors"
                  className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-saas outline-none"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#374151] mb-2">Specific Interests or Problems (Optional)</label>
              <textarea
                placeholder="e.g. Solving logistics efficiency, sustainable packaging..."
                className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-saas outline-none"
                rows="3"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={20} />
                  Analyzing Markets...
                </>
              ) : (
                <>
                  <Zap className="mr-2" size={20} />
                  Generate 5 Startup Ideas
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {generatedIdeas.length > 0 && (
            <div className="grid gap-6">
              {generatedIdeas.map((idea, index) => (
                <div key={index} className="card-saas p-8 border-l-4 border-l-[#1E3A8A]">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-[#111827]">{idea.title}</h3>
                    <button
                      className="p-2 text-[#6B7280] hover:text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-saas"
                    >
                      <PlusCircle size={24} />
                    </button>
                  </div>
                  <p className="text-[#374151] mb-8 leading-relaxed">{idea.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Solution</h4>
                      <p className="text-sm text-[#374151] bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
                        {idea.solution}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Market Potential</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-[#374151]">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                          {idea.marketSize}
                        </div>
                        <div className="flex items-center text-sm text-[#374151]">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                          {idea.growthRate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="card-saas p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-400">
              📦
            </div>
            <p className="text-[#6B7280]">You haven't saved any ideas yet.</p>
            <button
              onClick={() => setActiveTab('generate')}
              className="mt-4 text-[#1E3A8A] font-medium hover:underline"
            >
              Generate some now
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
