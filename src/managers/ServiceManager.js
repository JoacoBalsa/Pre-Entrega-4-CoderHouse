import { randomUUID } from 'node:crypto';
import fs from 'fs/promises';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateDataServicios } from '../utils/validators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicePath = path.join(__dirname, "..", "data", "services.json");

export default class ServiceManager {

    async #readFile() {
        try {

            const data = await fs.readFile(servicePath, 'utf-8');
            return JSON.parse(data);

        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        await fs.writeFile(servicePath, JSON.stringify(data, null, 2));
    }

    async getServices() {
        const servicios = await this.#readFile();
        return servicios;
    }

    async getServiceById(id) {
        const servicios = await this.#readFile();
        let servicio = servicios.find(serv => serv.id === id);

        if (!servicio) {
            console.error(`No se encontro ningun servicio con el id ${id}`);
            return null;
        }

        return servicio;

    }

    async addService(serviceData) {
        try {
            const validData = validateDataServicios(serviceData);
            const id = randomUUID();

            const servicio = { id: id, ...validData };

            const servicios = await this.#readFile();
            servicios.push(servicio);
            await this.#writeFile(servicios);

            console.log(`Servicio id: ${id} Nombre: ${validData.name} fue agregado exitosamente`);
            return servicio;

        } catch (error) {
            console.error(`Se ha producido un error procesando el addService: ${error.message}`);
            throw new Error(error.message);
        }
    }

    async updateService(id, updatedData) {
        const { name, description, duration, price, category, available } = updatedData;
        const servicios = await this.#readFile();
        const index = servicios.findIndex(serv => serv.id === id);

        try {
            if (index === -1) {
                console.error(`No se encontro ningun servicio con el id ${id}`);
                return null;
            }

            servicios[index] = {
                id: servicios[index].id,
                name: name ?? servicios[index].name,
                description: description ?? servicios[index].description,
                duration: duration ?? servicios[index].duration,
                price: price ?? servicios[index].price,
                category: category ?? servicios[index].category,
                available: available ?? servicios[index].available
            }

            await this.#writeFile(servicios);

            console.log(`El servicio con id: ${id} fue actualizado con exito`);
            return servicios[index];
        } catch (error) {
            console.error(`Se ha producido un error en updateService: ${error.message}`);
            throw new Error(`El servicio updateService fallo: ${error.message}`);
        }

    }

    async deleteService(id) {
        try {
            const servicios = await this.#readFile();
            const index = servicios.findIndex(serv => serv.id === id);

            if (index === -1) {
                console.error(`Error en deleteService: No se encontro el servicio con id: ${id}`);
                return null;
            }

            const servicio = servicios[index];

            servicios.splice(index, 1);
            await this.#writeFile(servicios);

            console.log(`El servicio con id: ${id} se elimino exitosamente`);
            return servicio;
        } catch (error) {
            console.error(`Fallo el servicio deleteService ${error.message}`);
            throw new Error(`El servicio deleteService fallo: ${error.message}`);
        }

    }

}


