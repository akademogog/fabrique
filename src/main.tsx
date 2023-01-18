import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.scss'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'

const router = createRouter();

router.start(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </React.StrictMode>,
  )
})
