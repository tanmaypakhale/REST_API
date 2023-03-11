import User from "../model/User.js";
import bcrypt from 'bcryptjs';
export const getAllUser = async(req, res)=> {
    let users;
    try {
        users = await User.find();
    } catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No Users Found"});
    }
    return res.status(200).json({users});

}

export const signup = async(req,res,next)=>{
    const {name, email ,password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
       return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User Already Exists! Login Instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user1 = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });
    
    try{
        user1.save();
    } catch(err){
      return console.log(err); 
    }
    return res.status(201).json({user1});
};

export const login = async(req, res) =>{
    const {email, password} = req.body;
    let existingUser
    try{
        existingUser = await User.findOne({email});
    } catch(err){
       return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "User Not Found by this email"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(404).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "Login Successful"})
}