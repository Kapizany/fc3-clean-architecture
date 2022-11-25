import express, {Request, Response} from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import UpdateCustomerUseCase from "../../../usecase/customer/update/update.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post('/', async  (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try{
        const customerDto = {
            name: req.body.name,
            address: {
                street:req.body.address.street,
                number:req.body.address.number,
                zip:req.body.address.zip,
                city:req.body.address.city
            },
        }

        const output = await useCase.execute(customerDto);
        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

customerRoute.get('/', async  (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try{
        const output = await useCase.execute();
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

customerRoute.get('/:customerId', async  (req: Request, res: Response) => {
    const useCase = new FindCustomerUseCase(new CustomerRepository());
    try{
        const {customerId} = req.params;
        const customerDto = {
            id: customerId,
        }
        const output = await useCase.execute(customerDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

customerRoute.put('/:customerId', async  (req: Request, res: Response) => {
    const useCase = new UpdateCustomerUseCase(new CustomerRepository());
    try{
        const customerDto = {
            id: req.params.customerId,
            name: req.body.name,
            address: {
                street:req.body.address.street,
                number:req.body.address.number,
                zip:req.body.address.zip,
                city:req.body.address.city
            },
        }
        const output = await useCase.execute(customerDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});