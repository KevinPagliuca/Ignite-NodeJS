import { Request, Response } from 'express';

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    return res.send();
  }
}

export { CreateRentalController };
