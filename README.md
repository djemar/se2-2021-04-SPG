# se2-2021-04-SPG
Solidarity Purchasing Group project developed for the Software Engineering II course @ Politecnico di Torino, 2021.


## API Server

- GET `/api/products`
    - Retrieves all the products.
    - request parameters and request body content: //
    - response body content:
        - products = [{ 
          - `product_id`: id of the product,
          - `name`: name of the product,
          - `description`: description of the product ,
          - `category`: category of the product,
          - `ref_user`: id of the user (specifically farmer) which the product is related to,
          - `price`: price (per unit of measure,
          - `availability`: number of products of that type available,
          - `unit_of_measure`: unit of measure of the product}, {...}];
- POST `/api/products`
    - Retrieves all the products.
    - request parameters and request body content: 
      -  {`category`: category of the product}.
    - response body content:
        - products = [{
            - `product_id`: id of the product,
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_user`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product}, {...}]; 
- POST `/api/new-client`
    - Insert a new client (user Type = "Client").
    - request parameters and request body content:
        -  {`name`: first name of the client to be inserted,
            `surname`: surname of the client to be inserted,
            `email`: email of the client to be inserted,
            `hash`: hash of the password selected by the client}.
    - response body content:
        - client = {
            - `user_id`: id of the new client,
            - `name`: name of the new client,
            - `surname`: surname of the new client,
            - `email`: email of the new client,
            - `hash`: hash of the password selected by the new client,
            - `Type`: "Client" type;
