import userModel from "../Models/authModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signIn = async (req, res) => {
  const {email, password } = req.body;

  try{
    const existingUser = await userModel.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "user doesn't exist"});

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(401).json({ message: "Invalid Credentials"});

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.LOGIN, { expiresIn: '24h'});

res.status(201).json({result: existingUser, token})

  }catch(err){
res.status(500).json({message: "Something Went Wrong"});
  }
}

export const signUp = async (req, res) => {
    if(!req.body) return res.status(404).json({message: "no input"}); 
    
    const {firstName, lastName, email, password} = req.body;

    try{
const existingUser = await userModel.findOne({email});

if(existingUser) return res.status(400).json({message: "User Already Exists"});

const hashPwd = await bcrypt.hash(password, 12);

const result = await userModel.create({
    email, password: hashPwd, name: `${firstName} ${lastName}`
});

const token = jwt.sign({email: result.email, id: result._id}, process.env.LOGIN, {expiresIn: '1h'});

res.status(201).json({result, token});
    }
    catch(err){
        res.status(500).json({message: "Something Went Wrong"});
    }
}