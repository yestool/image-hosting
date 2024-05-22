import { z } from 'zod';

export const BucketSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  domain: z.string().url(),
  userId: z.string().uuid(), // 关联的用户 ID
  // 其他字段...
});

export type Bucket = z.infer<typeof BucketSchema>;