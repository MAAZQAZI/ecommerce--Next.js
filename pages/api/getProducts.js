// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models.js/product"
import connectDB from "../../middleware/mongoose"

const gete = async (req, res) => {
        
    
        let products = await Product.find();
        
        
       
        // let tshirt={};
        // for( let item of products){
                
        //         if(item.title in tshirt){
                        
        //                         if(!tshirt[item.title].color?.includes(item.color) && item.availableqty>0){
        //                                 tshirt[item.title].color?.push(item.color)
                                
        //                         }
        //                         if(!tshirt[item.title].size?.includes(item.size) && item.availableqty>0 ){
        //                                 tshirt[item.title].size?.push(item.size)
        //                         }
                        
        //         }else{
        //                 tshirt[item.title]=JSON.parse(JSON.stringify(item))
        //                 console.log(tshirt[item.title])
        //                 if(item.availableqty>0){
        //                         tshirt[item.title].color=[item.color]
        //                         tshirt[item.title].size=[item.size]
        //                 }
        //         } 
               
    


res.status(200).json( {products} );
}
export default connectDB(gete);
  

  
  
