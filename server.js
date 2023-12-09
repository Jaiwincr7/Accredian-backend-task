const express=require('express')
const cors=require('cors')
const mysql =require('mysql')
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cors())
// app.use(cookieParser())

const db = mysql.createConnection(
    {
        host: "localhost", 
        user: "root",
        password:"",
        database:"signup"
})

app.post('/register',(req,res)=>{
    const sql="INSERT INTO login(`name`,`email`,`password`) VALUES (?)"
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values],(err,data)=>{
        if(err){
            return res.json("ERROR")
        }
        return res.json(data)
    })
})

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM login WHERE `email`=? AND `password`=?"
    db.query(sql, [req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("ERROR")
        }
        if(data.length>0)
        {
            return res.json("Success")
        }
        else{
            return res.json("Failure")
        }
    })
})

app.listen(5000,()=>{
    console.log("Server is up")
})