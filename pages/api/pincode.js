export default function handler(req, res) {
  let pincode={
    
    '55050': ['Punjab','Kasur'],
    '55051': ['Punjab','Patto-Ki'],
  
}
    res.status(200).json(pincode)
  }