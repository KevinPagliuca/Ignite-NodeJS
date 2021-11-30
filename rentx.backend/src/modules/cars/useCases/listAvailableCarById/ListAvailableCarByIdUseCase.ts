import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  ICarResponse,
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarByIdUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(car_id: string): Promise<ICarResponse | Car> {
    const carExists = await this.carsRepository.findById(car_id);
    return carExists;
  }
}

export { ListAvailableCarByIdUseCase };
