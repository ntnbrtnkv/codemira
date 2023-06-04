import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Room from './Room.tsx'
import './index.css'
import CreateRoot from './CreateRoom.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      {
        path: "/",
        element: <CreateRoot />,
      },
      {
        path: "/:roomID",
        element: <Room />,
      },
    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
