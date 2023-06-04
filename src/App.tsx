import { FC } from "react"
import { UserProvider } from "./State/User"
import { Outlet } from "react-router-dom"

const App: FC<{}> = () => {
    return <UserProvider><Outlet /></UserProvider>
}

export default App