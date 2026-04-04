import { describe, it, expect, beforeEach } from 'vitest'; //esto es para poder usar las funciones de vitest
import { Gimnasio } from '../src/gimnasio'; // importo la clase 'gimnasio'
import { SocioComun } from '../src/socioComun'; // importo la clase 'socio comun'
import { SocioVip } from '../src/socioVip'; // importo la clase 'socio vip'
import { PRECIOS } from '../src/precios'; // importo la clase 'precios'

describe('Pruebas de Gimnasio Mejorado', () => { // 'describe' es una funcion de vitest que agrupa los tests
    let gym: Gimnasio; // declaro la variable para que los test la puedan usar (variable gym de tipo gimnasio)

    beforeEach(() => { // 'beforeEach' es una funcion de vitest que se ejecuta antes de cada test
        gym = new Gimnasio(); // aqui se inicializa e instancia la variable gym antes de cada test, asi cada prueba arranca desde cero con su propia instancia limpia.
    });

    // Test de Calculo de Cuotas, verifica que la logica de calculo funcione correctamente.
    it('Debe calcular correctamente la cuota VIP y Común usando constantes', () => {
        const vip = new SocioVip(1, "Juan", 7000, "Pileta"); // creo un socio vip con cuota 7000
        const comun = new SocioComun(2, "Pedro", 5000); // creo un socio comun con cuota 5000
        expect(vip.calcularCuota()).toBe(7000);
        expect(comun.calcularCuota()).toBe(5000);
    });

    // Test de Validaciones, aqui verifico que el codigo lance errores cuando se le pasan datos invalidos.
    it('Debe lanzar error si los datos del socio son inválidos', () => {
        expect(() => new SocioComun(-1, "Error", 5000)).toThrow("El DNI debe ser un número positivo."); 
        expect(() => new SocioComun(0, "Error", 5000)).toThrow("El DNI debe ser un número positivo."); 
        expect(() => new SocioComun(1, "", 5000)).toThrow("El nombre no puede estar vacío."); 

        // Validacion de Nombre
        expect(() => new SocioComun(1, " ", 5000)).toThrow("El nombre no puede estar vacío.");
        expect(() => new SocioComun(1, "Juan1", 5000)).toThrow("El nombre no puede contener números.");
        expect(() => new SocioComun(1, "Juan!", 5000)).toThrow("El nombre no puede contener caracteres especiales.");
        // Validacion de cuota minima
        expect(() => new SocioComun(1, "Juan", 1000)).toThrow("La cuota es menor a la cuota base.");
    });


    // Tests del metodo mostrarInfo() definido en Socio para SocioComun
    it('Debe mostrar la info correctamente para un Socio Comun', () => {
        const comun = new SocioComun(1, "Juan", 5000); 
        expect(comun.mostrarInfo()).toBe("[COMÚN] DNI: 1 | Nombre: Juan | Cuota: $5000"); 
    });

    // Tests del metodo mostrarInfo() definido en Socio para SocioVIP
    it('Debe mostrar la info correctamente para un Socio VIP', () => {
        const vip = new SocioVip(2, "María", 7000, "Spa"); 
        expect(vip.mostrarInfo()).toBe("[VIP] DNI: 2 | Nombre: María | Cuota: $7000 | Beneficios: Spa"); 
    });

    // Test de Gimnasio, verifico que el gimnasio funcione correctamente
    it('Debe gestionar correctamente la lista de socios', () => {
        const s1 = new SocioVip(1, "Juan", 7000, "Pileta"); 
        const s2 = new SocioComun(2, "Pedro", 5000); 

        gym.agregarSocio(s1); 
        gym.agregarSocio(s2); 

        // Buscar
        expect(gym.buscarSocio(1)).toBe(s1); 
        expect(gym.buscarSocio(2)).toBe(s2); 

        // Ingresos Totales
        expect(gym.calcularIngresosTotales()).toBe(12000); 

        // Eliminar
        gym.eliminarSocioVip(1); 
        expect(gym.listarSocios().length).toBe(1); 
        expect(gym.buscarSocio(1)).toBeUndefined(); 
    });

    // Test de Filtrado
    it('Debe filtrar solo socios VIP', () => {
        gym.agregarSocio(new SocioVip(1, "VIP", 7000, "Todo"));
        gym.agregarSocio(new SocioComun(2, "Comun", 5000));

        const vips = gym.obtenerVips(); 
        expect(vips.length).toBe(1); 
        expect(vips[0] instanceof SocioVip).toBe(true); 
    });

    // Test de filtrado socios comun
    it('Debe filtrar solo socios Comunes', () => {
        gym.agregarSocio(new SocioVip(1, "VIP", 7000, "Todo"));
        gym.agregarSocio(new SocioComun(2, "Comun", 5000));
        gym.agregarSocio(new SocioComun(3, "OtroComun", 5000));

        const comunes = gym.obtenerComunes(); 
        expect(comunes.length).toBe(2); 
    });

    // Test de filtrado completo
    it('El filtrado completo de VIPs y Comunes debe coincidir con la lista total', () => {
        gym.agregarSocio(new SocioVip(1, "VIP", 7000, "Pileta"));
        gym.agregarSocio(new SocioComun(2, "Comun", 5000));

        const vips = gym.obtenerVips();
        const comunes = gym.obtenerComunes();
        const total = gym.listarSocios();

        expect(vips.length + comunes.length).toBe(total.length);
    });

    it('Debe listar la informacion completa de todos los socios del gym', () => {
        gym.agregarSocio(new SocioComun(1, "Ana", 5000));
        gym.agregarSocio(new SocioVip(2, "Carlos", 7000, "Spa"));

        const infoList = gym.listarSocios().map(s => s.mostrarInfo()); 

        expect(infoList).toEqual([
            "[COMÚN] DNI: 1 | Nombre: Ana | Cuota: $5000",
            "[VIP] DNI: 2 | Nombre: Carlos | Cuota: $7000 | Beneficios: Spa"
        ]);
    });

    // Test de cambio de estado por pago: Común (5000) → VIP (7000)
    it('Debe cambiar el estado de un socio al pagar una cuota VIP', () => {
        gym.agregarSocio(new SocioComun(12345678, "Luis García", 5000));
        
        // Pagamos como VIP
        gym.cambiarEstado(12345678, 7000);
        
        const socioPostPago = gym.buscarSocio(12345678);
        expect(socioPostPago instanceof SocioVip).toBe(true);
        expect(socioPostPago?.tipo).toBe("VIP");
        expect(socioPostPago?.calcularCuota()).toBe(7000);
    });

    // Test de cambio de estado por pago: VIP (7000) → Común (5000)
    it('Debe bajar de categoría si el socio VIP paga una cuota común', () => {
        gym.agregarSocio(new SocioVip(87654321, "Marta", 7000, "Spa"));
        
        // Paga solo la base
        gym.cambiarEstado(87654321, 5000);
        
        const socioPostPago = gym.buscarSocio(87654321);
        expect(socioPostPago instanceof SocioComun).toBe(true);
        expect(socioPostPago?.tipo).toBe("Común");
    });

    // Test de cambiarEstado con DNI inexistente
    it('Debe lanzar error si se intenta cambiar estado de un DNI que no existe', () => {
        expect(() => gym.cambiarEstado(99999999)).toThrow("No se encontró ningún socio con DNI: 99999999");
    });
});
