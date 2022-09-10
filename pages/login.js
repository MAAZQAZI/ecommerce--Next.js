import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/dist/server/router';
import { useRouter } from 'next/router';
import Head from 'next/head'

const login = () => {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const router=useRouter();
  useEffect(() => {
    
  if(localStorage.getItem('token')){
    router.push('/')
  }
    
  }, [])
  
  const handleChange = (e) => {
          
   
    if (e.target.name === 'email') {
      setemail(e.target.value);
    }
    if (e.target.name === 'password') {

      setpassword(e.target.value);
    }
    console.log(name, email, password);
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={email, password };
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
    
    setemail('');
    setpassword('');
    if(json.success){
      localStorage.setItem('token', json.token);
    toast.success('🤩 Login successfully!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    }
    else{
      toast.error('Failed Login', {
        position: "bottom-left",
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
    <div>
    
   
   
    
  <div class="min-h-full font-poppin flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
<Head>
      <title>Login - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>

   </Head>
    <div class="max-w-md w-full space-y-8 ">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-purple-600.svg" alt="Workflow"/>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
         <Link href={'/signup'}><a  class="font-medium text-purple-600 hover:text-purple-500"> Not have Account? Register Now</a></Link> 
        </p>
      </div>
      <form onSubmit={handleSubmit} class="mt-8 space-y-6"  method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label  for="email" class="sr-only">Email address</label>
            <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input  value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password"/>
          </div>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"/>
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>
  
          <div class="text-sm">
          <Link href={'/forgot'}><a  class="font-medium text-purple-600 hover:text-purple-500"> Forgot your password? </a></Link> 
          </div>
        </div>
  
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
             
              <svg class="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
   
  
  )
}
export default login