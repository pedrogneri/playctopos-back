import { Schema } from 'mongoose';

export interface VideoInterface {
  id: string,
  title: string,
  channel: string,
  thumbnail: string,
  duration?: number,
  addedBy?: string,
}

export const VideoSchema: Schema<VideoInterface> = new Schema({
  id: String,
  title: String,
  channel: String,
  thumbnail: String,
  duration: Number,
  addedBy: String,
})
