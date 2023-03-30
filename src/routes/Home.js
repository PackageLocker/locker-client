import React from 'react'
import Content from '../components/Content'
import Header from '../components/Header'
import CalvinLogo from '../components/CalvinLogo'

const Home = () => {
  return (
    <>
      <Header text="Package Locker" root={true} />
      <Content />
      <CalvinLogo />
    </>
  )
}

export default Home
