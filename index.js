import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './model/blog-routes.js';
import router from './model/user-routes.js';

const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
mongoose.connect('mongodb+srv://tanmaypakhale:tan123@cluster0.l63biff.mongodb.net/Blog?retryWrites=true&w=majority').then (()=>app.listen(5000)).then(()=>console.log("Connected to Database")).catch((err)=> console.log(err));