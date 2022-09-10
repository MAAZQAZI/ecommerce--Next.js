// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models.js/user";
import connectDB from "../../middleware/mongoose";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
var jwt = require("jsonwebtoken");

const gete = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, address, phone, pincode } = req.body;
    let user = await User.findOneAndUpdate(
      { email: email },
      { address: address, pincode: pincode, phone: phone, name: name }
    );

    res.status(200).json({ user });
    console.log(user);
  } else {
    res.status(400).json({ error: "error" });
  }
};
export default connectDB(gete);
