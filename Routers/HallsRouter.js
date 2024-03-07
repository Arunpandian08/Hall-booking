import express from "express";
import {
  ToGetCustomersBookedData,
  bookedRooms,
  bookingRoom,
  createRooms,
  getCustomerBookingDetails,
  getRoomsDetail,
} from "../Controllers/Rooms.js"; // import all routers

const router = express.Router();
// end points for each api calls
router.get("/rooms", getRoomsDetail);
router.post("/create-room", createRooms);
router.post("/booking", bookingRoom);
router.get("/booked-data", bookedRooms);
router.get("/booked-customer", ToGetCustomersBookedData);
router.get("/customer-count", getCustomerBookingDetails);

export default router; //Export all routers to app
