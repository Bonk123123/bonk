import Router from "express";
import UserController from "../controller/userController.js";
const router = new Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/user/:position", UserController.getUsers);
router.get("/user/:id", UserController.getOneUser);
router.put("/user/director", UserController.updateUserByDirector);
router.put(
  "/user/deputydirector/:id",
  UserController.updateUserByDeputyDirector
);
router.delete("/user/:id", UserController.deleteUser);

export default router;
