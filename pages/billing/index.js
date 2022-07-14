import Head from 'next/head'
import Navbar from '../../components/global/NavBar'

const style = {
  container: "justify-center items-center px-10 py-10 m-16 text-center bg-gray-400 rounded-lg",
  title: "text-3xl",
  price: "text-3xl",
  perChannel: "text-sm",
  discount: "text-lg",
  button: "flex justify-center items-center cursor-pointer hover:shadow-lg text-lg font-semibold text-white bg-gray-900 rounded-full m-5 w-48 h-12",
}

const choosePlan = (planNumber) => {
  console.log(`plan number ${planNumber} was chosen!`);
}
export default function Home() {
  return (
    <>
      <Head>
        <title>Billing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className="flex justify-center items-center flex-col pt-40 text-center space-y-2">
        <h1 className='text-7xl p-10'>Choose your subscription</h1>
        <div className='flex'>
          <div className={style.container}>
            <div className={style.title}>Annually</div>
            <div className={style.price}>$182</div>
            <div className={style.perChannel}>per channel</div>
            <div className={style.discount}>20% off</div>
            <div className={style.button} onClick={() => {choosePlan(1)}}>
              <h1>{"choose this plan"}</h1>
            </div>
          </div>
          <div className={style.container}>
            <div className={style.title}>Monthly</div>
            <div className={style.price}>$19</div>
            <div className={style.perChannel}>per channel</div>
            <div className={style.discount}>cancel anytime</div>
            <div className={style.button} onClick={() => {choosePlan(2)}}>
              <h1>{"choose this plan"}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center cursor-pointer hover:shadow-lg text-3xl font-semibold text-white bg-gray-900 rounded-lg w-64 h-16">
          <h1 className="text-center">{"Add to slack 🚀 "}</h1>
        </div>
      </div>
    </>
  )
}
