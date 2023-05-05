import React from 'react';
import { Box } from '@adminjs/design-system';
import ReactPlayer from 'react-player';

const VideoShowComponent = (props) => {
  const { record } = props;
  const videos = record?.params?.videos;
  console.log(videos, props);

  return (
    <Box>
      {videos &&
        videos.map((video, index) => (
          <Box key={index} mb="xl">
            <ReactPlayer url={video.url} controls width="100%" />
            <Box
              mt="lg"
              dangerouslySetInnerHTML={{ __html: video.description }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default VideoShowComponent;
