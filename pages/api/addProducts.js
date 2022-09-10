  //Next.js API route support: https:nextjs.org/docs/api-routes/introduction
import Product from "../../models.js/product";
import connectDB from "../../middleware/mongoose";
 const handler = async(req, res) => {
    if (req.method == "POST") {
      console.log(req.body);
     
        let p = new Product({
          title: req.body.title,
          slug: req.body.slug,
          desc: req.body.description,
          price: req.body.price,
          img: req.body.img,
          category: req.body.category,
          size: req.body.size,
          color: req.body.color,
          availableqty: req.body.qty,
        });
        await p.save();
      
     res.status(200).json({ success: "Data added" });
    } else {
      res.status(400).json({ error: "this method is not allowed " });
    }
  
 };
  export default connectDB(handler);