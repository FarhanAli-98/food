import { Request, Response, RequestHandler } from 'express';
import { User,IUser } from '../../../../models';
import {  generateAccessToken, generateRefreshToken } from '../../helpers';


const signupController: RequestHandler = async (req: Request, res: Response) => {

  console.log("we are in signup");
  const { email, password, firstName, lastName, cnic,role } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(403).json({
        success: false,
        message: 'User already exists',
      });
    }
    let user = await User.create({
      email,
      password,
      role,
      firstName, 
      lastName,
      cnic
    })
    await user.updateOne({
      $set: {
        refreshToken: generateRefreshToken({ id: user._id, role: user.role })
      }
    });
    const token = generateAccessToken({ id: user._id });
    if(user){
      return res.status(201).json({
        success: true,
        message: 'User Created Successfully',
        details: 'An email has been sent. Kindly verify your account.',
        data: {
          id: user._id,
          email: user.email,
          accessToken:token,
        }
      });

    }
    else{
      return res.status(400).json({
        success: true,
        message: 'User Creating Faild',
        details: ' Kindly verify your account.',
      
      });
    }
  
  
 
   
   
  }
  catch(e){
    console.log(e)
  }
}

export default signupController;