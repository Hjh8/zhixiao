var token = req.headers['x-guesttoken']
const secret = 'CodeKiang' // secret要与签发时一致
jwt.verify(token, secret, (err, decoded) => {
  if(err){
      console.log(err)
      return
  }
  console.log(decoded)
})
