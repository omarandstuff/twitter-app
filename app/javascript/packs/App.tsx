import React from 'react'
import Layout from './components/Layout'
import appCore from './appCore'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './components/pages/MainPage'
import LogInPage from './components/pages/LogInPage'
import SignUpPage from './components/pages/SignUpPage'

export default function App(): React.ReactElement {
  const [loading, setLoading] = React.useState(true)

  React.useEffect((): void => {
    appCore.once('loaded', (): void => {
      setLoading(false)
    })

    appCore.load()
  }, [])

  return (
    <BrowserRouter>
      <Layout loading={loading}>
        <Routes>
          <Route index element={appCore.currentUser ? <MainPage /> : <Navigate to="/authentication/login" />}></Route>
          <Route path="/authentication/login" element={<LogInPage />}></Route>
          <Route path="/authentication/login" element={<SignUpPage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
