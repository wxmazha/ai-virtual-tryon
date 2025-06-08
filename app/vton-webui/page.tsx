import VTONWebUI from '../components/VTONWebUI'

export default function VTONWebUIPage() {
  return (
    <VTONWebUI
      title="VTON-WebUI 专业版"
      description="业界领先的虚拟试衣技术，支持多种AI模型和高级功能"
      modelType="IDM-VTON"
      features={[
        '高精度人体分割',
        '服装纹理保持',
        '姿势自适应',
        '实时预览',
        '批量处理',
        '4K输出'
      ]}
    />
  )
} 