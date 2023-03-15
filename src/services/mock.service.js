import { faker } from '@faker-js/faker';

class MockService {
    constructor(){}

    generateProductMock(){
        return {
            title: faker.commerce.product(),
            price: faker.commerce.price(100, 1000, 0, '$'),
            thumbnail: faker.image.business(300, 300)
        }
    }
}

export default new MockService();