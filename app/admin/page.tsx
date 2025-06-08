'use client';

import { useState, useEffect } from 'react';

interface ServiceStatus {
  name: string;
  configured: boolean;
  description: string;
  features: string[];
  pricing: string;
  setup_url: string;
  free_tier: string | boolean;
}

interface StatusData {
  overall: {
    configured_services: number;
    total_services: number;
    configuration_percentage: number;
    status: string;
  };
  services: Record<string, ServiceStatus>;
  recommendations: {
    for_testing: string;
    for_production: string;
    budget_friendly: string;
  };
  free_services: Array<{
    id: string;
    name: string;
    free_tier: string;
    setup_url: string;
  }>;
  setup_priorities: Array<{
    priority: number;
    service: string;
    reason: string;
    effort: string;
    value: string;
  }>;
}

export default function AdminPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatusData(data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!statusData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Failed to load status data</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'demo_mode': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                  <span className="text-white font-bold text-lg">⚙️</span>
                </div>
                <span className="text-xl font-bold text-gray-900">API管理面板</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">← 返回首页</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Status */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">系统状态总览</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {statusData.overall.configured_services}
              </div>
              <div className="text-gray-600">已配置服务</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {statusData.overall.total_services}
              </div>
              <div className="text-gray-600">总服务数</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {statusData.overall.configuration_percentage}%
              </div>
              <div className="text-gray-600">配置完成度</div>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(statusData.overall.status)}`}>
                {statusData.overall.status.replace('_', ' ').toUpperCase()}
              </div>
              <div className="text-gray-600 mt-1">系统状态</div>
            </div>
          </div>
        </div>

        {/* Environment Setup Guide */}
        <div className="mt-8 bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">🔧 环境变量配置</h2>
          
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h4 className="font-semibold mb-4">在项目根目录创建 .env.local 文件:</h4>
            <pre className="text-sm text-green-400 bg-gray-900 p-4 rounded-lg overflow-x-auto">
{`# Replicate AI (专业AI模型)
REPLICATE_API_TOKEN=your_replicate_token_here

# Remove.bg (背景移除 - 50次免费/月)
REMOVE_BG_API_KEY=your_removebg_key_here

# Hugging Face (免费AI模型)
HUGGING_FACE_API_TOKEN=your_hf_token_here

# OpenAI (图像生成)
OPENAI_API_KEY=your_openai_key_here`}
            </pre>
          </div>
          
          <div className="text-yellow-300 text-sm">
            <p>💡 提示: 配置完成后重启开发服务器 (npm run dev) 即可生效</p>
          </div>
        </div>
      </div>
    </div>
  );
} 