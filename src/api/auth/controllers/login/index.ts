import { Request, Response, RequestHandler } from 'express';
import { User } from '../../../../models';
import { generateAccessToken, generateRefreshToken } from '../../helpers';

const loginController: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !await user.matchPassword(password)) {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    console.log(user);
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified',
      });
    }
    if (user.banned) {
      return res.status(403).json({
        success: false,
        message: 'Account banned temporarily',
        data: {
          bannedTill: user.bannedTill
        }
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user: user.toJSON(),
        tokens: {
          access: generateAccessToken({ id: user._id, role: user.role }),
          refresh: user.refreshToken
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error   
    });
  };
};

export default loginController;