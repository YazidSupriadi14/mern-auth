import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/ConnectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);



app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    connectDB();
    console.log("Server started on port :",PORT);
});



//jyPgZ8sGoPWO79S1
//mongodb+srv://yazidsupriadi1406:jyPgZ8sGoPWO79S1@cluster0.hkato.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0