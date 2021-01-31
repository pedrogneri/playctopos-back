import { model, Schema, Document } from 'mongoose';

export interface VideoInterface {
  id: string,
  title: string,
  channel: string,
  thumbnail: string,
  duration?: number,
  addedBy?: string,
}

export interface RoomInterface {
  name: string,
  lastPlayDate: number,
  actualVideo: VideoInterface,
  playlist: VideoInterface[],
}

export interface RoomDocument extends RoomInterface, Document {}

const VideoSchema: Schema<VideoInterface> = new Schema({
  id: String,
  title: String,
  channel: String,
  thumbnail: String,
  duration: Number,
  addedBy: String,
})

export const RoomSchema: Schema<RoomInterface> = new Schema({
  name: String,
  lastPlayDate: String,
  actualVideo: VideoSchema,
  playlist: [VideoSchema],
});

export default model<RoomDocument>('Room', RoomSchema);
