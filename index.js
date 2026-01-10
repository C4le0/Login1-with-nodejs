import express from "express";
import { UserRepository } from "./user-repo.js";

const app = express();
app.use(express.json())

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use(express.json());

/* msje de bienvenida */
app.get("/", (req, res) => {
    res.send("hola estrellita, la tierra te dice hola");
});



/* endpoints de login, registro, logout, olvidé mi contraseña */


/* login */
app.post("/login", (req, res) => { 
     /* login con post */
    const { email, password } = req.body;
    res.send("login successful");
});







/* registro */
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);    
  
    try {
      const id = await UserRepository.create({username, email, password});
      res.send({id});
    } catch (error) {
      console.error("Error en registro:", error);
      res.status(500).send(error.message);
    }
});




/* cambiar contraseña */
app.post("/change-password", (req, res) => { 
     /* cambiar contraseña con post */
    const { email, password } = req.body;
    res.send("password changed successfully");
});


app.post("/reset-password", (req, res) => {  
     /* resetear contraseña con post */ 
     const { email, password } = req.body;  res.send("password reset successful");
});







/* protected */
app.get("/protected", (req, res) => { 
      /* protected con get */
    res.send("protected route");
});







