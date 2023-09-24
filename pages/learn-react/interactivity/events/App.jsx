export default function Button() {
    return (
      <button onClick={function handleClick() {
        alert('You clicked me!')
      }}>
        Click me
      </button>
    );
  }
  