import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
  return res.status(201).send();
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoriesRepository.list();

  res.status(200).json(all);
});

export { categoriesRoutes };
