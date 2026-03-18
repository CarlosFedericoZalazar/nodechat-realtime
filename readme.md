# 💬 NodeChat — Real-time Chat Application

NodeChat es una aplicación de chat en tiempo real construida con WebSockets que permite a múltiples usuarios conectarse y comunicarse instantáneamente.

Este proyecto forma parte de mi portfolio como desarrollador, con el objetivo de demostrar conocimientos en aplicaciones realtime, arquitectura cliente-servidor y manejo de eventos.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Socket.io
- HTML, CSS, JavaScript (Vanilla)

---

## 🧠 Conceptos clave implementados

- Comunicación en tiempo real (WebSockets)
- Arquitectura cliente-servidor
- Event-driven programming
- Manejo de múltiples conexiones simultáneas
- Broadcast de eventos entre clientes

---

## 📦 Estado del proyecto

🛠️ En desarrollo activo

### ✔️ Funcionalidades actuales

- Servidor Express configurado
- Integración de Socket.io
- Conexión de múltiples clientes
- Emisión y escucha de eventos (`send_message`, `receive_message`)
- Broadcast de mensajes a todos los clientes
- Cliente web servido con `express.static`
- Estructura inicial de UI
- Organización modular de CSS (base, layout, components)

---

## 🔜 Próximas funcionalidades

- Renderizado de mensajes en pantalla
- Input de texto para enviar mensajes
- Sistema de nicknames por usuario
- Mostrar ID o nombre del emisor
- Lista de usuarios conectados
- Salas de chat (rooms)
- Persistencia de mensajes (base de datos)

---

## 📁 Estructura del proyecto

```
nodechat/
│
├── backend/
│     ├── server.js
│     └── socket/
│
└── frontend/
        ├── index.html
        ├── index.js
        └── styles/
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

Construir una aplicación de chat escalable que evolucione desde una implementación básica hasta incluir características avanzadas como:

- autenticación
- mensajes privados
- rooms dinámicas
- persistencia de datos
- despliegue en producción

---

## 🧪 Roadmap inmediato

- [ ] Renderizar mensajes en la UI
- [ ] Capturar input del usuario
- [ ] Mostrar mensajes en tiempo real en pantalla
- [ ] Agregar nickname al enviar mensajes
- [ ] Mostrar quién envía cada mensaje

---

## 📌 Autor

Desarrollado por Charly 💻