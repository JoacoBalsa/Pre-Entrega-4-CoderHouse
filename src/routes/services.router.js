import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();
const manager = new ServiceManager();

router.get("/", async (req, res) => {
    try {
        let servicios = await manager.getServices();
        const { category, available } = req.query;

        if (category) {
            servicios = servicios.filter((ser) => ser.category.toLocaleLowerCase() === category.toLocaleLowerCase());
        }

        if (available) {
            servicios = servicios.filter((ser) => ser.available.toString() === available);
        }

        res.status(200).json({
            status: "success",
            payload: servicios
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});

router.get("/:sid", async (req, res) => {
    try {
        const id = req.params.sid;
        let servicio = await manager.getServiceById(id);

        if (!servicio) {
            return res.status(404).json({
                status: "error",
                message: `Servicio de id ${id} no encontrado`
            });
        }

        res.status(200).json({
            status: "success",
            payload: servicio
        });


    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }

});

router.post("/", async (req, res) => {
    try {
        let servicio = await manager.addService(req.body);
        console.log(req.body);

        if (!servicio) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos necesarios para la creacion de un servicio ver ejemplo",
                payload: {
                    name: "name",
                    description: "description",
                    duration: 0,
                    price: 0,
                    category: "category",
                    available: true
                }
            });
        }

        res.status(201).json({
            status: "success",
            message: "Servicio creado con exito",
            payload: servicio
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

router.put("/:sid", async (req, res) => {
    try {
        const id = req.params.sid;
        const servicio = await manager.updateService(id, req.body);

        if (!servicio) {
            return res.status(404).json({
                status: "error",
                message: `No se encuentrta ningun servicio con el Id: ${id} para actualizar`
            });
        }

        res.status(200).json({
            status: "success",
            message: "Servicio actualizado con exito",
            payload: servicio
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

router.delete("/:sid", async (req, res) => {
    try {
        const id = req.params.sid;
        const servicio = await manager.deleteService(id);

        if (!servicio) {
            return res.status(404).json({
                status: "error",
                message: `No se encontro el servicio con Id: ${id} para eliminar`
            });
        }

        res.status(200).json({
            status: "success",
            message: `Servicio con Id: ${id} eliminado con exito`,
            payload: servicio
        });


    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

export default router;