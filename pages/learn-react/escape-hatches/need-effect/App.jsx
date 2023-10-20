import { useEffect, useState } from "react";

function BadForm() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');
  
    // 🔴 Avoid: redundant state and unnecessary Effect
    const [fullName, setFullName] = useState('');
    useEffect(() => {
      setFullName(firstName + ' ' + lastName);
    }, [firstName, lastName]);
    // ...
    function handleChangeFirst(e) {setFirstName(e.target.value)}
    function handleChangeLast(e) {setLastName(e.target.value)}
    return <FormInputs
        firstName={firstName}
        lastName={lastName}
        onChangeFirst={handleChangeFirst}
        onChangeLast={handleChangeLast}
        fullName={fullName}
    />
}

function GoodForm() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');
    // ✅ Good: calculated during rendering
    const fullName = firstName + ' ' + lastName;
    // ...
    function handleChangeFirst(e) {setFirstName(e.target.value)}
    function handleChangeLast(e) {setLastName(e.target.value)}
    return <FormInputs
        firstName={firstName}
        lastName={lastName}
        onChangeFirst={handleChangeFirst}
        onChangeLast={handleChangeLast}
        fullName={fullName}
    />
}

function FormInputs({
    firstName,
    lastName,
    onChangeFirst,
    onChangeLast,
    fullName
}) {
    return (
        <>
            <input
                onChange={onChangeFirst}
                defaultValue={firstName}
            />
            <input
                onChange={onChangeLast}
                defaultValue={lastName}
            />
            <p>{fullName}</p>
        </>
    )
}

export default function App() {
    return (
        <>
            <h1>Don&apos;t do:</h1>
            <BadForm />
            <h1>Do:</h1>
            <GoodForm />
        </>
    )
}