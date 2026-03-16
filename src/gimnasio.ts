// CONSTANTES: Evitamos números mágicos (Mejora 2)
export const PRECIOS = {
    CUOTA_BASE: 5000,
    ADICIONAL_VIP: 2000
};

// AGREGACION
export class Equipamiento {
    constructor(public nombre: string) { }
}

// CLASE BASE (Herencia)
export abstract class Socio {
    constructor(public id: number, public nombre: string) {
        // VALIDACIONES: (Mejora 6)
        if (id <= 0) throw new Error("El ID debe ser un número positivo.");
        if (!nombre || nombre.trim().length === 0) throw new Error("El nombre no puede estar vacío.");
    }

    // POLIMORFISMO
    abstract calcularCuota(): number;

    saludar(mensaje?: string): string {
        return mensaje ? `Hola, soy ${this.nombre}. ${mensaje}` : `Hola, soy ${this.nombre}`;
    }
}

// NUEVO TIPO DE SOCIO: (Mejora 1)
export class SocioComun extends Socio {
    calcularCuota(): number {
        return PRECIOS.CUOTA_BASE;
    }
}

// HERENCIA y SOBREESCRITURA
export class SocioVip extends Socio {
    constructor(id: number, nombre: string, public beneficios: string) {
        super(id, nombre);
    }

    calcularCuota(): number {
        return PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP;
    }
}

// MEJORAS EN GIMNASIO: (Mejora 4)
export class Gimnasio {
    private listaSocios: Socio[] = [];

    agregarSocio(socio: Socio) {
        this.listaSocios.push(socio);
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

// El código de ejecución manual fue eliminado para mejorar la separación de responsabilidades (Mejora 3)
