const express = require("express");
const router = express.Router();
const usuarios = require("../controllers/usuario.controller");

router.post("/register", usuarios.registrarUsuario);
router.post("/login", usuarios.loginUsuario);

module.exports = router;