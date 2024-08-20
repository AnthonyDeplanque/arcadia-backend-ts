import { Router } from "express";
import { postUser, getUsers, updateUser, deleteUser, loginUser } from "../../controllers/users";

export const userRoute = Router();

userRoute.post('/', postUser);
userRoute.get('/', getUsers);
userRoute.get('/:id', getUsers);
userRoute.put('/:id', updateUser);
userRoute.delete('/:id', deleteUser);
userRoute.post('/login', loginUser);