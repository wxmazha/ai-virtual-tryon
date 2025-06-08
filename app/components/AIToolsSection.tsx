'use client';

import { useState } from 'react';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  category: string;
  comingSoon?: boolean;
}

const aiTools: AITool[] = [
  {
    id: 'clothes-swap',
    name: 'AI Clothes Swapper',
    description: 'Swap clothes with cutting-edge AI technology makes seamless outfit changes effortless',
    icon: '👕',
    color: 'blue',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    category: 'clothes'
  },
  {
    id: 'vton-webui',
    name: 'VTON-WebUI Professional',
    description: 'Professional virtual try-on with advanced AI models',
    icon: '🚀',
    color: 'purple',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    category: 'clothes'
  },
  {
    id: 'clothes-color-changer',
    name: 'Clothes Color Changer',
    description: 'Change clothing colors instantly',
    icon: '🎨',
    color: 'red',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    category: 'clothes',
    comingSoon: true
  }
];

const categories = [
  { id: 'all', name: 'All Tools', count: aiTools.length },
  { id: 'clothes', name: 'Clothing', count: aiTools.filter(tool => tool.category === 'clothes').length }
];

// 示例图片数据
const exampleResults = [
  {
    id: 1,
    title: "休闲风格变换",
    original: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    result: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    clothing: "休闲T恤 & 牛仔裤",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 2,
    title: "商务正装造型",
    original: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop&crop=face",
    result: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face",
    clothing: "专业西装",
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 3,
    title: "夏日连衣裙风格",
    original: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
    result: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop&crop=face",
    clothing: "花朵夏裙",
    color: "from-emerald-400 to-teal-400"
  }
];

export default function AIToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const filteredTools = selectedCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    // 特殊处理VTON-WebUI
    if (toolId === 'vton-webui') {
      window.location.href = '/vton-webui';
    } else if (toolId === 'clothes-swap') {
      // 跳转到主页面的换衣工具部分
      window.location.href = '/#tool';
    } else {
      // 导航到工具页面
      window.location.href = `/tools/${toolId}`;
    }
  };

  return (
    <section id="tools" className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-pattern">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            🔥 AI Clothes Swapping Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of virtual fashion with our AI-powered clothes swapping technology. 
            <br className="hidden md:block" />
            <span className="font-semibold text-gray-700">Transform your style instantly with realistic clothing changes.</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl border-transparent'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80 border-white/40 shadow-lg'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{category.name}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              onClick={() => !tool.comingSoon && handleToolClick(tool.id)}
              className={`relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/30 transition-all duration-500 cursor-pointer group shadow-xl hover:shadow-2xl card-hover ${
                tool.comingSoon ? 'opacity-75' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  🚀 Coming Soon
                </div>
              )}
              
              <div className="text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-all duration-300 animate-pulse-glow"
                  style={{ background: tool.gradient }}
                >
                  {tool.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {tool.description}
                </p>
                
                <button 
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 btn-ripple ${
                    tool.comingSoon
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                  disabled={tool.comingSoon}
                >
                  {tool.comingSoon ? '🔜 Coming Soon' : '✨ Try Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Transform Examples */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              ✨ AI变换效果展示
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              看看我们的AI技术如何完美地进行服装变换，效果惊艳真实
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {exampleResults.map((example, index) => (
              <div 
                key={example.id} 
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/30 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="p-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${example.color} text-white shadow-lg mb-4`}>
                    🎯 {example.title}
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-6">
                    {/* Original Image */}
                    <div className="flex-1">
                      <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow">
                        <img 
                          src={example.original} 
                          alt="原图" 
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE2IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+📷 原图</dGV4dD4KPC9zdmc+';
                          }}
                        />
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          📷 原图
                        </div>
                      </div>
                    </div>
                    
                    {/* Magic Arrow */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-gray-500 font-medium">AI魔法</span>
                      </div>
                    </div>
                    
                    {/* Result Image */}
                    <div className="flex-1">
                      <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow">
                        <img 
                          src={example.result} 
                          alt="效果" 
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUZGNkZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOEI1Q0Y2IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+✨ 效果</dGV4dD4KPC9zdmc+';
                          }}
                        />
                        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          ✨ 效果
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-blue-200/50 font-medium">
                      👕 {example.clothing}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 查看更多效果按钮 */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 btn-ripple">
              <span className="flex items-center space-x-2">
                <span>🎨 查看更多变换效果</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-md text-gray-800 px-10 py-6 rounded-3xl text-lg font-semibold border border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-3xl mr-4 animate-bounce">👕</span>
            <div className="text-left">
              <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                免费AI换衣工具
              </div>
              <div className="text-sm text-gray-600">无需注册，即刻体验未来时尚科技</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 