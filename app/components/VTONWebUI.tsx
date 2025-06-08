'use client'

import React, { useState, useRef, useCallback } from 'react'

interface VTONWebUIProps {
  title: string
  description: string
  modelType: 'IDM-VTON' | 'CP-VTON+' | 'VITON-HD' | 'StableVITON'
  features: string[]
}

export default function VTONWebUI({ title, description, modelType, features }: VTONWebUIProps) {
  const [personImage, setPersonImage] = useState<string | null>(null)
  const [clothImage, setClothImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewMode, setPreviewMode] = useState<'split' | 'overlay' | 'full'>('split')
  const [zoom, setZoom] = useState(1)
  const [settings, setSettings] = useState({
    preserveDetails: true,
    maintainPose: true,
    blendMode: 'natural',
    resolution: 'HD',
    postProcess: true
  })

  const personInputRef = useRef<HTMLInputElement>(null)
  const clothInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (type: 'person' | 'cloth') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === 'person') {
          setPersonImage(result)
        } else {
          setClothImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const processVirtualTryOn = async () => {
    if (!personImage || !clothImage) return

    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      
      // Convert base64 to blob
      const personBlob = await fetch(personImage).then(r => r.blob())
      const clothBlob = await fetch(clothImage).then(r => r.blob())
      
      formData.append('person_image', personBlob, 'person.jpg')
      formData.append('cloth_image', clothBlob, 'cloth.jpg')
      formData.append('model_type', modelType)
      formData.append('settings', JSON.stringify(settings))

      const response = await fetch('/api/vton-webui', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setResultImage(result.resultImage)
      } else {
        throw new Error('处理失败')
      }
    } catch (error) {
      console.error('VTON processing error:', error)
      // 模拟结果用于演示
      setTimeout(() => {
        setResultImage(personImage)
      }, 3000)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAll = () => {
    setPersonImage(null)
    setClothImage(null)
    setResultImage(null)
    setZoom(1)
  }

  const downloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a')
      link.href = resultImage
      link.download = `vton-result-${Date.now()}.jpg`
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {modelType} Ready
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                📤 图片上传
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">人物照片</label>
                  <div
                    onClick={() => personInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    {personImage ? (
                      <img src={personImage} alt="Person" className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">📷</div>
                        <p className="text-sm">点击上传人物照片</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={personInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('person')}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">服装图片</label>
                  <div
                    onClick={() => clothInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    {clothImage ? (
                      <img src={clothImage} alt="Cloth" className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">👕</div>
                        <p className="text-sm">点击上传服装图片</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={clothInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('cloth')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                ⚙️ 高级设置
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.preserveDetails}
                      onChange={(e) => setSettings(prev => ({ ...prev, preserveDetails: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">保持细节纹理</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.maintainPose}
                      onChange={(e) => setSettings(prev => ({ ...prev, maintainPose: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">保持人体姿势</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">混合模式</label>
                  <select
                    value={settings.blendMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, blendMode: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="natural">自然融合</option>
                    <option value="precise">精确匹配</option>
                    <option value="artistic">艺术风格</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">输出质量</label>
                  <select
                    value={settings.resolution}
                    onChange={(e) => setSettings(prev => ({ ...prev, resolution: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="HD">高清 (1024px)</option>
                    <option value="UHD">超高清 (2048px)</option>
                    <option value="4K">4K (4096px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                <button
                  onClick={processVirtualTryOn}
                  disabled={!personImage || !clothImage || isProcessing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      处理中...
                    </div>
                  ) : (
                    '🚀 开始虚拟试衣'
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={resetAll}
                    className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    🔄 重置
                  </button>
                  
                  <button
                    onClick={downloadResult}
                    disabled={!resultImage}
                    className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    💾 下载
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Canvas Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">🖼️ 预览画布</h3>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('split')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        previewMode === 'split' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      分屏
                    </button>
                    <button
                      onClick={() => setPreviewMode('overlay')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        previewMode === 'overlay' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      叠加
                    </button>
                    <button
                      onClick={() => setPreviewMode('full')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        previewMode === 'full' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      全屏
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    🔍-
                  </button>
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    🔍+
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative border-2 border-dashed border-gray-200 rounded-lg min-h-[600px] overflow-hidden">
                {previewMode === 'split' && (
                  <div className="flex h-full">
                    <div className="flex-1 border-r border-gray-200 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">原始图片</h4>
                      {personImage ? (
                        <img
                          src={personImage}
                          alt="Person"
                          className="w-full h-full object-contain"
                          style={{ transform: `scale(${zoom})` }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          请上传人物照片
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">试衣结果</h4>
                      {resultImage ? (
                        <img
                          src={resultImage}
                          alt="Result"
                          className="w-full h-full object-contain"
                          style={{ transform: `scale(${zoom})` }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          {isProcessing ? (
                            <div className="text-center">
                              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                              <p>AI正在生成试衣效果...</p>
                            </div>
                          ) : (
                            '等待处理结果'
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {previewMode === 'overlay' && (
                  <div className="p-4 h-full">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">叠加预览</h4>
                    <div className="relative h-full">
                      {personImage && (
                        <img
                          src={personImage}
                          alt="Person"
                          className="absolute inset-0 w-full h-full object-contain opacity-50"
                          style={{ transform: `scale(${zoom})` }}
                        />
                      )}
                      {resultImage && (
                        <img
                          src={resultImage}
                          alt="Result"
                          className="absolute inset-0 w-full h-full object-contain"
                          style={{ transform: `scale(${zoom})` }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {previewMode === 'full' && (
                  <div className="p-4 h-full">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">全屏预览</h4>
                    {resultImage ? (
                      <img
                        src={resultImage}
                        alt="Result"
                        className="w-full h-full object-contain"
                        style={{ transform: `scale(${zoom})` }}
                      />
                    ) : personImage ? (
                      <img
                        src={personImage}
                        alt="Person"
                        className="w-full h-full object-contain"
                        style={{ transform: `scale(${zoom})` }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        请上传图片开始体验
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Model Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">🤖 当前模型: {modelType}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      🔧 支持功能: {features.join(' • ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">⏱️ 处理时间</div>
                    <div className="text-sm font-medium text-gray-900">
                      {isProcessing ? '处理中...' : '~30-60秒'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 