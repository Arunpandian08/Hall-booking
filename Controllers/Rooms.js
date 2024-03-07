// Static Rooms data
const rooms = [
  {
    room_id: 1,
    room_name: "Party Hall",
    available_seats: 200,
    amenities: ["A/C", "Dollby atom Audio", "Dj", "Party lights", "Parking"],
    booking_status: "booked",
    Price_per_hr: 1000,
  },
  {
    room_id: 2,
    room_name: "Marriage Hall",
    available_seats: 1000,
    amenities: [
      "A/C",
      "Dollby atom Audio",
      "Tinning Area",
      "Party lights",
      "Parking",
    ],
    booking_status: "available",
    Price_per_hr: 3000,
  },
  {
    room_id: 3,
    room_name: "Function Hall",
    available_seats: 1000,
    amenities: ["Non-A/C", "Dts Audio System", "Tinning Area", "Parking"],
    booking_status: "booked",
    Price_per_hr: 2500,
  },
  {
    room_id: 4,
    room_name: "Meeting Hall",
    available_seats: 1000,
    amenities: [
      "A/C",
      "Dollby atom Audio",
      "Tinning Area",
      "Projector",
      "Parking",
    ],
    booking_status: "available",
    Price_per_hr: 500,
  },
];

const bookingRooms = [];

// To get all rooms data
export const getRoomsDetail = (req, res) => {
  res.status(200).json({ Rooms: rooms });
};

//1.To posted or Created a room with the below respected data.
export const createRooms = (req, res) => {
  // destructured variables with requesting data from body for create new room
  const {
    room_name,
    available_seats,
    amenities,
    booking_status,
    Price_per_hr,
  } = req.body;
  const newRoom = {
    room_id: rooms.length + 1,
    room_name: room_name,
    available_seats: available_seats,
    amenities: amenities,
    booking_status: booking_status,
    Price_per_hr: Price_per_hr,
  };
  rooms.push(newRoom);
  res.status(200).json({ message: "Room created successfully", Data: newRoom });
};

// 2.To post booking a room with respected data

export const bookingRoom = (req, res) => {
  const { customer_name, date, start_time, end_time, room_id } = req.body; // requesting required data form body
  let room = rooms.find(
    (rooms) => rooms.booking_status === "available" && rooms.room_id == room_id // finding is the rooms is available
  );
  if (!room) {
    // if room is not available throw status data not found
    return res.status(404).send(`<div style='text-align:center'>
        <h1>409</h1>
        <h6>Room is not available at this Room Id</h6>
        </div>`);
  } else {
    // else comparing both data and booking date ...its also available then allow to book
    let DateOfBooking = bookingRooms.filter(
      (rooms) => rooms.booking_date === date
    );
    if (DateOfBooking.length > 0) {
      return res
        .status(404)
        .json({ Message: "Room is already booked at this data" }); // if date is similar throw error message
    } else {
      let bookingData = {
        booking_id: bookingRooms.length + 1,
        room_id,
        customer_name,
        date: date,
        start_time,
        end_time,
        booking_status: "booked",
      };
      bookingRooms.push(bookingData); // then booking data are pushed in booking rooms list
      res
        .status(200)
        .json({ message: "Room booked successfully", Data: bookingRooms });
    }
  }
};

//3.List of all rooms with booked Data(GET)

export const bookedRooms = (req, res) => {
  res
    .status(200)
    .json({ Message: "Got all booked data", BookedData: bookingRooms });
};

//4. List all customers with booked data(GET)

export const ToGetCustomersBookedData = (req, res) => {
  const customer_data = bookingRooms.map((bookingData) => {
    const roomData = rooms.find(
      (room) => room.room_id === bookingData.room_id //
    );
    return {
      room_id: bookingData.room_id,
      customer_name: bookingData.customer_name,
      room_name: roomData ? roomData.room_name : "Room not found",
      date: bookingData.date,
      start_time: bookingData.start_time,
      end_time: bookingData.end_time,
    };
  });
  res
    .status(200)
    .json({ message: "Get All Booked Customers Data", Data: customer_data });
};

// 5. List how many times a customer has booked the room with details (GET)

export const getCustomerBookingDetails = (req, res) => {
  const { customer_name } = req.query;

  if (!customer_name) {
    return res.status(400).json({ message: "Customer name is required" });
  }

  const customerBookings = bookingRooms.filter(
    (bookingData) => bookingData.customer_name === customer_name
  );

  const formattedBookings = customerBookings.map((bookingData) => {
    const roomData = rooms.find((room) => room.room_id === bookingData.room_id);
    return {
      booking_id: bookingData.booking_id,
      customer_name: bookingData.customer_name,
      room_name: roomData ? roomData.room_name : "Room not found",
      date: bookingData.date,
      start_time: bookingData.start_time,
      end_time: bookingData.end_time,
      booking_date: bookingData.booking_date,
      booking_status: bookingData.booking_status,
    };
  });

  res.status(200).json({ customer_name, bookings: formattedBookings });
};
