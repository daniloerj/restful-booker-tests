# restful-booker-tests

Automatización de pruebas funcionales, de integración y performance para la API [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) usando TypeScript, Cucumber, Supertest y k6.

---

## 🚀 Ejecución de pruebas funcionales

### Ambiente **dev** (por defecto)
```bash
npm run test:dev
```

### Ambiente **qa**
```bash
npm run test:qa
```

### Ambiente **prod**
```bash
npm run test:prod
```

---

## 📊 Generar reporte HTML de pruebas funcionales

```bash
npm run report
```
El reporte se genera en `reports/cucumber_report.html`.

---

## ⚡ Pruebas de performance (stress test) con k6

### Ejecutar stress test localmente

```bash
k6 run stress/api-stress.k6.js
```

Puedes ajustar la cantidad de usuarios virtuales y duración editando el archivo `stress/api-stress.k6.js`.

---

## 🏗️ Integración Continua (CI)

El proyecto incluye un workflow de GitHub Actions que:

- Instala dependencias
- Ejecuta pruebas funcionales en ambiente dev
- Ejecuta pruebas de performance con k6
- Genera y sube el reporte HTML como artefacto

Puedes ver los resultados y descargar los reportes desde la pestaña **Actions** de tu repositorio en GitHub.

---

## 🧹 Buenas prácticas implementadas

- **Soporte multiambiente** mediante archivos de configuración y variables de entorno
- **Datos de prueba centralizados** y reutilizables
- **Limpieza automática** de datos creados en pruebas
- **Patrón Service Object** para desacoplar lógica HTTP
- **Reportes automáticos** y artefactos en CI
- **Pruebas de stress** integradas al pipeline

---

## 📁 Estructura recomendada

```
restful-booker-tests/
├── config/                # Configuración por ambiente
├── features/              # Features y step definitions de Cucumber
├── reports/               # Reportes HTML generados
├── src/
│   ├── config.ts          # Loader de configuración
│   └── services/          # Service Objects
├── stress/                # Scripts de k6 para performance
├── .github/workflows/     # Workflows de CI
├── package.json
└── README.md
```

---

## 📚 Recursos útiles

- [Documentación oficial Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [k6 (performance testing)](https://k6.io/docs/)
- [Supertest](https://github.com/visionmedia/supertest)

---

## ✨ Contribuciones

¡Pull requests y sugerencias son bienvenidas!

---

## 📝 Licencia

MIT