import Database from 'better-sqlite3';
import { UserSchema, User } from './models/user';
import { BucketSchema, Bucket } from './models/bucket';
import { ImageSchema, Image } from './models/image';

// 初始化数据库
const db = new Database('data.db');

// 创建用户表
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    passwordHash TEXT
    -- 其他字段...
  )
`).run();

// 创建存储桶表
db.prepare(`
  CREATE TABLE IF NOT EXISTS buckets (
    id TEXT PRIMARY KEY,
    name TEXT,
    domain TEXT,
    userId TEXT
    -- 其他字段...
  )
`).run();

// 创建图片表
db.prepare(`
  CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY,
    bucketId TEXT,
    originalUrl TEXT,
    webpUrl TEXT
    -- 其他字段...
  )
`).run();

// 用户 CRUD 操作...
// 存储桶 CRUD 操作...
// 图片 CRUD 操作...

// 用户 CRUD 操作...
// 存储桶 CRUD 操作...
// 图片 CRUD 操作...
export { db, UserSchema, BucketSchema, ImageSchema, Image };