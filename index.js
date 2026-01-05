import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

/* msje de bienvenida */
app.get("/", (req, res) => {
    res.send("hola estrellita, la tierra te dice hola");
});


/* puerto de escucha */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




/* endpoints de login, registro, logout, olvidé mi contraseña */
/* login */
app.post("/login", (req, res) => {  /* login con post */
    const { email, password } = req.body;
    res.send("login successful");
});

/* registro */
app.post("/register", (req, res) => {  /* registro con post */      const { name, email, password } = req.body;
    res.send("registration successful");
});

/* logout */
app.post("/logout", (req, res) => {  /* logout con post */
    res.send("logout successful");
});


/* olvidé mi contraseña */
app.post("/forgot-password", (req, res) => {  /* olvidé mi contraseña con post */
    const { email } = req.body;
    res.send("password reset successful");
});

/* cambiar contraseña */
app.post("/change-password", (req, res) => {  /* cambiar contraseña con post */
    const { email, password } = req.body;
    res.send("password changed successfully");
});


app.post("/reset-password", (req, res) => {   /* resetear contraseña con post */ 
     const { email, password } = req.body;  res.send("password reset successful");
});




app.get("/protected", (req, res) => {   /* protected con get */
    res.send("protected route");
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




