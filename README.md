# se2-2021-04-SPG
Solidarity Purchasing Group project developed for the Software Engineering II course @ Politecnico di Torino, 2021.


## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run locally
 TODO: update with docker 

## React client application routes
 TODO: update with react routes

 
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
- POST `/api/order`
  - Insert order in the DB.
  - request parameters and request body content:
    - order: { 
      - "order_id": order's id,
      - "ref_user": user's id,
      - "productList": array of:
        [{ 
        "ref_product": product's id,
        "quantity": product's quantity 
        }],
      - "date_order": order's date }
  - response body content : none

  ## Server Database
  - Table `USER` - it contains id, name, surname, email, password and type.
  - Table `PRODUCT` - it contains id, name, description, category, farmer's id, price, availability and unit of measure.
  - Table `ORDERS` - it contains id, product's id, user's id, date, quantity and status.

  ## Built with
  - [React](https://github.com/facebook/react) 
  - [React-Bootstrap](https://react-bootstrap.github.io/)
  - [Bootstrap](https://github.com/twbs/bootstrap) 
  - [Express](https://github.com/expressjs/express) 
  - [Passport](http://www.passportjs.org/)
  - [SQLite](https://github.com/sqlite/sqlite) 
  - [TailWindCSS](https://github.com/tailwindlabs/tailwindcss)

  ## Team
  - [Marino Diego](https://github.com/djemar)
  - [Cannarella Alessandro](https://github.com/cannarelladev)
  - [Cavallo Simone](https://github.com/LeSimo)
  - [Gourlet Katell](https://github.com/KatellGourlet)
  - [Lanfranco Dario](https://github.com/MOVdario)
  - [Acquaro Claudio](https://github.com/claudione996)
  - [Lisciandrello Mattia](https://github.com/Stormz4)


  
