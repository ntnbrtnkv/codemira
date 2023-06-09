import { useContext } from "react";
import { UsersContext } from "../State/Users";
import { header } from "./Header.css";

type Props = {
    handleScroll: () => void;
}

const Header = ({ handleScroll }: Props) => {
    const { allUsers } = useContext(UsersContext);

    return (
        <header className={header}>
            {allUsers.map(({ name }) => <span key={name}>{name}</span>)}
            <button onClick={handleScroll}>Focus on me</button>
        </header>
    )
}

export default Header

