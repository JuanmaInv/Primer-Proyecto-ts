import { Socio } from "./socio";
import { SocioVip } from "./socioVip";
import { SocioComun } from "./socioComun";
import { PRECIOS } from "./precios";
import { GestorHorarios } from "./horarios";

export class Gimnasio {
    private listaSocios: Socio[] = [];

    agregarSocio(socio: Socio) {
        this.listaSocios.push(socio);
    }

    validarIngreso(dni: number, ahora: Date): string {
        const socio = this.buscarSocio(dni);

        if (!socio) {
            throw new Error(`[MOLINETE] Acceso Denegado: El socio con DNI ${dni} no figura en la base de datos.`);
        }

        if (socio.cuota < PRECIOS.CUOTA_BASE) {
            this.listaSocios = this.listaSocios.filter(s => s.dni !== dni);
            throw new Error(`[MOLINETE] Baja Automatica: ${socio.nombre} no es socio por falta de pago.`);
        }

        const validacionHorario = GestorHorarios.esHorarioLaboral(ahora);
        if (!validacionHorario.valido) {
            throw new Error(`[MOLINETE] Fuera de Horario: ${socio.nombre}. ${validacionHorario.motivo}`);
        }

        socio.horaEntrada = ahora;
        return `[MOLINETE] Acceso OK: Bienvenido ${socio.nombre}. (${socio.tipo})`;
    }

    registrarSalida(dni: number, ahora: Date): string {
        const socio = this.buscarSocio(dni);

        if (!socio || !socio.horaEntrada) {
            throw new Error(`[SISTEMA] Error: No hay registro de entrada para el DNI: ${dni}.`);
        }

        socio.horaSalida = ahora;
        const tiempoValido = GestorHorarios.esTiempoValido(socio.horaEntrada, ahora);

        if (!tiempoValido) {
            return `[SISTEMA] Salida OK: ${socio.nombre}. ADVERTENCIA: Exceso de tiempo en sala.`;
        }

        return `[SISTEMA] Salida OK: Codigo ${dni} registrado correctamente.`;
    }

    agregarSocioPorCuota(dni: number, nombre: string, cuota: number, beneficios: string = "Ninguno"): Socio {
        if (cuota < PRECIOS.CUOTA_BASE) {
            throw new Error(`La cuota $${cuota} es menor a la cuota base.`);
        }

        let nuevoSocio: Socio;
        if (cuota > PRECIOS.CUOTA_BASE) {
            nuevoSocio = new SocioVip(dni, nombre, cuota, beneficios);
        } else {
            nuevoSocio = new SocioComun(dni, nombre, cuota);
        }

        this.listaSocios.push(nuevoSocio);
        return nuevoSocio;
    }

    buscarSocio(dni: number): Socio | undefined {
        return this.listaSocios.find(s => s.dni === dni);
    }

    eliminarSocioComun(dni: number) {
        this.listaSocios = this.listaSocios.filter(s => !(s instanceof SocioComun && s.dni === dni));
    }

    eliminarSocioVip(dni: number) {
        this.listaSocios = this.listaSocios.filter(s => !(s instanceof SocioVip && s.dni === dni));
    }

    obtenerVips(): SocioVip[] {
        return this.listaSocios.filter((vip): vip is SocioVip => vip instanceof SocioVip);
    }

    obtenerComunes(): SocioComun[] {
        return this.listaSocios.filter((comun): comun is SocioComun => comun instanceof SocioComun);
    }

    calcularIngresosTotales(): number {
        return this.listaSocios.reduce((acc, s) => acc + s.calcularCuota(), 0);
    }

    listarSocios(): Socio[] {
        return [...this.listaSocios];
    }

    cambiarEstado(dni: number, cuotaPagada: number): void {
        const socioActual = this.buscarSocio(dni);
        if (!socioActual) throw new Error(`No se encontro ningun socio con DNI: ${dni}`);

        const CUOTA_COMUN = PRECIOS.CUOTA_BASE;
        const CUOTA_VIP = PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP;
        let socioNuevo: Socio;

        if (cuotaPagada > CUOTA_COMUN && socioActual instanceof SocioComun) {
            socioNuevo = new SocioVip(socioActual.dni, socioActual.nombre, cuotaPagada, "Acceso VIP por pago");
        } else if (cuotaPagada < CUOTA_VIP && socioActual instanceof SocioVip) {
            socioNuevo = new SocioComun(socioActual.dni, socioActual.nombre, cuotaPagada);
        } else {
            socioActual.cuota = cuotaPagada;
            return;
        }

        this.listaSocios = this.listaSocios.map(s => s.dni === dni ? socioNuevo! : s);
    }
}
