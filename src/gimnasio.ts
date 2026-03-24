import { Socio } from "./socio";
import { SocioVip } from "./socioVip";

// Clase Gimnasio: gestiona la lista de socios y las operaciones del gimnasio
export class Gimnasio {
    private listaSocios: Socio[] = [];

    agregarSocio(socio: Socio) {
        this.listaSocios.push(socio);
        console.log(`[Registro] Se ha registrado a ${socio.nombre} (ID: ${socio.id}) como Socio ${socio.tipo}.`);
    }

    buscarSocio(id: number): Socio | undefined {
        return this.listaSocios.find(s => s.id === id);
    }

    eliminarSocio(id: number) {
        this.listaSocios = this.listaSocios.filter(s => s.id !== id);
    }

    obtenerVips(): SocioVip[] {
        return this.listaSocios.filter((s): s is SocioVip => s instanceof SocioVip);
    }

    calcularIngresosTotales(): number {
        return this.listaSocios.reduce((acc, s) => acc + s.calcularCuota(), 0);
    }

    listarSocios(): Socio[] {
        return [...this.listaSocios];
    }
}
