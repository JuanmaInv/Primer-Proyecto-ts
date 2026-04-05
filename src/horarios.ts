export class GestorHorarios {
    // Reglas del gimnasio:
    // Lunes a Viernes: 8:00 a 22:00
    // Sabado: 8:00 a 14:00
    // Domingo: Cerrado
    //es static porque no necesito crear un objeto para usarlo
    static esHorarioLaboral(fecha: Date): { valido: boolean; motivo: string } {
        const dia = fecha.getDay(); // 0: Dom, 1: Lun, 2: Mar, 3: Mie, 4: Jue, 5: Vie, 6: Sab
        const hora = fecha.getHours();// 0-23

        if (dia === 0) {
            return { valido: false, motivo: "Estamos cerrado los domingos." };
        }

        if (dia >= 1 && dia <= 5) { // Lunes a Viernes
            if (hora < 8 || hora >= 22) {
                return { valido: false, motivo: "Fuera de horario. Abrimos de 08:00 a 22:00." };
            }
        }

        if (dia === 6) { // Sabado
            if (hora < 8 || hora >= 14) {
                return { valido: false, motivo: "Sabados abrimos de 08:00 a 14:00." };
            }
        }

        return { valido: true, motivo: "Horario permitido." };
    }

    // Regla de permanencia: Maximo 1 hora
    static esTiempoValido(entrada: Date, salida: Date): boolean {
        const diferenciaMs = salida.getTime() - entrada.getTime(); //tiempo de permanencia en milisegundos
        const diferenciaMinutos = diferenciaMs / (1000 * 60); //tiempo de permanencia en minutos
        return diferenciaMinutos <= 60; //retorna true si el tiempo de permanencia es menor o igual a 60 minutos
    }
}