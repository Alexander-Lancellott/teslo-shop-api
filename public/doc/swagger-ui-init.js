
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
      "/api/v2/pokemon": {
        "post": {
          "operationId": "PokemonController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePokemonDto"
                },
                "examples": {
                  "Bulbasaur": {
                    "value": {
                      "name": "bulbasaur",
                      "no": 1
                    }
                  },
                  "Pikachu": {
                    "value": {
                      "name": "pikachu",
                      "no": 25
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "pokemon"
          ]
        },
        "get": {
          "operationId": "PokemonController_findAll",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "pokemon"
          ]
        }
      },
      "/api/v2/pokemon/{term}": {
        "get": {
          "operationId": "PokemonController_findOne",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "description": "Can be 'id', 'name' or 'no'",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "pokemon"
          ]
        },
        "patch": {
          "operationId": "PokemonController_update",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "description": "Can be 'id', 'name' or 'no'",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePokemonDto"
                },
                "examples": {
                  "Bulbasaur": {
                    "value": {
                      "name": "bulbasaur",
                      "no": 1
                    }
                  },
                  "Pikachu": {
                    "value": {
                      "name": "pikachu",
                      "no": 25
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "pokemon"
          ]
        }
      },
      "/api/v2/pokemon/{id}": {
        "delete": {
          "operationId": "PokemonController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "pokemon"
          ]
        }
      },
      "/api/v2/seed": {
        "get": {
          "operationId": "SeedController_executeSeed",
          "parameters": [
            {
              "name": "deleteType",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "seed"
          ]
        }
      }
    },
    "info": {
      "title": "Pokedex",
      "description": "",
      "version": "2.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "pokemon",
        "description": ""
      },
      {
        "name": "seed",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreatePokemonDto": {
          "type": "object",
          "properties": {
            "no": {
              "type": "number"
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "no",
            "name"
          ]
        },
        "UpdatePokemonDto": {
          "type": "object",
          "properties": {
            "no": {
              "type": "number"
            },
            "name": {
              "type": "string"
            }
          }
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
