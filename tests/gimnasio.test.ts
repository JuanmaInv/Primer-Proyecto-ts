import { describe, it, expect } from 'vitest';
import { SocioVip, Gimnasio } from '../src/gimnasio';

describe('Pruebas de Gimnasio', () => { //describe es una funcion que permite crear un conjunto de test

    //creo dos test para verificar que el codigo funciona correctamente. son independientes entre si, en el primer test solo creo un socio vip y en el segundo test creo un gimnasio y un socio vip

    //el primer test verifica que la cuota VIP se calcula correctamente
    it('Debe calcular correctamente la cuota VIP', () => {
        const socio = new SocioVip(1, "Juan Martin", "Acceso a Musculacion (socio comun) y Pileta (socio vip)");
        expect(socio.calcularCuota()).toBe(7000); //el tobe es para comparar el valor esperado, sea number, string, boolean, etc
    });
    //el segundo test verifica que los socios VIP se filtran correctamente, solo 1 (maximo )
    it('Debe filtrar correctamente los socios VIP', () => {
        const gym = new Gimnasio(); // creo gimnasio
        const vip = new SocioVip(2, "Maximo", "Acceso a Musculacion y Pileta"); // creo socio vip
        gym.agregarSocio(vip); // agrego socio vip
        expect(gym.obtenerVips().length).toBe(1); // verifico que hay 1 socio vip
    });
});
