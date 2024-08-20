import { Application, Request, Response } from "express";
import { deleteUser, getUsers, postUser, updateUser } from "../controllers/users";
import { userRoute } from "./routes/users";

const router = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello world, I'm a teapot" });
  });
  app.use('/users', userRoute);
};

export { router };