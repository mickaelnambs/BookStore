import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Book from "../models/book.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new order => /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user.id
    });

    res.status(201).json({
        order,
    });
});

// Get order details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404));
    }

    res.status(200).json({
        order,
    });
});

// Get current user orders => /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        orders,
    });
});

// Get all orders - ADMIN => /api/orders
export const allOrders = catchAsyncErrors(async (req, res) => {
    const orders = await Order.find();

    res.status(200).json({
        orders,
    });
});

// Update order - ADMIN => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404));
    }

    if (order?.orderStatus === 'Delivered') {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order?.orderItems.forEach(async (item) => {
        const book = await Book.findById(item?.book?.toString());
        if (!book) {
            return next(new ErrorHandler('No book found with this id', 404));
        }
        book.stock = book.stock - item.quantity;
        await book.save({ validateBeforeSave: false });
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

// Delete order - ADMIN => /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});
