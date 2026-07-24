# Portfolio de José Miguel Ruiz Guevara

Portfolio profesional centrado en desarrollo full-stack, IA aplicada, automatización y
docencia técnica.

[Ver portfolio](https://chemi90.github.io/PortaFolio/) ·
[GitHub](https://github.com/Chemi90) ·
[LinkedIn](https://www.linkedin.com/in/josemiguelruizguevara/)

## Qué contiene

- Presentación y forma de trabajo.
- Nébula Sur, Nébula Platform y GymTracker como casos principales.
- demoMAGIC y gestorE-Learning como proyectos de laboratorio.
- Experiencia en industria, fintech y formación.
- Curso «IA aplicada a redes de telecomunicaciones» impartido para
  NobleProg / Ministerio de Transformación Digital en junio de 2026.
- Stack técnico, CV y contacto.

## Enfoque técnico

El sitio es estático y no necesita proceso de build:

- HTML semántico, CSS y JavaScript nativo.
- Sin frameworks, fuentes remotas ni dependencias de ejecución.
- Imágenes no críticas con carga diferida y dimensiones declaradas.
- Animaciones compatibles con `prefers-reduced-motion`.
- Navegación accesible, estados de foco y enlace para saltar al contenido.
- Metadatos Open Graph, JSON-LD, `robots.txt` y `sitemap.xml`.
- Formulario conectado a Formspree, con honeypot y límite local entre envíos.

## Desarrollo local

```bash
git clone https://github.com/Chemi90/PortaFolio.git
cd PortaFolio
python -m http.server 8080
```

Después abre `http://localhost:8080`.

En localhost el formulario simula el envío y no transmite información.

## Estructura

```text
.
├── assets/
│   ├── favicon.svg
│   ├── portrait-*.webp
│   ├── gymtracker-preview-*.webp
│   └── nebulasur-preview-*.webp
├── 1764095789903.jpg
├── Currículum Jose Miguel Ruiz Guevara (1).pdf
├── index.html
├── robots.txt
├── script.js
├── sitemap.xml
└── styles.css
```

## Despliegue

GitHub Pages publica directamente la raíz de `main`. No hay artefactos generados.

## Licencia

Este repositorio no declara una licencia de código abierto. El código y los recursos no se
consideran reutilizables sin permiso expreso del autor.
