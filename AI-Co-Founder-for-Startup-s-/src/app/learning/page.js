'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { getUserInfo } from '../../utils/auth';
import {
  GraduationCap,
  BookOpen,
  Users,
  MessageSquare,
  ChevronRight,
  RefreshCw,
  Zap,
  Bookmark,
  Heart,
  Send,
  Coffee,
  Clock,
  Target
} from 'lucide-react';

export default function Learning() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('path');
  const [learningPath, setLearningPath] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pathForm, setPathForm] = useState({
    interests: [],
    currentSkills: [],
    goals: ''
  });
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'question'
  });
  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const generateLearningPath = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/learning-path/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
          role: user?.role,
          interests: pathForm.interests,
          currentSkills: pathForm.currentSkills,
          title: `Personalized Learning Path for ${user?.profile?.firstName || 'User'}`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLearningPath(data.learningPath);
        setActiveTab('path');
      } else {
        throw new Error(data.message || 'Failed to generate learning path');
      }
    } catch (error) {
      console.error('Error generating learning path:', error);
      alert('Failed to generate learning path. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadSampleCommunityPosts = () => {
    setCommunityPosts([
      {
        id: 1,
        title: "How to validate a startup idea before building?",
        content: "I have an idea for a SaaS product but I'm not sure if there's a real market need. What are the best ways to validate before investing time and money?",
        category: "question",
        author: "Sarah Chen",
        replies: 12,
        likes: 8,
        createdAt: "2 hours ago"
      },
      {
        id: 2,
        title: "My experience raising a seed round",
        content: "Just closed our $2M seed round after 6 months of pitching. Here's what I learned about the process, common mistakes, and what investors really care about...",
        category: "experience",
        author: "Mike Rodriguez",
        replies: 25,
        likes: 45,
        createdAt: "1 day ago"
      },
      {
        id: 3,
        title: "Best resources for learning product management",
        category: "resource",
        content: "Curated list of books, courses, and tools that helped me transition from engineering to product management. Includes both free and paid resources.",
        author: "Alex Kim",
        replies: 7,
        likes: 23,
        createdAt: "3 days ago"
      }
    ]);
  };

  useEffect(() => {
    loadSampleCommunityPosts();
  }, []);

  const interestOptions = [
    'Product Management', 'Marketing', 'Sales', 'Finance', 'Operations',
    'Technology', 'Design', 'Leadership', 'Fundraising', 'Strategy'
  ];

  const skillOptions = [
    'Beginner', 'Intermediate', 'Advanced', 'Expert'
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111827] mb-2 flex items-center">
          <GraduationCap className="mr-3 text-[#1E3A8A]" size={32} />
          Learning & Mentorship
        </h1>
        <p className="text-[#6B7280]">
          Personalized learning paths, expert mentorship, and a supportive community.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-[#E5E7EB] mb-8">
        {[
          { id: 'path', label: 'Learning Path', icon: BookOpen },
          { id: 'community', label: 'Community', icon: Users },
          { id: 'mentorship', label: 'Mentorship', icon: Coffee },
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
      <div className="min-h-[400px]">
        {activeTab === 'path' && (
          <div className="space-y-6">
            {!learningPath ? (
              <div className="card-saas p-8 max-w-4xl">
                <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center">
                  <Zap className="mr-2 text-[#F59E0B]" size={20} />
                  Configure Your Learning Journey
                </h3>

                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">Areas of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => {
                            setPathForm(prev => ({
                              ...prev,
                              interests: prev.interests.includes(interest)
                                ? prev.interests.filter(i => i !== interest)
                                : [...prev.interests, interest]
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-saas ${pathForm.interests.includes(interest)
                              ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                              : 'bg-white border-[#E5E7EB] text-[#374151] hover:border-[#1E3A8A]'
                            }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">Current Skill Level</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {skillOptions.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            setPathForm(prev => ({
                              ...prev,
                              currentSkills: prev.currentSkills.includes(skill)
                                ? prev.currentSkills.filter(s => s !== skill)
                                : [...prev.currentSkills, skill]
                            }));
                          }}
                          className={`p-3 rounded-xl text-sm font-medium border transition-saas flex flex-col items-center justify-center space-y-2 ${pathForm.currentSkills.includes(skill)
                              ? 'bg-blue-50 border-[#1E3A8A] text-[#1E3A8A]'
                              : 'bg-white border-[#E5E7EB] text-[#374151] hover:border-[#1E3A8A]'
                            }`}
                        >
                          <Target size={16} />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">Specific Goals</label>
                    <textarea
                      value={pathForm.goals}
                      onChange={(e) => setPathForm(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder="e.g., I want to lead a product team of 5 engineers within the next year..."
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111827] h-32 focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={generateLearningPath}
                    disabled={isGenerating || pathForm.interests.length === 0}
                    className="btn-primary w-full py-4 flex items-center justify-center text-lg shadow-md"
                  >
                    {isGenerating ? (
                      <RefreshCw className="animate-spin mr-2" size={20} />
                    ) : (
                      <Zap className="mr-2" size={20} />
                    )}
                    Generate Personalized Path
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">{learningPath.title || 'Your Learning Path'}</h3>
                    <p className="text-sm text-[#6B7280]">Generated based on your interests and skill level.</p>
                  </div>
                  <button
                    onClick={() => setLearningPath(null)}
                    className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-saas"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <section className="card-saas p-6">
                      <h4 className="text-lg font-bold text-[#111827] mb-6 flex items-center">
                        <Clock className="mr-2 text-[#1E3A8A]" size={20} />
                        Curated Timeline
                      </h4>
                      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E5E7EB] before:to-transparent">
                        {Object.entries(learningPath.timeline || {}).map(([week, tasks], idx) => (
                          <div key={week} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#F9FAFB] text-[#1E3A8A] font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                              {idx + 1}
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-[#E5E7EB] shadow-sm">
                              <div className="flex items-center justify-between space-x-2 mb-1">
                                <span className="font-bold text-[#111827] uppercase text-xs tracking-wider">{week.replace(/_/g, ' ')}</span>
                              </div>
                              <ul className="space-y-2 mt-3">
                                {tasks.map((task, i) => (
                                  <li key={i} className="text-sm text-[#374151] flex items-start">
                                    <span className="text-[#1E3A8A] mr-2">•</span>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section className="card-saas p-6">
                      <h4 className="text-lg font-bold text-[#111827] mb-4 flex items-center">
                        <BookOpen className="mr-2 text-[#1E3A8A]" size={20} />
                        Core Courses
                      </h4>
                      <div className="space-y-4">
                        {learningPath.courses?.map((course, index) => (
                          <div key={index} className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] hover:border-[#1E3A8A]/30 transition-saas group">
                            <h5 className="font-bold text-[#111827] text-sm mb-1 group-hover:text-[#1E3A8A]">{course.title}</h5>
                            <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-[#6B7280]">{course.provider}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${course.difficulty === 'beginner' ? 'bg-green-50 text-green-700' :
                                  course.difficulty === 'intermediate' ? 'bg-amber-50 text-amber-700' :
                                    'bg-red-50 text-red-700'
                                }`}>
                                {course.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="card-saas p-6">
                      <h4 className="text-lg font-bold text-[#111827] mb-4 flex items-center">
                        <Bookmark className="mr-2 text-[#1E3A8A]" size={20} />
                        Must Reads
                      </h4>
                      <div className="space-y-4">
                        {learningPath.readingList?.map((book, index) => (
                          <div key={index} className="flex space-x-3 items-center p-3 hover:bg-gray-50 rounded-lg transition-saas border border-transparent hover:border-[#E5E7EB]">
                            <div className="w-8 h-10 bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded flex items-center justify-center shrink-0">
                              <BookOpen size={14} className="text-[#1E3A8A]" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-sm font-bold text-[#111827] truncate">{book.title}</h5>
                              <p className="text-[10px] text-[#6B7280]">{book.author}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-saas p-6">
                <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center">
                  <MessageSquare className="mr-2 text-[#1E3A8A]" size={20} />
                  Recent Discussions
                </h3>
                <div className="space-y-4">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="p-6 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-saas cursor-pointer group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-[#111827] group-hover:text-[#1E3A8A] transition-saas">{post.title}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${post.category === 'question' ? 'bg-blue-50 text-blue-700' :
                            post.category === 'experience' ? 'bg-green-50 text-green-700' :
                              'bg-purple-50 text-purple-700'
                          }`}>
                          {post.category}
                        </span>
                      </div>
                      <p className="text-sm text-[#374151] mb-6 line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#111827]">
                            {post.author[0]}
                          </div>
                          <span className="text-[#6B7280] font-medium">{post.author} • {post.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-[#6B7280] font-medium">
                          <span className="flex items-center"><MessageSquare size={14} className="mr-1" /> {post.replies}</span>
                          <span className="flex items-center"><Heart size={14} className="mr-1" /> {post.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-saas p-6">
                <h3 className="text-lg font-bold text-[#111827] mb-6">Start a Conversation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Topic Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                    >
                      <option value="question">Question</option>
                      <option value="advice">Advice</option>
                      <option value="experience">Experience</option>
                      <option value="resource">Resource</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Subject</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Seeking advice on hires..."
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Body Content</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your context..."
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] h-32 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10 resize-none"
                    />
                  </div>
                  <button className="btn-primary w-full py-3 flex items-center justify-center font-bold">
                    <Send className="mr-2" size={18} />
                    Post Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mentorship' && (
          <div className="space-y-12">
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827]">Industry Mentors</h3>
                  <p className="text-[#6B7280]">Verified experts ready to help you navigate startup life.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#111827] uppercase tracking-widest">Filters</span>
                  <div className="w-10 h-10 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <Target size={18} className="text-[#6B7280]" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    title: "Former VP at Google",
                    expertise: "Product Strategy, Scaling",
                    experience: "15+ years",
                    availability: "Available",
                    rate: "$200/hr"
                  },
                  {
                    name: "Michael Chen",
                    title: "Serial Entrepreneur",
                    expertise: "Fundraising, Operations",
                    experience: "20+ years",
                    availability: "Available",
                    rate: "$150/hr"
                  },
                  {
                    name: "Lisa Rodriguez",
                    title: "Partner at Tech Ventures",
                    expertise: "Investment, Due Diligence",
                    experience: "12+ years",
                    availability: "Limited",
                    rate: "$300/hr"
                  }
                ].map((mentor, index) => (
                  <div key={index} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:border-[#1E3A8A] transition-saas group">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#1E3A8A] shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100">
                        {mentor.name[0]}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#111827] group-hover:text-[#1E3A8A] transition-saas">{mentor.name}</h4>
                        <p className="text-xs text-[#6B7280] font-medium">{mentor.title}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#6B7280]">Expertise</span>
                        <span className="text-[#111827]">{mentor.expertise}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#6B7280]">Experience</span>
                        <span className="text-[#111827]">{mentor.experience}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#6B7280]">Hourly Rate</span>
                        <span className="text-[#1E3A8A]">{mentor.rate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${mentor.availability === 'Available' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                        {mentor.availability}
                      </span>
                      <button className="btn-secondary py-2 px-6 text-xs font-bold uppercase tracking-widest group-hover:bg-[#1E3A8A] group-hover:text-white transition-saas">
                        View Calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card-saas p-8 border-t-4 border-t-[#1E3A8A]">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">Upcoming Live Sessions</h3>
                  <p className="text-sm text-[#6B7280]">Join community workshops and Q&A office hours.</p>
                </div>
                <button className="text-[#1E3A8A] text-sm font-bold flex items-center hover:underline">
                  View Schedule <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Fundraising 101 with VC Partner",
                    expert: "David Kim",
                    time: "Tomorrow, 2:00 PM PST",
                    topic: "Pitch deck reviews and first check strategy"
                  },
                  {
                    title: "Product-Market Fit Workshop",
                    expert: "Emma Wilson",
                    time: "Friday, 10:00 AM PST",
                    topic: "Validating demand before full scale build"
                  }
                ].map((session, index) => (
                  <div key={index} className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl hover:border-[#1E3A8A]/30 transition-saas group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#1E3A8A]">
                        <Zap size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-widest">{session.time}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#111827] mb-2">{session.title}</h4>
                    <p className="text-sm text-[#374151] mb-6">{session.topic}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full font-bold text-[10px] flex items-center justify-center">{session.expert[0]}</div>
                        <span className="text-xs font-bold text-[#111827]">{session.expert}</span>
                      </div>
                      <button className="text-[#1E3A8A] text-xs font-bold uppercase tracking-widest group-hover:bg-[#1E3A8A] group-hover:text-white px-4 py-2 rounded-lg transition-saas">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
