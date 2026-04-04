import { Socio } from "./socio";
import { PRECIOS } from "./precios";

// HERENCIA y SOBREESCRITURA: SocioVip hereda metodos y atributos de Socio
export class SocioVip extends Socio {
    tipo: string = "VIP";

    // Constructor con atributo extra: beneficios (exclusivo del socio VIP)
    constructor(dni: number, nombre: string, cuota: number = (PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP), public beneficios: string = "Acceso a Spa y Toallas gratis") {
        super(dni, nombre, cuota);
    }

    // Sobreescritura del metodo abstracto: calcula la cuota para el socio vip
    calcularCuota(): number {
        return this.cuota;
    }

    // POLIMORFISMO: sobreescribe mostrarInfo() para también mostrar los beneficios del VIP
    mostrarInfo(): string {
        return `[${this.tipo.toUpperCase()}] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.calcularCuota()} | Beneficios: ${this.beneficios}`;
    }
}
