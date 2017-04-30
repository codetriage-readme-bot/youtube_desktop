import * as YoutubeApi from 'core/youtube_api';

export const RECEIVE_TRENDING = 'RECEIVE_TRENDING';

export const receiveTrending = videos => ({
  type: RECEIVE_TRENDING,
  videos
});

export const fetchTrending = () => dispatch => {
  let baseUrl = `https://www.googleapis.com/youtube/v3/videos`;

  let params = {
    part: 'snippet,statistics,contentDetails',
    chart: 'mostPopular',
  };

  return YoutubeApi.videos(params).then(
    res => res.json()
  ).then(
    videos => dispatch(receiveTrending(videos.items))
  ).catch(
    err => console.log(err)
  );
};
