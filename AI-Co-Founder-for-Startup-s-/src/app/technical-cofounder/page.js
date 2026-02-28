'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import { Terminal, Lightbulb, Box, Code, ChevronRight, Zap, RefreshCw, Layers } from 'lucide-react';

export default function TechnicalCoFounder() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('mvp');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [mvpFeatures, setMvpFeatures] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [techStack, setTechStack] = useState('React/Node.js');
  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const generateMVPFeatures = async (idea) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/mvp-features/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          idea: idea,
          title: `${idea.title} - MVP Features`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMvpFeatures(data.mvpFeatures);
        setActiveTab('features');
      } else {
        throw new Error(data.message || 'Failed to generate MVP features');
      }
    } catch (error) {
      console.error('Error generating MVP features:', error);
      alert('Failed to generate MVP features. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCode = async (idea, features) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/code/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: idea,
          mvpFeatures: features,
          techStack: techStack
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedCode(data.code);
        setActiveTab('code');
      } else {
        throw new Error(data.message || 'Failed to generate code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again.');
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
          <Terminal className="mr-3 text-[#1E3A8A]" size={32} />
          Technical Co-Founder
        </h1>
        <p className="text-[#6B7280]">
          Build your MVP with AI-generated features, technical architecture, and production-ready code.
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
              { id: 'mvp', label: 'MVP Planning', icon: Rocket },
              { id: 'features', label: 'Feature List', icon: Box },
              { id: 'architecture', label: 'Architecture', icon: Layers },
              { id: 'code', label: 'Code Generator', icon: Code },
            ].map((tab) => {
              const Icon = tab.icon || (tab.id === 'mvp' ? Zap : tab.icon); // Fallback for Rocket handled below
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-saas border-b-2 ${activeTab === tab.id
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]'
                    }`}
                >
                  {tab.id === 'mvp' ? <Zap size={18} /> : <Icon size={18} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="card-saas p-8 min-h-[400px]">
            {activeTab === 'mvp' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111827]">MVP Planning</h3>
                  <button
                    onClick={() => generateMVPFeatures(selectedIdea)}
                    disabled={isGenerating}
                    className="btn-primary py-2 px-6 flex items-center"
                  >
                    {isGenerating ? (
                      <RefreshCw className="animate-spin mr-2" size={18} />
                    ) : (
                      <Zap className="mr-2" size={18} />
                    )}
                    Generate MVP Plan
                  </button>
                </div>
                <p className="text-[#374151] max-w-2xl">
                  Define your Minimum Viable Product with core features, technical requirements, and development timeline.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                    <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center">
                      <Target className="mr-2 text-[#1E3A8A]" size={16} />
                      MVP Principles
                    </h4>
                    <ul className="space-y-3 text-sm text-[#374151]">
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Focus on core value proposition
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Build only essential features
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Validate with real users quickly
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Iterate based on feedback
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                    <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center">
                      <Zap className="mr-2 text-[#F59E0B]" size={16} />
                      Development Approach
                    </h4>
                    <ul className="space-y-3 text-sm text-[#374151]">
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Agile development methodology
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Continuous integration/deployment
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        User feedback loops
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#1E3A8A] mr-2">•</span>
                        Rapid prototyping
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                {mvpFeatures ? (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <Box className="mr-2 text-[#1E3A8A]" size={20} />
                        Core MVP Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mvpFeatures.mvpFeatures?.map((feature, index) => (
                          <div key={index} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm hover:border-[#1E3A8A]/30 transition-saas">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-bold text-[#111827]">{feature.feature}</h5>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${feature.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-100' :
                                  feature.priority === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                    'bg-green-50 text-green-700 border border-green-100'
                                }`}>
                                {feature.priority}
                              </span>
                            </div>
                            <p className="text-sm text-[#374151] mb-4 leading-relaxed">{feature.description}</p>
                            <div className="flex items-center space-x-4 text-[11px] text-[#6B7280] font-medium uppercase tracking-tighter">
                              <span className="flex items-center">
                                <RefreshCw size={12} className="mr-1" />
                                Effort: {feature.effort}
                              </span>
                              <span className="flex items-center">
                                <Terminal size={12} className="mr-1" />
                                {feature.estimatedHours} Hours
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                      <h3 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <RefreshCw className="mr-2 text-[#6B7280]" size={20} />
                        Future Roadmap (Post-MVP)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mvpFeatures.futureFeatures?.map((feature, index) => (
                          <div key={index} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-bold text-[#111827]">{feature.feature}</h5>
                              <span className="text-[10px] bg-white border border-[#E5E7EB] text-[#6B7280] px-2 py-0.5 rounded font-bold uppercase">
                                {feature.release}
                              </span>
                            </div>
                            <p className="text-sm text-[#6B7280]">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <Box size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">No MVP Features Yet</h3>
                    <p className="text-[#6B7280] text-center max-w-md mb-8">
                      Build your product scope. Define what goes into V1.
                    </p>
                    <button
                      onClick={() => generateMVPFeatures(selectedIdea)}
                      disabled={isGenerating}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Analyzing Scope...' : 'Generate MVP Features'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-8">
                {mvpFeatures ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-[#111827] flex items-center">
                        <Layers className="mr-2 text-[#1E3A8A]" size={20} />
                        Technology Stack
                      </h3>
                      <div className="grid gap-3">
                        {[
                          { label: 'Frontend', val: mvpFeatures.technicalArchitecture?.frontend },
                          { label: 'Backend', val: mvpFeatures.technicalArchitecture?.backend },
                          { label: 'Database', val: mvpFeatures.technicalArchitecture?.database },
                          { label: 'Infrastructure', val: mvpFeatures.technicalArchitecture?.infrastructure },
                        ].map((tech, i) => (
                          <div key={i} className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm">
                            <h5 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">{tech.label}</h5>
                            <p className="text-sm font-semibold text-[#111827]">{tech.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-[#111827] flex items-center">
                        <Terminal className="mr-2 text-[#1E3A8A]" size={20} />
                        Development Timeline
                      </h3>
                      <div className="space-y-4">
                        {mvpFeatures.developmentTimeline && Object.entries(mvpFeatures.developmentTimeline).map(([phase, details]) => (
                          <div key={phase} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 border-l-4 border-l-[#1E3A8A]">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-bold text-[#111827]">
                                {phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h5>
                              <span className="text-xs bg-white border border-[#E5E7EB] px-2 py-1 rounded text-[#1E3A8A] font-bold">
                                {details.duration}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {details.features?.map((f, i) => (
                                <span key={i} className="text-[10px] text-[#6B7280] bg-white border border-[#E5E7EB] px-1.5 py-0.5 rounded">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <Layers size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Architecture Not Built</h3>
                    <p className="text-[#6B7280] text-center max-w-md mb-8">
                      Technical blueprints will appear here once features are defined.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111827]">Full-Stack Code Generator</h3>
                  <div className="flex items-center space-x-3">
                    <select
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none"
                    >
                      <option value="React/Node.js">React/Node.js</option>
                      <option value="Vue.js/Express">Vue.js/Express</option>
                      <option value="Angular/NestJS">Angular/NestJS</option>
                      <option value="Next.js/Prisma">Next.js/Prisma</option>
                      <option value="Flutter/Firebase">Flutter/Firebase</option>
                    </select>
                    <button
                      onClick={() => generateCode(selectedIdea, mvpFeatures)}
                      disabled={isGenerating || !mvpFeatures}
                      className="btn-primary py-2 px-6 flex items-center text-sm font-semibold"
                    >
                      {isGenerating ? (
                        <RefreshCw className="animate-spin mr-2" size={16} />
                      ) : (
                        <Code className="mr-2" size={16} />
                      )}
                      Generate Code
                    </button>
                  </div>
                </div>

                {generatedCode ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                      <div className="card-saas p-6 bg-[#F9FAFB] border border-[#E5E7EB]">
                        <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Project Structure</h4>
                        <div className="bg-[#111827] rounded-lg p-4 font-mono text-[11px] text-[#D1D5DB] overflow-x-auto shadow-inner">
                          <pre className="leading-relaxed">
                            {JSON.stringify(generatedCode.projectStructure, null, 2)}
                          </pre>
                        </div>
                      </div>
                      <div className="card-saas p-6 bg-[#F9FAFB] border border-[#E5E7EB]">
                        <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Deployment</h4>
                        <div className="text-[11px] text-[#374151] leading-relaxed bg-white border border-[#E5E7EB] p-4 rounded-lg">
                          {generatedCode.deployment?.deploymentGuide || 'Analyzing CI/CD pathways...'}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                      <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Example Implementation</h4>
                      <div className="space-y-6">
                        {Object.entries(generatedCode.codeFiles || {}).slice(0, 2).map(([filename, content]) => (
                          <div key={filename} className="bg-[#111827] rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-[#1E293B] px-4 py-2 flex justify-between items-center border-b border-[#334155]">
                              <span className="text-[10px] font-bold text-[#94A3B8] font-mono">{filename}</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                              </div>
                            </div>
                            <div className="p-4 overflow-x-auto">
                              <pre className="text-[11px] text-[#F8FAFC] font-mono leading-loose">
                                {content.substring(0, 1000)}...
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-[#F9FAFB] rounded-2xl border border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4">
                      <Code size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Boilerplate Not Generated</h3>
                    <p className="text-[#6B7280] text-center max-w-sm mb-8">
                      Select your stack and click generate to get production-ready code modules.
                      {!mvpFeatures && ' (MVP features required)'}
                    </p>
                    <button
                      onClick={() => generateCode(selectedIdea, mvpFeatures)}
                      disabled={isGenerating || !mvpFeatures}
                      className="btn-primary px-8 py-3"
                    >
                      {isGenerating ? 'Architecting...' : 'Start Generating'}
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















