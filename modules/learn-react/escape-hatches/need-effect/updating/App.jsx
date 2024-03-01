import { Profiler, useEffect, useState } from "react";

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
            <h4>{fullName}</h4>
        </>
    )
}

function ProfileForm({ name, Form }) {
    const [time, setTime] = useState(0)

    function handleRender(id, phase, actualDuration) {
        console.log(
            `⏰ The ${id} interaction took ` +
            `${actualDuration}ms to render (${phase})`
        )
        setTime(time + actualDuration)
    }
    return (
        <>
            <h2>{name}:</h2>
            <Profiler id={name} onRender={handleRender}>
                <Form />
            </Profiler>
            <p><i>Total render time: {time}ms</i></p>
        </>
    )
}

export default function App() {
    return (
        <>
            <ProfileForm name="Incorrect Form" Form={BadForm} />
            <ProfileForm name="Correct Form" Form={GoodForm} />
        </>
    )
}