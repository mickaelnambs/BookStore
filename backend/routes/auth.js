import express from 'express';
import { 
    allUsers, 
    deleteUser, 
    forgotPassword, 
    getUserDetails, 
    getUserProfile, 
    loginUser, 
    logoutUser, 
    registerUser, 
    resetPassword, 
    updatePassword, 
    updateProfile, 
    updateUser 
} from '../controllers/authControllers.js';
import { authorizedRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizedRoles("admin"), allUsers);

router
    .route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails)
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

export default router;
