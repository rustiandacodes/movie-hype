import React from 'react';

const YoutubePlayer = (props) => {
  console.log(props.key);

  return (
    <>
      <div>
        <iframe class="w-full aspect-video" src={`https://www.youtube.com/embed/${props.key}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </>
  );
};

export default YoutubePlayer;
