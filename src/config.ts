// filepath: restful-booker-tests/src/config.ts
const env = process.env.TEST_ENV || 'dev';
// Carga la configuración correspondiente al ambiente
const config = require(`../config/${env}`).default;
export default config;