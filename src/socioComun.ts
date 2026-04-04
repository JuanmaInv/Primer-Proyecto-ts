import { Socio } from "./socio";
import type { EquipamientoComun } from "./IequipamientoComun";

export class SocioComun extends Socio implements EquipamientoComun {
    pesas: string = "Standard 5kg-20kg";
    bicicleta: string = "Fija Standard";
    cintaCorrer: string = "Manual";
    bancoPlano: string = "Standard";
    bancoInclinado: string = "Standard";

    constructor(dni: number, nombre: string, cuota: number) {
        super(dni, nombre, cuota);
    }

    get tipo(): string { return "Comun"; }

    calcularCuota(): number {
        return this.cuota;
    }

    equipamientoPermitido(): string {
        return `[COMUN] Pesas, Bicicleta, Cinta, Bancos. SIN ACCESO A VIP.`;
    }

    mostrarInfo(): string {
        return `[COMUN] DNI: ${this.dni} | Nombre: ${this.nombre} | Cuota: $${this.cuota} | ${this.equipamientoPermitido()}`;
    }
}
