import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export const validateDataServicios = (data) => {
    const { name, description, duration, price, category, available } = data;

    if (!name || typeof name !== "string") throw new Error("El nombre es requerido y debe ser texto.");
    if (!description || typeof description !== "string") throw new Error("La descripción es requerida y debe ser texto.");
    if (!category || typeof category !== "string") throw new Error("La categoría es requerida y debe ser texto.");

    if (typeof duration !== "number" || isNaN(duration) || duration < 0) {
        throw new Error("La duración es requerida y debe ser un número mayor o igual a cero.");
    }

    if (typeof price !== "number" || isNaN(price) || price < 0) {
        throw new Error("El precio es requerido y debe ser un número mayor o igual a cero.");
    }

    if (typeof available !== "boolean") {
        throw new Error("El campo available es requerido y debe ser booleano.");
    }

    return { name, description, duration, price, category, available };
};

export const validateDataBooking = (data) => {
    const { clientName, clientEmail, date, time, status, services } = data;

    if (!clientName || typeof clientName !== "string") throw new Error("El nombre del cliente es requerido y debe ser texto.");
    if (!clientEmail || typeof clientEmail !== "string") throw new Error("El email del cliente es requerido y debe ser texto.");

    const allowedFormats = ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY'];
    const parsedDate = dayjs(date, allowedFormats, true);
    if (!parsedDate.isValid()) throw new Error(`La fecha proporcionada (${date}) no es válida.`);
    const formattedDate = parsedDate.format('DD/MM/YYYY');

    const allowedTimeFormats = ['HH:mm', 'HH:mm:ss', 'h:mm A', 'h:mm a'];
    const parsedTime = dayjs(time, allowedTimeFormats, true);
    if (!parsedTime.isValid()) throw new Error(`La hora proporcionada (${time}) no es válida.`);
    const formattedTime = parsedTime.format('HH:mm');

    if (status === undefined || typeof status !== "boolean") throw new Error("El status es requerido y debe ser un booleano.");

    if (!Array.isArray(services)) {
        throw new Error("Los servicios deben enviarse en un arreglo [].");
    } else {
        services.forEach(serv => {
            if (!serv.quantity || !Number.isInteger(serv.quantity)) {
                throw new Error("Los servicios deben tener una cantidad y debe ser un número entero.");
            }
            if (!serv.service || typeof serv.service !== "string") {
                throw new Error("Los servicios deben indicar un id en la propiedad 'service' y debe ser string.");
            }
        });
    }

    return {
        clientName,
        clientEmail,
        date: formattedDate,
        time: formattedTime,
        status,
        services
    };
};