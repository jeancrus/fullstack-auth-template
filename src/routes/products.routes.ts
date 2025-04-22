import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.use(isAuthenticated);
productsRoutes.get("/", productsController.index);
productsRoutes.post(
  "/",
  verifyUserAuthorization(["admin", "sale"]),
  productsController.create
);

export { productsRoutes };
