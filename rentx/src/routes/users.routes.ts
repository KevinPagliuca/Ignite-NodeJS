import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
usersRoutes.post('/', createUserController.handle);
// usersRoutes.get('/', (req, res) => {
//   console.log(req.body);
// });

export { usersRoutes };
