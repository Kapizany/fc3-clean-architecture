import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";


export const productRoute = express.Router();

productRoute.post('/', async  (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try{
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await useCase.execute(productDto);
        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRoute.get('/', async  (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try{
        const output = await useCase.execute();
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRoute.get('/:productId', async  (req: Request, res: Response) => {
    const useCase = new FindProductUseCase(new ProductRepository());
    try{
        const {productId} = req.params;
        const productDto = {
            id: productId,
        }
        const output = await useCase.execute(productDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRoute.put('/:productId', async  (req: Request, res: Response) => {
    const useCase = new UpdateProductUseCase(new ProductRepository());
    try{
        const productDto = {
            id: req.params.productId,
            name: req.body.name,
            price: req.body.price,
        }
        const output = await useCase.execute(productDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});