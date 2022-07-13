import Head from 'next/head'
import Navbar from '../../components/global/NavBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Billing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

    <div className="flex justify-center items-center flex-col pt-40 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className='flex'>
          <div className='justify-center items-center px-10 py-10 m-10 text-center bg-gray-400 rounded-lg'>Section 1</div>
          <div className='justify-center items-center px-10 py-10 m-10 text-center bg-gray-400 rounded-lg'>Section 2</div>
        </div>
      <div className="flex justify-center items-center cursor-pointer hover:shadow-lg  text-3xl font-semibold text-white bg-gray-900 rounded-lg w-64 h-16">
        <h1 className="text-center">{"Add to slack 🚀 "}</h1>
      </div>
    </div>
    </>
  )
}
