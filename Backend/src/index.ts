import express, { Response, urlencoded } from "express"
import dotenv from "dotenv"
import DBConnect from "./utils/DBConnect"
import Razorpay from "razorpay"
import router from "./router/paymentRouter"
import cors from "cors"
import courseRouter from "./router/CourseRouter"
import userPurchaseRouter from "./router/userPurchasesRoutes"
dotenv.config()
DBConnect()

export const instance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})

const app=express()

app.use(express.json())
app.use(cors())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/api",router)
app.use("/api/courses",courseRouter)
app.use("/api/purchase",userPurchaseRouter)
app.get('/api/getKey', (req, res) => {
    // Ensure the environment variable is loaded
    if (!process.env.RAZORPAY_KEY) {
        return res.status(500).json({ error: 'RAZORPAY_KEY is not defined' });
    }
    res.status(200).json({ key: process.env.RAZORPAY_KEY });
});
app.get("/",(_,res:Response)=>{
    console.log("Backend is up");
    
})
// app.listen(process.env.PORT || 5000,()=>{
//     console.log(`server is running on port ${process.env.PORT}`)
// })

export default app