"use client"
import type { NextPage } from "next"
import Header from "./Header"
import ThreeCanvas from "./ThreeCanvas"

const Home: NextPage = () => {
  return(
    <div className="pt-14">
      <Header />
      <ThreeCanvas />
    </div>
  )
}

export default Home