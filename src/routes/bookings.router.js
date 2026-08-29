import { Router } from "express"
import { addServiceToBooking, createBooking, getBookingById } from "../controllers/bookings.controller.js";


const router = new Router();

router.post("/", createBooking);

router.get("/:bid", getBookingById);

router.post("/:bid/services/:sid", addServiceToBooking);


export default router;