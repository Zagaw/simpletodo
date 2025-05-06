import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Notelist from './components/Notelist.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './layouts/Main.tsx'
import Register from './pages/Register.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import Protect from './pages/Protect.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        index: true,
        element: <Notelist/>,
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/profile",
        element: (
          <Protect>
            <Profile/>
          </Protect>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
