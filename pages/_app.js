import Footer from '../components/footer'
import {useRouter} from 'next/router'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import {useState,useEffect} from 'react'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps })
 {
  const router=useRouter();
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [user, setuser] = useState({value:null})
  const [key, setkey] = useState(0)
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    }),
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    }),
    console.log('Hey you are working great')
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    const token=localStorage.getItem('token')
    if(token){
      setuser({value:token})
      setkey(Math.random())
    }

  
  }, [router.query])
  
  const saveCart = (mycart) => {
    localStorage.setItem('cart', JSON.stringify(mycart));
    let subt=0;
    let keys=Object.keys(mycart)
    for (let i = 0; i < keys.length; i++) {
      subt+=mycart[keys[i]]['price']*mycart[keys[i]]['qty']
      
    }

   
    setTotal(subt)
    console.log('Net Amount'+total)
    console.log('Net Amount L->'+(localStorage.getItem('cart').price))
  
  }

  const clearrCart = () => {
    setCart({});
    saveCart({});
    localStorage.removeItem('cart');
  }

  const removeFromCart=(itemCode,qty,price,name,size,varient1)=>{
    let newCart = cart;
    if(itemCode in newCart){
      newCart[itemCode].qty=cart[itemCode].qty-qty;}
    
    if(newCart[itemCode]['qty']<=0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
   
  }

  const addToCart=(itemCode,qty,price,name,size,varient1)=>{
    let newCart = cart;
    if(itemCode in newCart){
      newCart[itemCode].qty=cart[itemCode].qty+qty;}
    
    else{
      newCart[itemCode]={qty:1,price:price,name:name,size:size,varient1:varient1} 
    }
    setCart(newCart);
    console.log("function ye aya "+newCart[itemCode].varient1)
    saveCart(newCart);
    //console.log('added')
  }
const logout=()=>
{
  localStorage.removeItem("token")
  setuser({value:null})
  setkey(Math.random())
  router.push('/')
}
  const buyNow=(itemCode,qty,price,name,size,varient1)=>{
  let newCart={itemCode:{qty:1,price,name,size,varient1}}
    setCart(newCart);
    saveCart(newCart);
    console.log("--------------->"+newCart)

  router.push('/checkout')
}
  return <>
  <LoadingBar
        color='#554994'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar logout={logout} key={total} user={user}  cart={cart} addToCart={addToCart}  removeFromCart={removeFromCart}  clearrCart={clearrCart} total={total} />  
    <Component  buyNow={buyNow} cart={cart} addToCart={addToCart}  removeFromCart={removeFromCart} clearrCart={clearrCart} total={total} {...pageProps} />
    <Footer />
  </>
  
  
}

export default MyApp