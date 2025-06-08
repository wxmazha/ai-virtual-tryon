import ClothesSwapTool from './components/ClothesSwapTool';
import AIToolsSection from './components/AIToolsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">👕</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">AI Clothes Swapper</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#how" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#tool" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Try Now
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#tools" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Tools
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                AI Clothes{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent relative">
                  Swapper
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full opacity-30"></div>
                </span>
              </h1>
            </div>
            
            <div className="animate-fade-in-up delay-200">
              <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                🚀 Transform your style instantly with AI-powered virtual try-on technology. 
                <br className="hidden md:block" />
                <span className="font-semibold text-gray-700">Swap clothes effortlessly in seconds.</span>
              </p>
            </div>
            
            <div className="animate-fade-in-up delay-400">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 group">
                  <span className="flex items-center space-x-2">
                    <span>✨ Start Swapping Free</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  🎥 Watch Demo
                </button>
              </div>
            </div>
            
            <div className="animate-fade-in-up delay-600">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <span className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  🎯 No Registration
                </span>
                <span className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  ⚡ Instant Results
                </span>
                <span className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  💎 100% Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <AIToolsSection />

      {/* How It Works Section */}
      <section id="how" className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              ⚡ How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Three simple steps to transform your style with AI magic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">📸</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Your Photo</h3>
              <p className="text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/40">Upload a clear photo of yourself or choose from our models</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">👔</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Select Clothes</h3>
              <p className="text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/40">Choose the clothing item you want to try on</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">✨</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Results</h3>
              <p className="text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/40">Download your transformed image in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              🎨 Try AI Clothes Swapper
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Upload your photos and see the magic happen instantly</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <ClothesSwapTool />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              🎯 Use Cases of AI Clothes Swap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how our AI clothes changer transforms fashion experiences across different scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-100/80 to-indigo-200/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-xl group-hover:scale-110 transition-transform" style={{background: 'linear-gradient(135deg, #8b5cf6, #6366f1)'}}>
                🎭
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cosplay Clothing Swap</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">Ever wanted to be your favorite anime character, Disney princess, or Marvel superhero like Iron Man or Spider-Man? Now you can! Using our AI clothes swap, you can easily change into any character's costumes. Whether it's reliving your childhood superhero dreams or rocking a new cosplay look, changing clothes is just a few clicks away.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100/80 to-cyan-200/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-xl group-hover:scale-110 transition-transform" style={{background: 'linear-gradient(135deg, #3b82f6, #06b6d4)'}}>
                👗
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Virtually Try on New Outfits</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">Tired of guessing how clothes will look on you when shopping online? With AI Clothes Swapper, you can instantly try on outfits and see how they fit without ever stepping into a fitting room. It's the perfect tool for previewing clothes before you buy. Want to try a style you've never thought of before? Now you can!</p>
            </div>

            <div className="bg-gradient-to-br from-pink-100/80 to-rose-200/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-xl group-hover:scale-110 transition-transform" style={{background: 'linear-gradient(135deg, #ec4899, #f43f5e)'}}>
                📱
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Change Clothing for Social Media</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">While sharing photos on social media, you suddenly notice that your outfit doesn't quite fit the vibe. The clothes changer lets you quickly swap clothes, ensuring your photo's style is more in harmony. Do you want to join the AI clothing swap challenge on TikTok? Try our ai clothes changer online free now!</p>
            </div>

            <div className="bg-gradient-to-br from-green-100/80 to-emerald-200/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-xl group-hover:scale-110 transition-transform" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                🛍️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Clothing Swap in Fashion E-commerce</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">Fashion e-commerce sellers can now easily use outfit swap to try on new clothes before adding them to online stores. No more costly, time-consuming photoshoots. In seconds, you can create high-quality, realistic product images, giving buyers a clear view of how the clothes look when worn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">👕</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">AI Clothes Swapper</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              🚀 Transform your style with AI-powered virtual try-on technology. Free, fast, and realistic clothing swaps.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400 mb-8">
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>🔒</span>
                <span>Privacy</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>📋</span>
                <span>Terms</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                <span>📧</span>
                <span>Contact</span>
              </a>
            </div>
            <div className="border-t border-gray-700/50 pt-6 text-sm text-gray-400">
              © 2025 AI Clothes Swapper. All rights reserved. Made with ❤️ for fashion lovers.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
} 