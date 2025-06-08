@echo off
echo ================================
echo   AI Clothes Swapper API 配置
echo ================================
echo.
echo 步骤 1: 获取 Replicate API Token
echo - 访问: https://replicate.com
echo - 注册/登录账户
echo - Account -^> API Tokens -^> Create Token
echo - 复制生成的token (格式: r8_xxxxx)
echo.
set /p token="请粘贴您的 Replicate API Token: "

if "%token%"=="" (
    echo 未输入token，退出配置
    pause
    exit /b
)

echo.
echo 正在配置 API Token...

REM 备份原文件
copy .env.local .env.local.backup >nul 2>&1

REM 写入新配置
echo # AI API Configuration - 配置于 %date% %time% > .env.local
echo REPLICATE_API_TOKEN=%token% >> .env.local
echo. >> .env.local
echo # Alternative AI Services (optional) >> .env.local
echo # HUGGINGFACE_API_KEY=your_huggingface_api_key_here >> .env.local
echo # OPENAI_API_KEY=your_openai_api_key_here >> .env.local

echo.
echo ✅ API Token 配置成功！
echo.
echo 🔄 下一步操作：
echo 1. 按 Ctrl+C 停止当前开发服务器
echo 2. 重新运行: npm run dev
echo 3. 访问: http://localhost:3001
echo.
echo 🧪 测试API连接:
echo curl http://localhost:3001/api/clothes-swap
echo.
pause 