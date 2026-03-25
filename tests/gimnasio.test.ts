import { describe, it, expect, beforeEach } from 'vitest';
import { Gimnasio } from '../src/gimnasio';
import { SocioComun } from '../src/socioComun';
import { SocioVip } from '../src/socioVip';
import { PRECIOS } from '../src/precios';

describe('Pruebas de Gimnasio Mejorado', () => {
    let gym: Gimnasio; // declaro la variable para que los test la puedan usar (variable gym de tipo gimnasio)

    beforeEach(() => {
        gym = new Gimnasio(); // aqui se inicializa e instancia la variable gym antes de cada test, asi cada prueba arranca desde cero con su propia instancia limpia.
    });

    // Test de Cálculo de Cuotas
    it('Debe calcular correctamente la cuota VIP y Común usando constantes', () => {
        const vip = new SocioVip(1, "Juan", "Pileta"); // creo un socio vip
        const comun = new SocioComun(2, "Pedro"); // creo un socio comun

        //verifico que al socio comun le cobro la cuota base y al vip el adicional con cuota base
        expect(vip.calcularCuota()).toBe(PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP); // verifico que el socio vip pague la cuota base mas el adicional
        expect(comun.calcularCuota()).toBe(PRECIOS.CUOTA_BASE); // verifico que el socio comun pague solo la cuota base
    });

    // Test de Validaciones
    it('Debe lanzar error si los datos del socio son inválidos', () => {
        expect(() => new SocioComun(-1, "Error")).toThrow("El ID debe ser un número positivo."); // verifico que lance error si el id es negativo
        expect(() => new SocioComun(0, "Error")).toThrow("El ID debe ser un número positivo."); // verifico que lance error si el id es 0
        expect(() => new SocioComun(1, "")).toThrow("El nombre no puede estar vacío."); // verifico que lance error si el nombre esta vacio
        // otras verificaciones, tuve editar el codigo para que valide esto
        expect(() => new SocioComun(1, " ")).toThrow("El nombre no puede estar vacío.");
        expect(() => new SocioComun(1, "Juan1")).toThrow("El nombre no puede contener números.");
        expect(() => new SocioComun(1, "Juan!@#$%^&*()_+")).toThrow("El nombre no puede contener caracteres especiales.");
    });


    // Tests del método mostrarInfo() definido en Socio
    it('Debe mostrar la info correctamente para un Socio Común', () => {
        const comun = new SocioComun(1, "Juan");
        expect(comun.mostrarInfo()).toBe("Socio Común | ID: 1 | Nombre: Juan | Cuota: $5000");
    });

    it('Debe mostrar la info correctamente para un Socio VIP', () => {
        const vip = new SocioVip(2, "María", "Spa");
        expect(vip.mostrarInfo()).toBe("Socio VIP | ID: 2 | Nombre: María | Cuota: $7000 | Beneficios: Spa");
    });

    // Test de Métodos de Gimnasio
    it('Debe gestionar correctamente la lista de socios', () => {
        const s1 = new SocioVip(1, "Juan", "Pileta");
        const s2 = new SocioComun(2, "Pedro");

        gym.agregarSocio(s1);
        gym.agregarSocio(s2);

        // Buscar
        expect(gym.buscarSocio(1)).toBe(s1);
        expect(gym.buscarSocio(3)).toBeUndefined();

        // Ingresos Totales
        const totalEsperado = s1.calcularCuota() + s2.calcularCuota();
        expect(gym.calcularIngresosTotales()).toBe(totalEsperado);

        // Eliminar
        gym.eliminarSocio(1);
        expect(gym.listarSocios().length).toBe(1);
        expect(gym.buscarSocio(1)).toBeUndefined();
    });

    it('Debe filtrar solo socios VIP', () => {
        gym.agregarSocio(new SocioVip(1, "VIP", "Todo"));
        gym.agregarSocio(new SocioComun(2, "Comun"));

        const vips = gym.obtenerVips();
        expect(vips.length).toBe(1);
        expect(vips[0] instanceof SocioVip).toBe(true);
    });
});
