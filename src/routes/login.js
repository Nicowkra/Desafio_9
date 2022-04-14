import express from 'express'
import fileStrategy from "session-file-store"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser";
import session from "express-session";




const router = express.Router()

router.get("/login", (req, res) => {
  if(req.session.user){
    console.log(req.session.user)
    var res_body={userName:req.session.user}
    res.render("index",res_body)
  }else{
    console.log("no estas conectadoooo")
    res.render("login");
  }
})
router.get("/logout", (req, res) => {
  var res_body={userName:req.session.user}
  req.session.destroy()
    res.render("logout",res_body);
  })

  router.post("/login", (req, res) => {
    if(req.session.cookie){
      var body = req.body
    var res_body ={userName:body.userName}
    req.session.user= body.userName
    res.render("index", res_body)
    }
})


export default router