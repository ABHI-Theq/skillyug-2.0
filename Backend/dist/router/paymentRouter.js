"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentControllers_1 = require("../controllers/paymentControllers");
const router = (0, express_1.Router)();
router.route('/checkout').post(paymentControllers_1.checkout);
router.route("/paymentverification").post(paymentControllers_1.paymentVerification);
exports.default = router;
