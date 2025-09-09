const db = require("../models");
const Usuario = db.Usuario;
const jwt = require("jsonwebtoken");

//Registra un usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { email, password, rol } = req.body;

        
        const nuevoUsuario = await Usuario.create({
            email,
            password,
            rol
        });

        res.status(201).json({ message: "Usuario registrado exitosamente", usuario: nuevoUsuario });  

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

//Login de usuario 
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        
        if (password !== usuario.password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        
        const token = jwt.sign(
            {id: usuario.id, rol: usuario.rol},
            process.env.JMT_SECRET || "secretkey",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login exitoso",
            token,
            rol: usuario.rol,
            id: usuario.id,
            email: usuario.email
        });


        res.status(200).json({message: "Login exitoso", token, rol: usuario.rol});
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
