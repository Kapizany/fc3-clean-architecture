import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";


const product = new Product(
    uuid(),
    "Product 1",
    99
);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 123.45 
}

const mockRepository = () => {

    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {

    it("should update a product", async () => {
        const productRepository = mockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

});