import React, { useState } from 'react'
import Head from 'next/head'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function addProducts() {

    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [img, setimg] = useState('');
    const [category, setcategory] = useState('');
    const [size, setsize] = useState('');
    const [color, setcolor] = useState('');
    const [qty, setqty] = useState(null);
    const [price, setprice] = useState(null);

    const handlechange = async (e) => {
        
        if (e.target.name === "title") {
            settitle(e.target.value);
        } else if (e.target.name === "description") {
            setdescription(e.target.value);
        }
        else if (e.target.name === "category") {
            setcategory(e.target.value);
        }
        else if (e.target.name === "size") {
            setsize(e.target.value);
        }
        else if (e.target.name === "color") {
            setcolor(e.target.value);
        }
        else if (e.target.name === "qty") {
            setqty(e.target.value);
        }
        else if (e.target.name === "price") {
            setprice(e.target.value);
        }
        else if (e.target.name === "img") {
            setimg(e.target.value);
        }

       
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        let oid = Math.floor(Math.random() * Date.now());
        const slug=title+oid.toString();
        console.log(slug)
        const data = { title, description, price, img, color, size, category, slug,qty };
    
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/addProducts`,
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
                console.log('data added')
                toast.success(' Product Added!👕', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
        }
        else{
            toast.error(' 😭Product not Added!👕', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    return (
        <div className="flex">
        <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
         <Head>
      <title>AddProducts - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
   </Head>
            <div className="flex-auto w-64 block p-6 rounded-lg shadow-lg bg-white max-w-sm m-8 min-h-center font-poppin">
                <form>
                    <div className="form-group mb-6">
                        <label for="name" className="form-label inline-block mb-2 text-gray-700">Product Title</label>
                        <input onChange={handlechange}
                            value={title}
                            type="text"
                            id="title"
                            name="title" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="name" placeholder="Title" />

                    </div>
                    <div className="form-group mb-6">
                        <label for="description" className="form-label inline-block mb-2 text-gray-700">Description</label>
                        <input onChange={handlechange}
                            value={description}
                            type="text"
                            id="description"
                            name="description" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="description" placeholder="Description" />

                    </div>
                    <div className="form-group mb-6">
                        <label for="price" className="form-label inline-block mb-2 text-gray-700">price</label>
                        <input onChange={handlechange}
                            value={price}
                            type="number"
                            id="price"
                            name="price" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="description" placeholder="45" />

                    </div>
                    <div className="form-group mb-6">
                        <label for="qty" className="form-label inline-block mb-2 text-gray-700">Quantity</label>
                        <input onChange={handlechange}
                            value={qty}
                            type="number"
                            id="qty"
                            name="qty" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="description" placeholder="10" />

                    </div>
                    <div className="form-group mb-6">
                        <label for="img" className="form-label inline-block mb-2 text-blue-700">Image link</label>
                        <input onChange={handlechange}
                            value={img}
                            type="text"
                            id="img"
                            name="img" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="description" placeholder="https://flowbite.com/docs/images/logo.svg" />

                    </div>
                    <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select onChange={handlechange}
                        value={category} id="category" name='category' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a categroy</option>
                        <option >tshirt</option>
                        <option >hoddies</option>
                        <option >mug</option>
                        <option >sticker</option>
                    </select>
                    <select onChange={handlechange} name='size' value={size} id="size" class="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a size</option>
                        <option >SM</option>
                        <option >M</option>
                        <option >L</option>
                        <option >XL</option>
                        <option >XXL</option>
                    </select>
                    <select onChange={handlechange} name='color' value={color} id="color" class="bg-gray-50 border mt-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a color</option>
                        <option >red</option>
                        <option>blue</option>
                        <option >black</option>
                        <option >white</option>
                    </select>
                    <button onClick={handleSubmit} className="
    mt-3
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Submit</button>
                </form>
              
            </div>
            <div>
                <div className='flex-auto w-64' >
                <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/packages/lf20_SW374G.json"
              style={{ height: "650px", width: "680px", hover: "true" }}
            ></Player>
                </div>
            </div>
        </div>
    )
}

