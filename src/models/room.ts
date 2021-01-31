import { Document, model, Schema } from 'mongoose';
import { VideoInterface, VideoSchema } from 'models/video';

export interface RoomInterface {
  name: string,
  lastPlayDate: number,
  actualVideo: VideoInterface,
  playlist: VideoInterface[],
}

export interface RoomDocument extends RoomInterface, Document {}

export const RoomSchema: Schema<RoomInterface> = new Schema({
  name: String,
  lastPlayDate: String,
  actualVideo: VideoSchema,
  playlist: [VideoSchema],
});

const RoomModel = model<RoomDocument>('Room', RoomSchema);

export default RoomModel;
