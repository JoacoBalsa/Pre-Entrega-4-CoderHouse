import express from "express";
import { logger } from "./middlewares/logger.middleware.js";
import serviceRouters from "./routes/services.router.js";
import bookingRouter from "./routes/bookings.router.js";


const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Servidor Inicializado",
        version: "1.0.0"
    })
});

app.use("/api/services", serviceRouters);
app.use("/api/bookings", bookingRouter);

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: `La ruta ${req.method} ${req.url} no existe`
    });
});

export default app;

