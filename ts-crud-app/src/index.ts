import express, { Request, Response } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

interface User {
    id: number;
    name: string;
}

let users: User[] = [];

// Create a new user
app.post("/users", (req: Request, res: Response) => {
    const newUser: User = {
        id: Date.now(), // Simple unique ID based on timestamp
        name: req.body.name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// Get all users
app.get("/users", (req: Request, res: Response) => {
    res.json(users);
});

//Update a user
app.put("/users/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    user.name = req.body.name;
    res.json(user);
});

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    users = users.filter((user) => user.id !== id);

    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err.message);
});