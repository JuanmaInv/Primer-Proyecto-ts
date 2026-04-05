import { Socio } from "./socio";
import { SocioVip } from "./socioVip";
import { SocioComun } from "./socioComun";
import { PRECIOS } from "./precios";
import { GestorHorarios } from "./horarios";

export class Gimnasio { //en esta clase se almacena la informacion de los socios
    private listaSocios: Socio[] = []; // privado porque solo se puede acceder desde esta clase

    agregarSocio(socio: Socio) { //metodo para agregar un socio, para eso se necesita un objeto de tipo Socio
        this.listaSocios.push(socio); //lo agrega a la lista de socios con el push
    }

    validarIngreso(dni: number, ahora: Date): string { //metodo para validar el ingreso de un socio
        const socio = this.buscarSocio(dni); //busca el socio por DNI

        if (!socio) { //si no encuentra el socio
            throw new Error(`Acceso Denegado: El socio con DNI ${dni} no figura en la base de datos.`); //lanza un error
        }

        if (socio.cuota < PRECIOS.CUOTA_BASE) { //si el socio no tiene la cuota al dia
            this.listaSocios = this.listaSocios.filter(s => s.dni !== dni); //lo elimina de la lista de socios
            throw new Error(`Baja Automatica: El socio ${socio.nombre} no tiene la cuota al dia.`); //lanza un error
        }

        const validacionHorario = GestorHorarios.esHorarioLaboral(ahora); //valida el horario
        if (!validacionHorario.valido) { //si no es valido
            throw new Error(`Fuera de Horario: ${socio.nombre}. ${validacionHorario.motivo}`); //lanza un error
        }

        socio.horaEntrada = ahora; //registra la hora de entrada
        return `Acceso OK: Bienvenido ${socio.nombre}. (${socio.tipo})`; //retorna un mensaje de bienvenida
    }

    registrarSalida(dni: number, ahora: Date): string { //metodo para registrar la salida de un socio
        const socio = this.buscarSocio(dni); //busca el socio por DNI

        if (!socio || !socio.horaEntrada) { //si no encuentra el socio o no tiene hora de entrada
            throw new Error(`[SISTEMA] Error: No hay registro de entrada para el DNI: ${dni}.`); //lanza un error
        }

        socio.horaSalida = ahora; //registra la hora de salida
        const tiempoValido = GestorHorarios.esTiempoValido(socio.horaEntrada, ahora); //valida el tiempo de permanencia

        if (!tiempoValido) {//si el tiempo de permanencia es mayor a 60 minutos
            return ` ${socio.nombre}. ADVERTENCIA: Exceso de tiempo en sala. (1 hora)`; //retorna un mensaje de advertencia
        }

        return `Salida OK: Codigo ${dni} registrado correctamente.`; //retorna un mensaje de salida
    }

    agregarSocioPorCuota(dni: number, nombre: string, cuota: number, tipo: string): Socio { //metodo para agregar un socio por cuota
        if (cuota < PRECIOS.CUOTA_BASE) { //si la cuota es menor a la cuota base
            throw new Error(`La cuota $${cuota} es menor a la cuota base.`); //lanza un error
        }

        let nuevoSocio: Socio; //crea una variable para almacenar el nuevo socio
        if (cuota > PRECIOS.CUOTA_BASE) { //si la cuota es mayor a la cuota base
            nuevoSocio = new SocioVip(dni, nombre, cuota, "VIP"); //crea un nuevo socio vip
        } else { //si la cuota es igual a la cuota base
            nuevoSocio = new SocioComun(dni, nombre, cuota, "Comun"); //crea un nuevo socio comun
        }

        this.listaSocios.push(nuevoSocio); //agrega el nuevo socio a la lista de socios
        return nuevoSocio; //retorna el nuevo socio
    }

    //FILTROS
    buscarSocio(dni: number): Socio | undefined { //metodo para buscar un socio por DNI
        return this.listaSocios.find(s => s.dni === dni); //busca el socio por DNI
    }

    eliminarSocioComun(dni: number) { //metodo para eliminar un socio comun
        this.listaSocios = this.listaSocios.filter(s => !(s instanceof SocioComun && s.dni === dni)); //filtra la lista de socios y elimina el socio comun
    }

    eliminarSocioVip(dni: number) { //metodo para eliminar un socio vip
        this.listaSocios = this.listaSocios.filter(s => !(s instanceof SocioVip && s.dni === dni)); //filtra la lista de socios y elimina el socio vip
    }

    obtenerVips(): SocioVip[] { //metodo para obtener los socios vip
        return this.listaSocios.filter((vip): vip is SocioVip => vip instanceof SocioVip); //filtra la lista de socios y retorna los socios vip
    }

    obtenerComunes(): SocioComun[] { //metodo para obtener los socios comunes
        return this.listaSocios.filter((comun): comun is SocioComun => comun instanceof SocioComun); //filtra la lista de socios y retorna los socios comunes
    }

    calcularIngresosTotales(): number { //metodo para calcular los ingresos totales
        return this.listaSocios.reduce((acc, s) => acc + s.calcularCuota(), 0); //reduce la lista de socios porque suma la cuota de cada socio y retorna los ingresos totales
    }

    listarSocios(): Socio[] { //metodo para listar los socios
        return [...this.listaSocios]; //retorna una copia de la lista de socios
    }

    cambiarEstado(dni: number, cuotaPagada: number): void { //metodo para cambiar el estado de un socio
        const socioActual = this.buscarSocio(dni); //busca el socio por DNI
        if (!socioActual) throw new Error(`No se encontro ningun socio con DNI: ${dni}`); //lanza un error si no encuentra el socio

        const CUOTA_COMUN = PRECIOS.CUOTA_BASE; //define la cuota base
        const CUOTA_VIP = PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP; //define la cuota vip
        let socioNuevo: Socio; //crea una variable para almacenar el nuevo socio

        if (cuotaPagada > CUOTA_COMUN && socioActual instanceof SocioComun) { //si la cuota es mayor a la cuota base y el socio es comun
            socioNuevo = new SocioVip(socioActual.dni, socioActual.nombre, cuotaPagada, "VIP"); //crea un nuevo socio vip
        } else if (cuotaPagada < CUOTA_VIP && socioActual instanceof SocioVip) { //si la cuota es menor a la cuota vip y el socio es vip
            socioNuevo = new SocioComun(socioActual.dni, socioActual.nombre, cuotaPagada, "Comun"); //crea un nuevo socio comun
        } else { //si la cuota es igual a la cuota base y el socio es comun o vip
            socioActual.cuota = cuotaPagada; //actualiza la cuota del socio
            return; //retorna
        }

        this.listaSocios = this.listaSocios.map(s => s.dni === dni ? socioNuevo! : s); //actualiza la lista de socios
    }
}
