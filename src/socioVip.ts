import { Socio } from "./socio";
import type { EquipamientoVip } from "./IequipamientoVip";

export class SocioVip extends Socio implements EquipamientoVip {
    // Equipamiento Comun (Heredado de la Interfaz)
    pesas: string = "Pro 5kg-50kg";
    bicicleta: string = "Electrica Pro";
    cintaCorrer: string = "Motorizada Pro";
    bancoPlano: string = "Ajustable Pro";
    bancoInclinado: string = "Ajustable Pro";

    // Equipamiento VIP
    kinesiologia: string = "Disponible";
    rutinasPersonalizadas: string = "Si";
    toallas: string = "Si (Ilimitadas)";
    botellasDeAgua: string = "Gratis";

    constructor(dni: number, nombre: string, cuota: number, public beneficios: string = "Sin beneficios") {
        super(dni, nombre, cuota);
    }

    get tipo(): string { return "VIP"; }

    calcularCuota(): number {
        return this.cuota;
    }

    equipamientoPermitido(): string {
        return `[ACCESO TOTAL] Equipamiento Premium, Spa y Kinesiologia.`;
    }

    mostrarInfo(): string {
        return `[VIP] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.cuota} | Beneficios: ${this.beneficios} | ${this.equipamientoPermitido()}`;
    }
}
