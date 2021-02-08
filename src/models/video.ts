import { Schema } from 'mongoose';

export interface VideoInterface {
  id: string,
  title: string,
  channel: string,
  thumbnail: string,
  duration?: number,
  addedBy?: string,
}

interface YoutubeThumb {
  url: string,
  width: number,
  height: number
}

export interface YoutubeVideo {
  id: { videoId: string },
  snippet: {
    title: string,
    description: string,
    thumbnails: {
      default: YoutubeThumb,
      medium: YoutubeThumb,
      high: YoutubeThumb,
    },
    channelTitle: string,
  }
}

export interface YoutubeSearchResponse {
  items: YoutubeVideo[];
}

export const VideoSchema: Schema<VideoInterface> = new Schema({
  id: String,
  title: String,
  channel: String,
  thumbnail: String,
  duration: Number,
  addedBy: String,
});
