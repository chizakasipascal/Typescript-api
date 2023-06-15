import express from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import UserValidation from '../middleware/validator/UserValidation';
import Autorization from '../middleware/Autorization';
const router = express.Router()

//Roles
router.get("/get-all-roles", Autorization.Authenticated, RoleController.GetRole);
router.post("/create-role", RoleController.CreateRole);
router.post("/update-role/:id", RoleController.UpdateRole);
router.delete("/delete/:id", RoleController.DeleteRole);
router.get("/get-one-role/:id", RoleController.GetRoleById);

//User
router.post('/user/sigunp', UserValidation.RegisterValidation, UserController.Register)
router.post('/user/login', UserController.UserLogin)
router.get("/user/refresh-token", UserController.RefreshToken);

export default router;