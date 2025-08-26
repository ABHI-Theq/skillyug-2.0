import express, { urlencoded } from "express"
import dotenv from "dotenv"
import DBConnect from "./utils/DBConnect"
dotenv.config()
DBConnect()


const app=express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})