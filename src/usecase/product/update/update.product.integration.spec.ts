
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("a", "Notebook", 1500);

        await productRepository.create(product);

        expect(product.id).toEqual("a");
        expect(product.name).toEqual("Notebook");
        expect(product.price).toEqual(1500);


        const input = {
            id: "a",
            name: "Notebook Dell",
            price: 2000
        };

        const result = await usecase.execute(input);

        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.price).toEqual(input.price);
    });
});