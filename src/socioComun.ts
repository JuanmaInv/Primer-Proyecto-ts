import { Socio } from "./socio";
import { PRECIOS } from "./precios";

// Tipo de Socio Comun (clase hija) que hereda de Socio (clase padre)
export class SocioComun extends Socio {
    tipo: string = "Común";

    // Constructor: recibe el DNI, el nombre y la cuota del socio
    constructor(dni: number, nombre: string, cuota: number = PRECIOS.CUOTA_BASE) {
        super(dni, nombre, cuota);
    }

    // Sobreescritura del metodo abstracto: retorna la cuota pagada
    calcularCuota(): number {
        return this.cuota;
    }
}
