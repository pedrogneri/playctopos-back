import Room, { RoomDocument, RoomInterface } from 'models/room';
import { Request, Response } from 'express';

export const updateActualVideo = (req: Request, res: Response) => {
  const { id } = req.query;
  const actualVideo = req.body;
  const updatedRoom = { actualVideo };

  Room.findOneAndUpdate({ _id: id }, updatedRoom)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const updatePlaylist = (req: Request, res: Response) => {
  const { id } = req.query;
  const playlist = req.body;
  const updatedRoom = { playlist };

  Room.findOneAndUpdate({ _id: id }, updatedRoom)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getRoomByName = (req: Request, res: Response) => {
  const name = req.query.name as string;

  Room.findOne({ name })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getVideoUrlByRoom = (req: Request, res: Response) => {
  const { id } = req.query;

  Room.findById(id)
    .then(async (room: RoomDocument) => {
      let newRoom: Partial<RoomInterface>;
      const { playlist, actualVideo, lastPlayDate } = room;

      const nextVideo = playlist.length > 0 ? playlist[0] : undefined;
      const videoEnded = actualVideo.duration && getVideoTime(lastPlayDate) >= actualVideo.duration;

      if (actualVideo.duration === 0 || videoEnded || actualVideo.id === '') {
        if (nextVideo) {
          newRoom = await changeToNextSongAndReturnRoom(room);
        } else {
          newRoom = room;
          newRoom.actualVideo = {
            id: '', thumbnail: '', title: '', channel: '', duration: 0, addedBy: '',
          };
        }
      } else {
        newRoom = room;
      }

      const url = generateVideoURL(newRoom);
      res.status(200).send({ room: newRoom, url });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const changeToNextSongAndReturnRoom = async (room: RoomDocument) => {
  const now = new Date().getTime();
  const nextVideo = room.playlist[0];
  const newPlaylist = room.playlist;
  newPlaylist.shift();

  const updatedRoom: Partial<RoomInterface> = {
    playlist: newPlaylist,
    actualVideo: nextVideo,
    lastPlayDate: now,
  };

  await Room.findOneAndUpdate({ _id: room._id }, updatedRoom);

  return updatedRoom;
};

const generateVideoURL = (room: Partial<RoomInterface>) => {
  const videoTime = getVideoTime(room.lastPlayDate);
  const params = ['controls=0', 'rel=0', 'cc_load_policy=0', 'showinfo=0', `start=${videoTime}`];

  if (room.actualVideo.id && room.lastPlayDate) {
    return `https://www.youtube.com/embed/${room.actualVideo.id}?${params.join('&')}`;
  }
  return '';
};

const getVideoTime = (lastPlayDate: number) => {
  const now = new Date().getTime();
  return Math.round((now - lastPlayDate) / 1000);
};
