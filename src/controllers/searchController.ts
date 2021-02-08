import axios from 'axios';
import { Request, Response } from 'express';
import { VideoInterface, YoutubeSearchResponse, YoutubeVideo } from 'models/video';

const youtubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

const convertYoutubeVideoToVideo = (video: YoutubeVideo): VideoInterface => (
  {
    id: video.id.videoId,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    thumbnail: video.snippet.thumbnails.medium.url,
  }
);

const convertResponseToVideoList = (results: YoutubeVideo[]) => (
  results.map(youtubeVideo => convertYoutubeVideoToVideo(youtubeVideo))
);

export const getVideoListByQuery = (req: Request, res: Response) => {
  const { query } = req.query;

  youtubeAPI
    .get<YoutubeSearchResponse>('/search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 20,
        key: process.env.API_KEY,
      },
    })
    .then(({ data: { items } }) => {
      const convertedResults = convertResponseToVideoList(items);
      res.status(200).send(convertedResults);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getVideoById = (req: Request, res: Response) => {
  const { id } = req.query;

  youtubeAPI
    .get<YoutubeSearchResponse>('/videos', {
      params: {
        id,
        part: 'snippet',
        key: process.env.API_KEY,
      },
    })
    .then(
      ({
        data: {
          items: [item],
        },
      }) => {
        const convertedVideo = convertYoutubeVideoToVideo(item);
        res.status(200).send(convertedVideo);
      },
    )
    .catch((err) => {
      res.status(500).send(err);
    });
};
