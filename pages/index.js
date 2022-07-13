import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/global/NavBar'

export default function Home() {
  return (

    <>
      <Head>
        <title>Guftbot</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
    <div className="flex justify-center items-center flex-col pt-40 text-center font-bold lg:text-8xl text-6xl space-y-2">
      <h1 className="text-gray-900 pb-10">
        Guftbot built using <span className="text-blue-500">Next.js</span> &{" "}
        <span className="text-blue-400">Tailwind</span>
      </h1>
      <div className="flex justify-center items-center cursor-pointer hover:shadow-lg  text-3xl font-semibold text-white bg-gray-900 rounded-lg w-64 h-16">
        <h1 className="text-center">{"Add to slack 🚀 "}</h1>
      </div>
    </div>
    </>
  )
}
