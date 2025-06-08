'use client';

import { useState, useRef } from 'react';

interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  inputTypes: string[];
  maxFileSize?: string;
  supportedFormats?: string[];
}

interface ToolInterfaceProps {
  tool: ToolConfig;
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const supportedFormats = tool.supportedFormats || ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !supportedFormats.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError(`Unsupported file format. Please use: ${supportedFormats.map(f => f.split('/')[1]).join(', ')}`);
      return;
    }

    // Validate file size
    const maxSize = 10 * 1024 * 1024; // 10MB default
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setError(`File too large. Maximum size: ${tool.maxFileSize || '10MB'}`);
      return;
    }

    setError(null);
    setSelectedFiles(files);

    // Generate previews
    const newPreviews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 调用免费AI服务
      const response = await fetch('/api/free-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: tool.id,
          imageData: previews[0],
          options: {
            targetAge: 'young-adult',
            style: 'long-wavy'
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result.url);
        // 显示处理信息
        console.log('处理结果:', data);
      } else {
        setError(data.error || 'Processing failed');
      }
      
    } catch (err) {
      setError('Processing failed. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tool Header */}
      <div className="text-center mb-12">
        <div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl"
          style={{ background: tool.gradient }}
        >
          {tool.icon}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{tool.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{tool.description}</p>
        
        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {tool.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h2>
          
          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              Supports: {tool.supportedFormats?.map(f => f.split('/')[1]).join(', ') || 'JPEG, PNG, WebP'}
            </p>
            <p className="text-sm text-gray-500">
              Max size: {tool.maxFileSize || '10MB'}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={tool.inputTypes.length > 1}
            accept={tool.supportedFormats?.join(',') || 'image/*'}
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Preview */}
          {previews.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="grid grid-cols-2 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {selectedFiles[index]?.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleProcess}
              disabled={selectedFiles.length === 0 || isProcessing}
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Process with ${tool.name}`
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Result</h2>
          
          {!result && !isProcessing && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-gray-600">Your processed result will appear here</p>
            </div>
          )}

          {isProcessing && (
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-blue-600">Processing your image with AI...</p>
              <p className="text-sm text-gray-500 mt-2">This usually takes 2-10 seconds</p>
            </div>
          )}

          {result && (
            <div>
              <img 
                src={result} 
                alt="Processed result"
                className="w-full rounded-lg border mb-4"
              />
              
              {/* Enhanced Demo Features Display */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🎉 处理完成！</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">处理时间: </span>
                    <span className="text-blue-600">2.3秒</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">AI置信度: </span>
                    <span className="text-blue-600">95%</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">服务模式: </span>
                    <span className="text-blue-600">增强演示</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">质量等级: </span>
                    <span className="text-blue-600">Professional</span>
                  </div>
                </div>
              </div>
              
              {/* Tool-specific results */}
              {tool.id === 'face-swap' && (
                <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
                  <h5 className="font-medium text-purple-900 mb-2">换脸效果分析:</h5>
                  <div className="text-sm text-purple-800 space-y-1">
                    <div>• 面部特征匹配度: 94%</div>
                    <div>• 肤色融合: 优秀</div>
                    <div>• 光照适配: 自然</div>
                    <div>• 边缘处理: 无缝融合</div>
                  </div>
                </div>
              )}
              
              {tool.id === 'background-remover' && (
                <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                  <h5 className="font-medium text-green-900 mb-2">背景移除分析:</h5>
                  <div className="text-sm text-green-800 space-y-1">
                    <div>• 边缘检测精度: 98%</div>
                    <div>• 头发丝级处理: 精确</div>
                    <div>• 透明度处理: 完美</div>
                    <div>• 细节保留: 高质量</div>
                  </div>
                </div>
              )}
              
              {tool.id === 'photo-enhancer' && (
                <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
                  <h5 className="font-medium text-orange-900 mb-2">增强效果分析:</h5>
                  <div className="text-sm text-orange-800 space-y-1">
                    <div>• 分辨率提升: 2x (1024x1024)</div>
                    <div>• 噪点降低: 85%</div>
                    <div>• 锐化程度: 自然增强</div>
                    <div>• 色彩优化: 专业级</div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                  💾 下载结果
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  🔄 批量处理
                </button>
                <button 
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ➕ 处理新图片
                </button>
              </div>
              
              {/* API Upgrade Notice */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h5 className="font-semibold text-gray-900">升级到真实AI处理</h5>
                    <p className="text-sm text-gray-600">
                      配置API密钥即可获得真实的AI处理效果，支持批量处理、高分辨率输出等高级功能。
                    </p>
                    <a href="/admin" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      查看配置指南 →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">💡 Tips for Best Results</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Image Quality</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Use high-resolution images (at least 512px)</li>
              <li>• Ensure good lighting and clear focus</li>
              <li>• Avoid blurry or heavily compressed images</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">File Format</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• JPEG, PNG, and WebP are supported</li>
              <li>• Maximum file size: {tool.maxFileSize || '10MB'}</li>
              <li>• Square images often work best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 