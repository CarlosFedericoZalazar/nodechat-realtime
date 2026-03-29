# 💬 NodeChat — Real-time Chat Application

NodeChat es una aplicación de chat en tiempo real construida con WebSockets que permite a múltiples usuarios conectarse y comunicarse instantáneamente.

Este proyecto forma parte de mi portfolio como desarrollador, con el objetivo de demostrar conocimientos en aplicaciones realtime, arquitectura cliente-servidor y manejo de eventos, siguiendo buenas prácticas de organización y escalabilidad.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* Socket.io
* HTML, CSS, JavaScript (Vanilla)
* Arquitectura modular (frontend y backend)

---

## 🧠 Conceptos clave implementados

* Comunicación en tiempo real (WebSockets)
* Arquitectura cliente-servidor
* Event-driven programming
* Manejo de múltiples conexiones simultáneas
* Broadcast de eventos entre clientes
* Separación de responsabilidades (modularización)
* Manejo de estado en cliente y servidor

---

## 📦 Estado del proyecto

🛠️ En desarrollo activo

### ✔️ Funcionalidades actuales

* Servidor Express configurado
* Integración completa de Socket.io
* Conexión de múltiples clientes en tiempo real
* Envío y recepción de mensajes (`send_message`, `receive_message`)
* Broadcast de mensajes a todos los clientes
* Sistema de nicknames por usuario
* Notificación de usuarios conectados/desconectados
* Lista de usuarios online en tiempo real
* Renderizado dinámico de mensajes
* Diferenciación visual entre mensajes propios y de otros usuarios
* UI tipo chat (burbujas de mensaje)
* Scroll automático del chat
* Frontend modularizado (events, ui, socket, state)
* Backend modularizado (configuración de sockets y servicios)

---

## 🔜 Próximas funcionalidades

* Salas de chat (rooms)
* Indicador de usuario escribiendo (typing indicator)
* Persistencia de mensajes (Supabase o DB)
* Historial de mensajes al conectar
* Autenticación real (login con JWT)
* Mensajes privados
* Deploy en producción

---

## 📁 Estructura del proyecto

```
nodechat/
│
├── backend/
│     ├── server.js
│     ├── config/
│     │     └── socket.js
│     └── services/
│           └── userService.js
│
└── frontend/
      ├── index.html
      ├── /js
      │     ├── main.js
      │     ├── socket.js
      │     ├── events.js
      │     ├── ui.js
      │     └── state.js
      │
      └── /styles
            ├── base/
            │     ├── reset.css
            │     ├── variables.css
            │     └── typography.css
            ├── layout/
            │     └── container.css
            └── components/
                  └── chat.css
```

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

```
git clone https://github.com/CarlosFedericoZalazar/nodechat-realtime.git
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar el servidor:

```
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:3000
```

---

## 🎯 Objetivo del proyecto

Construir una aplicación de chat escalable que evolucione desde una implementación básica hasta una solución fullstack completa, incorporando:

* arquitectura modular
* persistencia de datos
* autenticación
* comunicación en tiempo real robusta
* buenas prácticas de desarrollo profesional

---

## 🧪 Roadmap

### ✅ Completado

* [x] Renderizado de mensajes en la UI
* [x] Captura de input del usuario
* [x] Comunicación en tiempo real
* [x] Sistema de nickname
* [x] Diferenciación de mensajes (propios / otros)
* [x] Lista de usuarios conectados
* [x] Notificaciones de conexión/desconexión
* [x] Modularización del frontend
* [x] Modularización del backend

### 🚧 En progreso

* [ ] Persistencia de mensajes
* [ ] Historial al conectar
* [ ] Typing indicator

### 🔜 Futuro

* [ ] Salas de chat (rooms)
* [ ] Autenticación con JWT
* [ ] Mensajes privados
* [ ] Deploy (Render / Railway / VPS)

---

## 📌 Autor

Desarrollado por Carlos Zalazar 
