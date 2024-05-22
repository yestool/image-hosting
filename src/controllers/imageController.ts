import { Hono } from 'hono';
import { convertToWebpAndCompress } from '../utils/imageProcessor';
import { ImageSchema, Image } from '../models/image';
import { insertImage, getImage } from '../services/imageService';
import { generateUniqueId } from '../utils/uniqueIdGenerator';
import { join } from 'path';

const imageController = new Hono();

// 处理图片上传的路由
imageController.post('/upload', async (c) => {
  // 获取上传的文件
  const body = await c.req.parseBody();
	const file = body["file"];
  if (!(file instanceof File)) {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  // 获取存储桶 ID
  const bucketId = body['bucketId'];
  const imgBuffer = await file.arrayBuffer()

  // 生成唯一的图片 ID
  const id = generateUniqueId();

  // 生成原始图片的 URL
  const originalUrl = `/images/${id}`;

  // 生成 webp 图片的 URL
  const webpUrl = `/images/${id}.webp`;

  console.log(`${join(process.cwd())}/static/uploads/images/${file.name}`)

  // 将图片转换为 webp 格式并压缩
  await convertToWebpAndCompress(Buffer.from(imgBuffer), `${join(process.cwd())}/static/uploads${webpUrl}`);

  // 创建新的 Image 对象
  const newImage = ImageSchema.parse({ id, bucketId, originalUrl, webpUrl });

  // 将图片信息插入数据库
  const success = insertImage(newImage);
  if (success) {
    newImage.webpUrl = `http://localhost:3000/static/uploads${newImage.webpUrl}.`;
    return c.json({ message: 'Image uploaded successfully', image: newImage }, 200);
  } else {
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// 其他路由...

export default imageController;
