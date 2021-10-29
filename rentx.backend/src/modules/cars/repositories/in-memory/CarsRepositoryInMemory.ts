import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    category_id,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      category_id,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePalate(license_plate: string): Promise<Car> {
    const result = await this.cars.find(
      (car) => car.license_plate === license_plate
    );
    return result;
  }
}

export { CarsRepositoryInMemory };
