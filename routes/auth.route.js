import express from "express";
import {
  handleRegistration,
  handleAdminLogin,
  handleVerifyEmail,
} from "../controllers/User.controller.js";

const router = express.Router();

router.post("/register/customer", (req, res) =>
  handleRegistration(req, res, "customer")
);

router.post("/register/admin", (req, res) =>
  handleRegistration(req, res, "admin")
);

router.post("/login/admin", handleAdminLogin);

router.get("/verify-email", handleVerifyEmail);

export default router;
