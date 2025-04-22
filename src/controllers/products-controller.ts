import { Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response) {
    return response.json({
      message: "Products fetched",
      user_id: request.user?.id,
      user_role: request.user?.role,
    });
  }

  async create(request: Request, response: Response) {
    return response.json({
      message: "Product created",
      user_id: request.user?.id,
      user_role: request.user?.role,
    });
  }
}

export { ProductsController };
