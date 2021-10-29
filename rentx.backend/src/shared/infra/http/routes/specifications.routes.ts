import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

// specificationsRoutes.use(ensureAuthenticated); -- OUTRA FORMA DE APLICAR MIDDLEWARES PORÉM EM TODAS AS ROTAS PARA BAIXO.
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
