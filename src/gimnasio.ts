// AGREGACION: El equipamiento puede existir sin el gimnasio
class Equipamiento {
    constructor(public nombre: string) { }
}

// CLASE BASE: Abstracta porque no existe un "Socio" genérico (Herencia)
abstract class Socio {

    // CONSTRUCTOR: Inicializa los datos basicos
    constructor(public id: number, public nombre: string) { }

    // POLIMORFISMO: Cada socio paga diferente segun su tipo
    abstract calcularCuota(): number;

    // SOBRECARGA SIMULADA: Saludo con o sin mensaje
    saludar(mensaje?: string): string {
        return mensaje ? `Hola, soy ${this.nombre}. ${mensaje}` : `Hola, soy ${this.nombre}`;
    }
}

// HERENCIA y SOBREESCRITURA
export class SocioVip extends Socio {
    constructor(id: number, nombre: string, public beneficios: string) {
        super(id, nombre); // Llama al constructor del padre
    }

    // SOBREESCRITURA del metodo del padre
    calcularCuota(): number {
        return 5000 + 2000; // Cuota base + extra VIP
    }
}

// COMPOSICION: El Gimnasio tiene socios (si el gimnasio cierra, la lista se borra)
export class Gimnasio {
    private listaSocios: Socio[] = [];

    agregarSocio(socio: Socio) {
        this.listaSocios.push(socio);
    }

    obtenerVips(): Socio[] { // FILTRO: Obtener solo los VIP
        return this.listaSocios.filter(sociosVip => sociosVip instanceof SocioVip);
    }
}
