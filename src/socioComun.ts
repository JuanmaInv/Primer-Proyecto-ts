import { Socio } from "./socio";
import { PRECIOS } from "./precios";

// Tipo de Socio Comun (clase hija) que hereda de Socio (clase padre)
export class SocioComun extends Socio {
    tipo: string = "Común";

    // Constructor explícito para mostrar claramente los datos necesarios
    constructor(id: number, nombre: string) {
        super(id, nombre);
    }

    // Sobreescritura del metodo abstracto: calcula la cuota para el socio comun
    calcularCuota(): number {
        return PRECIOS.CUOTA_BASE;
    }
}
