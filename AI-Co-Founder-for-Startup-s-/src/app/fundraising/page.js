'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import { DollarSign, Lightbulb, Target, MessageSquare, Mail, Search, ChevronRight, RefreshCw, Zap, Users, BarChart } from 'lucide-react';

export default function Fundraising() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('pitch-sim');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [pitchDeck, setPitchDeck] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [emailForm, setEmailForm] = useState({
    recipientType: 'investor',
    purpose: 'funding',
    startupInfo: {}
  });
  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
      setEmailForm(prev => ({
        ...prev,
        startupInfo: {
          name: userInfo.startup?.name || '',
          industry: userInfo.startup?.industry || '',
          stage: userInfo.startup?.stage || '',
          description: ''
        }
      }));
    }
  }, []);

  const simulateInvestorPitch = async (deck) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/investors/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pitchDeck: deck,
          userContext: {
            role: user?.role,
            startup: user?.startup,
            profile: user?.profile
          }
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSimulation(data.simulation);
        setActiveTab('feedback');
      } else {
        throw new Error(data.message || 'Failed to simulate investor pitch');
      }
    } catch (error) {
      console.error('Error simulating investor pitch:', error);
      alert('Failed to simulate investor pitch. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateEmailTemplate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/email-templates/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientType: emailForm.recipientType,
          startupInfo: emailForm.startupInfo,
          purpose: emailForm.purpose
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailTemplate(data.emailTemplate);
        setActiveTab('email-templates');
      } else {
        throw new Error(data.message || 'Failed to generate email template');
      }
    } catch (error) {
      console.error('Error generating email template:', error);
      alert('Failed to generate email template. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadSampleIdeas = () => {
    setGeneratedIdeas([
      {
        id: 1,
        title: "EcoSmart Solutions",
        description: "AI-powered platform that helps businesses reduce their carbon footprint through smart resource management and sustainable practices.",
        category: "Sustainability & Green Tech",
        marketSize: "$45B",
        growthRate: "18% annually"
      },
      {
        id: 2,
        title: "HealthTech Companion",
        description: "Personalized AI health assistant providing preventive care recommendations and connecting users with healthcare providers.",
        category: "Healthcare & Wellness",
        marketSize: "$280B",
        growthRate: "25% annually"
      },
      {
        id: 3,
        title: "EduTech Mentor",
        description: "AI-powered personalized learning platform adapting to individual learning styles with real-time feedback.",
        category: "Education & Learning",
        marketSize: "$89B",
        growthRate: "20% annually"
      }
    ]);
  };

  useEffect(() => {
    loadSampleIdeas();
  }, []);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111827] mb-2 flex items-center">
          <DollarSign className="mr-3 text-[#1E3A8A]" size={32} />
          Fundraising & Networking
        </h1>
        <p className="text-[#6B7280]">
          Perfect your pitch, find investors, and create compelling outreach campaigns.
        </p>
      </div>

      {/* Idea Selection */}
      {!selectedIdea && (
        <div className="card-saas p-8 mb-8">
          <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center">
            <Lightbulb className="mr-2 text-[#F59E0B]" size={20} />
            Select Your Startup Idea
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#1E3A8A] hover:ring-2 hover:ring-[#1E3A8A]/10 transition-saas cursor-pointer group shadow-sm"
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#1E3A8A] transition-saas">
                    {idea.title}
                  </h3>
                  <ChevronRight size={18} className="text-[#6B7280] group-hover:translate-x-1 transition-saas" />
                </div>
                <p className="text-sm text-[#374151] mb-6 line-clamp-2">{idea.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-blue-50 text-[#1E3A8A] px-2 py-1 rounded-md font-medium border border-blue-100">
                    {idea.category}
                  </span>
                  <span className="text-[#6B7280] font-medium">{idea.marketSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Idea & Tabs */}
      {selectedIdea && (
        <div className="space-y-8">
          {/* Selected Idea Header */}
          <div className="card-saas p-6 flex justify-between items-center border-l-4 border-l-[#1E3A8A]">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-xl font-bold text-[#111827]">{selectedIdea.title}</h2>
                <span className="text-xs bg-blue-50 text-[#1E3A8A] px-2 py-0.5 rounded-md font-medium border border-blue-100">
                  {selectedIdea.category}
                </span>
              </div>
              <p className="text-sm text-[#6B7280] max-w-2xl">{selectedIdea.description}</p>
            </div>
            <button
              onClick={() => setSelectedIdea(null)}
              className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-saas"
              title="Change Idea"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-[#E5E7EB]">
            {[
              { id: 'pitch-sim', label: 'Pitch Simulation', icon: Target },
              { id: 'feedback', label: 'Investor Feedback', icon: BarChart },
              { id: 'email-templates', label: 'Email Templates', icon: Mail },
              { id: 'investor-matching', label: 'Find Investors', icon: Search },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-saas border-b-2 ${activeTab === tab.id
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]'
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="card-saas p-8 min-h-[400px]">
            {activeTab === 'pitch-sim' && (
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111827]">Investor Pitch Simulation</h3>
                  <button
                    onClick={() => simulateInvestorPitch(pitchDeck || selectedIdea)}
                    disabled={isGenerating}
                    className="btn-primary py-2 px-6 flex items-center"
                  >
                    {isGenerating ? (
                      <RefreshCw className="animate-spin mr-2" size={18} />
                    ) : (
                      <Zap className="mr-2" size={18} />
                    )}
                    Start Simulation
                  </button>
                </div>
                <p className="text-[#374151] max-w-2xl">
                  Practice your pitch with AI-powered investor simulation. Get realistic feedback and tough questions.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                    <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center">
                      <Target className="mr-2 text-[#1E3A8A]" size={16} />
                      What You'll Get
                    </h4>
                    <ul className="space-y-3 text-sm text-[#374151]">
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Realistic investor feedback
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Common questions and concerns
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Investment decision simulation
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Improvement suggestions
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                    <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center">
                      <Zap className="mr-2 text-[#F59E0B]" size={16} />
                      Simulation Features
                    </h4>
                    <ul className="space-y-3 text-sm text-[#374151]">
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Multiple investor personas
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Industry-specific questions
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Risk assessment
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Valuation estimates
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-8 text-left">
                {simulation ? (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm border-t-4 border-t-[#1E3A8A]">
                        <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Overall Pitch Score</h4>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-4xl font-bold text-[#111827]">{simulation.feedback?.overallScore}</span>
                          <span className="text-[#6B7280] font-medium">/ 10</span>
                        </div>
                        <p className="mt-4 text-sm font-medium text-[#374151]">
                          Investor Recommendation: <span className="text-[#1E3A8A] font-bold">{simulation.feedback?.recommendation}</span>
                        </p>
                      </div>
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm border-t-4 border-t-green-500">
                        <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Investment Decision</h4>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {simulation.investmentDecision?.decision}
                        </div>
                        <p className="text-sm font-medium text-[#374151]">
                          Simulated Amount: <span className="text-[#111827] font-bold">{simulation.investmentDecision?.amount}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-[#111827] flex items-center">
                          <Target className="mr-2 text-green-500" size={20} />
                          Pitch Strengths
                        </h4>
                        <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-3">
                          {simulation.feedback?.strengths?.map((strength, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              <span className="text-sm text-green-900 font-medium">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-[#111827] flex items-center">
                          <Zap className="mr-2 text-red-500" size={20} />
                          Areas for Improvement
                        </h4>
                        <div className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-3">
                          {simulation.feedback?.weaknesses?.map((weakness, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-red-600 mr-2">!</span>
                              <span className="text-sm text-red-900 font-medium">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <MessageSquare className="mr-2 text-[#F59E0B]" size={20} />
                        Likely Investor Questions
                      </h4>
                      <div className="grid gap-4">
                        {simulation.questions?.map((question, index) => (
                          <div key={index} className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex justify-between items-center group hover:border-[#1E3A8A]/30 transition-saas">
                            <div>
                              <h5 className="font-bold text-[#111827] mb-1">{question.question}</h5>
                              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{question.category}</p>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700'
                              }`}>
                              {question.difficulty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <BarChart size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">No Feedback History</h3>
                    <p className="text-[#6B7280] text-center max-w-sm mb-8">
                      Run a pitch simulation to see your performance metrics and investor insights.
                    </p>
                    <button
                      onClick={() => simulateInvestorPitch(pitchDeck || selectedIdea)}
                      disabled={isGenerating}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Simulating...' : 'Run First Simulation'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'email-templates' && (
              <div className="space-y-8 text-left">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#111827]">Generator Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Recipient Type</label>
                        <select
                          value={emailForm.recipientType}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, recipientType: e.target.value }))}
                          className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none"
                        >
                          <option value="investor">Venture Capitalist</option>
                          <option value="mentor">Serial Entrepreneur / Mentor</option>
                          <option value="customer">Early Adopter Customer</option>
                          <option value="partner">Strategic Partner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Outreach Purpose</label>
                        <select
                          value={emailForm.purpose}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, purpose: e.target.value }))}
                          className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none"
                        >
                          <option value="funding">Investment Funding</option>
                          <option value="mentorship">Product Feedback / Mentorship</option>
                          <option value="partnership">Co-Marketing / Partnership</option>
                          <option value="sales">Direct Sales Outreach</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Startup Context (Optional)</label>
                        <textarea
                          value={emailForm.startupInfo.description}
                          onChange={(e) => setEmailForm(prev => ({
                            ...prev,
                            startupInfo: { ...prev.startupInfo, description: e.target.value }
                          }))}
                          placeholder="Briefly describe your value prop..."
                          className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] h-32 focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none resize-none"
                        />
                      </div>
                      <button
                        onClick={generateEmailTemplate}
                        disabled={isGenerating}
                        className="btn-primary w-full py-3 flex items-center justify-center font-semibold"
                      >
                        {isGenerating ? (
                          <RefreshCw className="animate-spin mr-2" size={18} />
                        ) : (
                          <Mail className="mr-2" size={18} />
                        )}
                        Generate Template
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#111827]">Compiled Template</h3>
                    {emailTemplate ? (
                      <div className="card-saas bg-[#F9FAFB] border border-[#E5E7EB] overflow-hidden">
                        <div className="bg-white border-b border-[#E5E7EB] px-5 py-3">
                          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mr-2">Subject:</span>
                          <span className="text-sm font-semibold text-[#111827]">{emailTemplate.subject}</span>
                        </div>
                        <div className="p-5 font-mono text-[11px] text-[#374151] leading-relaxed whitespace-pre-wrap h-[300px] overflow-y-auto bg-white">
                          {emailTemplate.template}
                        </div>
                        <div className="p-4 bg-blue-50 border-t border-blue-100">
                          <h5 className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider mb-2 flex items-center">
                            <RefreshCw size={12} className="mr-1" />
                            Personalization Strategies
                          </h5>
                          <ul className="space-y-1">
                            {emailTemplate.personalizationTips?.map((tip, index) => (
                              <li key={index} className="text-[10px] text-[#1E3A8A]/80 font-medium">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center">
                        <Mail size={48} className="text-[#D1D5DB] mb-4" />
                        <p className="text-sm text-[#6B7280]">Select settings and generate to see your outreach template.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'investor-matching' && (
              <div className="space-y-8 text-left">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">Investor Discovery</h3>
                    <p className="text-sm text-[#6B7280]">Showing investors matching {selectedIdea.category}.</p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium uppercase tracking-widest">
                    <span>Verified</span>
                    <div className="w-8 h-4 bg-green-500 rounded-full flex items-center px-0.5">
                      <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "TechCrunch Ventures",
                      type: "Venture Capital",
                      stage: "Seed - Series A",
                      industries: ["SaaS", "AI/ML", "Fintech"],
                      location: "San Francisco, CA",
                      investmentRange: "$500K - $5M"
                    },
                    {
                      name: "GreenTech Angels",
                      type: "Angel Group",
                      stage: "Pre-seed - Seed",
                      industries: ["Sustainability", "CleanTech", "Green Energy"],
                      location: "Austin, TX",
                      investmentRange: "$50K - $500K"
                    },
                    {
                      name: "HealthTech Capital",
                      type: "Venture Capital",
                      stage: "Series A - B",
                      industries: ["Healthcare", "MedTech", "Digital Health"],
                      location: "Boston, MA",
                      investmentRange: "$2M - $10M"
                    }
                  ].map((investor, index) => (
                    <div key={index} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:border-[#1E3A8A] transition-saas group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold border border-[#E5E7EB]">
                          {investor.name[0]}
                        </div>
                        <span className="text-[10px] font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {investor.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#111827] mb-1 group-hover:text-[#1E3A8A] transition-saas">{investor.name}</h4>
                      <p className="text-xs text-[#6B7280] mb-4 flex items-center">
                        <Users size={12} className="mr-1" />
                        {investor.stage}
                      </p>
                      <div className="space-y-3 pt-4 border-t border-gray-50">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#6B7280]">Range</span>
                          <span className="text-[#111827]">{investor.investmentRange}</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#6B7280]">Location</span>
                          <span className="text-[#111827]">{investor.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {investor.industries.map((ind, i) => (
                            <span key={i} className="text-[10px] bg-[#F9FAFB] text-[#374151] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="btn-secondary w-full mt-6 py-2 text-xs font-bold uppercase tracking-widest">
                        Connect Portfolio
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
