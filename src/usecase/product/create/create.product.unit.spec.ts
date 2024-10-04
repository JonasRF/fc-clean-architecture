import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Notebook",
  price: 2000.0,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "Notebook";
    input.price = -20;

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
