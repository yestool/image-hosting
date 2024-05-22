import { z } from 'zod';

export const ImageSchema = z.object({
  id: z.string(),
  bucketId: z.string(), // 关联的存储桶 ID
  originalUrl: z.string(), // 原始图片 URL
  webpUrl: z.string(), // 转换为 webp 格式的图片 URL
  // 其他字段...
});

export type Image = z.infer<typeof ImageSchema>;