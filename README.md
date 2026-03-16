# Gestion de Gimnasio - TypeScript
Conceptos de POO y test con Vitest.

## Conceptos Aplicados
* **Abstracción y Herencia**: Uso de una clase base Socio que no puede ser instanciada, definiendo un contrato para los tipos de socios.
* **Polimorfismo**: Implementacion de calculos de cuotas que varian segun el tipo de socio (SocioVip, etc.).
* **Encapsulamiento**: Gestion de datos sensibles (lista de socios) mediante atributos privados y metodos publicos.
* **Composición**: El Gimnasio gestiona su lista de socios.
* **Tests Unitarios**: Validacion de la logica de negocio mediante aserciones automaticas con Vitest.
* **CI (Integración Continua)**: GitHub Actions configurado con pnpm.

## Comandos
* **Instalar dependencias**: `pnpm install` (instalar dependencias)
* **Ejecutar código**: `pnpm dev` (ejecutar codigo desarrollo)
* **Ejecutar pruebas**: `pnpm test` (ejecutar pruebas)

## Guía de Inicio desde Cero
Para construir este proyecto, seguimos un flujo de trabajo bien estructurado:
1. Preparación del Entorno
Instalamos las herramientas base para cualquier desarrollo moderno:
    - Node.js (Motor de ejecución).
    - pnpm (Gestor de paquetes eficiente).
    - Git (Control de versiones).

2. Inicialización del Proyecto
Dentro de la carpeta raíz, ejecutamos los comandos:
    - pnpm init
    - pnpm add -D typescript vitest tsx
    - npx tsc --init

3. Desarrollo de Logica
Creamos la carpeta src/ y desarrollamos el archivo gimnasio.ts aplicando algunos patrones de diseño (como Abstraccion, Herencia, Polimorfismo, Encapsulamiento y Composicion).

4. Implementacion de Tests
Creamos la carpeta tests/ y desarrollamos el archivo gimnasio.test.ts
    - Calculo correcto de cuotas por tipo de socio.
    - Funcionamiento de los filtros de busqueda.
    - Integridad de la composicion de clases.

5. Automatización con CI
Configuramos GitHub Actions creando el archivo .github/workflows/main.yml. Esto permite que GitHub ejecute los tests automáticamente cada vez que realizamos un push.
