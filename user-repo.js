import DBLocal from "db-local";
import crypto from "crypto";
import bcrypt from "bcrypt";



/*la base de datos */
const {Schema} = new DBLocal({path: "./db"});

/* esquema de usuario */
const User = Schema("User",{
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});



/* crear usuario */
export class UserRepository {
   static async create ({username, email, password}) {
    try {
        /* validar datos */
        if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid username, email or password");
        }
        if (typeof username.length < 3 || username.length > 20) {
            throw new Error("Username must be between 3 and 20 characters");
        }
        if (typeof email.length < 3 || email.length > 50) {
            throw new Error("Email must be between 3 and 50 characters");
        }
        if (typeof password.length < 8 || password.length > 20) {
            throw new Error("Password must be between 8 and 20 characters");
        }
            if (!email.includes("@")) {
            throw new Error("Invalid email");
        }
        




        
        /* verificar si el usuario ya existe */
        const user = User.findOne({username});
        if (user) {
            throw new Error("Username already exists");
        }
        
        const Email = await User.findOne({email});
        if (Email) {
            throw new Error("Email already exists");
        }


const id = crypto.randomUUID();
const hashedPassword = await bcrypt.hash(password, 10);


        /* crear nuevo usuario */
      User.create({
        _id: id,
            username,
            email,
            password: hashedPassword
        }).save();

        return id;
    } catch (error) {
        throw new Error(error.message);
    }
   }
}



