// CLASE Padre o base (Herencia)
// Relacion donde el padre es "Socio" y los hijos son "SocioComun" y "SocioVip"
export abstract class Socio {
    // Propiedad para diferenciar el tipo de socio
    abstract tipo: string;

    constructor(public id: number, public nombre: string) {
        // VALIDACIONES DE ERRORES
        if (id <= 0) throw new Error("El ID debe ser un número positivo.");
        if (!nombre || nombre.trim().length === 0) throw new Error("El nombre no puede estar vacío.");
    }

    // POLIMORFISMO: cada clase hija tiene su propia implementacion de calcularCuota
    abstract calcularCuota(): number;

    // Permite saludar a cualquier socio, sin importar su tipo
    saludar(mensaje?: string): string {
        return mensaje
            ? `Hola, soy ${this.nombre} (${this.tipo}). ${mensaje}`
            : `Hola, soy ${this.nombre} (${this.tipo})`;
    }
}
