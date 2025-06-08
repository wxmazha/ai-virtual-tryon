export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                  <span className="text-white font-bold text-lg">🔄</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AI Tools</span>
              </a>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                <a href="/#tools" className="text-gray-600 hover:text-blue-600 transition-colors">All Tools</a>
                <a href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              </nav>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 AI Tools Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 