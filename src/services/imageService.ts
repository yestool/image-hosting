import { db, ImageSchema, Image } from '../db';

// 插入图片到数据库
export function insertImage(image: Image): boolean {
  const stmt = db.prepare('INSERT INTO images (id, bucketId, originalUrl, webpUrl) VALUES (?, ?, ?, ?)');
  const info = stmt.run(image.id, image.bucketId, image.originalUrl, image.webpUrl);
  return info.changes > 0;
}

// 从数据库获取图片
export function getImage(id: string): Image | null {
  const stmt = db.prepare('SELECT * FROM images WHERE id = ?');
  const image = stmt.get(id);
  return image ? ImageSchema.parse(image) : null;
}