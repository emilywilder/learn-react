export default function Clock({ time }) {    
    let hours = time.getHours();
    let dayOrNight = 'day'
    if (hours >= 0 && hours <= 6) {
      dayOrNight = 'night';
    }
    return (
      <h1 id="time" className={dayOrNight}>
        {time.toLocaleTimeString()}
      </h1>
    );
  }
  