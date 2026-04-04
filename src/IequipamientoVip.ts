import type { EquipamientoComun } from "./IequipamientoComun";

export interface EquipamientoVip extends EquipamientoComun {
    kinesiologia: string;
    rutinasPersonalizadas: string;
    toallas: string;
    botellasDeAgua: string;
}