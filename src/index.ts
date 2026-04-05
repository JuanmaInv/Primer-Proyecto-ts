import { Gimnasio } from "./gimnasio";
import { SocioComun } from "./socioComun";
import { SocioVip } from "./socioVip";

const gym = new Gimnasio();

console.log("   SISTEMA DE GESTION Y CONTROL DE ACCESO - GYM ANGRY   ");

const juan = new SocioComun(12345678, "Juan Perez", 5000);
const maria = new SocioVip(87654321, "Maria Gomez", 7000);
const carla = new SocioComun(11223344, "Carla Solis", 5000);

gym.agregarSocio(juan);
gym.agregarSocio(maria);
gym.agregarSocio(carla);

const t1 = new Date("2026-04-04T12:00:00"); // Sabado
const t2 = new Date("2026-04-06T12:00:00"); // Lunes
const t3 = new Date("2026-04-12T12:00:00"); //Domingo

// FLUJO DE ACCESO
try { console.log(gym.validarIngreso(juan.dni, t1)); } catch (e: any) { console.error(e.message); } //se muestra en pantalla el Acceso OK
try { console.log(gym.validarIngreso(carla.dni, t2)); } catch (e: any) { console.error(e.message); } //se muestra en pantalla el Acceso OK
try { console.log(gym.validarIngreso(maria.dni, t3)); } catch (e: any) { console.error(e.message); } //se muestra en pantalla el Fuera de Horario

// FLUJO DE SALIDA
console.log(gym.registrarSalida(juan.dni, t3)); //se muestra en pantalla que la salida es correcta
console.log(gym.registrarSalida(carla.dni, t2)); //se muestra en pantalla que la salida es correcta


console.log("         ESTADO FINAL DEL SISTEMA                   ");
gym.listarSocios().forEach(s => console.log(s.mostrarInfo())); //muestra la informacion de cada socio
