## **Ejercicio 1: Diseñar DB de automations**

En IBT tenemos un sistema que permite a los usuarios ejecutar acciones automáticas repetitivas en LinkedIn. Estas acciones se llaman "automatizaciones" y pueden ser de dos tipos: **mensajes** o **conexiones**.

### Propiedades comunes de las automatizaciones

Cada automatización tiene las siguientes propiedades básicas:

- **Nombre**: un nombre único para identificar la automatización.
- **ID de la Organización**: a qué organización pertenece la automatización.
- **ID del usuario**: el identificador del usuario que ejecuta la automatización.

### Configuración de la automatización

Además de las propiedades mencionadas, el usuario puede configurar:

- **Días de la semana**: los días en los que la automatización puede ejecutarse (por ejemplo, lunes, martes, etc.).
- **Ventana horaria**: el rango de tiempo en el que la automatización está permitida para ejecutarse (por ejemplo, de 9:00 AM a 8:00 PM).

### Propiedades específicas según el tipo de automatización

Dependiendo de si la automatización es de tipo **mensaje** o **conexión**, tiene propiedades adicionales:

### 1. **Automatización de tipo "messages"**

- **Máximo de mensajes por día**: el número máximo de mensajes que se pueden enviar cada día.
- **Template del mensaje:** un template que sirve para determinar la estructura del mensaje al cual se le injectan variables del user particular a quien enviarle el mensaje, por ejemplo el nombre, mediante template variables {{nombre}}
- **Listado de URLs de perfiles**: hasta 500 perfiles a los que se les enviarán mensajes.

### 2. **Automatización de tipo "connections"**

- **Máxima cantidad de invitaciones por día**: el número máximo de invitaciones a enviar cada día.
- **Listado de URLs de perfiles**: hasta 1000 perfiles a los que se enviarán invitaciones.

### Comportamiento de las automatizaciones

### 1. **Automatizaciones de tipo "messages"**

Los **mensajes** enviados en un mismo día deben distribuirse uniformemente dentro de la ventana horaria configurada. Por ejemplo, si el usuario decide enviar 8 mensajes entre las 8:00 AM y las 4:00 PM, los mensajes se enviarán en horas distribuidas a lo largo de ese intervalo (por ejemplo: 8:30, 8:45, 9:00, etc.).

Si un mensaje no se puede enviar, debe registrarse el motivo del fallo. Si el mensaje es recibido, debe guardarse la fecha y hora de la recepción.

### 2. **Automatizaciones de tipo "connections"**

Las **invitaciones** a conectar tienen una máquina de estados similar. Si una invitación es rechazada, debemos registrar la fecha y hora del rechazo. Si es aceptada, también se debe guardar esta información.

A continuación, un diagrama de máquina de estados de los posibles estados de la automation de mensaje:

```
SCHEDULED
  |
  |---> CANCELLED
  |---> FAILED
  |---> SENT
  |       |
  |       |---> RECEIVED
  |       |
  |
```

Las **invitaciones** tienen la siguiente máquina de estados:

```
SCHEDULED
  |
  |---> CANCELLED
  |---> FAILED
  |---> ACCEPTED
  |---> REJECTED
  |
```

Realizar un diagrama de BD en formato **dbml** (Database Markup Language) que pueda modelar todo lo necesario para una aplicación funcional 

**Que vamos a evaluar:**

- Escalabilidad vs Flexibilidad
- Diseño en base a tipo de consultas y rendimiento
- Simplicidad