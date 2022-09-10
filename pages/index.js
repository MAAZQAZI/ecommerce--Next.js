import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Player, Controls } from "@lottiefiles/react-lottie-player";


export default function Home() {
  return (
   <>
   
    <Head>
      <title>NextStore.com - Get the Best</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
   </Head>
  
   
   <div className=''>
   <div class="flex justify-center items-center ">
  
  <div class="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
    <div class="flex flex-col jusitfy-center items-center space-y-10">
      <div class="flex flex-col justify-center items-center ">
       
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 w-full">
        <div class="relative group flex justify-center items-center h-full w-full">
          <img class="object-center object-cover h-full w-full" src="https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="girl-image" />
         <Link href={'/tshirts'}><button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Tshirts</button></Link>
          <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
        </div>

        <div class="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
          <div class="relative group flex justify-center items-center h-full w-full">
            <img class="object-center object-cover h-full w-full" src="https://images.unsplash.com/photo-1526431038803-6f6c3ee137ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="shoe-image" />
          <Link href={'/mugs'}><button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Mugs</button></Link>
            <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
          </div>
          <div class="relative group flex justify-center items-center h-full w-full">
            <img class="object-center object-cover h-full w-full" src="https://images.unsplash.com/photo-1589325788132-fb855c348c3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="watch-image" />
          <Link href={'/stickers'}><button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Stickers</button></Link> 
            <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
          </div>
        </div>

        <div class="relative group justify-center items-center h-full w-full hidden lg:flex">
          <img class="object-center object-cover h-full w-full" src="https://images.unsplash.com/photo-1635796244808-d93b6e26de62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="girl-image" />
          <Link href={'/hoodies'}><button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Hoodies</button></Link>  
          <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
        </div>
       
      </div>
      <div class="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
        <img class="object-center object-cover h-full w-full hidden md:block" src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png" alt="girl-image" />
        <img class="object-center object-cover h-full w-full sm:hidden" src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png" alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2" />
        <button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Accessories</button>
        <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
      </div>
    </div>
  </div>
</div>
   <section class="m-4 rounded-md px-3 py-5 bg-blue-100 lg:py-10">
  <div class="grid lg:grid-cols-2 items-center justify-items-center gap-5">
    <div class="order-2 lg:order-1 flex flex-col justify-center items-center">
      <p class="text-4xl font-bold md:text-7xl text-blue-800">25% OFF</p>
      <p class="text-4xl font-bold md:text-7xl">SUMMER SALE</p>
      <p class="mt-2 text-sm md:text-lg">For limited time only!</p>
     <Link href={'/tshirt'}><button class="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">Shop Now</button></Link> 
    </div>
    <div class="order-1 mx-1 lg:order-2">
    <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_jei6otjn.json"
              style={{ height: "350px", width: "390px", hover: "true" }}
            ></Player>
    </div>
  </div>
</section>
   </div>
   
  
 
   </>
   


  )
}
