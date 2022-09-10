import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
const forgot = () => {
  const router=useRouter();
  const [password,setpassword]=useState('');
  const [cpassword,setcpassword]=useState('');
  const [email,setemail]=useState('');

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      router.push('/')
    }
      
    }, [])
    const handlechange = async (e) => {
      if (e.target.name === "password") {
        setpassword(e.target.value);
      } else if (e.target.name === "email") {
        setemail(e.target.value);
      } 
      else if (e.target.name === "cpassword") {
        setcpassword(e.target.value);
      } 
    };
    const resetPasssword= async ()=>{
      let data={
        email,
        sendMail:true
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        let res=await response.json();
        if(res.success){
          console.log('Pass Email has sent')
        }
        else{
          console.log('error occur ')
        }
    }
  
    const sendResetEmail=async ()=>{
      if(password==cpassword){
        let data={
          password,
          setMail:false
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
          let res=await response.json();
          if(res.success){
            console.log('Pass Email has sent')
          }
          else{
            console.log('error occur ')
          }
    }
    else{

    }
    
  }

  return (
    <div>
    
       <Head>
      <title>Forgot - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
   </Head>
     <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-purple-600.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
         <Link href={'/login'}><a  className="font-medium text-purple-600 hover:text-purple-500"> Login</a></Link> 
        </p>
      </div>
      {!router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
        
          <div>
            <label for="email-address" className="sr-only">Email address</label>
            <input value={email} onChange={handlechange} id="email-address" name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
        
          
        </div>
  
        <div className="flex items-center justify-between">
          
  
          
        </div>
  
        <div>
          <button onClick={resetPasssword} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            
            Save
          </button>
        </div>
      </form> }
      {router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="rounded-md shadow-sm -space-y-px">
        
          <div>
            <label for="password" className="sr-only">New Password</label>
            <input value={password} onChange={handlechange} id="password" name="password" type="password" autocomplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="New password"/>
          </div>
        
          <div>
            <label for="cpassword" className="sr-only">Confirm Password</label>
            <input value={cpassword} onChange={handlechange} id="cpassword" name="cpassword" type="cpassword" autocomplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Confirm password"/>
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          
  
          
        </div>
        {password != cpassword && <span className='text-sm text-red-600'>Password not matched</span>}
        {password == cpassword && password !='' && <span className='text-sm text-green-400'>Password matched</span>}
        <div>
          <button  type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            
            Continue
          </button>
        </div>
      </form>}
    </div>
  </div>
    </div>
    </div>
  )
}

export default forgot