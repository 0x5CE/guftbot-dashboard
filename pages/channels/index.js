import Head from 'next/head'
import Navbar from '../../components/global/NavBar'
import React, { useState, useEffect } from "react";

const style = {
  container: "justify-center items-center w-128 px-10 py-10 m-16 text-center bg-gray-400 rounded-lg",
  title: "text-3xl",
  suggestion: "text-xl py-10",
  price: "text-3xl",
  perChannel: "text-sm",
  discount: "text-lg",
  button: "flex justify-center items-center cursor-pointer hover:shadow-lg text-lg font-semibold text-white bg-gray-900 rounded-full mx-32 mt-10 w-48 h-12",
}

const addChannel = () => {
  console.log(`adding channel...`);
}
export default function Home() {
  const [pageNumber, setPageNumber] = useState(0);

  const updateSettings = () => {
    setPageNumber(1);
  }
  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  }
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  }
  const submitDetails = () => {
    console.log('submitting...')
  }
  const toDisplay = (pageNumber) => {
    switch (pageNumber) {
      case 0:
        return (
          <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
            <h1 className='text-7xl p-10'>You banter bot channels</h1>
            <div className='flex'>
              <div className={style.container}>
                <div className={style.title}>Banter is currently happening in</div>
                <div className={style.price}>#general</div>
                <div className={style.perChannel}>every other weekday at 02:44pm</div>
                <div className={style.button} onClick={updateSettings}>
                  <h1>{"update settings"}</h1>
                </div>
              </div>
              <div className={style.container}>
                <div className={style.title}>Add to another channel</div>
                <div className={style.price}></div>
                <div className={style.perChannel}>banter will break the ice and spark conversation between your team</div>
                <div className={style.discount}>cancel anytime</div>
                <div className={style.button} onClick={addChannel}>
                  <h1>{"+ add to channel"}</h1>
                </div>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
            <h1 className='text-7xl p-10'>Pick the channel you want to add Banter</h1>
            <div className={style.suggestion}>We recommend adding banter to a channel that is already used for small talk and getting to know each other. #random or # general are usually good fits.</div>
            <input className='border-neutral-700 rounded-md border-2 h-8 w-64 mb-10 text-center' type="text" id="channel" name="channel" />
            <div className={style.suggestion}>Don't see your private channel? Go to the Slack channel you'd like to set up Guft in, type "/invite @Guftbot"</div>
            <div className={style.button} onClick={nextPage}>
              <h1>{"Next >"}</h1>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
            <h1 className='text-7xl p-10'>What kinds of Banter do you want?</h1>
            <div className={style.suggestion}>Banter has several kinds of topics to initiate conversation. Banter is optimized to break the ice with fun and light prompts at first, getting deeper as time goes on. Don't worry we won't prompt anything too spicy, safe for work only!</div>
            <div className={style.suggestion}>Banter works best when all options are enabled!</div>
            <div className='flex'>
              <div className='p-4'>
                <div>🚀 </div>
                <div>getting to know you</div>
                <div className="underline hover:cursor-pointer p-1">See examples</div>
                <input className='h-6 w-6 text-center' type="checkbox" id="channel" name="channel" />
              </div>
              <div className='p-4'>
                <div>🚀 </div>
                <div>Share a photo</div>
                <div className="underline hover:cursor-pointer p-1">See examples</div>
                <input className='h-6 w-6 text-center' type="checkbox" id="channel" name="channel" />
              </div>
              <div className='p-4'>
                <div>🚀 </div>
                <div>Opinions and debate</div>
                <div className="underline hover:cursor-pointer p-1">See examples</div>
                <input className='h-6 w-6 text-center' type="checkbox" id="channel" name="channel" />
              </div>
              <div className='p-4'>
                <div>🚀 </div>
                <div>Brain Teasers</div>
                <div className="underline hover:cursor-pointer p-1">See examples</div>
                <input className='h-6 w-6 text-center' type="checkbox" id="channel" name="channel" />
              </div>
            </div>
            <div className='flex'>
              <div className={style.button} onClick={prevPage}>
                <h1>{"< Go back"}</h1>
              </div>
              <div className={style.button} onClick={nextPage}>
                <h1>{"Next >"}</h1>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
            <h1 className='text-7xl p-10'>When do you want Banter to happen?</h1>
            <div className={style.suggestion}>Choose when you want Banter to fire in #channelNameHere. We recommend every other day or once a week.</div>

            <select className='border-neutral-700 rounded-md border-2 h-8 w-64 mb-10 text-center' type="text" id="channel" name="channel">
              <option>Every day</option>
              <option>Every other day</option>
              <option>Every week</option>
            </select>
            <input className='border-neutral-700 rounded-md border-2 h-8 w-64 mb-10 text-center' type="time" id="channel" name="channel" value='13:00' />
            <input className='border-neutral-700 rounded-md border-2 h-8 w-64 mb-10 text-center' type="text" id="channel" name="channel" placeholder='timezone to-be selected' />
            <div className='flex'>
              <div className={style.button} onClick={prevPage}>
                <h1>{"< Go back"}</h1>
              </div>
              <div className={style.button} onClick={submitDetails}>
                <h1>{"Submit"}</h1>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
            <h1 className='text-7xl p-10'>Page does not exist!</h1>
            <div className={style.button} onClick={prevPage}>
              <h1>{"< Go back"}</h1>
            </div>
          </div>)

    }
  }
  return (
    <>
      <Head>
        <title>Billing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {toDisplay(pageNumber)}

    </>
  )
}
