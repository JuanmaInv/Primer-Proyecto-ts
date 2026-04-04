import { Gimnasio } from "./gimnasio";
import { SocioComun } from "./socioComun";
import { SocioVip } from "./socioVip";

const gym = new Gimnasio();

console.log("====================================================");
console.log("   SISTEMA DE GESTION Y CONTROL DE ACCESO - GYM ANGRY  ");
console.log("====================================================\n");

const juan = new SocioComun(12345678, "Juan Perez", 5000);
const maria = new SocioVip(87654321, "Maria Gomez", 7000, "Acceso a Spa");
const carla = new SocioComun(11223344, "Carla Solis", 5000); 
carla.cuota = 2000; // Simulacion de deuda

gym.agregarSocio(juan);
gym.agregarSocio(maria);
gym.agregarSocio(carla);

const t1 = new Date("2026-04-06T10:00:00");
const t2 = new Date("2026-04-05T12:00:00"); // Domingo
const t3 = new Date("2026-04-06T11:00:00");

// FLUJO DE ACCESO
try { console.log(gym.validarIngreso(juan.dni, t1)); } catch (e: any) { console.error(e.message); }
try { console.log(gym.validarIngreso(carla.dni, t1)); } catch (e: any) { console.error(e.message); }
try { console.log(gym.validarIngreso(maria.dni, t2)); } catch (e: any) { console.error(e.message); }

// FLUJO DE SALIDA
console.log(gym.registrarSalida(juan.dni, t3));

console.log("\n====================================================");
console.log("         ESTADO FINAL DEL SISTEMA                   ");
console.log("====================================================");
gym.listarSocios().forEach(s => console.log(s.mostrarInfo()));
