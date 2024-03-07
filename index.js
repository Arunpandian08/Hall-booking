import express from 'express'; //importing express third party package
import appRouters from './Routers/HallsRouter.js' //importing and connecting routers with app 

const app = express();
//Port number for local
const PORT = 4000;
// Middleware to parse JSON requests
app.use(express.json())
// Routers end point
app.use('/hall-booking', appRouters)
//End-point for Root Router or home Page
app.get('/', (req, res) => {
    res.status(200).send(`
    <div style='text-align:center'>
    <h3 style='background-color:orange;color:black'>All APIs with End-Points</h3>
    <h6 >API For all Rooms: <a href='http://localhost:4000/hall-booking/rooms'>http://localhost:4000/hall-booking/rooms</a></h6>
    <h6 >API For Create Rooms(Post): <a href='http://localhost:4000/hall-booking/create-room'>http://localhost:4000/hall-booking/create-room</a></h6>
    <h6 >API For Room Booking: <a href='http://localhost:4000/hall-booking/booking'>http://localhost:4000/hall-booking/booking</a></h6>
    <h6 >API For all Rooms booked data: <a href='http://localhost:4000/hall-booking/booked-data'>http://localhost:4000/hall-booking/booked-data</a></h6>
    <h6 >API For Room booked customer data: <a href='http://localhost:4000/hall-booking/booked-customer'>http://localhost:4000/hall-booking/booked-customer</a></h6>
    <h6 >API For Booked customer count: <a href='http://localhost:4000/hall-booking/customer-count?customer_name=Arun'>http://localhost:4000/hall-booking/customer-count?customer_name=Arun</a></h6>
    </div>`);
})
//Application Listener for port
app.listen(PORT, () => {
    console.log(`App is running at Port: ${PORT}`);
})