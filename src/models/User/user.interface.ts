import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role?: string;
  status?:String;
  firstName: string;
  lastName: string;
  cnic: string;
  displayPictureID?: any;
  displayPictureURL?: any;
  rating?: number;
  ratings?: any;
  favoriteCompanies?: any;
  banned?: boolean;
  bannedTill?: any;
  verified?: boolean;
  refreshToken?: string | null;
  resetToken?: string | null;
  resetExpires?: any;
  matchPassword: Function;
  company?: string;
  subscriptionTier?: string;
  subscriptionCancelled?: boolean;
  subscriptionPaid?: boolean;
  subscriptionExpiry?: any;
  ads?: any 
};

export default IUser;