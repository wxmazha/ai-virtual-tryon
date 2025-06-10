'use client';

import { useState, useEffect } from 'react';

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  tags: string[];
  description: string;
}

interface ClothingCategory {
  name: string;
  icon: string;
  items: ClothingItem[];
}

interface ClothesData {
  categories: Record<string, ClothingCategory>;
  popular: string[];
  newest: string[];
}

interface ClothesLibraryProps {
  onSelect: (item: ClothingItem) => void;
  selectedItem?: ClothingItem | null;
}

export default function ClothesLibrary({ onSelect, selectedItem }: ClothesLibraryProps) {
  const [clothesData, setClothesData] = useState<ClothesData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('tops');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'categories' | 'popular' | 'newest'>('categories');
  const [loading, setLoading] = useState(true);

  // 加载服装数据
  useEffect(() => {
    const loadClothesData = async () => {
      try {
        const response = await fetch('/clothes/clothes-data.json');
        const data = await response.json();
        setClothesData(data);
      } catch (error) {
        console.error('Failed to load clothes data:', error);
        // 使用默认数据
        setClothesData({
          categories: {
            tops: {
              name: '上衣',
              icon: '👔',
              items: [
                {
                  id: 'demo-tshirt',
                  name: '演示T恤',
                  image: '/api/placeholder/150/200',
                  tags: ['演示', '基础'],
                  description: '演示服装项目'
                }
              ]
            }
          },
          popular: [],
          newest: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadClothesData();
  }, []);

  // 过滤服装项目
  const getFilteredItems = () => {
    if (!clothesData) return [];

    let items: ClothingItem[] = [];

    if (viewMode === 'popular') {
      items = clothesData.popular.map(id => 
        Object.values(clothesData.categories)
          .flatMap(cat => cat.items)
          .find(item => item.id === id)
      ).filter(Boolean) as ClothingItem[];
    } else if (viewMode === 'newest') {
      items = clothesData.newest.map(id => 
        Object.values(clothesData.categories)
          .flatMap(cat => cat.items)
          .find(item => item.id === id)
      ).filter(Boolean) as ClothingItem[];
    } else {
      items = clothesData.categories[activeCategory]?.items || [];
    }

    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return items;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">加载服装库中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!clothesData) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center text-gray-500">
          <p>服装库加载失败，请刷新页面重试</p>
        </div>
      </div>
    );
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">👗</span>
          预设服装库
        </h3>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="搜索服装..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('categories')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'categories'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            分类浏览
          </button>
          <button
            onClick={() => setViewMode('popular')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'popular'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            热门推荐
          </button>
          <button
            onClick={() => setViewMode('newest')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'newest'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            最新上架
          </button>
        </div>
      </div>

      {/* Category Tabs (Only show in categories mode) */}
      {viewMode === 'categories' && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(clothesData.categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>暂无匹配的服装项目</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-500 hover:text-blue-600 text-sm mt-2"
              >
                清除搜索条件
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                  selectedItem?.id === item.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image */}
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="200" viewBox="0 0 150 200">
                          <rect width="150" height="200" fill="#f3f4f6"/>
                          <text x="75" y="90" text-anchor="middle" fill="#6b7280" font-size="12" font-family="Arial, sans-serif">
                            ${item.name}
                          </text>
                          <text x="75" y="110" text-anchor="middle" fill="#9ca3af" font-size="24">👕</text>
                        </svg>
                      `)}`;
                    }}
                  />
                  
                  {/* Selection Indicator */}
                  {selectedItem?.id === item.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Item Info */}
      {selectedItem && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" viewBox="0 0 48 64">
                      <rect width="48" height="64" fill="#f3f4f6"/>
                      <text x="24" y="35" text-anchor="middle" fill="#9ca3af" font-size="16">👕</text>
                    </svg>
                  `)}`;
                }}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900">{selectedItem.name}</h4>
              <p className="text-xs text-blue-700 mt-1">{selectedItem.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-blue-500">
              ✓
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 