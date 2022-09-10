//Next.js API route support: https:nextjs.org/docs/api-routes/introduction
import User from "../../models.js/user";
import connectDB from "../../middleware/mongoose";
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const bytes = cryptojs.AES.decrypt(user.password, "secret123");
      let originalText = bytes.toString(cryptojs.enc.Utf8);

      if (req.body.email === user.email && req.body.password === originalText) {
        const token = jwt.sign(
          { name: user.name, email: user.email },
          "jwtsecretkey",
          { expiresIn: "2d" }
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(400).json({ error: "password or email is incorrect" });
      }
    }
    else{
      res.status(400).json({ error: "this method is not allowed " });
    }

  } else {
    res.status(400).json({ error: "this method is not allowed " });
  }
};
export default connectDB(handler);
