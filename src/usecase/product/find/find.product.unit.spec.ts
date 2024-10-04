import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("abc", "Notebook", 1500.0);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test find product use case", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "abc",
        };

        const output = {
            id: "abc",
            name: "Notebook",
            price: 1500.0,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("Should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "abc",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");

    });
});

