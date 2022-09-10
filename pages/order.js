import React from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "../models.js/order";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Head from 'next/head'

const order = ({ order }) => {
 
  const products = order.products;
 
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',

  });
  const price=formatter.format(order.amount);

  return (
    <div>
     <Head>
      <title>Order - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>

   </Head>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                NextStore
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
                Order ID : # {order.orderId}
              </h1>
              <p class="leading-relaxed mb-4">
                Your Order has been placed and {order.status} successfully 🎉
              </p>
              <div class="flex mb-4">
                <a class="flex-grow text-purple-500 text-left border-purple-500 py-2 text-lg px-1">
                  Item description
                </a>
                <a class="flex-grow  border-gray-300 text-center py-2 text-lg px-1">
                  Quantity
                </a>
                <a class="flex-grow  border-gray-300 text-right py-2 text-lg px-1">
                  Cost (pkr)
                </a>
              </div>

              {Object.keys(products).map((key) => {
                
                return (
                  <div class="flex border-t border-gray-200 py-2">
                    <span class="text-gray-500">
                      {products[key].name}({products[key].size}/
                      {products[key].varient1})
                    </span>
                    <span class="ml-auto text-gray-900">
                      {products[key].qty}
                    </span>
                    <span class="ml-auto text-gray-900">
                      {products[key].price}
                    </span>
                  </div>
                );
              })}

              <div class="flex my-8">
                <span class="title-font font-medium text-2xl  text-gray-900">
               
                   {price}
                </span>
               
              </div>
            </div>
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_lc7svuzc.json"
              style={{ height: "350px", width: "380px", hover: "true" }}
            ></Player>
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default order;
