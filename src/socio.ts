// CLASE Padre o base (Herencia)
// Relacion donde el padre es "Socio" y los hijos son "SocioComun" y "SocioVip"
export abstract class Socio {
    // Propiedad para diferenciar el tipo de socio
    abstract tipo: string;

    constructor(public id: number, public nombre: string) {
        // VALIDACIONES DE ERRORES
        if (id <= 0) throw new Error("El ID debe ser un número positivo.");
        if (!nombre || nombre.trim().length === 0) throw new Error("El nombre no puede estar vacío.");
        if (/[0-9]/.test(nombre)) throw new Error("El nombre no puede contener números.");
        if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(nombre)) throw new Error("El nombre no puede contener caracteres especiales.");
    }

    // POLIMORFISMO: cada clase hija tiene su propia implementacion de calcularCuota
    abstract calcularCuota(): number;

    // Devuelve información útil del socio: nombre, tipo y cuota
    mostrarInfo(): string {
        return `Socio ${this.tipo} | ID: ${this.id} | Nombre: ${this.nombre} | Cuota: $${this.calcularCuota()}`;
    }
}
