import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListCustomerUseCase from "../../customer/list/list.customer.usecase";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case", () => {
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

    it("Should list a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product01 = new Product("abc", "Notebook", 1500);  
        const product02 = new Product("def", "Notebook Dell", 2500); 
        await productRepository.create(product01);
        await productRepository.create(product02);

        const products = await usecase.execute({});

        expect(products.length).toEqual(2);
        expect(products[0].id).toEqual("abc");
        expect(products[0].name).toEqual("Notebook");
        expect(products[0].price).toEqual(1500);
        expect(products[1].id).toEqual("def");
        expect(products[1].name).toEqual("Notebook Dell");
        expect(products[1].price).toEqual(2500);
    });
});
