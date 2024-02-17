import express from 'express';
import { authorizedRoles, isAuthenticatedUser } from '../middlewares/auth.js';
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrder } from '../controllers/orderControllers.js';

const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizedRoles("admin"), allOrders);

router
    .route("/admin/orders/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

export default router;
