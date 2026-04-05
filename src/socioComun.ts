import { Socio } from "./socio";
import type { EquipamientoComun } from "./IequipamientoComun";

export class SocioComun extends Socio implements EquipamientoComun {//hereda de Socio e implementa EquipamientoComun
    pesas: string = "Standard 5kg-20kg"; //pesas disponibles para el socio comun
    bicicleta: string = "Fija Standard"; //bicicleta disponible para el socio comun
    cintaCorrer: string = "Manual"; //cinta de correr disponible para el socio comun
    bancoPlano: string = "Standard"; //banco plano disponible para el socio comun
    bancoInclinado: string = "Standard"; //banco inclinado disponible para el socio comun

    constructor(dni: number, nombre: string, cuota: number, tipo: string) {//constructor para crear objetos de tipo SocioComun
        super(dni, nombre, cuota);
    }

    get tipo(): string { //metodo para obtener el tipo de socio
        return "Comun";
    }

    calcularCuota(): number {//metodo para calcular la cuota
        return this.cuota;
    }

    equipamientoPermitido(): string {//metodo para obtener el equipamiento permitido
        return `[COMUN] Pesas, Bicicleta, Cinta, Bancos. SIN ACCESO A VIP.`;
    }

    mostrarInfo(): string {//metodo para mostrar la informacion
        return `[COMUN] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.cuota} | ${this.equipamientoPermitido()}`;
    }
}
