import { describe, it, expect, beforeEach } from 'vitest';
import { Gimnasio } from '../src/gimnasio';
import { SocioComun } from '../src/socioComun';
import { SocioVip } from '../src/socioVip';

describe('Pruebas Integrales del Gimnasio (Cobertura 100%)', () => {
    let gym: Gimnasio;

    beforeEach(() => {
        gym = new Gimnasio();
    });

    describe('Entidades Socio', () => {
        it('Debe calcular correctamente la cuota VIP y Comun', () => {
            const vip = new SocioVip(1, "Juan", 7000, "VIP");
            const comun = new SocioComun(2, "Pedro", 5000, "Comun");
            expect(vip.calcularCuota()).toBe(7000);
            expect(comun.calcularCuota()).toBe(5000);
        });

        it('Debe lanzar error si los datos del socio son invalidos', () => {
            expect(() => new SocioComun(-1, "Error", 5000, "Comun")).toThrow("El DNI debe ser un numero entero positivo.");
            expect(() => new SocioComun(1.5, "Error", 5000, "Comun")).toThrow("El DNI debe ser un numero entero positivo.");
            expect(() => new SocioComun(1, "", 5000, "Comun")).toThrow("El nombre no puede estar vacio.");
            expect(() => new SocioComun(1, "123", 5000, "Comun")).toThrow("El nombre no puede contener numeros.");
            expect(() => new SocioComun(1, "Juan!", 5000, "Comun")).toThrow("El nombre no puede contener caracteres especiales.");
            expect(() => new SocioComun(1, "Juan", 1000, "Comun")).toThrow("La cuota es menor a la cuota base.");
        });

        it('Debe incluir informacion de equipamiento en mostrarInfo', () => {
            const comun = new SocioComun(1, "Juan", 5000, "Comun");
            expect(comun.mostrarInfo()).toContain("[COMUN]");

            const vip = new SocioVip(2, "Maria", 7000, "VIP");
            expect(vip.mostrarInfo()).toContain("[VIP]");
            expect(vip.mostrarInfo()).toContain("[ACCESO TOTAL]");
        });
    });

    describe('Control de Acceso y Horarios', () => {
        const lunes10am = new Date("2026-04-06T10:00:00");
        const domingo12pm = new Date("2026-04-05T12:00:00");
        const lunes6am = new Date("2026-04-06T06:00:00");
        const sabado16pm = new Date("2026-04-11T16:00:00");
        const sabado20hs = new Date("2026-04-11T20:00:00");
        const sabado10am = new Date("2026-04-11T10:00:00");

        it('Debe denegar acceso a un socio que no existe', () => {
            expect(() => gym.validarIngreso(999, lunes10am)).toThrow("Acceso Denegado");
        });

        it('Debe eliminar al socio automaticamente si la cuota no esta al dia durante el ingreso', () => {
            const deudor = new SocioComun(1, "Deudor", 5000, "Comun");
            deudor.cuota = 2000;
            gym.agregarSocio(deudor);
            expect(() => gym.validarIngreso(1, lunes10am)).toThrow("Baja Automatica");
            expect(gym.buscarSocio(1)).toBeUndefined();
        });

        it('Debe denegar acceso los domingos', () => {
            gym.agregarSocio(new SocioVip(1, "Juan", 7000, "VIP"));
            expect(() => gym.validarIngreso(1, domingo12pm)).toThrow("cerrado los domingos");
        });

        it('Debe denegar acceso fuera de horario (Semana)', () => {
            gym.agregarSocio(new SocioVip(1, "Juan", 7000, "VIP"));
            expect(() => gym.validarIngreso(1, lunes6am)).toThrow("Fuera de horario");
        });

        it('Debe denegar acceso fuera de horario (Sabado 16:00 y 20:00 hs)', () => {
            gym.agregarSocio(new SocioVip(1, "Juan", 7000, "VIP"));
            expect(() => gym.validarIngreso(1, sabado16pm)).toThrow("Sabados abrimos de 08:00 a 14:00.");
            expect(() => gym.validarIngreso(1, sabado20hs)).toThrow("Sabados abrimos de 08:00 a 14:00.");
        });

        it('Debe permitir acceso directo si todo esta OK', () => {
            gym.agregarSocio(new SocioComun(1, "Juan", 5000, "Comun"));
            expect(gym.validarIngreso(1, lunes10am)).toContain("Acceso OK");
            expect(gym.validarIngreso(1, sabado10am)).toContain("Acceso OK");
        });

        it('Debe controlar la permanencia de 1 hora al salir', () => {
            const entrada = new Date("2026-04-06T10:00:00");
            const salidaOk = new Date("2026-04-06T10:45:00");
            const salidaTarde = new Date("2026-04-06T11:15:00");
            gym.agregarSocio(new SocioComun(1, "Juan", 5000, "Comun"));
            gym.validarIngreso(1, entrada);
            expect(gym.registrarSalida(1, salidaOk)).toContain("Salida OK");
            gym.validarIngreso(1, entrada);
            expect(gym.registrarSalida(1, salidaTarde)).toContain("Exceso de tiempo");
        });
    });

    describe('Gestion Administrativa', () => {
        it('Debe agregar socios automaticamente segun la cuota', () => {
            const s1 = gym.agregarSocioPorCuota(1, "Juan", 5000, "Comun");
            const s2 = gym.agregarSocioPorCuota(2, "Maria", 8000, "VIP");
            expect(s1 instanceof SocioComun).toBe(true);
            expect(s2 instanceof SocioVip).toBe(true);
        });

        it('Debe eliminar socios por tipo independientemente', () => {
            gym.agregarSocio(new SocioComun(1, "Socio Uno", 5000, "Comun"));
            gym.agregarSocio(new SocioVip(2, "Socio Vip Uno", 7000, "VIP"));
            gym.eliminarSocioComun(1);
            expect(gym.obtenerComunes().length).toBe(0);
            gym.eliminarSocioVip(2);
            expect(gym.listarSocios().length).toBe(0);
        });

        it('Debe procesar cambios de estado por pago', () => {
            gym.agregarSocio(new SocioComun(1, "Luis", 5000, "Comun"));
            gym.cambiarEstado(1, 7000);
            expect(gym.buscarSocio(1) instanceof SocioVip).toBe(true);
            gym.cambiarEstado(1, 5000);
            expect(gym.buscarSocio(1) instanceof SocioComun).toBe(true);
        });
    });
});
