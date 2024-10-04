import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;
  
    constructor(productRepository: ProductRepositoryInterface) {
      this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product =  await this.productRepository.find(input.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }
    }

