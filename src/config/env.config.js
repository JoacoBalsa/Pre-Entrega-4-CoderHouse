import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV } = process.env;

if (!PORT || !NODE_ENV) {
    console.error("Faltan variables de entorno requeridas");
    process.exit(1);
}

console.log(`Variables de entorno cargadas correctamente ${NODE_ENV} en puerto ${PORT} `);

const config = {
    port: PORT,
    env: NODE_ENV
};

export default config;