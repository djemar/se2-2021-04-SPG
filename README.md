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