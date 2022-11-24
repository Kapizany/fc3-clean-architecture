import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { OutputListCustomerDto } from "./list.customer.dto";



export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(): Promise<OutputListCustomerDto>{

        const customerList = await this.customerRepository.findAll()
        const customers = customerList.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                }
            })
        )
        return {customers}
    }
}