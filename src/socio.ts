import { PRECIOS } from "./precios";

export abstract class Socio {
    public horaEntrada?: Date;
    public horaSalida?: Date;

    constructor(public dni: number, public nombre: string, public cuota: number) {
        if (!Number.isInteger(dni) || dni <= 0) {
            throw new Error("El DNI debe ser un numero entero positivo.");
        }
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre no puede estar vacio.");
        }
        if (/[0-9]/.test(nombre)) {
            throw new Error("El nombre no puede contener numeros.");
        }
        // Expresión regular sin acentos en el error
        if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(nombre)) {
            throw new Error("El nombre no puede contener caracteres especiales.");
        }
        if (cuota < PRECIOS.CUOTA_BASE) {
            throw new Error("La cuota es menor a la cuota base.");
        }
    }

    abstract calcularCuota(): number;
    abstract mostrarInfo(): string;
    abstract get tipo(): string;
}
