import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarResponse extends Car {
  category_name: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePalate(license_plate: string): Promise<ICarResponse | Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<ICarResponse[] | Car[]>;
  findById(id: string): Promise<ICarResponse | Car>;
}

export { ICarsRepository };
