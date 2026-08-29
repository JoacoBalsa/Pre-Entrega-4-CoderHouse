import { Router } from "express"
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const router = new Router();
const manager = new BookingManager();
const serviceManager = new ServiceManager();

router.post("/", async (req, res) => {
    try {
        const { services } = req.body;

        if (services && Array.isArray(services) && services.length > 0) {
            for (const item of services) {
                if (item.service) {
                    const existeServicio = await serviceManager.getServiceById(item.service);
                    if (!existeServicio) {
                        return res.status(404).json({
                            status: "error",
                            message: `No se puede crear la reserva: El servicio con id '${item.service}' no existe.`
                        });
                    }
                }
            }
        }

        const booking = await manager.createBooking(req.body);
        if (!booking) {
            return res.status(400).json({
                status: "error",
                message: "Error al crear la reserva"
            });
        }

        res.status(200).json({
            satus: "success",
            message: "Reserva creada con exito",
            payload: booking
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }

});

router.get("/:bid", async (req, res) => {
    try {
        const id = req.params.bid;
        let booking = await manager.getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: `booking de id ${id} no encontrado`
            });
        }

        res.status(200).json({
            status: "success",
            payload: booking
        });


    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});

router.post("/:bid/services/:sid", async (req, res) => {
    try {
        const bid = req.params.bid;
        let booking = await manager.getBookingById(bid);
        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: `booking de id ${bid} no encontrado`
            });
        }

        const sid = req.params.sid
        let service = await serviceManager.getServiceById(sid);
        if (!service) {
            return res.status(404).json({
                status: "error",
                message: `servicio de id ${sid} no encontrado`
            });
        }

        const bookingService = await manager.addServiceToBooking(bid, sid);

        res.status(200).json({
            status: "success",
            message: "El servicio fue agregado con exito",
            payload: bookingService
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});


export default router;