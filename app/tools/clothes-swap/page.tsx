import ToolInterface from '../../components/ToolInterface';

const clothesSwapConfig = {
  id: 'clothes-swap',
  name: 'AI Clothes Swapper',
  description: 'Try on different outfits and styles with AI. Upload your photo and swap clothes instantly for a complete virtual wardrobe experience.',
  icon: '👕',
  gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  features: [
    'Virtual Try-On',
    'Style Matching',
    'Realistic Fitting',
    'Multiple Clothing Types'
  ],
  inputTypes: ['person-photo', 'clothing-image'],
  maxFileSize: '10MB',
  supportedFormats: ['image/jpeg', 'image/png', 'image/webp']
};

export default function ClothesSwapPage() {
  return (
    <div>
      <ToolInterface tool={clothesSwapConfig} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clothing Categories */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Available Clothing Categories</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'T-Shirts', icon: '👕', count: '500+' },
              { name: 'Dresses', icon: '👗', count: '300+' },
              { name: 'Jackets', icon: '🧥', count: '200+' },
              { name: 'Shirts', icon: '👔', count: '400+' },
              { name: 'Sweaters', icon: '🧶', count: '150+' },
              { name: 'Pants', icon: '👖', count: '250+' },
              { name: 'Skirts', icon: '🎽', count: '180+' },
              { name: 'Suits', icon: '🤵', count: '100+' }
            ].map((category, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-4 text-center border hover:border-purple-300 transition-colors">
                <span className="text-3xl mb-2 block">{category.icon}</span>
                <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                <span className="text-xs text-gray-600">{category.count} styles</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">How Clothes Swapping Works</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">👤</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Body Detection</h4>
              <p className="text-gray-600">AI analyzes your body shape, pose, and proportions for accurate fitting.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">👕</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Garment Mapping</h4>
              <p className="text-gray-600">Smart algorithms map clothing pieces to your body with realistic draping and fit.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Perfect Result</h4>
              <p className="text-gray-600">Generate photorealistic images with natural lighting and shadows.</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Perfect For</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🛒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Online Shopping</h4>
                  <p className="text-gray-600 text-sm">Try before you buy - see how clothes look on you before making a purchase.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">👗</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fashion Experimentation</h4>
                  <p className="text-gray-600 text-sm">Explore new styles and discover what looks best on your body type.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Social Media</h4>
                  <p className="text-gray-600 text-sm">Create stunning outfit photos for Instagram, TikTok, and other platforms.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🎭</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Costume Design</h4>
                  <p className="text-gray-600 text-sm">Perfect for cosplay, theater, and creative projects requiring specific outfits.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏪</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">E-commerce Business</h4>
                  <p className="text-gray-600 text-sm">Showcase products on diverse models without expensive photo shoots.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💼</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Professional Wardrobe</h4>
                  <p className="text-gray-600 text-sm">Plan professional outfits for interviews, meetings, and special events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📸 Photography Tips</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-green-700">✅ Best Results</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Full-body photo with arms slightly away from body</li>
                <li>• Stand straight with good posture</li>
                <li>• Wear form-fitting clothes for accurate body mapping</li>
                <li>• Good lighting without harsh shadows</li>
                <li>• Plain background works best</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-red-700">❌ Avoid</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Baggy or loose-fitting clothes</li>
                <li>• Crossed arms or hands on hips</li>
                <li>• Sitting or lying down poses</li>
                <li>• Busy backgrounds or patterns</li>
                <li>• Low resolution or blurry images</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'AI Clothes Swapper - Virtual Try-On & Outfit Changer',
  description: 'Try on different outfits with AI clothes swapper. Virtual wardrobe experience with realistic fitting. Perfect for online shopping and fashion experimentation.',
  keywords: 'clothes swapper, virtual try on, AI fashion, outfit changer, virtual wardrobe, online shopping'
}; 