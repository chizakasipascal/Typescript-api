import express from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import UserValidation from '../middleware/validator/UserValidation';
import Autorization from '../middleware/Autorization';
import MenuValidation from '../middleware/validator/MenuValidation';
import MasterMenuController from '../controllers/MasterMenuController';
import SubmenuController from '../controllers/SubmenuController';
const router = express.Router()

//Roles
router.get("/get-all-roles", Autorization.Authenticated, Autorization.BasicUser, RoleController.GetRole)
    .post("/create-role", Autorization.Authenticated, Autorization.AdminRole, RoleController.CreateRole)
    .post("/update-role/:id", Autorization.Authenticated, Autorization.AdminRole, RoleController.UpdateRole)
    .delete("/delete/:id", Autorization.Authenticated, Autorization.SuperUser, RoleController.DeleteRole)
    .get("/get-one-role/:id", Autorization.Authenticated, Autorization.BasicUser, RoleController.GetRoleById)

    //User
    .post('/user/sigunp', UserValidation.RegisterValidation, UserController.Register)
    .post('/user/login', UserController.UserLogin)
    .get("/user/refresh-token", UserController.RefreshToken)
    .get("/user/current", Autorization.Authenticated, UserController.UserDetail)
    .get("/user/logout", Autorization.Authenticated, UserController.UserLogout)


    // Master Menu Routing
    .post("/menu", MenuValidation.CreateMenuValidation, Autorization.Authenticated, Autorization.AdminRole, MasterMenuController.CreateMenu)
    .get("/menu", Autorization.Authenticated, Autorization.AdminRole, MasterMenuController.GetListMenu)
    .get("/menu/get/all", Autorization.Authenticated, Autorization.SuperUser, MasterMenuController.GetAllMenu)
    .get("/menu/:id", Autorization.Authenticated, Autorization.AdminRole, MasterMenuController.GetDetailMenu)
    .patch("/menu/:id", MenuValidation.CreateMenuValidation, Autorization.Authenticated, Autorization.AdminRole, MasterMenuController.UpdateMenu)
    .delete("/menu/:id", Autorization.Authenticated, Autorization.AdminRole, MasterMenuController.SoftDeleteMenu)
    .delete("/menu/permanent/:id", Autorization.Authenticated, Autorization.SuperUser, MasterMenuController.DeletePermanent)

    // Submenu routing
    .post("/sub-menu", MenuValidation.CreateSubmenuValidation, Autorization.Authenticated, Autorization.AdminRole, SubmenuController.CreateSubmenu)
    .get("/sub-menu", Autorization.Authenticated, Autorization.AdminRole, SubmenuController.GetListSubmenu)
    .get("/sub-menu/get/all", Autorization.Authenticated, Autorization.SuperUser, SubmenuController.GetAllSubmenu)
    .get("/sub-menu/:id", Autorization.Authenticated, Autorization.AdminRole, SubmenuController.GetDetailSubmenu)
    .patch("/sub-menu/:id", MenuValidation.CreateSubmenuValidation, Autorization.Authenticated, Autorization.AdminRole, SubmenuController.UpdateSubmenu)
    .delete("/sub-menu/:id", Autorization.Authenticated, Autorization.AdminRole, SubmenuController.SoftDelete)
    .delete("/sub-menu/permanent/:id", Autorization.Authenticated, Autorization.SuperUser, SubmenuController.DeletePermanent);

export default router;