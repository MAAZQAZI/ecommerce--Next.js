import React from "react";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import Script from "next/script";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import mongoose from "mongoose";
import Product from "../models.js/product";
import { useRouter } from "next/router";
var jwt = require("jsonwebtoken");

const checkout = ({
  cart,
  addToCart,
  removeFromCart,
  clearrCart,
  total,
  products,
}) => {
  const router = useRouter();
  const { status } = router.query;

  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [address, setaddress] = useState(null);
  const [phone, setphone] = useState(null);
  const [city, setcity] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [state, setstate] = useState(null);
  const [disabled, setdisabled] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      var x = localStorage.getItem("token");
     
      var t = jwt.decode(x);
      setname(t.name);
      setemail(t.email);
      
    }
    else{
      router.push('/login')
    }
  }, [name]);

  const handlechange = async (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "state") {
      setstate(e.target.value);
    } else if (e.target.name === "pincode") {
      setpincode(e.target.value);
      if (e.target.value.length == 5) {
        let spin = await fetch("http://localhost:3000/api/pincode");

        let pinJson = await spin.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setstate(pinJson[e.target.value][0]);
          console.log(state);
          setcity(pinJson[e.target.value][1]);
          console.log(city);
        }
      } else {
        setstate("");
        setcity("");
      }
    } else if (e.target.name === "city") {
      setcity(e.target.value);
    } else if (e.target.name === "address") {
      setaddress(e.target.value);
    }
    if (total > 0) {
      setdisabled(false);
    }
  };
  //  const checktempdata=aysnc()=>{

  //  }

  const intiateOrder = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart, total, name, email, address, phone, pincode, oid };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/orderpayment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    if (json) {
      clearrCart();
      router.push("/stripe");
    }
   
    setname("");
  };

  return (
    <div className="container mx-2 sm:m-auto font-poppin ">
       <Head>
      <title>Checkout - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
   </Head>
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handlechange}
              value={name}
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handlechange}
              value={email}
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-full h ">
          <div class=" mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
              onChange={handlechange}
              value={address}
              id="address"
              name="address"
              cols={30}
              rows={2}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              onChange={handlechange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="city" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              onChange={handlechange}
              value={city}
              type="text"
              id="city"
              name="city"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="state" class="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              onChange={handlechange}
              value={state}
              type="text"
              id="state"
              name="state"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="pincode" class="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              onChange={handlechange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-bold text-xl">2. Review CartItems</h2>
      <div className="sideCart     bg-purple-200 p-8  m-2 rounded  ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="text-start font-semibold mt-3 ">
              Cart is empty 🛒
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item-flex my-3">
                  <div className=" font-semibold text-xl">
                    {cart[k].name}({cart[k].size}/{cart[k].varient1})
                  </div>
                  <div className="w-2/3  flex items-center justify-center font-semibold  text-2xl ">
                    <AiFillPlusCircle
                      className="  text-purple-500 cursor-pointer "
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                    />{" "}
                    <span className="mx-4 text-sm">{cart[k].qty}</span>
                    <AiFillMinusCircle
                      className=" text-purple-500 cursor-pointer "
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <h2 className="font-semibold ">
          SubTotal: Rs. <span>{total}</span>
        </h2>
      </div>
      <div className="m-2 ">
        <button
          disabled={disabled}
          onClick={intiateOrder}
          className="flex mr-2 mt-1 text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-200 rounded text-lg "
        >
          Pay💰
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (mongoose.connections[0].readyState) {
  }
  await mongoose.createConnection(process.env.MONGODB_URI);
  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default checkout;
