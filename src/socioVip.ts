import { Socio } from "./socio";
import { PRECIOS } from "./precios";

// HERENCIA y SOBREESCRITURA: SocioVip hereda metodos y atributos de Socio
export class SocioVip extends Socio {
    tipo: string = "VIP";

    // Constructor con atributo extra: beneficios (exclusivo del socio VIP)
    constructor(id: number, nombre: string, public beneficios: string) {
        super(id, nombre);
    }

    // Sobreescritura del metodo abstracto: calcula la cuota para el socio vip
    calcularCuota(): number {
        return PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP;
    }
}
