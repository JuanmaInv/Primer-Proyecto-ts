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
        const vip = new SocioVip(1, "Juan", "Pileta"); // creo un socio vip
        const comun = new SocioComun(2, "Pedro"); // creo un socio comun
        expect(vip.calcularCuota()).toBe(PRECIOS.CUOTA_BASE + PRECIOS.ADICIONAL_VIP);
        expect(comun.calcularCuota()).toBe(PRECIOS.CUOTA_BASE);
        //el expect verifica que algo sea verdadero, si no lo es, lanza un error.
        // y el tobe verifica que algo sea igual a algo.
        // en su conjunto verifican que el precio del socio vip sea igual a la suma de la cuota base y el adicional vip.
        //y que el precio del socio comun sea igual a la cuota base.
        //si es verdad lo que se verifica, el test pasa, si no, falla.
    });

    // Test de Validaciones, aqui verifico que el codigo lance errores cuando se le pasan datos invalidos.
    it('Debe lanzar error si los datos del socio son inválidos', () => {
        // el id se crea automaticamente al instanciar la clase socio y el nombre se crea con el constructor y se le asigna un valor por defecto si no se le pasa uno.

        //el id es numerico, sin caracteres espciales ni letras ni espacios. Ni espacio ni vacio, es incremental mayor a 0.
        //Validacion de Id
        expect(() => new SocioComun(-1, "Error")).toThrow("El ID debe ser un número positivo."); // verifico que lance error si el id es negativo
        expect(() => new SocioComun(0, "Error")).toThrow("El ID debe ser un número positivo."); // verifico que lance error si el id es 0
        expect(() => new SocioComun(1, "")).toThrow("El nombre no puede estar vacío."); // aca el id es 1, pero el nombre esta vacio

        // el nombre es texto, sin numeros ni caracteres especiales. Ni espacio ni vacio.
        //Validacion de Nombre
        expect(() => new SocioComun(1, "")).toThrow("El nombre no puede estar vacío."); //el nombre no puede estar vacio
        expect(() => new SocioComun(1, " ")).toThrow("El nombre no puede estar vacío.");
        expect(() => new SocioComun(1, "Juan1")).toThrow("El nombre no puede contener números.");
        expect(() => new SocioComun(1, "Juan!@#$%^&*()_+")).toThrow("El nombre no puede contener caracteres especiales.");
    });


    // Tests del metodo mostrarInfo() definido en Socio para SocioComun
    it('Debe mostrar la info correctamente para un Socio Comun', () => {
        const comun = new SocioComun(1, "Juan"); // creo un socio comun
        expect(comun.mostrarInfo()).toBe("Socio Común | ID: 1 | Nombre: Juan | Cuota: $5000"); // verifico que la info sea correcta
    });

    // Tests del metodo mostrarInfo() definido en Socio para SocioVIP
    it('Debe mostrar la info correctamente para un Socio VIP', () => {
        const vip = new SocioVip(2, "María", "Spa"); // creo un socio vip
        expect(vip.mostrarInfo()).toBe("Socio VIP | ID: 2 | Nombre: María | Cuota: $7000 | Beneficios: Spa"); // verifico que la info sea correcta
    });

    // Test de Gimnasio, verifico que el gimnasio funcione correctamente
    it('Debe gestionar correctamente la lista de socios', () => {
        const s1 = new SocioVip(1, "Juan", "Pileta"); // creo un socio vip
        const s2 = new SocioComun(2, "Pedro"); // creo un socio comun

        gym.agregarSocio(s1); // agrego el socio vip
        gym.agregarSocio(s2); // agrego el socio comun

        // Buscar, aqui verifico que el gimnasio encuentre correctamente a los socios
        expect(gym.buscarSocio(1)).toBe(s1); // verifico que el socio 1 sea encontrado
        expect(gym.buscarSocio(2)).toBe(s2); // verifico que el socio 2 sea encontrado
        expect(gym.buscarSocio(3)).toBeUndefined(); // verifico que el socio 3 no se encuentre en el gimnasio, pues no fue creado

        // Ingresos Totales, aqui verifico que el gimnasio calcule correctamente los ingresos totales
        const totalEsperado = s1.calcularCuota() + s2.calcularCuota(); // calculo los ingresos totales
        expect(gym.calcularIngresosTotales()).toBe(totalEsperado); // verifico que los ingresos totales sean los esperados

        // Eliminar, aqui verifico que el gimnasio elimine correctamente a los socios
        gym.eliminarSocio(1); // elimino el socio 1
        expect(gym.listarSocios().length).toBe(1); // verifico que la lista de socios tenga 1 elemento (TENIAMOS DOS, PERO ELIMINE UNO)
        expect(gym.buscarSocio(1)).toBeUndefined(); // verifico que el socio 1 no se encuentre en el gimnasio
        expect(gym.listarSocios()).toEqual([s2]); // verifico que la lista de socios sea igual a [s2]
    });

    // Test de Filtrado, verifico que el metodo obtenerVips() devuelva solo los socios VIP.... falta filtrado de socios comunes
    it('Debe filtrar solo socios VIP', () => {
        gym.agregarSocio(new SocioVip(1, "VIP", "Todo"));
        gym.agregarSocio(new SocioComun(2, "Comun"));

        const vips = gym.obtenerVips(); // obtengo los socios vip
        expect(vips.length).toBe(1); // verifico que la lista de socios vip tenga 1 elemento
        expect(vips[0] instanceof SocioVip).toBe(true); // verifico que el socio 1 sea vip
    });
    //Test de filtrado socios comun
    //Test de filtrado completo
    //Deberia poder tener una lista con los socios del gym con su informacion completa
});
