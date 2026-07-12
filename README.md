<h1 align="center">Portfolio de José Miguel Ruiz Guevara</h1>

<p align="center">
  <strong>Desarrollo full-stack · IA aplicada · Visión artificial · Docencia técnica</strong>
</p>

<p align="center">
  <a href="https://chemi90.github.io/PortaFolio/">Ver portfolio</a> ·
  <a href="https://www.linkedin.com/in/josemiguelruizguevara/">LinkedIn</a> ·
  <a href="mailto:xemiruiz@gmail.com">Email</a>
</p>

## Sobre el proyecto

Portfolio profesional de José Miguel Ruiz Guevara, desarrollador full-stack, profesor de IA y Big Data y especialista en visión artificial.

La web presenta experiencia, servicios, tecnologías y proyectos propios mediante una implementación estática, responsive y sin dependencias de compilación.

## Contenido

- Presentación y foco profesional.
- Perfil en backend, IA aplicada y docencia.
- Servicios de desarrollo, automatización y formación técnica.
- Stack organizado por lenguajes, frameworks y prácticas.
- Trayectoria profesional.
- Proyectos propios: Nébula Sur y Gym Tracker.
- Currículum descargable.
- Formulario y enlaces de contacto.

## Características técnicas

- HTML semántico y estilos responsive.
- Navegación adaptable para escritorio y móvil.
- Enlace para saltar directamente al contenido.
- Indicador de progreso de lectura.
- Resaltado automático de la sección activa.
- Aparición progresiva mediante <code>IntersectionObserver</code>.
- Compatibilidad con <code>prefers-reduced-motion</code>.
- Formulario conectado a Formspree.
- Campo honeypot y espera local entre envíos para reducir spam.
- Simulación segura del formulario durante el desarrollo local.
- Sin framework, gestor de paquetes ni proceso de build.

## Estructura

~~~text
.
├── assets/
│   ├── gymtracker-preview.jpg
│   └── nebulasur-preview.jpg
├── 1764095789903.jpg
├── Currículum Jose Miguel Ruiz Guevara (1).pdf
├── FotoRetrato.png
├── index.html
├── script.js
└── styles.css
~~~

## Ejecución local

No es necesario instalar dependencias.

~~~bash
git clone https://github.com/Chemi90/PortaFolio.git
cd PortaFolio
python -m http.server 8080
~~~

Después abre <code>http://localhost:8080</code>.

Al ejecutarse desde localhost o mediante <code>file://</code>, el formulario simula el envío y no transmite información a Formspree.

## Personalización

- <code>index.html</code>: presentación, experiencia, proyectos, contacto y endpoint del formulario.
- <code>styles.css</code>: identidad visual y breakpoints.
- <code>script.js</code>: navegación, animaciones y comportamiento del formulario.

Si reutilizas el proyecto, sustituye antes de publicarlo el endpoint de Formspree, los datos de contacto, el currículum y las fotografías.

## Despliegue

El portfolio se publica desde la raíz de la rama <code>main</code> mediante GitHub Pages. No requiere comando de build.

## Proyectos mostrados

### Nébula Sur

Web corporativa de servicios locales y consultoría online, con IA aplicada, automatización, digitalización y formación.

- [Sitio web](https://nebulasur.es/)
- [Repositorio](https://github.com/Chemi90/nebulaSur)

### Gym Tracker

Aplicación full-stack para registrar entrenamientos, alimentación, medidas y evolución, con funciones de IA y formato PWA.

- [Abrir aplicación](https://appgymregistro.netlify.app/)

## Privacidad

Este repositorio contiene un currículum y datos de contacto públicos porque forman parte del portfolio. Revisa esa información antes de reutilizar o bifurcar el proyecto.

## Licencia

Este repositorio no incluye actualmente una licencia de código abierto. El código y los recursos no se consideran reutilizables fuera de los permisos concedidos expresamente por su autor.
