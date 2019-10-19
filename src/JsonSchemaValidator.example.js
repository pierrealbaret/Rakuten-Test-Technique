const Validator   = require('jsonschema').Validator;

const productSchema = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "additionalProperties": false,
    "required": [
        "products"
    ],
    "properties": {
        "products": {
            "$id": "#/properties/products",
            "type": "array",
            "title": "The Products Schema",
            "items": {
                "$id": "#/properties/products/items",
                "type": "object",
                "title": "The Items Schema",
                "required": [
                    "title",
                    "imageUrl",
                    "buybackUrl",
                    "bestOffer"
                ],
                "properties": {
                    "title": {
                        "$id": "#/properties/products/items/properties/title",
                        "type": "string",
                        "title": "The Title Schema",
                        "default": "",
                        "examples": [
                            "Samsung Galaxy S III 16 Go"
                        ],
                        "pattern": "^(.*)$"
                    },
                    "imageUrl": {
                        "$id": "#/properties/products/items/properties/imageUrl",
                        "type": "string",
                        "title": "The Imageurl Schema",
                        "default": "",
                        "examples": [
                            "/photo/1210926448"
                        ],
                        "pattern": "^(.*)$"
                    },
                    "buybackUrl": {
                        "$id": "#/properties/products/items/properties/buybackUrl",
                        "type": "string",
                        "title": "The Buybackurl Schema",
                        "default": "",
                        "examples": [
                            "https://fr.shopping.rakuten.com/seller/sell-buyback/step1/177410800"
                        ],
                        "pattern": "^(.*)$"
                    },
                    "bestOffer": {
                        "$id": "#/properties/products/items/properties/bestOffer",
                        "type": "number",
                        "title": "The Bestoffer Schema",
                        "default": 0.0,
                        "examples": [
                            77.66
                        ]
                    }
                }
            }
        }
    }
};

const mockedProducts = {
    "products": [
    {
        "title": "Samsung Galaxy S III 16 Go",
        "imageUrl": "/photo/1210926448",
        "buybackUrl": "https://fr.shopping.rakuten.com/seller/sell-buyback/step1/177410800",
        "bestOffer": 77.66
    },
    {
        "title": "Apple iPhone 4S 64 Go Blanc",
        "imageUrl": "/photo/1210845239",
        "buybackUrl": "https://fr.shopping.rakuten.com/seller/sell-buyback/step1/138558126",
        "bestOffer": 47.2
    },
        {
            title: 1,
            imageUrl: 2,
            bestOffer: '4',
            someThingThatDontBelongHere: true,
        }
    ],
};

function  main() {
    const validator = new Validator();
    const validation = validator.validate(mockedProducts, productSchema);
    console.log('validation', validation);
}

main();
