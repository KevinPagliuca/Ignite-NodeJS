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
    id,
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
      id,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePalate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return true;
      }
      return false;
    });
    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
