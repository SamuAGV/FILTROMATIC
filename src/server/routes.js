const express = require("express");
const router = express.Router();
const connection = require("./db");

// Registro
router.get("/registros", (req, res) => {
  connection.query("SELECT * FROM tb_usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener clientes" });
    res.json(results);
  });
});

router.post("/registros", (req, res) => {
  const { nombre, correo, contraseña, id_rol } = req.body;
  connection.query("INSERT INTO tb_usuarios SET ?", { nombre, correo, contraseña, id_rol }, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al registrar" });
    res.status(201).json({ message: "Registro exitoso" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { correo, contraseña } = req.body;
  connection.query("SELECT * FROM tb_usuarios WHERE correo = ? AND contraseña = ?", [correo, contraseña], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la autenticación" });
    if (results.length === 0) return res.status(401).json({ error: "Credenciales incorrectas" });

    res.json({ id_usuario: results[0].id_usuario, id_rol: results[0].id_rol });
  });
});

//////////////////////////////////////
// Routes from server.js
// Ruta para obtener los colores y sus intensidades desde la base de datos
router.get("/getColores", (req, res) => {
  const query = 'SELECT nombre, R_color, intensidad FROM tb_sensor';
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los colores');
    } else {
      res.json(result);
    }
  });
});

// Ruta para asegurarse de que existen los colores RGB en la base de datos
router.post("/checkAndUpdateColors", (req, res) => {
  const colors = ['Rojo', 'Verde', 'Azul'];

  const query = 'SELECT nombre FROM tb_sensor WHERE nombre IN (?)';
  connection.query(query, [colors], (err, result) => {
    if (err) {
      return res.status(500).send('Error al verificar los colores');
    }

    const existingColors = result.map((color) => color.nombre);
    
    colors.forEach((color) => {
      if (!existingColors.includes(color)) {
        const defaultColor = (color === 'Rojo') ? 'RGB(255,0,0)' :
                            (color === 'Verde') ? 'RGB(0,255,0)' : 'RGB(0,0,255)';
        const defaultIntensity = 100;

        const insertQuery = 'INSERT INTO tb_sensor (nombre, R_color, intensidad) VALUES (?, ?, ?)';
        connection.query(insertQuery, [color, defaultColor, defaultIntensity], (err, result) => {
          if (err) {
            return res.status(500).send('Error al insertar el color por defecto');
          }
        });
      }
    });

    res.send({ message: 'Colores RGB asegurados en la base de datos' });
  });
});

// Ruta para insertar un registro cuando un objeto es detectado
let contadorObjetos = 0;

router.post("/insertarRegistro", (req, res) => {
  const { object, fecha, hora } = req.body;

  if (!object || !fecha || !hora) {
    return res.status(400).send("Faltan datos para insertar el registro.");
  }

  contadorObjetos++;
  const nombreObjeto = `${object}-${contadorObjetos}`;

  const query = 'INSERT INTO `tb_registros` (`object`, `fecha`, `hora`) VALUES (?, ?, ?)';
  connection.query(query, [nombreObjeto, fecha, hora], (err, result) => {
    if (err) {
      return res.status(500).send('Error al insertar el registro');
    }
    res.send({ message: `Registro insertado correctamente con el nombre: ${nombreObjeto}` });
  });
});

// Ruta para obtener las bandas activas desde la base de datos
router.get("/getBandas", (req, res) => {
  const query = 'SELECT id_banda, nombre, velocidad, activo FROM tb_banda WHERE activo = 1';
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Error al obtener las bandas');
    }
    res.json(result);
  });
});

// Ruta para obtener las velocidades de la Banda A
router.get("/getVelocidades", (req, res) => {
  const query = 'SELECT velocidad FROM tb_banda WHERE nombre = "Banda A" AND activo = 1';
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Error al obtener las velocidades');
    }
    res.json(result);
  });
});

//////////////////////////////////////
// CRUD de Clientes
router.get("/clientes", (req, res) => {
  connection.query("SELECT * FROM tb_clientes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener clientes" });
    res.json(results);
  });
});

// Crear cliente
router.post("/clientes", (req, res) => {
  connection.query("INSERT INTO tb_clientes SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar cliente" });
    res.status(201).json({ message: "Cliente agregado exitosamente" });
  });
});

// Actualizar cliente
router.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_clientes SET ? WHERE id_cliente = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar cliente" });
    res.json({ message: "Cliente actualizado exitosamente" });
  });
});

// Eliminar cliente
router.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_clientes WHERE id_cliente = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar cliente" });
    res.json({ message: "Cliente eliminado exitosamente" });
  });
});

//////////////////////////////////////
// Importación de clientes desde Excel
router.post("/importar-clientes", (req, res) => {
  const { clientes } = req.body;

  if (!clientes || clientes.length === 0) {
    return res.status(400).json({ error: "No se recibieron clientes para importar" });
  }

  const values = clientes.map(({ Nombre, Teléfono, Email, Dirección }) => [Nombre, Teléfono, Email, Dirección]);
  const query = "INSERT INTO tb_clientes (Nombre, Teléfono, Email, Dirección) VALUES ?";

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error("Error al importar clientes:", err);
      return res.status(500).json({ error: "Error al importar clientes" });
    }
    res.status(200).json({ message: "Clientes importados correctamente" });
  });
});

//////////////////////////////////////
// CRUD de Roles
router.get("/roles", (req, res) => {
  connection.query("SELECT * FROM tb_roles", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener clientes" });
    res.json(results);
  });
});

// Crear Rol
router.post("/roles", (req, res) => {
  connection.query("INSERT INTO tb_roles SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar Rol" });
    res.status(201).json({ message: "Cliente agregado exitosamente" });
  });
});

// Actualizar Rol
router.put("/roles/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_roles SET ? WHERE id_rol = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar Rol" });
    res.json({ message: "Rol actualizado exitosamente" });
  });
});

// Eliminar Rol
router.delete("/roles/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_roles WHERE id_rol = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar Rol" });
    res.json({ message: "Rol eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD de Usuarios
router.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM tb_usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener Usuarios" });
    res.json(results);
  });
});

// Crear Usuarios
router.post("/usuarios", (req, res) => {
  connection.query("INSERT INTO tb_usuarios SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar Usuarios" });
    res.status(201).json({ message: "Usuarios agregado exitosamente" });
  });
});

// Actualizar Usuarios
router.put("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_usuarios SET ? WHERE id_usuario = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar Usuarios" });
    res.json({ message: "Usuarios actualizado exitosamente" });
  });
});

// Eliminar Usuarios
router.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_usuarios WHERE id_usuario = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar Usuarios" });
    res.json({ message: "Usuarios eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD de Registros
router.get("/registross", (req, res) => {
  connection.query("SELECT * FROM tb_registros", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener Usuarios" });
    res.json(results);
  });
});

// Crear Usuarios
router.post("/registross", (req, res) => {
  connection.query("INSERT INTO tb_registros SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar Usuarios" });
    res.status(201).json({ message: "Usuarios agregado exitosamente" });
  });
});

// Actualizar Usuarios
router.put("/registross/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_registros SET ? WHERE id_ = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar Usuarios" });
    res.json({ message: "Usuarios actualizado exitosamente" });
  });
});

// Eliminar Usuarios
router.delete("/registross/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_registros WHERE id_ = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar Usuarios" });
    res.json({ message: "Usuarios eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD de Banda
router.get("/banda", (req, res) => {
  connection.query("SELECT * FROM tb_banda", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener Banda" });
    res.json(results);
  });
});

// Crear Banda
router.post("/banda", (req, res) => {
  connection.query("INSERT INTO tb_banda SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar Banda" });
    res.status(201).json({ message: "Banda agregado exitosamente" });
  });
});

// Actualizar Banda
router.put("/banda/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_banda SET ? WHERE id_ = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar Banda" });
    res.json({ message: "Banda actualizado exitosamente" });
  });
});

// Eliminar Banda
router.delete("/banda/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_banda WHERE id_ = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar Banda" });
    res.json({ message: "Banda eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD de Controles
router.get("/controles", (req, res) => {
  connection.query("SELECT * FROM tb_controladores", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener Control" });
    res.json(results);
  });
});

// Crear Control
router.post("/controles", (req, res) => {
  connection.query("INSERT INTO tb_controladores SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar Control" });
    res.status(201).json({ message: "Control agregado exitosamente" });
  });
});

// Actualizar Control
router.put("/controles/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_controladores SET ? WHERE id_control = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar Control" });
    res.json({ message: "Control actualizado exitosamente" });
  });
});

// Eliminar Control
router.delete("/controles/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_controladores WHERE id_control = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar Control" });
    res.json({ message: "Control eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD De Sensor
router.get("/sensor", (req, res) => {
  connection.query("SELECT * FROM tb_sensor", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener sensor" });
    res.json(results);
  });
});

// Crear sensor
router.post("/sensor", (req, res) => {
  connection.query("INSERT INTO tb_sensor SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar sensor" });
    res.status(201).json({ message: "sensor agregado exitosamente" });
  });
});

// Actualizar sensor
router.put("/sensor/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_sensor SET ? WHERE id_sensor = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar sensor" });
    res.json({ message: "sensor actualizado exitosamente" });
  });
});

// Eliminar sensor
router.delete("/sensor/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_sensor WHERE id_sensor = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar sensor" });
    res.json({ message: "sensor eliminado exitosamente" });
  });
});

//////////////////////////////////////
// CRUD De relaciones
router.get("/relaciones", (req, res) => {
  connection.query("SELECT * FROM tb_relaciones", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener relaciones" });
    res.json(results);
  });
});

// Crear relaciones
router.post("/relaciones", (req, res) => {
  connection.query("INSERT INTO tb_relaciones SET ?", req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar relaciones" });
    res.status(201).json({ message: "relaciones agregado exitosamente" });
  });
});

// Actualizar relaciones
router.put("/relaciones/:id", (req, res) => {
  const id = req.params.id;
  connection.query("UPDATE tb_relaciones SET ? WHERE id_relaciones = ?", [req.body, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al actualizar relaciones" });
    res.json({ message: "relaciones actualizado exitosamente" });
  });
});

// Eliminar sensor
router.delete("/relaciones/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM tb_relaciones WHERE id_relaciones = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al eliminar relaciones" });
    res.json({ message: "relaciones eliminado exitosamente" });
  });
});

//////////////////////////////////////
// SACAR DATOS
// Backend: Endpoint /metricas
router.get("/metricas", (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM tb_sensor) AS totalSensores,
      (SELECT COUNT(*) FROM tb_registros) AS totalRegistros
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error en la consulta SQL:", err);
      return res.status(500).json({ error: "Error al obtener métricas" });
    }
    res.json(results[0]);
  });
});

module.exports = router;