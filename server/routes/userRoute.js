import express from 'express';

import userController from "../controller/userController.js";



const router = express.Router();

router.post('/users', userController.addUsers); 
router.get('/getUsers', userController.getAllUsers);
router.get('/getUsers/:id', userController.getUserById); 
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;
 
