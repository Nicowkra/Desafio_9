import express  from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path"
import loginRouter from "./routes/login.js"
import fileStrategy from "session-file-store"
import MongoStore from "connect-mongo"
import handlenbars from "express-handlebars"


const app = express()
const server = app.listen(8081,()=>{
    console.log("Listening on port 8081")
})

const Filestorage = fileStrategy(session)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use(session({
   store: MongoStore.create({
      mongoUrl:"mongodb+srv://nicolas:qwer1234@prueba.wmbbs.mongodb.net/BaseSessiones?retryWrites=true&w=majority",
      ttl:60
   }),
   secret:"secretisimo",
   resave: true,
   saveUninitialized:false,
   cookie:{
      maxAge:60000
   },

}))




app.use('/',loginRouter);
app.engine("handlebars", handlenbars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
