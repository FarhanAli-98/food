import { Router } from 'express';

import {
 
  signupController,
  loginController
  
 
} from './controllers';






const router: Router = Router();



router.post('/signup',  signupController);
router.post('/login',  loginController);


export default router;