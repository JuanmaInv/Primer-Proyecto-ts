import { PRECIOS } from "./precios";

// CLASE Padre o base (Herencia)
// Relacion donde el padre es "Socio" y los hijos son "SocioComun" y "SocioVip"
export abstract class Socio {
    // Propiedad para diferenciar el tipo de socio
    abstract tipo: string;

    // El DNI actúa como identificador único del socio
    constructor(public dni: number, public nombre: string, public cuota: number) {
        // VALIDACIONES DE ERRORES
        if (dni <= 0) throw new Error("El DNI debe ser un número positivo.");
        if (!Number.isInteger(dni)) throw new Error("El DNI debe ser un número entero.");
        if (!nombre || nombre.trim().length === 0) throw new Error("El nombre no puede estar vacío.");
        if (/[0-9]/.test(nombre)) throw new Error("El nombre no puede contener números.");
        if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(nombre)) throw new Error("El nombre no puede contener caracteres especiales.");
        if (cuota < PRECIOS.CUOTA_BASE) throw new Error("La cuota es menor a la cuota base.");
    }

    // POLIMORFISMO: cada clase hija tiene su propia implementacion de calcularCuota
    abstract calcularCuota(): number;

    // Devuelve información útil del socio: DNI, nombre, tipo (estado) y cuota
    mostrarInfo(): string {
        return `[${this.tipo.toUpperCase()}] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.calcularCuota()}`;
    }
}
