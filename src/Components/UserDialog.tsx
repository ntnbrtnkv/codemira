import { FormEventHandler, useContext } from "react"
import { UsersContext } from "../State/Users"

function UserDialog() {
    const { setUser } = useContext(UsersContext);

    const handleUser: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // TODO: validate for empty
        setUser({
            name: e.target.name.value,
            color: '#30bced',
            light: '#30bced33'
        })
    }

    return (<dialog open>
        <form onSubmit={handleUser}>
            <h2>Please, introduce yourself</h2>
            <input placeholder="Your name" name="name"></input>
            <button>Enter</button>
        </form>
    </dialog>)
}

export default UserDialog