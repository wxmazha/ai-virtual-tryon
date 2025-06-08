import { NextResponse } from 'next/server';

export async function GET() {
  // 检查各个API服务的配置状态
  const services = {
    replicate: {
      name: 'Replicate AI',
      configured: !!process.env.REPLICATE_API_TOKEN,
      description: '专业AI模型平台，支持换脸、衣服交换等',
      features: ['Face Swap', 'Clothes Swap', 'Video Processing', 'Super Resolution'],
      pricing: '按使用量付费',
      setup_url: 'https://replicate.com',
      free_tier: false
    },
    removeBg: {
      name: 'Remove.bg',
      configured: !!process.env.REMOVE_BG_API_KEY,
      description: '专业背景移除服务',
      features: ['Background Removal', 'High Quality', 'API Integration'],
      pricing: '免费50次/月，付费无限制',
      setup_url: 'https://www.remove.bg/api',
      free_tier: '50 calls/month'
    },
    huggingFace: {
      name: 'Hugging Face',
      configured: !!process.env.HUGGING_FACE_API_TOKEN,
      description: '开源AI模型平台',
      features: ['Photo Enhancement', 'Real-ESRGAN', 'GFPGAN', 'Various Models'],
      pricing: '免费配额',
      setup_url: 'https://huggingface.co/settings/tokens',
      free_tier: '免费使用限额'
    },
    openai: {
      name: 'OpenAI DALL-E',
      configured: !!process.env.OPENAI_API_KEY,
      description: '图像生成和编辑',
      features: ['Image Generation', 'Image Editing', 'Variations'],
      pricing: '按使用量付费',
      setup_url: 'https://platform.openai.com/api-keys',
      free_tier: false
    }
  };

  // 计算总体状态
  const configuredServices = Object.values(services).filter(s => s.configured).length;
  const totalServices = Object.keys(services).length;
  const configurationPercentage = Math.round((configuredServices / totalServices) * 100);

  // 可用的免费服务
  const freeServices = Object.entries(services)
    .filter(([_, service]) => service.free_tier)
    .map(([key, service]) => ({
      id: key,
      name: service.name,
      free_tier: service.free_tier,
      setup_url: service.setup_url
    }));

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    overall: {
      configured_services: configuredServices,
      total_services: totalServices,
      configuration_percentage: configurationPercentage,
      status: configurationPercentage > 50 ? 'good' : configurationPercentage > 0 ? 'partial' : 'demo_mode'
    },
    services,
    recommendations: {
      for_testing: 'Hugging Face (免费) + Remove.bg (50次免费)',
      for_production: 'Replicate + Remove.bg + Hugging Face',
      budget_friendly: 'Hugging Face + Remove.bg 免费套餐'
    },
    free_services: freeServices,
    demo_mode: {
      enabled: true,
      description: '所有工具都有高质量演示模式',
      features: [
        '真实的处理效果模拟',
        '详细的处理信息',
        '完整的用户界面',
        '配置API后即可启用真实功能'
      ]
    },
    setup_priorities: [
      {
        priority: 1,
        service: 'Hugging Face',
        reason: '完全免费，支持多种AI模型',
        effort: 'Low',
        value: 'High'
      },
      {
        priority: 2,
        service: 'Remove.bg',
        reason: '每月50次免费背景移除',
        effort: 'Low',
        value: 'Medium'
      },
      {
        priority: 3,
        service: 'Replicate',
        reason: '最高质量AI模型，按需付费',
        effort: 'Low',
        value: 'High'
      }
    ]
  });
} 