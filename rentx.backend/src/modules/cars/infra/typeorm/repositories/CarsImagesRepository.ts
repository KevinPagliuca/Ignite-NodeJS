import { getRepository, Repository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async listAll(): Promise<CarImage[]> {
    const carImages = await this.repository.find();
    return carImages;
  }

  async delete(image_id: string): Promise<void> {
    const image = await this.repository.findOne(image_id);
    if (image) {
      await this.repository.delete(image_id);
    }
  }
}

export { CarsImagesRepository };
