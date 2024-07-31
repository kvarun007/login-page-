require('dotenv').config();

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const {Blob} = require("buffer")
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("bcrypt/promises");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const dp = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: "3307",
    password: '12345678',
    database: 'auth'
})

dp.connect(err=>{
    if(err){
        console.log("dp not connected")
    }
    else{
        console.log("dp connected");
    }
})




app.post("/api/root",(req,res)=>{
    const {token} = req.body
    //console.log(token)
    dp.query("select type from users where token =?",[token],(err,result)=>{
        console.log(result)
        console.log(result.length)
        if(result.length>0){
            if(result[0].type == "root"){   
                // const val = result[0].type
                dp.query("select * from users where type !=? ",["root"],(err,result)=>{
                    return res.status(200).json(result)
                })
    
            }
            else if(result[0].type == "admin"){
                dp.query("select * from users where type =? ",["user"],(err,result)=>{
                    return res.status(200).json(result)
                })
    
            }
            else if(result[0].type == "user"){
                console.log("user type user")
                return res.status(200).json({message: "welcome to dash board"})
    
            }
        }
        else{
            return res.status(400).json({message:"please login again"})
        }
        
    })
    
})

app.post("/api/del",(req,res)=>{
    // console.log("get")
    const {username} = req.body
    console.log(username)
    dp.query("delete from users where username = ?",[username],(err,result)=>{
        res.status(200).json({message:"user deleted"})
    })
})

app.post("/api",(req,res)=>{
    const {username,password} = req.body
    // console.log(username, password)
    //console.log(username,password)
    dp.query("select password from users where username = ?",[username],(err,result)=>{
        if(result.length>0){      
            dp.query("select username from users where password = ?",[password],(err,result)=>{
                if(result.length>0){
                    const user ={name: username};
                    const acessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECERT);
                    dp.query(`update users set token = "${acessToken}" where username = "${username}" and password = "${password}"`)
                    // return res.redirect("/")
                    return res.status(200).json({message:"user found", acessToken:acessToken})
                    // return res.redirect("/api/root");
                }else{
                    res.status(400).json({message:"invaild password"})
                }
            })
            
        }
        else{
            res.status(400).json({message:"invaild user name"})
        }
    })
})





app.listen("5000",()=>{console.log("server is running at 5000")})