import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase";


const product = ProductFactory.create("a", "Notebook", 1500);

const input = {
    id: product.id,
    name: "Notebook Dell",
    price: 1700
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw error when product not found", async () => {
        const productRepository = MockRepository();
        productRepository.update.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new UpdateProductUseCase(productRepository);

        const input = {
            id: "",
            name: "Notebook Dell",
            price: 1700,
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});