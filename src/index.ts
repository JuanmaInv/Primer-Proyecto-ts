import { Gimnasio } from "./gimnasio";
import { SocioComun } from "./socioComun";
import { SocioVip } from "./socioVip";

console.log("=== INICIANDO SISTEMA DEL GIMNASIO ===\n");

// 1. Instanciar el gimnasio
const miGimnasio = new Gimnasio();

// 2. Crear socios con su cuota inicial
console.log("--- Registrando Socios ---");
// Juan empieza como Común ($5000)
const socio1 = new SocioComun(12345678, "Juan Pérez", 5000);
// María empieza como VIP ($7000)
const socio2 = new SocioVip(87654321, "María Gómez", 7000, "Acceso a Spa y Toallas gratis");
// Carlos empieza como Común ($5000)
const socio3 = new SocioComun(11223344, "Carlos López", 5000);

miGimnasio.agregarSocio(socio1);
miGimnasio.agregarSocio(socio2);
miGimnasio.agregarSocio(socio3);

// 3. Mostrar información inicial
console.log("\n--- Info Inicial de Socios ---");
miGimnasio.listarSocios().forEach(s => console.log(s.mostrarInfo()));

// 4. Procesar pagos del Siguiente Mes (Cambios de estado automáticos)
console.log("\n--- Procesando Pagos del Mes Siguiente ---");

// Juan Pérez (Común) paga $7000 → Debería subir a VIP
miGimnasio.cambiarEstado(12345678, 7000);

// María Gómez (VIP) paga $5000 → Debería bajar a Común
miGimnasio.cambiarEstado(87654321, 5000);

// Carlos López (Común) paga $5000 → Se mantiene igual
miGimnasio.cambiarEstado(11223344, 5000);

// 5. Resumen del gimnasio
console.log("\n--- Resumen Final del Gimnasio ---");
console.log(`Total de socios VIP: ${miGimnasio.obtenerVips().length}`);
console.log(`Total de socios Comunes: ${miGimnasio.obtenerComunes().length}`);
console.log(`Ingresos totales este mes: $${miGimnasio.calcularIngresosTotales()}`);

console.log("\n--- Estado Final de Socios ---");
miGimnasio.listarSocios().forEach(s => console.log(s.mostrarInfo()));

console.log("\n=== FIN DE LA EJECUCIÓN ===");
