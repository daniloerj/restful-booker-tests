import { BookingData } from '../services/BookingService';

export const defaultBooking: BookingData = {
  firstname: "John",
  lastname: "Doe",
  totalprice: 123,
  depositpaid: true,
  bookingdates: {
    checkin: "2024-06-01",
    checkout: "2024-06-10"
  },
  additionalneeds: "Breakfast"
};