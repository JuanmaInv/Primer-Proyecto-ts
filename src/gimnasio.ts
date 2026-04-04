import { Socio } from "./socio";
import { SocioVip } from "./socioVip";
import { SocioComun } from "./socioComun";
import { PRECIOS } from "./precios";

// Clase Gimnasio: gestiona la lista de socios y las operaciones del gimnasio
export class Gimnasio {
    private listaSocios: Socio[] = [];

    agregarSocio(socio: Socio) {
        this.listaSocios.push(socio);
        console.log(`[Registro] Se ha registrado a ${socio.nombre} (ID: ${socio.dni}) como Socio ${socio.tipo}.`);
    }

    // Inicializa un socio como VIP o Común según la cuota que paga
    // Si la cuota es mayor a la cuota base → se registra como VIP
    // Si la cuota es igual a la cuota base → se registra como Común
    // Si la cuota es menor a la cuota base → lanza error (cuota inválida)
    agregarSocioPorCuota(dni: number, nombre: string, cuota: number, beneficios: string = "Sin beneficios especiales"): Socio {
        if (cuota < PRECIOS.CUOTA_BASE) {
            throw new Error(`La cuota $${cuota} es menor a la cuota base de $${PRECIOS.CUOTA_BASE}. No se puede registrar.`);
        }

        let nuevoSocio: Socio;
        const CUOTA_COMUN = PRECIOS.CUOTA_BASE;

        if (cuota >= CUOTA_COMUN) {
            // Cuota >= el socio entra como VIP
            nuevoSocio = new SocioVip(dni, nombre, cuota, beneficios);
            console.log(`[Registro Automático] ${nombre} paga $${cuota}, se registra como VIP.`);
        } else {
            // Cuota < el socio entra como Común
            nuevoSocio = new SocioComun(dni, nombre, cuota);
            console.log(`[Registro Automático] ${nombre} paga $${cuota}, se registra como Común.`);
        }

        this.listaSocios.push(nuevoSocio);
        return nuevoSocio;
    }

    buscarSocio(dni: number): Socio | undefined {
        return this.listaSocios.find(s => s.dni === dni);
    }

    eliminarSocioComun(dni: number) {
        this.listaSocios = this.listaSocios.filter(comun => comun.dni !== dni);
        //filter es para filtrar la lista
        //se elimina el socio comun si su id es igual al id que se pasa por parametro
    }

    eliminarSocioVip(dni: number) {
        this.listaSocios = this.listaSocios.filter(vip => vip.dni !== dni);
        //filter es para filtrar la lista
        //se elimina el socio vip si su id es diferente al id que se pasa por parametro
    }

    obtenerVips(): SocioVip[] {
        return this.listaSocios.filter((vip): vip is SocioVip => vip instanceof SocioVip);
        //filter es para filtrar la lista
        //(vip): vip is SocioVip => vip instanceof SocioVip significa que si vip es una instancia de SocioVip, entonces devuelva vip
        // es decir, que filtre la lista y devuelva solo los socios vip
    }

    obtenerComunes(): SocioComun[] {
        return this.listaSocios.filter((comun): comun is SocioComun => comun instanceof SocioComun);
        //filter es para filtrar la lista
        //(comun): comun is SocioComun => comun instanceof SocioComun significa que si comun es una instancia de SocioComun, entonces devuelva comun
        // es decir, que filtre la lista y devuelva solo los socios comunes
    }

    calcularIngresosTotales(): number {
        return this.listaSocios.reduce((acc, s) => acc + s.calcularCuota(), 0);
        //aqui se usa reduce para sumar todos los valores de la lista
        //acc es el acumulador
        //s es el socio actual
        //0 es el valor inicial del acumulador, comienza en 0 y va sumando el valor de cada socio
    }

    listarSocios(): Socio[] {
        return [...this.listaSocios];
        //los 3 puntos son para crear una copia de la lista, asi no se puede modificar la lista original
    }

    // Procesa el pago mensual y actualiza el estado del socio si es necesario
    cambiarEstado(dni: number, cuotaPagada: number):
        void {
        const socioActual = this.buscarSocio(dni);

        if (!socioActual) {
            throw new Error(`No se encontró ningún socio con DNI: ${dni}`);
        }

        const CUOTA_COMUN = PRECIOS.CUOTA_BASE;
        const CUOTA_VIP = PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP;
        let socioNuevo: Socio;

        if (cuotaPagada > CUOTA_COMUN && socioActual instanceof SocioComun) {
            // Cambio de Comun a VIP
            socioNuevo = new SocioVip(socioActual.dni, socioActual.nombre, cuotaPagada, "Acceso VIP por pago");
            console.log(`[Cambio de Estado] ${socioActual.nombre} (DNI: ${dni}) subió a VIP por pago de $${cuotaPagada}.`);
        } else if (cuotaPagada < CUOTA_VIP && socioActual instanceof SocioVip) {
            // Cambio de VIP a Comun
            socioNuevo = new SocioComun(socioActual.dni, socioActual.nombre, cuotaPagada);
            console.log(`[Cambio de Estado] ${socioActual.nombre} (DNI: ${dni}) bajó a Común por pago de $${cuotaPagada}.`);
        } else {
            // El socio mantiene su tipo, solo actualizamos el monto pagado
            socioActual.cuota = cuotaPagada;
            console.log(`[Pago Mensual] ${socioActual.nombre} pagó $${cuotaPagada}. Se mantiene como ${socioActual.tipo}.`);
            return;
        }

        // Si hubo transformación, reemplazamos en la lista
        this.listaSocios = this.listaSocios.map(s => s.dni === dni ? socioNuevo! : s);
    }
}
