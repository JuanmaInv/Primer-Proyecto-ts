import { describe, it, expect, beforeEach } from 'vitest';
import { SocioVip, SocioComun, Gimnasio, PRECIOS } from '../src/gimnasio';

describe('Pruebas de Gimnasio Mejorado', () => {
    let gym: Gimnasio;

    beforeEach(() => {
        gym = new Gimnasio();
    });

    // Test de Cálculo de Cuotas (Mejora 1 y 2)
    it('Debe calcular correctamente la cuota VIP y Común usando constantes', () => {
        const vip = new SocioVip(1, "Juan", "Pileta");
        const comun = new SocioComun(2, "Pedro");
        
        expect(vip.calcularCuota()).toBe(PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP);
        expect(comun.calcularCuota()).toBe(PRECIOS.CUOTA_BASE);
    });

    // Test de Validaciones (Mejora 6)
    it('Debe lanzar error si los datos del socio son inválidos', () => {
        expect(() => new SocioComun(-1, "Error")).toThrow("El ID debe ser un número positivo.");
        expect(() => new SocioComun(1, "")).toThrow("El nombre no puede estar vacío.");
    });

    // Test de Métodos de Gimnasio (Mejora 4)
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
