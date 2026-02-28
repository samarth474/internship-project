'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import { Layout, FileText, Target, PieChart, ChevronRight, Zap, RefreshCw } from 'lucide-react';

export default function BusinessPlanning() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('canvas');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [businessPlan, setBusinessPlan] = useState(null);
  const [pitchDeck, setPitchDeck] = useState(null);
  const [financialModel, setFinancialModel] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const generateBusinessPlan = async (idea) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/business-plan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          idea: idea,
          title: `${idea.title} - Business Plan`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setBusinessPlan(data.businessPlan);
        setActiveTab('plan');
      } else {
        throw new Error(data.message || 'Failed to generate business plan');
      }
    } catch (error) {
      console.error('Error generating business plan:', error);
      alert('Failed to generate business plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePitchDeck = async (idea, plan) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/pitch-deck/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          idea: idea,
          businessPlan: plan,
          title: `${idea.title} - Pitch Deck`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPitchDeck(data.pitchDeck);
        setActiveTab('pitch');
      } else {
        throw new Error(data.message || 'Failed to generate pitch deck');
      }
    } catch (error) {
      console.error('Error generating pitch deck:', error);
      alert('Failed to generate pitch deck. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFinancialModel = async (idea, plan) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/financial-model/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          idea: idea,
          businessPlan: plan,
          title: `${idea.title} - Financial Model`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setFinancialModel(data.financialModel);
        setActiveTab('financial');
      } else {
        throw new Error(data.message || 'Failed to generate financial model');
      }
    } catch (error) {
      console.error('Error generating financial model:', error);
      alert('Failed to generate financial model. Please try again.');
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
          <PieChart className="mr-3 text-[#1E3A8A]" size={32} />
          Business Planning Hub
        </h1>
        <p className="text-[#6B7280]">
          Create comprehensive business plans, pitch decks, and financial models with AI assistance.
        </p>
      </div>

      {/* Idea Selection */}
      {!selectedIdea && (
        <div className="card-saas p-8 mb-8">
          <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center">
            <Zap className="mr-2 text-[#F59E0B]" size={20} />
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
                  <span className="text-[#6B7280]">{idea.marketSize}</span>
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
              { id: 'canvas', label: 'Lean Canvas', icon: Layout },
              { id: 'plan', label: 'Business Plan', icon: FileText },
              { id: 'pitch', label: 'Pitch Deck', icon: Target },
              { id: 'financial', label: 'Financial Model', icon: PieChart },
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
            {activeTab === 'canvas' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111827]">Lean Canvas Generator</h3>
                  <button
                    onClick={() => generateBusinessPlan(selectedIdea)}
                    disabled={isGenerating}
                    className="btn-primary py-2 px-6 flex items-center"
                  >
                    {isGenerating ? (
                      <RefreshCw className="animate-spin mr-2" size={18} />
                    ) : (
                      <Zap className="mr-2" size={18} />
                    )}
                    Generate Canvas
                  </button>
                </div>
                <p className="text-[#374151] max-w-2xl">
                  The Lean Canvas helps you validate your business model assumptions in a single page.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { title: 'Problem', desc: 'Top 3 problems' },
                    { title: 'Solution', desc: 'Top 3 features' },
                    { title: 'Key Metrics', desc: 'Success indicators' },
                    { title: 'Value Prop', desc: 'Unique message' },
                    { title: 'Advantage', desc: 'Unfair edge' },
                    { title: 'Channels', desc: 'Path to customers' },
                    { title: 'Segments', desc: 'Target users' },
                    { title: 'Costs', desc: 'Key expenses' },
                    { title: 'Revenue', desc: 'How you earn' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">{item.title}</h4>
                      <p className="text-sm text-[#6B7280] italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-8">
                {businessPlan ? (
                  <div className="prose prose-blue max-w-none">
                    <h3 className="text-2xl font-bold text-[#111827] mb-6">Executive Summary</h3>
                    <p className="text-[#374151] leading-relaxed mb-8 bg-blue-50/30 p-6 rounded-xl border border-blue-50">
                      {businessPlan.executiveSummary}
                    </p>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-lg font-bold text-[#111827] mb-4">Market Analysis</h4>
                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-[#6B7280]">Market Size</span>
                            <span className="font-semibold text-[#111827]">{businessPlan.marketAnalysis?.marketSize}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-[#6B7280]">Target Segment</span>
                            <span className="font-semibold text-[#111827]">{businessPlan.marketAnalysis?.targetMarket}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#111827] mb-4">Financial Projections</h4>
                        <div className="space-y-4 text-sm">
                          {['Year 1', 'Year 2', 'Year 3'].map((year, i) => (
                            <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-[#6B7280]">{year} Revenue</span>
                              <span className="font-semibold text-[#111827]">
                                ${businessPlan.financialProjections?.[`year${i + 1}`]?.revenue?.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">No Business Plan Generated</h3>
                    <p className="text-[#6B7280] text-center max-w-md mb-8">
                      Ready to build your roadmap? Generate a full PDF-ready business plan with AI.
                    </p>
                    <button
                      onClick={() => generateBusinessPlan(selectedIdea)}
                      disabled={isGenerating}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Generating Roadmap...' : 'Generate Business Plan'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pitch' && (
              <div className="space-y-8">
                {pitchDeck ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {pitchDeck.slides?.map((slide, index) => (
                      <div key={index} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md transition-saas border-t-4 border-t-[#1E3A8A]">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-[#1E3A8A] uppercase">Slide {slide.slideNumber}</span>
                          <span className="text-xs font-medium text-[#6B7280] bg-gray-50 px-2 py-1 rounded">Visual Script ready</span>
                        </div>
                        <h4 className="text-lg font-bold text-[#111827] mb-3">{slide.title}</h4>
                        <p className="text-sm text-[#374151] mb-6 leading-relaxed">{slide.content}</p>
                        {slide.notes && (
                          <div className="text-xs text-[#6B7280] bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                            <strong>Presenter Notes:</strong> {slide.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <Target size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Pitch Deck Not Created</h3>
                    <p className="text-[#6B7280] text-center max-w-md mb-8">
                      Convert your plan into a storytelling masterpiece for investors.
                    </p>
                    <button
                      onClick={() => generatePitchDeck(selectedIdea, businessPlan)}
                      disabled={isGenerating}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Drafting Slides...' : 'Generate Pitch Deck'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-8">
                {financialModel ? (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="card-saas p-6 bg-[#F9FAFB]">
                      <h4 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <PieChart className="mr-2" size={20} />
                        Revenue Projections
                      </h4>
                      <div className="space-y-4">
                        {[1, 2, 3].map((year) => (
                          <div key={year} className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#E5E7EB]">
                            <span className="text-sm font-medium text-[#6B7280]">Year {year}</span>
                            <span className="text-lg font-bold text-[#1E3A8A]">
                              ${financialModel.revenueProjections?.[`year${year}`]?.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card-saas p-6 bg-[#F9FAFB]">
                      <h4 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <Target className="mr-2" size={20} />
                        Unit Economics
                      </h4>
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-[#6B7280] uppercase font-bold mb-1">CAC</p>
                            <p className="text-[#111827] font-semibold">Customer Acquisition</p>
                          </div>
                          <p className="text-2xl font-bold text-[#1E3A8A]">${financialModel.unitEconomics?.customerAcquisitionCost}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-[#6B7280] uppercase font-bold mb-1">LTV</p>
                            <p className="text-[#111827] font-semibold">Lifetime Value</p>
                          </div>
                          <p className="text-2xl font-bold text-[#1E3A8A]">${financialModel.unitEconomics?.lifetimeValue}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm font-medium text-[#6B7280]">Payback Period: <span className="text-[#111827] font-bold">{financialModel.unitEconomics?.paybackPeriod} months</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <PieChart size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Financial Model Missing</h3>
                    <p className="text-[#6B7280] text-center max-w-md mb-8">
                      Crunch the numbers. Get detailed P&L forecasts and unit economics.
                    </p>
                    <button
                      onClick={() => generateFinancialModel(selectedIdea, businessPlan)}
                      disabled={isGenerating}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Calculating Numbers...' : 'Generate Financial Model'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}















