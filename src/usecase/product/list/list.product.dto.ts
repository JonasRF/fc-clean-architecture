
export interface InputCreateProductDto { }

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputCreateProductDto {
    products: Product[];
}
