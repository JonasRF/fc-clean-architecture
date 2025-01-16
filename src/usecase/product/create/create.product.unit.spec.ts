import CreateProductUseCase from "./create.product.usecase";

const input = {
  id: "a",
  name: "Notebook",
  price: 2000,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const output = await usecase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should throw error when name is empty', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      name: '',
    })).rejects.toThrowError('Name is required');
  });
});
