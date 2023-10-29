const axios = require("axios");
const { expect } = require("chai");

describe("API Test Suite", async () => {

    it("register user", async () => {
        const response = await axios.post('https://petstore.swagger.io/v2/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': { api_key: "special-key"}
            },
            data: {
                id: 5,
                username: "NewUser",
                firstName: "Iryna",
                lastName: "Dziadura",
                email: "iryna18@test.com",
                password: "irynka1805",
                phone: "11111111111",
                userStatus: 201
            }
        });
        expect(response.status).to.equal(200);
    })

    it("login as a User", async () => {
        const response = await axios.get('https://petstore.swagger.io/v2/user/login?username=NewUser&password=irynka1805', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': { api_key: "special-key" }
            }
        });
        expect(response.status).to.equal(200);
    })

    it("Logs out current logged in user session", async () => {
        const response = await axios.get('https://petstore.swagger.io/v2/user/logout', {
        });
        expect(response.status).to.equal(200);
    })

    it("creates list of users with given input array", async () => {
        const response = await axios({
            method: "post",
            url: "https://petstore.swagger.io/v2/user/createWithList",
            headers: {
                'api_key': "special-key",
                'Content-Type': 'application/json'
            },
            data:
                [
                    {
                        id: 0,
                        username: "NewFirst",
                        firstName: "irynka",
                        lastName: "irynkairynkanew",
                        email: "iryna1888888@test.com",
                        password: "test123456",
                        phone: "894561223",
                        userStatus: 0
                    },
                    {
                        id: 0,
                        username: "NewOne",
                        firstName: "irynka",
                        lastName: "irynkanew",
                        email: "iryna1856@test.com",
                        password: "test12345689",
                        phone: "12345689",
                        userStatus: 0
                    }
                ]
        })
        console.log(response.data);
        expect(response.data.code).to.equal(200);
        expect(response.data.message).to.equal("ok");
    })

    it("should allows adding a new Pet", async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': { api_key: "special-key" }
        },
        data: {
            id: 9223372016900016000,
            category: {
                id: 8,
                name: "corgie"
            },
            name: "doggie",
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    "id": 15,
                    "name": "pretty"
                }
            ],
            status: "available"
        }
    });
    console.log(response.data)
    expect(response.status).to.equal(200);
    })

    it("should allows updating Pet’s image", async () => {
        const res = await axios.put('https://petstore.swagger.io/v2/pet',
            {
                id: 9223372016900016000,
                category: {
                    "id": 12,
                    "name": "Jeck"
                },
                name: "Bigle",
                photoUrls: [
                    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
                    "https://cdn.britannica.com/99/152499-050-29EFB7EE/Beagle.jpg"
                ],
                tags: [
                    {
                        "id": 12,
                        "name": "Small"
                    }
                ],
                status: "available"
            })

        console.log(res.data)
        expect(res.data.category.id).equal(12);
        expect(res.data.category.name).equal('Jeck');
    })

    it("should allows updating Pet’s name and status", async () => {
        const res = await axios.put('https://petstore.swagger.io/v2/pet',
            {
                id: 9223372016900016000,
                category: {
                    "id": 12,
                    "name": "Jeck"
                },
                name: "Husky",
                photoUrls: [
                    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
                    "https://cdn.britannica.com/99/152499-050-29EFB7EE/Beagle.jpg"
                ],
                tags: [
                    {
                        "id": 12,
                        "name": "Big"
                    }
                ],
                status: "unavailable"
            })

        console.log(res.data)
        expect(res.data.status).equal('unavailable');
        expect(res.data.name).equal('Husky');
    })

    it("should allows uploading Pet’s image", async () => {
    const FormData = require('form-data');
    const fs = require('fs/promises');
    const form = new FormData();
    const image = await fs.readFile('./pexels-alotrobo-2848707.jpg');
    form.append('additionalMetadata', 'eu sunt consequat veniam');
    form.append('file', image, 'pexels-alotrobo-2848707.jpg');
    const response = await axios.post('https://petstore.swagger.io/v2/pet/5/uploadImage', form, {
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': { api_key: "special-key" },
            ...form.getHeaders()
        },
    })
    expect(response.status).to.equal(200);
    });
    
    it("shoul allows deleting Pet", async () => {
        const res = await axios({
            method: "delete",
            url: 'https://petstore.swagger.io/v2/pet/9223372016900016000',
            headers: {
                api_key: 'special-key'
            }
        })
        console.log(res.data)
        expect(res.data.code).to.equal(200);
    })
})

        