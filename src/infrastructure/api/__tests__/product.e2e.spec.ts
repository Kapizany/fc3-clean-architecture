import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for products", () => {

    beforeEach( async () => {
        await sequelize.sync({force: true});
    });

    afterAll( async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const response = await request(app)
                .post("/product")
                .send({
                    name: "Product Test",
                    price: 99.99,
                });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Product Test");
        expect(response.body.price).toBe(99.99);


    });

    it("should not create a product when no name is provided", async () => {
        const response = await request(app)
                .post("/product")
                .send({
                    price:988.9,
                });

        expect(response.status).toBe(500);

    });

    it("should list all products", async () => {
        const response1 = await request(app)
                .post("/product")
                .send({
                    name: "Product Test 1",
                    price: 111.1,
                });
        expect(response1.status).toBe(201);
        const response2 = await request(app)
                .post("/product")
                .send({
                    name: "Product Test 2",
                    price: 222.22,
                });
        expect(response2.status).toBe(201);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products).toMatchObject([{
                name: "Product Test 1",
                price: 111.1,
            },{
                name: "Product Test 2",
                price: 222.22,
            }]); 
    });

    it("should find a product", async () => {
        const response1 = await request(app)
                .post("/product")
                .send({
                    name: "Product Test 1",
                    price: 235.55,
                });
        expect(response1.status).toBe(201);
        const response2 = await request(app)
                .post("/product")
                .send({
                    name: "Product Test 2",
                    price: 658.99,
                });
        expect(response2.status).toBe(201);

        const findResponse = await request(app).get(`/product/${response2.body.id}`).send();
        expect(findResponse.status).toBe(200);
        expect(findResponse.body).toStrictEqual(response2.body);
    });

    it("should update a product", async () => {
        const response = await request(app)
                .post("/product")
                .send({
                    name: "Product Test 1",
                    price: 111.11,
                });
        expect(response.status).toBe(201);

        const updateResponse = await request(app).put(`/product/${response.body.id}`).send({
            name: "Product Test 2",
            price: 999.99,
        });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.id).toBe(response.body.id);
        expect(updateResponse.body.name).toBe("Product Test 2");
        expect(updateResponse.body.price).toBe(999.99);
    });

})