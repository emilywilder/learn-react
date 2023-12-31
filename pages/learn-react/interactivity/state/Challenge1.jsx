import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

    function atGalleryEnd() {
        return index >= sculptureList.length - 1
    }

    function atGalleryStart() {
        return index <= 0
    }

    function handleNextClick() {
        !atGalleryEnd() && setIndex(index + 1);
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    function handlePrevClick() {
        !atGalleryStart() && setIndex(index - 1);
    }

  let sculpture = sculptureList[index];
  return (
    <>
        <button onClick={handlePrevClick} disabled={atGalleryStart()}>
            Prev
        </button>
      <button onClick={handleNextClick} disabled={atGalleryEnd()}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
