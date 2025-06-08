'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface SwapResult {
  original: string;
  result: string;
  processingTime: number;
  service?: string;
  model?: string;
  message?: string;
  setup_instructions?: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
}

// AI模型配置
const MODELS = {
  IDM_VTON: {
    id: 'IDM_VTON',
    name: 'IDM-VTON',
    description: '高质量虚拟试衣模型，精确配合',
    time: '30-60秒',
    features: ['高质量输出', '精确配合', '自然光影']
  },
  OUTFIT_ANYONE: {
    id: 'OUTFIT_ANYONE',
    name: 'Outfit Anyone',
    description: '通用服装试穿模型，快速处理',
    time: '20-40秒',
    features: ['快速处理', '多种服装', '稳定输出']
  },
  VIRTUAL_TRYON: {
    id: 'VIRTUAL_TRYON',
    name: 'Virtual Try-On',
    description: '专业虚拟试衣解决方案，快速预览',
    time: '15-30秒',
    features: ['快速预览', '轻量化', '实时效果']
  }
};

export default function ClothesSwapTool() {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [clothesImage, setClothesImage] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [clothesPreview, setClothesPreview] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<keyof typeof MODELS>('IDM_VTON');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SwapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Person image dropzone
  const onPersonDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPersonImage(file);
      const reader = new FileReader();
      reader.onload = () => setPersonPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  // Clothes image dropzone
  const onClothesDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setClothesImage(file);
      const reader = new FileReader();
      reader.onload = () => setClothesPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getPersonRootProps, getInputProps: getPersonInputProps, isDragActive: isPersonDragActive } = useDropzone({
    onDrop: onPersonDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const { getRootProps: getClothesRootProps, getInputProps: getClothesInputProps, isDragActive: isClothesDragActive } = useDropzone({
    onDrop: onClothesDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  // API调用函数 - 这里使用模拟API，您可以替换为真实的AI服务
  const swapClothes = async () => {
    if (!personImage || !clothesImage) {
      setError('请上传人物照片和服装图片');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 模拟API调用 - 替换为真实的AI服务端点
      const formData = new FormData();
      formData.append('person', personImage);
      formData.append('clothes', clothesImage);
      formData.append('model', selectedModel);

      // 调用真实的API端点
      const response = await axios.post('/api/clothes-swap', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60秒超时
      });

      setResult({
        original: personPreview!,
        result: response.data.result_url,
        processingTime: response.data.processing_time,
        service: response.data.service,
        model: response.data.model,
        message: response.data.message,
        setup_instructions: response.data.setup_instructions
      });

    } catch (err) {
      console.error('Error swapping clothes:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          setError(`API错误: ${axiosError.response.data.error}`);
        } else {
          setError('处理失败，请重试。如果问题持续存在，请检查图片格式和大小。');
        }
      } else {
        setError('处理失败，请重试。如果问题持续存在，请检查图片格式和大小。');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setPersonImage(null);
    setClothesImage(null);
    setPersonPreview(null);
    setClothesPreview(null);
    setSelectedModel('IDM_VTON');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {!result ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step 1: Upload Person Photo */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">上传人物照片</h3>
              <p className="text-gray-600 text-sm">选择清晰的人物照片获得最佳效果</p>
            </div>
            
            <div 
              {...getPersonRootProps()} 
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isPersonDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getPersonInputProps()} />
              {personPreview ? (
                <div>
                  <img src={personPreview} alt="Person" className="w-full h-40 object-cover rounded-lg mb-3" />
                  <p className="text-green-600 font-medium text-sm">✓ 照片已上传</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 text-gray-400 mx-auto mb-3">📷</div>
                  <p className="text-gray-600 font-medium">点击或拖拽上传照片</p>
                  <p className="text-gray-400 text-sm">PNG、JPG格式，最大10MB</p>
                </>
              )}
            </div>
          </div>

          {/* Step 2: Upload Clothes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">选择服装</h3>
              <p className="text-gray-600 text-sm">上传服装图片或描述想要的外观</p>
            </div>

            <div 
              {...getClothesRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isClothesDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getClothesInputProps()} />
              {clothesPreview ? (
                <div>
                  <img src={clothesPreview} alt="Clothes" className="w-full h-40 object-cover rounded-lg mb-3" />
                  <p className="text-green-600 font-medium text-sm">✓ 服装已选择</p>
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 text-gray-400 mx-auto mb-2">👕</div>
                  <p className="text-gray-600 text-sm font-medium">上传服装图片</p>
                  <p className="text-gray-400 text-xs">PNG、JPG格式</p>
                </>
              )}
            </div>
          </div>

          {/* Step 3: Process */}
          <div className="rounded-2xl p-6 shadow-lg" style={{background: 'linear-gradient(135deg, #dbeafe, #f3e8ff)'}}>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI魔法处理</h3>
              <p className="text-gray-600 text-sm">观看AI创造您的新造型</p>
            </div>

            {/* Model Selection */}
            <div className="bg-white rounded-xl p-4 border-2 border-blue-200 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">🤖 选择AI模型</h4>
              <div className="space-y-2">
                {Object.entries(MODELS).map(([key, model]) => (
                  <label key={key} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      value={key}
                      checked={selectedModel === key}
                      onChange={(e) => setSelectedModel(e.target.value as keyof typeof MODELS)}
                      className="mr-3 text-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{model.name}</span>
                        <span className="text-xs text-gray-500">{model.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{model.description}</p>
                      <div className="flex gap-1 mt-1">
                        {model.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 mb-6">
              <div className="aspect-[3/4] rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #dbeafe, #f3e8ff)'}}>
                {isProcessing ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-blue-600 text-sm font-medium">使用 {MODELS[selectedModel].name} 处理中...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-blue-500 text-4xl mb-2">✨</div>
                    <p className="text-xs text-gray-600">将使用 {MODELS[selectedModel].name}</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={swapClothes}
              disabled={!personImage || !clothesImage || isProcessing}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                (!personImage || !clothesImage || isProcessing)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary hover:scale-105'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  处理中...
                </div>
              ) : (
                '✨ 开始换衣'
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">✨ 换衣完成！</h3>
            <p className="text-gray-600">处理时间: {(result.processingTime / 1000).toFixed(1)}秒</p>
            {result.service && (
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  result.service === 'Replicate AI' ? 'bg-green-100 text-green-800' :
                  result.service === 'Demo Mode' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {result.service} {result.model && `(${result.model})`}
                </span>
              </div>
            )}
            {result.message && (
              <p className="text-sm text-blue-600 mt-2 max-w-md mx-auto">{result.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">原始照片</h4>
              <img src={result.original} alt="Original" className="w-full rounded-xl shadow-md" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">换衣结果</h4>
              <div className="relative">
                <img src={result.result} alt="Result" className="w-full rounded-xl shadow-md" />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Look ✨
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={resetTool}
              className="btn-secondary"
            >
              重新开始
            </button>
            <button className="btn-primary">
              下载结果
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              分享结果
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">⚠️</div>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* API Integration Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">🔧 AI服务状态</h4>
        
        {result?.setup_instructions ? (
          <div className="text-blue-800 text-sm space-y-3">
            <p><strong>当前状态:</strong> 演示模式 - 需要配置AI服务</p>
            <div>
              <p className="font-medium mb-2">🚀 启用真实AI换衣功能:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>{result.setup_instructions.step1}</li>
                <li>{result.setup_instructions.step2}</li>
                <li>{result.setup_instructions.step3}</li>
                <li>{result.setup_instructions.step4}</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
              <p className="text-yellow-800 text-sm">
                💡 <strong>提示:</strong> 配置完成后，您将能够使用最新的IDM-VTON AI模型进行高质量的换衣处理！
              </p>
            </div>
          </div>
        ) : (
          <div className="text-blue-800 text-sm space-y-2">
            <p><strong>当前状态:</strong> {result?.service || '准备就绪'}</p>
            <p><strong>支持的AI服务:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Replicate API (推荐) - IDM-VTON模型</li>
              <li>Stability AI</li>
              <li>RunPod API</li>
              <li>自定义AI模型服务</li>
            </ul>
            <p><strong>功能特点:</strong> 高质量换衣、快速处理、支持多种服装类型</p>
          </div>
        )}
      </div>
    </div>
  );
} 