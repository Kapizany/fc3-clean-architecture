import CreateProductUseCase from "./create.product.usecase";

 const input = {
    id: "123",
    name: "Product 1",
    price: 99.99,
  };

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product usecase", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input); 
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });

    it("should throw error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.name="";
        expect(async () => {
            await productCreateUseCase.execute(input)
          }).rejects.toThrow("Name is required");
    });

})