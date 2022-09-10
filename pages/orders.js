import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'

const orders = () => {
    const router=useRouter();
    const [orders, setorders] = useState([])
    console.log(orders)
    useEffect(() => {
      const fetchData=async ()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token: localStorage.getItem('token')})
        });
        let res = await response.json();
        console.log(res)
        setorders(res.order)
        
      }

      if(!localStorage.getItem('token')){
        router.push('/')
      }else{
          fetchData();

      }
        
      }, []);

     

  return (
    <div className='container  mx-auto'>
       <Head>
      <title>Orders - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Major+Mono+Display&family=Montserrat&family=Poppins:wght@500&display=swap" rel="stylesheet"></link>

   </Head>
  
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
    
    <h1 className=' text-xl text-center font-semibold p-8'>My Orders</h1>
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ⚫
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                OrderId
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Amount
              </th>
              <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Details
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((item)=>{
                var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
    
      });
      const price=formatter.format(item.amount);
      
                return(
                  <tr key={item._id} className="border-b list-decimal">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">🟣</td>
                  
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {price}
              </td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4 bg-slate-100 hover:underline whitespace-nowrap">
              <Link href={'/order?id='+item._id}>Details</Link>
              </td>
            </tr>
                )
            })}
        
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default orders