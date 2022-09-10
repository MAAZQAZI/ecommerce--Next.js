import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from 'next/head'


const signup = () => {
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
          
    if (e.target.name === 'name') {
      setname(e.target.value);
    }
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
    console.log(name, email, password);
    const data={ name, email, password };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
    setname('');
    setemail('');
    setpassword('');
    console.log(name,email,password);
    toast.success('🦄 Sign-up successfully!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  }
    
  return (
    <div>
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
      <title>Signup - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>

   </Head>
      <div className="min-h-full flex items-center font-poppin justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-purple-600.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign-Up to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
         <Link href={'/login'}><a  className="font-medium text-purple-600 hover:text-purple-500"> Already have Account? Login</a></Link> 
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
        <div>
            <label value={name} for="name" className="sr-only mb-1">Name</label>
            <input onChange={handleChange} id="name" name="name" type="name" autocomplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Name"/>
          </div>
          <div>
            <label value={email} for="email" className="sr-only">Email address</label>
            <input onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <label value={password} for="password" className="sr-only">Password</label>
            <input onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password"/>
          </div>
          
        </div>
  
        <div className="flex items-center justify-between">
          
  
          
        </div>
  
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
             
              <svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>
  )
}

export default signup