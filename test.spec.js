const axios = require("axios");
const { expect } = require("chai");
const Ajv = require('ajv')
const ajv = new Ajv()
const postJsonSchema = require("./jsonSchemas/POST-createUser.Schema.json");
const getJsonSchema = require("./jsonSchemas/GET-loginUser.Schema.json");
const getlogoutJsonSchema = require("./jsonSchemas/GET-logoutUser.Schema.json");
const postaddPetJsonSchema = require("./jsonSchemas/POST-addPet.Schema.json");
const updatePetJsonSchema = require("./jsonSchemas/PUT-updatePet.Schema.json");
const deletePetJsonSchema = require("./jsonSchemas/DELETE-deletePet.Schema.json");

describe("API Test Suite", async () => {

    it("register user", async () => {
        const response = await axios.post('https://petstore.swagger.io/v2/user', //{
            {
                "id": 0,
                "username": "NewUser",
                "firstName": "Iryna",
                "lastName": "Dziadura",
                "email": "iryna18@test.com",
                "password": "irynka1805",
                "phone": "11111111111",
                "userStatus": 0
            });
        const validate = ajv.compile(postJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })

    it("login as a User", async () => {
        const response = await axios.get('https://petstore.swagger.io/v2/user/login?username=NewUser&password=irynka1805',
        );
        const validate = ajv.compile(getJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true)
        expect(response.status).to.equal(200);
    })

    it("Logs out current logged in user session", async () => {
        const response = await axios.get('https://petstore.swagger.io/v2/user/logout', 
        );
        const validate = ajv.compile(getlogoutJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true)
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
        const validate = ajv.compile(postJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })

    it("should allows adding a new Pet", async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet',
        {
            id: 35,
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
        });
        const validate = ajv.compile(postaddPetJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })

    it("should allows updating Pet's image", async () => {
        const response = await axios.put('https://petstore.swagger.io/v2/pet',
            {
                id: 35,
                category: {
                    "id": 8,
                    "name": "corgie"
                },
                name: "doggie",
                photoUrls: [
                    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
                    "https://cdn.britannica.com/99/152499-050-29EFB7EE/Beagle.jpg"
                ],
                tags: [
                    {
                        "id": 15,
                        "name": "pretty"
                    }
                ],
                status: "available"
            })

        const validate = ajv.compile(updatePetJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })

    it("should allows updating Pet's name and status", async () => {
        const response = await axios.put('https://petstore.swagger.io/v2/pet',
            {
                id: 35,
                category: {
                    "id": 35,
                    "name": "corgie"
                },
                name: "Husky",
                photoUrls: [
                    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
                    "https://cdn.britannica.com/99/152499-050-29EFB7EE/Beagle.jpg"
                ],
                tags: [
                    {
                        "id": 15,
                        "name": "pretty"
                    }
                ],
                status: "unavailable"
            })
        const validate = ajv.compile(updatePetJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })
    
    it("shoul allows deleting Pet", async () => {
        const response = await axios({
            method: "delete",
            url: 'https://petstore.swagger.io/v2/pet/35',
            headers: {
                api_key: 'special-key'
            }
        })
        const validate = ajv.compile(deletePetJsonSchema);
        const isValidate = validate(response.data)
        console.log(response.data)
        expect(isValidate).to.equal(true);
        expect(response.status).to.equal(200);
    })
})

        