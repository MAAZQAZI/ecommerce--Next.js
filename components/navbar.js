import React, { useRef ,useState} from "react";
import hoddies from "../pages/hoddies";
import Tshirts from "../pages/tshirts";
import Link from "next/link";

import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";

import { AiFillDelete } from "react-icons/ai";


import checkout from "./../pages/checkout";
import { set } from "mongoose";
const navbar = ({ logout,user,cart, addToCart, removeFromCart, clearrCart, total }) => {
  console.log("navbar me total "+total);
  const ref = useRef();
  const [dropdown, setdropdown] = useState();
  const toggleDropDown=()=>{
    setdropdown(!dropdown);
  }
  
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      if (!ref.current.classList.contains("translate-x-full")) {
        ref.current.classList.remove("translate-x-0");
        ref.current.classList.add("translate-x-full");
      }
    }
  };
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',

  });
  const price=formatter.format(total);
  console.log(price)
   
  return (
    <div className="  flex flex-col md:flex-row justify-start  font-poppin	  items-center sticky top-0  bg-white z-10">
      <div className="  logo mx-9 font-bold">
        <Link href="/">
          <a className="flex title-font font-medium items-center md:justify-start   text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-70 h-10 my-4 text-white p-2 bg-purple-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-black font-bold">NextStore</span>
          </a>
        </Link>
      </div>
      <div className="navbar">
        <ul className="flex items-center  font-bold md:text-md space-x-6">
          <Link href="/tshirts">
            <a>
              <li className="hover:text-purple-500 ">Tshirts</li>{" "}
            </a>
          </Link>
          <Link href="/hoddies">
            <a>
              <li className="hover:text-purple-500 ">hoodies</li>{" "}
            </a>
          </Link>
          <Link href="/stickers">
            <a>
              <li className="hover:text-purple-500 ">Stickers</li>
            </a>
          </Link>
          <Link href="/mugs">
            <a>
              <li className="hover:text-purple-500 ">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 cursor-pointer top-6 mx-5 flex">
    <a onClick={toggleDropDown}  >
      {dropdown && <div className="absolute right-8 bg-purple-100  top-6 rounded-md py-4 px-5 w-32">
        <ul> 
          <Link href={'/myAccount'}><a><li className="py-1 hover:text-purple-700 text-sm z-10 font-semibold  ">🙍‍♂️ Account</li></a></Link>
          <Link href={'/orders'}><a><li className="py-1 hover:text-purple-700 text-sm z-10  font-semibold">🛒 Orders</li></a></Link>

          <li onClick={logout} className="py-1 hover:text-purple-700 text-sm z-10 font-semibold ">⭕ Logout</li>

        </ul>
      </div>}
      {user.value && <RiAccountCircleFill  className="text-xl text-fuchsia-900 md:text-3xl"/>}
  </a>
      {!user.value && <Link href={'/login'}><a>
      
        <button className="hover:bg-gray-100  rounded-md px-4 py-1  text-semibold text-purple ">Login</button>
      </a></Link> }
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-3xl hover:text-purple-300"
        />
      </div>
      <div
        ref={ref}
        className={`sideCart  absolute w-72 h-[100vh] top-0 right-0 bg-purple-200 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } overflow-x-clip rounded-sm z-10 `}
      >
        <h2 className="font-bold text-xl text-center">Shoping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-xl text-purple-500 "
        >
         <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-light scrollbar-thumb-rounded">
          {Object.keys(cart).length == 0 && (
            <p className="text-start font-semibold mt-3 ">Cart is empty 🛒</p>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k} className="">
                <div className="item flex my-5">
                {console.log('i need this--->^')}
                {console.log(cart[k].varient1)}
                  <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].varient1})</div>
                  <div className="  flex items-center justify-center font-semibold w-1/3 text-lg ">
                    <AiFillPlusCircle
                      className="  text-purple-500 cursor-pointer "
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient1
                        );
                      }}
                    />
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
                          cart[k].varient1
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <h2 className="font-bold text-xl text-center font-mono ">
            <span>{price}💸</span>
          </h2>
        </ol>
        <div>
          <Link href={"/checkout"}>
            <button disabled={Object.keys(cart).length===0} className="disabled:bg-purple-300 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              <BsCartCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearrCart}
            className="flex mx-auto mt-1 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
          <AiFillDelete className="m-1"/>
            ClearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default navbar;
