import { FC } from "react"
import { UsersProvider } from "./State/Users"
import { Outlet } from "react-router-dom"

const App: FC<{}> = () => {
    return <UsersProvider><Outlet /></UsersProvider>
}

export default App