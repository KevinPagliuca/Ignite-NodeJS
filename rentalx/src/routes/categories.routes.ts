import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  const categorieAlreadyExists = categoriesRepository.findByName(name);

  if (categorieAlreadyExists) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  categoriesRepository.create({ name, description });
  return res.status(201).send();
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoriesRepository.list();

  res.status(200).json(all);
});
export { categoriesRoutes };
