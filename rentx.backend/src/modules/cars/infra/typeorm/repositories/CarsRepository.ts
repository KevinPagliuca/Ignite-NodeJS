import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import {
  ICarResponse,
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePalate(license_plate: string): Promise<ICarResponse> {
    const car: ICarResponse = await this.repository
      .createQueryBuilder('cars')
      .where('cars.available = available', { available: true })
      .andWhere('cars.license_plate = :license_plate', { license_plate })
      .leftJoinAndSelect(
        'categories',
        'categories',
        'categories.id = cars.category_id'
      )
      .select(['cars.*', 'categories.name as category_name'])
      .getRawOne();
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<ICarResponse[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('cars.available = available', { available: true });

    if (brand) {
      carsQuery.andWhere('LOWER(cars.brand) = LOWER(:brand)', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }
    if (name) {
      carsQuery.andWhere('LOWER(cars.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const cars: ICarResponse[] = await carsQuery
      .leftJoinAndSelect(
        'categories',
        'categories',
        'categories.id = cars.category_id'
      )
      .select(['cars.*', 'categories.name as category_name'])
      .getRawMany();

    return cars;
  }

  async findById(id: string): Promise<ICarResponse> {
    const car: ICarResponse = await this.repository
      .createQueryBuilder('cars')
      .where('cars.available = available', { available: true })
      .andWhere('cars.id = :id', { id })
      .leftJoinAndSelect(
        'categories',
        'categories',
        'categories.id = cars.category_id'
      )
      .select(['cars.*', 'categories.name as category_name'])
      .getRawOne();
    return car;
  }
}

export { CarsRepository };
