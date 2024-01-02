import React from 'react'
import HomeHeader from './homeHeader/homeHeader'
import HomeBody from './homeBody/homeBody'

const Home = () => {
  return (
    <section className="grow flex flex-col ml-24 mr-[33%]">
        <HomeHeader />
        <HomeBody />
    </section>
  )
}

export default Home