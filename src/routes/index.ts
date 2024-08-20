import { Application, Request, Response } from "express";
import { deleteUser, getUsers, postUser, updateUser } from "../controllers/users";
import { userRoute } from "./routes/users";
import { habitatRoute } from "./routes/habitat";

const router = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello world" });
  });
  app.use('/users', userRoute);
  app.use("/habitat", habitatRoute);
};

export { router };