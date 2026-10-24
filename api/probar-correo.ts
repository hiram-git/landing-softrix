// Prueba el aviso por correo sin llenar el formulario: lee el mismo .env que el
// servicio, dice qué configuración ve y envía un aviso de prueba mostrando el
// error tal cual si falla.
//
//   cd /opt/landing && sudo -u softrix bun run correo:probar
import { avisarSolicitud, comprobarCorreo } from "./correo";

const ver = (nombre: string) => {
  const valor = process.env[nombre]?.trim();
  if (!valor) return "(vacío)";
  return nombre === "SMTP_PASS" ? `${valor.slice(0, 6)}… (${valor.length} caracteres)` : valor;
};
for (const nombre of [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "DEMO_CORREO_DE",
  "DEMO_CORREO_PARA",
]) {
  console.info(`${nombre.padEnd(17)} ${ver(nombre)}`);
}
console.info("");

await comprobarCorreo();
await avisarSolicitud({
  recibida: new Date().toISOString(),
  nombre: "Prueba del aviso (bun run correo:probar)",
  contacto: "rcgsoftrix@rcgpty.com",
  interes: "Softrix Facturación",
});
