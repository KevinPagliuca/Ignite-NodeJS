import { ISpecificationRepository } from '../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationsAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (specificationsAlreadyExists) {
      throw new Error('Specifications already exists!');
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
