import sharp from 'sharp';


// 将图片转换为 webp 格式并压缩
export async function convertToWebpAndCompress(buffer: Buffer, outputPath: string): Promise<void> {

  // 使用 sharp 进行转换和压缩
  await sharp(buffer)
    .webp({ quality: 80 }) // 设置 webp 质量
    .toFile(outputPath); // 输出到指定路径
}

// 使用示例
// convertToWebpAndCompress('path/to/input.jpg', 'path/to/output.webp');