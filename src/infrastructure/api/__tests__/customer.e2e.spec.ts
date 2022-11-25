import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for curtomers", () => {

    beforeEach( async () => {
        await sequelize.sync({force: true});
    });

    afterAll( async () => {
        await sequelize.close();
    });

    it("should create a new customer", async () => {
        const response = await request(app)
                .post("/customer")
                .send({
                    name: "John Test",
                    address: {
                        street:"Street",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Test");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip Code");
        expect(response.body.address.city).toBe("City");

    });

    it("should not create a customer when no name is provided", async () => {
        const response = await request(app)
                .post("/customer")
                .send({
                    address: {
                        street:"Street",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });

        expect(response.status).toBe(500);

    });

    it("should list all customers", async () => {
        const response1 = await request(app)
                .post("/customer")
                .send({
                    name: "John Test 1",
                    address: {
                        street:"Street 1",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });
        expect(response1.status).toBe(201);
        const response2 = await request(app)
                .post("/customer")
                .send({
                    name: "John Test 2",
                    address: {
                        street:"Street 2",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });
        expect(response2.status).toBe(201);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers).toMatchObject([{
            name: "John Test 1",
            address: {
                street:"Street 1",
                number:123,
                zip:"Zip Code",
                city:"City",
            }
        }, {
            name: "John Test 2",
            address: {
                street:"Street 2",
                number:123,
                zip:"Zip Code",
                city:"City",
            }
        }]); 
    });

    it("should find a customer", async () => {
        const response1 = await request(app)
                .post("/customer")
                .send({
                    name: "John Test 1",
                    address: {
                        street:"Street 1",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });
        expect(response1.status).toBe(201);
        const response2 = await request(app)
                .post("/customer")
                .send({
                    name: "John Test 2",
                    address: {
                        street:"Street 2",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });
        expect(response2.status).toBe(201);

        const findResponse = await request(app).get(`/customer/${response2.body.id}`).send();
        expect(findResponse.status).toBe(200);
        expect(findResponse.body).toStrictEqual(response2.body);
    });

    it("should update a customer", async () => {
        const response = await request(app)
                .post("/customer")
                .send({
                    name: "John Test 1",
                    address: {
                        street:"Street 1",
                        number:123,
                        zip:"Zip Code",
                        city:"City",
                    }
                });
        expect(response.status).toBe(201);

        const updateResponse = await request(app).put(`/customer/${response.body.id}`).send({
            name: "John Test 2",
            address: {
                street:"Street 2",
                number:999,
                zip:"Zip Code",
                city:"City",
            }
        });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.id).toBe(response.body.id);
        expect(updateResponse.body.name).toBe("John Test 2");
        expect(updateResponse.body.address.street).toBe("Street 2");
        expect(updateResponse.body.address.number).toBe(999);
    });

})