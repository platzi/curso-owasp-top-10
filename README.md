# Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones
## Proyecto de Aplicación Web Vulnerable al OWASP Top 10:2021
Esta es la documentación del proyecto de aplicación vulnerable para el Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones de Platzi.

A continuación encontrarás toda la información necesaria para utilizar este proyecto.

## Pasos de instalación
1) Clonar el repositorio
2) Agregar alias localbox al localhost
3) Agregar certificado CA al navegador

## Índice
1. [Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones](#curso-de-owasp-top-10-vulnerabilidades-en-aplicaciones)
2. [Pasos de instalación](#pasos-de-instalación)
    1. [Paso 1: Clonar el repositorio](#paso-1-clonar-el-repositorio)
    2. [Paso 2: Agregar el alias localbox a tu localhost](#paso-2-agrega-el-alias-localbox-a-tu-localhost)
    3. [Paso 3: Agrega el certificado CA al navegador](#paso-3-agrega-el-certificado-ca-al-navegador)
3. [Uso del repositorio](#uso-del-repositorio)
4. [Comandos de docker](#comandos-de-docker)
5. [Software de trabajo](#software-de-trabajo)
6. [Recursos adicionales](#recursos-adicionales)
    - [Clases relacionadas](#clases-relacionadas)
    - [Acceso a grafana](#acceso-a-grafana)
    - [Usuarios de la aplicación](#usuarios-de-la-aplicación)
7. [Créditos](#créditos)

### Paso 1: Clonar el repositorio
Para clonar el repositorio simplemente muevete a tu directorio de trabajo en la terminal y ejecuta el comando.
```
git clone https://github.com/platzi/curso-owasp-top-10 OWASPTop10
```

Se creará el directorio OWASPTop10, en el que podrás trabajar el proyecto.

### Paso 2: Agrega el alias localbox a tu localhost
Para poder utilizar los certificados SSL se necesita que coincidan con el nombre de dominio registrado, por lo tanto es necesario indicarle a nuestra computadora ese dominio y acceder al proyecto desde esa dirección.

#### Agregar el alias en sistemas tipo UNIX (MacOS y Linux)
Para agregar el alias en sistemas tipo UNIX solamente necesitas editar el archivo `/etc/hosts`, con tu editor de texto plano preferido, siempre teniendo permisos de administrador.

Agrega la siguiente línea y guarda los cambios:
```
127.0.0.1   localbox
```

#### Agregar el alias en Windows
En el caso de windows deberás editar el archivo `C:\Windows\System32\drivers\etc\hosts`, con tu editor de texto plano preferido, siempre teniendo permisos de administrador.

Agrega la siguiente línea y guarda los cambios:
```
127.0.0.1   localbox
```

#### Resultado final
Este es un ejemplo de mi resultado final:
```
127.0.0.1   localhost
127.0.0.1   localbox
```

Ahora si, puedes utilizar el alias ingresando a http://localbox/ en lugar de http://localhost, donde podrás ver la página de inicio del proyecto, siempre que el servidor ya esté ejecutandose.

### Paso 3: Agrega el certificado CA al navegador
Para poder utilizar los certificados SSL del proyecto sin ninguna alerta o error del navegador, es necesario agregar el certificado `RootCA.crt`, que viene en la carpeta `CA` del repositorio, en las configuraciones del navegador.

#### Instrucciones para agregar el certificado CA a tu navegador
<details>
<summary>Agregar el certificado en Chrome</summary>
    1. Abre Chrome y ve a la configuración haciendo clic en el icono de tres puntos en la esquina superior derecha.</br>
    2. En el menú desplegable, selecciona "Configuración".</br>
    3. En la sección "Privacidad y seguridad", haz clic en "Seguridad".</br>
    4. Desplázate hacia abajo hasta encontrar la sección "Certificados" y haz clic en "Administrar certificados".</br>
    5. En la ventana que se abre, selecciona la pestaña "Autoridades", luego haz clic en "Importar" y sigue el asistente de importación para seleccionar el archivo `RootCA.crt` y agregarlo como una Autoridad de Certificación de Confianza.
</details>

<details>
    <summary>Agregar el certificado en Firefox</summary>
    1. Abre Firefox y ve a la configuración haciendo clic en el menú de tres líneas en la esquina superior derecha.</br>
    2. Selecciona "Preferencias" en el menú desplegable.</br>
    3. En el panel izquierdo, selecciona "Privacidad y seguridad".</br>
    4. Desplázate hacia abajo hasta encontrar la sección "Certificados" y haz clic en "Ver certificados".</br>
    5. En la ventana que se abre, selecciona la pestaña "Autoridades" y haz clic en "Importar".</br>
    6. Sigue el asistente de importación para seleccionar el archivo `RootCA.crt` y agregarlo como una Autoridad de Certificación de Confianza.
</details>

<details>
    <summary>Agregar el certificado en Safari</summary>
    1. Abre Safari y ve al menú "Safari" en la barra de menú superior.</br>
    2. Selecciona "Preferencias" en el menú desplegable.</br>
    3. Ve a la pestaña "Avanzado".</br>
    4. Marca la casilla "Mostrar menú Desarrollo en la barra de menús".</br>
    5. Ahora, en la barra de menú superior, aparecerá un nuevo menú "Desarrollo". Haz clic en él y selecciona "Preferencias de certificados".</br>
    6. En la ventana que se abre, selecciona la pestaña "Autoridades" y haz clic en "Importar".</br>
    7. Sigue el asistente de importación para seleccionar el archivo `RootCA.crt` y agregarlo como una Autoridad de Certificación de Confianza.
</details>

## Uso del repositorio
Usa la rama `main` para ver la versión vulnerable del proyecto.
```sh
git checkout main
```

Cambia a la rama de cada riesgo del Top 10, para ver su solución.
```sh
git checkout <rama>
```

Por ejemplo:
```sh
git checkout A01-BrokenAccessControl
```

Usa la rama `solved` para ver la versión corregida del proyecto.
```sh
git checkout solved
```

## Comandos de docker
Aquí te van algunos comandos útiles para utilizar el proyecto durante las prácticas.

Ejecutar el proyecto
```sh
docker compose up --build
```

Ver logs por contenedor
```sh
docker logs <nombre-contenedor>
```

Por ejemplo:
```sh
docker logs backend
```

Terminar la ejecución del proyecto
```sh
Usa la combinación de teclas [Ctrl]+[C] ó el equivalente en tu sistema operativo
```

Eliminar los contenedores y volumenes de datos
```sh
docker compose down --volumes
```


__IMPORTANTE__

Recuerda terminar el proceso de docker y elimines los volúmenes cada vez que cambies de rama para generar un entorno limpio desde cero.

## Software de trabajo
- VS Code
- Docker
- Burp Suite
- DirBuster
- NodeJS (para la clase de npm audit)

<details>
    <summary>Aquí te comparto una lista de tutoriales para instalar tus herramientas de pentesting</summary>
    <a href="https://platzi.com/new-home/clases/8781-docker-fundamentos/66589-instalacion-de-docker/" target="_blank">Tutorial de instalación de Docker</a></br>
    <a href="https://platzi.com/blog/como-instalar-burp-suite-en-windows" target="_blank">Tutorial de instalación de Burp Suite en Windows</a></br>
    <a href="https://platzi.com/blog/como-instalar-burp-suite-en-linux" target="_blank">Tutorial de instalación de Burp Suite en Linux</a></br>
    <a href="https://platzi.com/blog/como-instalar-burp-suite-en-macos" target="_blank">Tutorial de instalación de Burp Suite en MacOS</a></br>
    <a href="https://platzi.com/blog/como-instalar-dirbuster" target="_blank">Tutorial de instalación de DirBuster</a>
</details>

## Recursos adicionales
### Clases relacionadas
<details>
    <summary>A continuación puedes encontrar las clases de los 10 retos del proyecto relacionados al OWASP Top 10.</summary>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68372-broken-access-control/" target="_blank">A01:2021 - Broken Access Control</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68373-cryptographic-failures/" target="_blank">A02:2021 - Cryptographic Failures</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68374-injection/" target="_blank">A03:2021 - Injection</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68375-insecure-design/" target="_blank">A04:2021 - Insecure Design</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68376-security-misconfiguration/" target="_blank">A05:2021 - Security Misconfiguration</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68377-vulnerable-and-outdated-components/" target="_blank">A06:2021 - Vulnerable And Outdated Components</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68378-identification-and-authentication-failures/" target="_blank">A07:2021 - Identification And Authentication Failures</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68368-software-and-data-integrity-failures/" target="_blank">A08:2021 - Software And Data Integrity Failures</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68369-security-logging-and-monitoring-failures/" target="_blank">A09:2021 - Security Logging And Monitoring Failures</a></br>
    <a href="https://platzi.com/clases/9342-owasp-top-10/68370-server-side-request-forgery/" target="_blank">A10:2021 - Server-Side Request Forgery</a></br>
</details>

### Acceso a grafana
Para acceder a las métricas en grafana puedes seguir los siguientes pasos:
1) Entra a [https://localbox/grafana](https://localbox/grafana)
2) Usa las credenciales por defecto para acceder al dashboard
3) Haz click en la opción "saltar" en la ventana de cambiar contraseña

Estas son las credenciales por defecto en grafana:

| username | password |
|----------|----------|
| admin    | admin    |

__¡Listo!__

Ahora puedes acceder a tus métricas en grafana.

### Usuarios de la aplicación
La aplicación tiene un usuario administrador y cuatro usuarios comunes, estas son sus credenciales:

| username | password |
|----------|----------|
| admin    | admin    |
| user1    | 1234     |
| user2    | 1234     |
| user3    | 1234     |

#### Happy Hunting!
Ha llegado el momento de poner manos a la obra y realizar tus prácticas.

## Créditos
Proyecto creado por [Diana Nerd](https://dnrd.dev).

Para el [Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones](https://platzi.com/cursos/owasp-top-10) en [Platzi](https://platzi.com/ciberseguridad).
