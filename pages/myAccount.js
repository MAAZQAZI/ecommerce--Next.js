import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
var jwt = require("jsonwebtoken");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'


const myAccount = () => {
  
  
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [address, setaddress] = useState(null);
  const [phone, setphone] = useState(null);

  const [pincode, setpincode] = useState(null);

  const [password, setpassword] = useState(null);
  const [cpassword, setcpassword] = useState(null);
  const [local, setlocal] = useState(null)

 
  const router = useRouter();
  useEffect(() => {
    var x = localStorage.getItem("token");
    var t = jwt.decode(x);
    setname(t.name);
    setemail(t.email);
    setlocal(t.email)
    
    if (!x) {
      router.push('/')
    }


   
  }, []);

  

  const handlechange = async (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    }
    else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "address") {
      setaddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setpincode(e.target.value);

    }
    else if (e.target.name === "password") {
      setpassword(e.target.value);

    }
    else if (e.target.name === "cpassword") {
      setcpassword(e.target.value);

    }

  };

  const handlesubmitaccount = async () => {
    if(name && email && address && phone && pincode){
    const data = { name, email, address, phone, pincode }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(
      ()=>{
        toast.success('Updated 👌 Login again to see changes🕵️‍♂️', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          
          setaddress('')
          setpincode('')
          setphone('')
          

      }
    
    );
    }else{
      toast.error('Fill all the Data carefully🕵️‍♂️', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };
  const handlepasschange = async () => {
    if(password && cpassword){
    if(password==cpassword){
    const data = { email,password,cpassword}
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/changepass`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(
      ()=>{
        toast.success('Password Changed Successfully', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          
          setpassword('')
          setcpassword('')
          
          

      }
    );
    }else{
      toast.error('Password Not Matched🙅‍♂️', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }else{
    toast.error('Password Filled?', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
    
  };
  return (
    <div className='container mx-2 font-poppin sm:m-auto'>
     <Head>
      <title>MyAccount - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>

   </Head>
     <ToastContainer
position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className='text-3xl font-bold text-center my-3'>Update your Account </div>
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
              Email( not updateable )
            </label>
            <input
              onChange={handlechange}
              value={email}
              type="email"
              id="email"
              name="email"
              disabled={true}
              class="w-full bg-slate-300 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
      <button onClick={handlesubmitaccount} class="mx-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
        Submit
      </button>
      <h2 className="font-bold text-xl mt-8">1. Change Password</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="password" class="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              onChange={handlechange}
              value={password}
              type="password"
              id="password"
              name="password"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div class=" mb-4">
            <label for="cpassword" class="leading-7 text-sm text-gray-600">
              Confirm password
            </label>
            <input
              onChange={handlechange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

      </div>
      <button onClick={handlepasschange} className="mx-2 mb-6 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
        Change
      </button>
    </div>
  )
}

export default myAccount