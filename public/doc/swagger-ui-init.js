
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/products": {
        "post": {
          "operationId": "ProductsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateProductDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Product was created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ProductsController_findAll",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "minimum": 1,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "minimum": 1,
                "default": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "required": [
                      "total",
                      "totalPages",
                      "page",
                      "products"
                    ],
                    "properties": {
                      "total": {
                        "type": "number",
                        "example": 1
                      },
                      "totalPages": {
                        "type": "number",
                        "example": 1
                      },
                      "page": {
                        "type": "number",
                        "default": 1
                      },
                      "products": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/Product"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Products"
          ]
        }
      },
      "/api/products/{term}": {
        "get": {
          "operationId": "ProductsController_findOne",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "description": "Must be id, title or slug",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found Product"
            }
          },
          "tags": [
            "Products"
          ]
        }
      },
      "/api/products/{id}": {
        "patch": {
          "operationId": "ProductsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "format": "uuid",
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProductDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Product was updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            },
            "404": {
              "description": "Not Found Product"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ProductsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "format": "uuid",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product was deleted",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            },
            "404": {
              "description": "Not Found Product"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/register": {
        "post": {
          "operationId": "AuthController_createUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/User"
                      },
                      {
                        "properties": {
                          "token": {
                            "type": "string",
                            "format": "jwt",
                            "example": "XXXXX.XXXXX.XXXXXX"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/login": {
        "get": {
          "operationId": "AuthController_loginUser",
          "parameters": [
            {
              "name": "password",
              "required": true,
              "in": "query",
              "description": "The password must have a Uppercase, lowercase letter and a number",
              "example": "Abc123",
              "schema": {
                "minLength": 6,
                "maxLength": 16,
                "format": "password",
                "pattern": "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).+$",
                "type": "string"
              }
            },
            {
              "name": "email",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/LoginResponse"
                      },
                      {
                        "properties": {
                          "token": {
                            "type": "string",
                            "format": "jwt",
                            "example": "XXXXX.XXXXX.XXXXXX"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/check-status": {
        "get": {
          "operationId": "AuthController_checkStatus",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            },
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/User"
                      },
                      {
                        "properties": {
                          "token": {
                            "type": "string",
                            "format": "jwt",
                            "example": "XXXXX.XXXXX.XXXXXX"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/change-roles-and-status/{userId}": {
        "patch": {
          "operationId": "AuthController_changeRolesAndStatus",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "format": "uuid",
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChangeRolesAndStatusDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/files/product/{id}": {
        "patch": {
          "operationId": "FilesController_uploadProductImage",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "format": "uuid",
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/FileUploadDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Images was upload",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/Product"
                      },
                      {
                        "properties": {
                          "images": {
                            "example": [
                              "https://res.cloudinary.com/dms5y8rug/image/upload/v1680505190/ProductsSeed/1740176-00-A_0_2000.jpg",
                              "https://res.cloudinary.com/dms5y8rug/image/upload/v1680505190/ProductsSeed/1740176-00-A_1.jpg"
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden. Token related."
            }
          },
          "tags": [
            "Files"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/seed": {
        "get": {
          "operationId": "SeedController_executedSeed",
          "parameters": [
            {
              "name": "hard",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "secret",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "message": {
                        "type": "string",
                        "enum": [
                          "SEED EXECUTED",
                          "HARD SEED EXECUTED"
                        ]
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Seed"
          ]
        }
      }
    },
    "info": {
      "title": "Teslo-shop API",
      "description": "",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "CreateProductDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "minLength": 1,
              "example": "Men’s Chill Crew Neck Sweatshirt",
              "uniqueItems": true
            },
            "price": {
              "type": "number",
              "minimum": 0,
              "example": 99.99
            },
            "description": {
              "type": "string",
              "example": "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester."
            },
            "slug": {
              "type": "string",
              "example": "mens_chill_crew_neck_sweatshirt"
            },
            "stock": {
              "type": "interger",
              "example": 7
            },
            "sizes": {
              "example": [
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "gender": {
              "type": "string",
              "enum": [
                "men",
                "women",
                "kid",
                "unisex"
              ],
              "example": "men"
            },
            "tags": {
              "example": [
                "sweatshirt"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "title",
            "sizes",
            "gender"
          ]
        },
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "email": {
              "type": "string",
              "example": "test2@google.com"
            },
            "fullName": {
              "type": "string",
              "example": "Test Two"
            },
            "roles": {
              "example": [
                "user",
                "super-user"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "isActive": {
              "type": "boolean"
            }
          },
          "required": [
            "id",
            "email",
            "fullName",
            "roles",
            "isActive"
          ]
        },
        "Product": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "title": {
              "type": "string",
              "example": "Men’s Chill Crew Neck Sweatshirt",
              "uniqueItems": true
            },
            "price": {
              "type": "number",
              "example": 99.99
            },
            "description": {
              "type": "string",
              "example": "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester."
            },
            "slug": {
              "type": "string",
              "example": "mens_chill_crew_neck_sweatshirt"
            },
            "stock": {
              "type": "interger",
              "example": 7
            },
            "sizes": {
              "example": [
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "gender": {
              "type": "string",
              "example": "men",
              "enum": [
                "men",
                "women",
                "kid",
                "unisex"
              ]
            },
            "tags": {
              "example": [
                "sweatshirt"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "images": {
              "default": [],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "user": {
              "$ref": "#/components/schemas/User"
            },
            "creatAt": {
              "format": "date-time",
              "type": "string"
            },
            "updateAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "id",
            "title",
            "price",
            "description",
            "slug",
            "stock",
            "sizes",
            "gender",
            "tags",
            "user",
            "creatAt",
            "updateAt"
          ]
        },
        "UpdateProductDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "minLength": 1,
              "example": "Men’s Chill Crew Neck Sweatshirt",
              "uniqueItems": true
            },
            "price": {
              "type": "number",
              "minimum": 0,
              "example": 99.99
            },
            "description": {
              "type": "string",
              "example": "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester."
            },
            "slug": {
              "type": "string",
              "example": "mens_chill_crew_neck_sweatshirt"
            },
            "stock": {
              "type": "interger",
              "example": 7
            },
            "sizes": {
              "example": [
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "gender": {
              "type": "string",
              "enum": [
                "men",
                "women",
                "kid",
                "unisex"
              ],
              "example": "men"
            },
            "tags": {
              "example": [
                "sweatshirt"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "LoginResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "email": {
              "type": "string",
              "example": "test2@google.com"
            }
          },
          "required": [
            "id",
            "email"
          ]
        },
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "test2@google.com"
            },
            "fullName": {
              "type": "string",
              "minLength": 1,
              "example": "Test Two"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "The password must have a Uppercase, lowercase letter and a number",
              "minLength": 6,
              "maxLength": 16,
              "pattern": "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).+$",
              "example": "Abc123"
            },
            "secret": {
              "type": "string",
              "example": "XXXXXX"
            }
          },
          "required": [
            "email",
            "fullName",
            "password"
          ]
        },
        "ChangeRolesAndStatusDto": {
          "type": "object",
          "properties": {
            "roles": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "user",
                  "super-user",
                  "admin"
                ]
              }
            },
            "isActive": {
              "type": "boolean"
            }
          }
        },
        "FileUploadDto": {
          "type": "object",
          "properties": {
            "images": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "binary"
              }
            }
          },
          "required": [
            "images"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
