// AI Clothes Swapper Prediction Utilities
// This module provides types, utilities, and helper functions for AI predictions

import Replicate from 'replicate';

// Types for prediction inputs and outputs
export interface PredictionInput {
  person_image: string | File;
  clothes_image: string | File;
  garment_description?: string;
  denoise_steps?: number;
  seed?: number;
  is_checked?: boolean;
  is_checked_crop?: boolean;
}

export interface PredictionOutput {
  success: boolean;
  result_url?: string;
  processing_time: number;
  service: string;
  model?: string;
  message: string;
  error?: string;
  error_details?: string;
  setup_instructions?: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
}

export interface PredictionStatus {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  urls?: {
    get: string;
    cancel: string;
  };
  output?: string | string[];
  error?: string;
  logs?: string;
  metrics?: {
    predict_time?: number;
  };
}

// Available AI models for clothes swapping
export const CLOTHES_SWAP_MODELS = {
  IDM_VTON: 'cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4',
  OUTFIT_ANYONE: 'viktorfa/outfit_anyone:581ac8d6af59580a9c73dc0103b7532c8c2b06c19b422d3d5b3e2c2040a8c2c6',
  VIRTUAL_TRYON: 'aleksa-codes/virtual-try-on:5b85cd1e00e7a1b4b2d8ad9dcbb4b893e4ba81a6b5a7373b3f46f8b26b48a5cb',
} as const;

export type ModelType = keyof typeof CLOTHES_SWAP_MODELS;

// Configuration for different models
export const MODEL_CONFIG = {
  IDM_VTON: {
    name: 'IDM-VTON',
    description: '高质量虚拟试衣模型，支持精确的服装穿戴效果',
    max_resolution: 1024,
    processing_time: '30-60秒',
    features: ['高质量输出', '精确配合', '自然光影']
  },
  OUTFIT_ANYONE: {
    name: 'Outfit Anyone',
    description: '通用服装试穿模型，适合各种服装类型',
    max_resolution: 768,
    processing_time: '20-40秒',
    features: ['快速处理', '多种服装', '稳定输出']
  },
  VIRTUAL_TRYON: {
    name: 'Virtual Try-On',
    description: '专业虚拟试衣解决方案',
    max_resolution: 512,
    processing_time: '15-30秒',
    features: ['快速预览', '轻量化', '实时效果']
  }
} as const;

// Image processing utilities
export class ImageProcessor {
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static async urlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  static validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: '仅支持 JPEG、PNG、WebP 格式的图片文件'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: '图片文件大小不能超过 10MB'
      };
    }

    return { valid: true };
  }

  static async resizeImage(file: File, maxWidth: number = 1024, maxHeight: number = 1024): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and convert to blob
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/jpeg', 0.9);
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

// Prediction service wrapper
export class PredictionService {
  private replicate: Replicate | null = null;

  constructor(apiToken?: string) {
    if (apiToken) {
      this.replicate = new Replicate({ auth: apiToken });
    }
  }

  async predict(
    input: PredictionInput,
    modelType: ModelType = 'IDM_VTON'
  ): Promise<PredictionOutput> {
    const startTime = Date.now();

    try {
      // Validate inputs
      if (!input.person_image || !input.clothes_image) {
        throw new Error('人物照片和服装图片都是必需的');
      }

      // Convert files to base64 if needed
      const personBase64 = typeof input.person_image === 'string' 
        ? input.person_image 
        : await ImageProcessor.fileToBase64(input.person_image);
      
      const clothesBase64 = typeof input.clothes_image === 'string'
        ? input.clothes_image
        : await ImageProcessor.fileToBase64(input.clothes_image);

      if (!this.replicate) {
        // Simulation mode
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
          success: true,
          result_url: personBase64,
          processing_time: Date.now() - startTime,
          service: 'Demo Mode',
          message: '🔧 当前为演示模式。要使用真实AI换衣功能，请配置 REPLICATE_API_TOKEN 环境变量。',
          setup_instructions: {
            step1: '访问 https://replicate.com 注册账户',
            step2: '获取 API Token',
            step3: '创建 .env.local 文件并添加: REPLICATE_API_TOKEN=your_token_here',
            step4: '重启开发服务器'
          }
        };
      }

      // Real AI prediction
      const modelId = CLOTHES_SWAP_MODELS[modelType];
      const modelConfig = MODEL_CONFIG[modelType];

      const output = await this.replicate.run(modelId, {
        input: {
          human_img: personBase64,
          garm_img: clothesBase64,
          garment_des: input.garment_description || "A piece of clothing to try on",
          is_checked: input.is_checked ?? true,
          is_checked_crop: input.is_checked_crop ?? false,
          denoise_steps: input.denoise_steps ?? 30,
          seed: input.seed ?? Math.floor(Math.random() * 1000000)
        }
      });

      return {
        success: true,
        result_url: Array.isArray(output) ? output[0] : output,
        processing_time: Date.now() - startTime,
        service: 'Replicate AI',
        model: modelConfig.name,
        message: `🎉 AI换衣处理完成！使用了 ${modelConfig.name} 模型。`
      };

    } catch (error) {
      console.error('Prediction error:', error);
      
      return {
        success: false,
        processing_time: Date.now() - startTime,
        service: 'Error',
        message: '处理过程中发生错误',
        error: (error as Error).message,
        error_details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
      };
    }
  }

  async getPredictionStatus(predictionId: string): Promise<PredictionStatus | null> {
    if (!this.replicate) {
      return null;
    }

    try {
      const prediction = await this.replicate.predictions.get(predictionId);
      return prediction as PredictionStatus;
    } catch (error) {
      console.error('Error getting prediction status:', error);
      return null;
    }
  }

  async cancelPrediction(predictionId: string): Promise<boolean> {
    if (!this.replicate) {
      return false;
    }

    try {
      await this.replicate.predictions.cancel(predictionId);
      return true;
    } catch (error) {
      console.error('Error canceling prediction:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.replicate !== null;
  }
}

// Client-side prediction utilities
export class ClientPredictionService {
  private static instance: ClientPredictionService;

  static getInstance(): ClientPredictionService {
    if (!ClientPredictionService.instance) {
      ClientPredictionService.instance = new ClientPredictionService();
    }
    return ClientPredictionService.instance;
  }

  async predictClothesSwap(
    personImage: File,
    clothesImage: File,
    options?: {
      model?: ModelType;
      description?: string;
      onProgress?: (status: string) => void;
    }
  ): Promise<PredictionOutput> {
    const { model = 'IDM_VTON', description, onProgress } = options || {};

    try {
      // Validate files
      const personValidation = ImageProcessor.validateImageFile(personImage);
      if (!personValidation.valid) {
        throw new Error(`人物照片: ${personValidation.error}`);
      }

      const clothesValidation = ImageProcessor.validateImageFile(clothesImage);
      if (!clothesValidation.valid) {
        throw new Error(`服装图片: ${clothesValidation.error}`);
      }

      onProgress?.('准备上传图片...');

      // Prepare form data
      const formData = new FormData();
      formData.append('person', personImage);
      formData.append('clothes', clothesImage);
      formData.append('model', model);
      if (description) {
        formData.append('description', description);
      }

      onProgress?.('正在处理AI换衣...');

      // Make API call
      const response = await fetch('/api/clothes-swap', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '请求失败');
      }

      const result = await response.json();
      onProgress?.('处理完成！');

      return result;

    } catch (error) {
      console.error('Client prediction error:', error);
      throw error;
    }
  }

  async getServiceStatus(): Promise<any> {
    try {
      const response = await fetch('/api/clothes-swap');
      return await response.json();
    } catch (error) {
      console.error('Error getting service status:', error);
      return null;
    }
  }
}

// Default export
export default ClientPredictionService;

// 可选的其他模型
const ALTERNATIVE_MODELS = {
  'viktorfa/outfit_anyone': '581ac8d6af59580a9c73dc0103b7532c8c2b06c19b422d3d5b3e2c2040a8c2c6',
  'levihsu/ootdiffusion': '5126b48c66f58d3c2e37db2a8de5e50ad5f93297a36d64ebb8a68bcc2c4c0b31'
}; 