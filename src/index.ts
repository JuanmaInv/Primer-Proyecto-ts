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

// 4. Mostrar información de los socios
console.log("\n--- Info de Socios ---");
console.log(socio1.mostrarInfo());
console.log(socio2.mostrarInfo());
console.log(socio3.mostrarInfo());

// 5. Resumen del gimnasio
console.log("\n--- Resumen del Gimnasio ---");
console.log(`Total de socios VIP: ${miGimnasio.obtenerVips().length}`);
console.log(`Ingresos totales estimados: $${miGimnasio.calcularIngresosTotales()}`);

console.log("\n=== FIN DE LA EJECUCIÓN ===");
