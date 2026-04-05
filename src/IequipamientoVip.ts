import type { EquipamientoComun } from "./IequipamientoComun";

export interface EquipamientoVip extends EquipamientoComun {//interfaz para el equipamiento vip
    kinesiologia: string; //kinesiologia
    rutinasPersonalizadas: string; //rutinas personalizadas
    toallas: string; //toallas
    botellasDeAgua: string; //botellas de agua
}