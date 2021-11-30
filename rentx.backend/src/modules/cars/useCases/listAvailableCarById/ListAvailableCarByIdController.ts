import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ListAvailableCarByIdUseCase } from './ListAvailableCarByIdUseCase';

class ListAvailableCarByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listAvailableCarByIdUseCase = container.resolve(
      ListAvailableCarByIdUseCase
    );

    const car = await listAvailableCarByIdUseCase.execute(id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    return res.status(200).json(car);
  }
}

export { ListAvailableCarByIdController };
