import { Socio } from "./socio";
import type { EquipamientoVip } from "./IequipamientoVip";

export class SocioVip extends Socio implements EquipamientoVip {//hereda de Socio e implementa EquipamientoVip
    // Equipamiento Comun (Heredado de la Interfaz)
    pesas: string = "Pro 5kg-50kg"; //pesas disponibles para el socio vip
    bicicleta: string = "Electrica Pro"; //bicicleta disponible para el socio vip
    cintaCorrer: string = "Motorizada Pro"; //cinta de correr disponible para el socio vip
    bancoPlano: string = "Ajustable Pro"; //banco plano disponible para el socio vip
    bancoInclinado: string = "Ajustable Pro"; //banco inclinado disponible para el socio vip

    // Equipamiento VIP
    kinesiologia: string = "Disponible"; //kinesiologia disponible para el socio vip
    rutinasPersonalizadas: string = "Si"; //rutinas personalizadas disponibles para el socio vip
    toallas: string = "Si (Ilimitadas)"; //toallas disponibles para el socio vip
    botellasDeAgua: string = "Gratis"; //botellas de agua disponibles para el socio vip

    constructor(dni: number, nombre: string, cuota: number, tipo: string) {//constructor para crear objetos de tipo SocioVip
        super(dni, nombre, cuota);
    }

    get tipo(): string {//metodo para obtener el tipo de socio
        return "VIP";
    }

    calcularCuota(): number {//metodo para calcular la cuota
        return this.cuota;
    }

    equipamientoPermitido(): string {//metodo para obtener el equipamiento permitido
        return `[ACCESO TOTAL] Equipamiento Premium socio vip.`;
    }

    mostrarInfo(): string {
        return `[VIP] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.cuota} | Tipo: ${this.tipo} | ${this.equipamientoPermitido()}`;
    }
}
