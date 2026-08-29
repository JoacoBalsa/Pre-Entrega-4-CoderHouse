import { randomUUID } from "node:crypto";
import fs from 'fs/promises';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateDataBooking } from "../utils/validators.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingPath = path.join(__dirname, "..", "data", "bookings.json");

export default class BookingManager {

    async #readFile() {
        try {
            const data = await fs.readFile(bookingPath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        await fs.writeFile(bookingPath, JSON.stringify(data, null, 2));
    }


    async createBooking(data) {
        try {
            const validData = validateDataBooking(data);
            const id = randomUUID();

            const reserva = { id: id, ...validData };

            const bookings = await this.#readFile();
            bookings.push(reserva);
            await this.#writeFile(bookings);

            return reserva;

        } catch (error) {
            console.error(`Error en el servicio createBooking: ${error.message}`);
            throw new Error(error.message);
        }
    }

    async getBookingById(id) {
        const bookings = await this.#readFile();
        const booking = bookings.find(b => b.id === id);

        if (!booking) {
            return null;
        }

        return booking;
    }

    async addServiceToBooking(bid, sid) {
        const bookings = await this.#readFile();
        const bookingIndex = bookings.findIndex(b => b.id === bid);

        if (bookingIndex === -1) {
            return null;
        }

        const booking = bookings[bookingIndex];

        const serviceIndex = booking.services.findIndex(s => s.service === sid);

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({
                service: sid,
                quantity: 1
            });
        }

        await this.#writeFile(bookings);
        return booking;

    }

}