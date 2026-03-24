import { Gimnasio } from "./gimnasio";
import { SocioComun } from "./socioComun";
import { SocioVip } from "./socioVip";

console.log("=== INICIANDO SISTEMA DEL GIMNASIO ===\n");

// 1. Instanciar el gimnasio
const miGimnasio = new Gimnasio();

// 2. Crear algunos socios
const socio1 = new SocioComun(1, "Juan Pérez");
const socio2 = new SocioVip(2, "María Gómez", "Acceso a Spa y Toallas gratis");
const socio3 = new SocioComun(3, "Carlos López");

// 3. Registrar socios en el gimnasio
console.log("--- Registrando Socios ---");
miGimnasio.agregarSocio(socio1);
miGimnasio.agregarSocio(socio2);
miGimnasio.agregarSocio(socio3);

// 4. Mostrar saludos
console.log("\n--- Mostrar Saludos ---");
console.log(socio1.saludar());
console.log(socio2.saludar("¡Hoy toca entrenar duro!"));

// 5. Resumen del gimnasio
console.log("\n--- Resumen del Gimnasio ---");
console.log(`Total de socios VIP: ${miGimnasio.obtenerVips().length}`);
console.log(`Ingresos totales estimados: $${miGimnasio.calcularIngresosTotales()}`);

console.log("\n=== FIN DE LA EJECUCIÓN ===");
