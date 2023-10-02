import { useState } from "react";

export default function Picture() {
    const [backgroundIsActive, setBackgroundIsActive] = useState(true)
    
    return (
      <div className={`background ${backgroundIsActive ? 'background--active' : ''}`}
        onClick={() => setBackgroundIsActive(true)}>
        <img
          className={`picture ${backgroundIsActive ? '' : 'picture--active'}`}
          alt="Rainbow houses in Kampung Pelangi, Indonesia"
          src="https://i.imgur.com/5qwVYb1.jpeg"
          onClick={(e) => {
            e.stopPropagation()
            setBackgroundIsActive(false)
          }}
        />
      </div>
    );
  }
  