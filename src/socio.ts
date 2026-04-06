import { PRECIOS } from "./precios";

export abstract class Socio { //clase molde para crear objetos de tipo SocioComun o SocioVip
    public horaEntrada?: Date;
    public horaSalida?: Date;
    //constructor es publico porque se puede acceder desde cualquier clase
    constructor(public dni: number, public nombre: string, public cuota: number) { //constructor para crear objetos de tipo SocioComun o SocioVip
        if (!Number.isInteger(dni) || dni <= 0) { //valida que el DNI sea un numero entero positivo, isinteger es un metodo que valida que el numero sea entero
            throw new Error("El DNI debe ser un numero entero positivo.");
        }
        if (!nombre || nombre.trim().length === 0) { //valida que el nombre no este vacio, trim() elimina los espacios en blanco
            throw new Error("El nombre no puede estar vacio.");
        }
        if (/[0-9]/.test(nombre)) { //valida que el nombre no contenga numeros
            throw new Error("El nombre no puede contener numeros.");
        }
        if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(nombre)) { //valida que el nombre no contenga caracteres especiales
            throw new Error("El nombre no puede contener caracteres especiales.");
        }
        if (cuota < PRECIOS.CUOTA_BASE) {//valida que la cuota sea mayor o igual a la cuota base
            throw new Error("La cuota es menor a la cuota base.");
        }
    }
    //metodos abstractos, pues cada clase hija los implementara de manera diferente (lo que se denomina polimorfismo)
    abstract calcularCuota(): number;//metodo abstracto para calcular la cuota
    abstract mostrarInfo(): string;//metodo abstracto para mostrar la informacion
    abstract get tipo(): string;//metodo abstracto para obtener el tipo
}
