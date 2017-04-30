import * as YoutubeApi from 'core/youtube_api';

export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const CLEAR_VIDEOS = 'CLEAR_VIDEOS';

export const receiveVideos = videos => ({
  type: RECEIVE_VIDEOS,
  videos
});

export const clearVideos = () => ({
  type: CLEAR_VIDEOS
});

// TODO: David - add it to youtube api and refactor this code
export const searchVideos = (query, nextPageToken, pageNumber = 1) => dispatch => {
  let params = {
    q: query,
    type: 'video',
    pageToken: nextPageToken,
  };

  return YoutubeApi.search(params).then(
    res => res.json()
  ).then(
    videos => {
      let params = {
        part: 'statistics',
        id: videos.items.map(item => item.id.videoId).join(','),
      };

      return YoutubeApi.videos(params).then(
         res => res.json()
       ).then(
         videoStatResults => {
           for (let i = 0; i < videos.items.length; i++) {
             videos.items[i]['statistics'] = videoStatResults.items[i].statistics;
           }

           videos['query'] = query;

           return dispatch(receiveVideos(videos));
         }
       );
    }
  ).catch(
    err => console.log(err)
  );
};