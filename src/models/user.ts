import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  passwordHash: z.string(), // 存储加密后的密码
  // 其他字段...
});

export type User = z.infer<typeof UserSchema>;