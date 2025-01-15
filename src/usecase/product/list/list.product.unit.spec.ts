import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product01 = new Product("abc", "Notebook", 1500.0);

const product02 = new Product("def", "Tablet", 1000.0)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product01, product02])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
      const repository = MockRepository();
      const useCase = new ListProductUseCase(repository);
  
      const output = await useCase.execute({});
  
      expect(output.products.length).toBe(2);

      expect(output.products[0].id).toBe(product01.id);
      expect(output.products[0].name).toBe(product01.name);
      expect(output.products[0].price).toBe(product01.price);
  
      expect(output.products[1].id).toBe(product02.id);
      expect(output.products[1].name).toBe(product02.name);
      expect(output.products[1].price).toBe(product02.price);
    });
  });