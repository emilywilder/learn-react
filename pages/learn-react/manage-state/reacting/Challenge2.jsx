import { useState } from "react";

export default function EditProfile() {
    // toggles between viewing mode and editing mode
    const [viewMode, setViewMode] = useState(true)
    const [firstName, setFirstName] = useState('Jane')
    const [lastName, setLastName] = useState('Jacobs')

    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault()
        setViewMode(!viewMode)
    }

    return (
      <form onSubmit={handleClick}>
        <label>
          First name:{' '}
          {viewMode ? 
            <b>{firstName}</b> :
            <input 
                value={firstName}
                onChange={handleFirstNameChange}
            />
          }
        </label>
        <label>
          Last name:{' '}
          {viewMode ?
            <b>{lastName}</b> :
            <input 
                value={lastName}
                onChange={handleLastNameChange}
            />
          }
        </label>
        <button type="submit">
          {viewMode ? "Edit" : "Save"} Profile
        </button>
        <p><i>Hello, {firstName} {lastName}!</i></p>
      </form>
    );
  }
  