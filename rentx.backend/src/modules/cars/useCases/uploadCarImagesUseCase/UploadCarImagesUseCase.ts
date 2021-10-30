import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExistentImages = await this.carsImagesRepository.listAll();

    if (carExistentImages.length > 0) {
      await Promise.all(
        carExistentImages.map((img) =>
          deleteFile(`./tmp/cars/${img.image_name}`)
        )
      );

      await Promise.all(
        carExistentImages.map((img) => this.carsImagesRepository.delete(img.id))
      );
    }

    await Promise.all(
      images_name.map(async (image) =>
        this.carsImagesRepository.create(car_id, image)
      )
    );
  }
}

export { UploadCarImagesUseCase };
