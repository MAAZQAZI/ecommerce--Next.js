import React from 'react'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Head from 'next/head'

const four = () => {
  return (
    <div>
    <Head>
    <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
    <title>Sorry💔 - NextStore</title>
    </Head>
      <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/private_files/lf30_zbttcyqb.json"
              style={{ height: "550px", width: "580px", hover: "true" }}
            ></Player>
    </div>
  )
}

export default four