import React from 'react'
import Home from './routes/Home'
import Login from './routes/Login'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PackageDetails from './routes/PackageDetails'
import AddPackage from './routes/AddPackage'
import ErrorPage from './routes/ErrorPage'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path="login" element={<Login />} />
        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="details/:lockerId" element={<PackageDetails />} />
          <Route path="new/:lockerId" element={<AddPackage />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App