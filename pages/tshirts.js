import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "../models.js/product";
import Head from 'next/head'

const Tshirts = ({products}) => {

  
  
  console.log(products)
  return (
    <div>
     <Head>
      <title>Tshirts - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
      
   </Head>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-10 py-14 mx-auto">
          <div className="flex flex-wrap m-4 justify-center">
           {Object.keys(products).map((item)=>{ return (<Link key={products[item]._id} href={`/product/${products[item].slug}`}>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-xl m-5 rounded-xl ">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="h-[36vh] block m-auto "
                    src={products[item].img}
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Tshirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                   
                  </h2>
                  <p className="mt-1 text-center md:text-left font-semibold">Rs.{products[item].price}</p>
                  <div className="mt-1">
                  {products[item].size.includes('S') &&<span className="border border-gray-300 px-1 mx-1">S</span>}
                  {products[item].size.includes('M') &&<span className="border border-gray-300 px-1 mx-1">M</span>}
                  {products[item].size.includes('L') &&<span className="border border-gray-300 px-1 mx-1">L</span>}
                  {products[item].size.includes('XL') &&<span className="border border-gray-300 px-1 mx-1">XL</span>}
                  {products[item].size.includes('XXL') &&<span className="border border-gray-300 px-1 mx-1">XXL</span>}
                   </div>
                   <div className="mt-1">
                  
                  {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-slate-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                 
              
                   </div>

                </div>
              </div>
            </Link>)})}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (mongoose.connections[0].readyState) {
    
   
  }
  await mongoose.createConnection(process.env.MONGODB_URI);
  let products = await Product.find({category:"tshirt"});
  let tshirt={};
  for( let item of products){
          
          if(item.title in tshirt){
                  
                          if(!tshirt[item.title].color.includes(item.color) && item.availableqty>0){
                                  tshirt[item.title].color?.push(item.color)
                          
                          }
                          if(!tshirt[item.title].size.includes(item.size) && item.availableqty>0 ){
                                  tshirt[item.title].size?.push(item.size)
                          }
                  
          }else{
                  tshirt[item.title]=JSON.parse(JSON.stringify(item))
                 
                  if(item.availableqty>0){
                          tshirt[item.title].color=[item.color]
                          tshirt[item.title].size=[item.size]
                  }
          } 
        }
  
  
 
  return {
    props: {products:JSON.parse(JSON.stringify(tshirt))}, // will be passed to the page component as props
  };
}

export default Tshirts;
