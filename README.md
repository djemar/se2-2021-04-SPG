# se2-2021-04-SPG
Solidarity Purchasing Group project developed for the Software Engineering II course @ Politecnico di Torino, 2021.


## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run locally
[Docker](https://hub.docker.com/r/wilmore/se2-2021-04-spg) 

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
          - `unit_of_measure`: unit of measure of the product,
          - `image_path`: url of the image,
          - `start_date`: date and time from which the current product is salable,
          - `end_date`: date and time until which the current product is salable}, {...}];
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
            - `ref_farmer`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: url of the image,
            - `start_date`: date and time from which the current product is salable,
            - `end_date`: date and time until which the current product is salable}, {...}]; 
- POST `/api/products-by-date`
    - Retrieves all the products that can be sold at that specific date.
    - request parameters and request body content:
        -  {`date`: date at which the products can be sold }.
    - response body content:
        - products = [{
            - `product_id`: id of the product,
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_user`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: url of the image,
            - `start_date`: date and time from which the current product is salable,
            - `end_date`: date and time until which the current product is salable}, {...}];
- POST `/api/products-from-date`
    - Retrieves all the products that can be sold from a certain date.
    - request parameters and request body content:
        -  {`date`: date from which the products can be sold }.
    - response body content:
        - products = [{
            - `product_id`: id of the product,
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_user`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: url of the image,
            - `start_date`: date and time from which the current product is salable,
            - `end_date`: date and time until which the current product is salable}, {...}];
- POST `/api/products-to-date`
    - Retrieves all the products that can be sold until a certain date.
    - request parameters and request body content:
        -  {`date`: date until which the products can be sold }.
    - response body content:
        - products = [{
            - `product_id`: id of the product,
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_user`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: url of the image,
            - `start_date`: date and time from which the current product is salable,
            - `end_date`: date and time until which the current product is salable}, {...}];
- POST `/api/products-between-dates`
    - Retrieves all the products that can be sold between a starting date and an ending one.
    - request parameters and request body content:
        -  {`startDate`: date from which the products can be sold,
            `endDate`: date until which the products can be sold }.
    - response body content:
        - products = [{
            - `product_id`: id of the product,
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_user`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: url of the image,
            - `start_date`: date and time from which the current product is salable,
            - `end_date`: date and time until which the current product is salable}, {...}];
- POST `/api/new-user`
    - Insert a new user.
    - request parameters and request body content:
        -  {`name`: first name of the user to be inserted,
            `surname`: surname of the user to be inserted,
            `email`: email of the user to be inserted,
            `hash`: hash of the password selected by the user,
            `Type`: Type of the user (Client, Farmer, Employee or Manager),
            `address`: address of the user to be inserted,
            `phone`: phone number of the user to be inserted (as a string),
            `country`: country of the user to be inserted,
            `city`: city of the user to be inserted,
            `zip_code`: zip code (CAP, in Italy) of the user to be inserted (as an Integer) }.
    - response body content:
        - user = {
            - `user_id`: id of the new user,
            - `name`: name of the new user,
            - `surname`: surname of the new user,
            - `email`: email of the new user,
            - `hash`: hash of the password selected by the new user,
            - `Type`: Type of the user just inserted,
            - `wallet_balance`: initial client balance in Euros (set to 0.0 € initially) if Type is Client / NULL otherwise 
            - `address`: address of the new user,
            - `phone`: phone number of the new user (as a string),
            - `country`: country of the new user,
            - `city`: city of the new user,
            - `zip_code`: zip code (CAP, in Italy) of the new user (as an Integer) };
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
      - "date_order": order's date
      - "total": total amount }
  - response body content : none
- GET `/api/orders`
    - Retrieves all the orders.
    - request parameters and request body content: //
    - response body content:
        - orders = [{
            - `order_id`: id of the order,
            - `ref_product`: id of the ordered product,
            - `ref_user`: id of the client who made the order,
            - `date_order`: date and time of the order instantiation,
            - `quantity`: quantity of the ordered products,
            - `status`: current status of the order (which can be "pending", "approved" or "delivered") {...}];
- GET `/api/orders/unretrieved`
    - Retrieves all the orders with status "unretrieved".
    - request parameters and request body content: //
    - response body content:
        - orders = [{
            - `order_id`: id of the order,
            - `ref_product`: id of the ordered product,
            - `ref_user`: id of the client who made the order,
            - `date_order`: date and time of the order instantiation,
            - `quantity`: quantity of the ordered products,
            - `status`: current status of the order (which can be "pending", "approved" or "delivered") {...}]
- GET `/api/client-orders/:clientID`
    - Retrieves all the orders made by a specific client.
    - request parameters: `clientID`
    - request body content: //
    - response body content:
        - orders = [{
            - `order_id`: id of the order,
            - `ref_product`: id of the ordered product,
            - `ref_user`: id of the selected client,
            - `date_order`: date and time of the order instantiation,
            - `quantity`: quantity of the ordered products,
            - `status`: current status of the order, {...}];
- GET `/api/users`
    - Retrieves all the users.
    - request parameters and request body content: //
    - response body content:
        - users = [{
            - `user_id`: id of the current user,
            - `name`: name of the current user,
            - `surname`: surname of the current user,
            - `email`: email of the current user,
            - `hash`: hash of the password selected by the current user,
            - `Type`: user type which can be Client, Farmer, Employee, Manager 
            - `wallet_balance`: balance of the wallet in Euros, if Type is Client / NULL otherwise
            - `address`: address of the current user,
            - `phone`: phone number of the current user (as a string),
            - `country`: country of the current user,
            - `city`: city of the current user,
            - `zip_code`: zip code (CAP, in Italy) of the current user (as an Integer) }, {...}];
- POST `/api/set-delivered-order`
    - Update the status order with `delivered`
    - request parameters : none
    - request body content : json containing the orderID
    - response body content : //
- POST `/api/recharge-wallet`
    - Update the client's wallet
    - request parameters : none
    - request body content : json containing the clientID and the amount to recharge
    - responde body content : //
- POST `/api/new-product`
    - Add a new product to the database
    - request parameters : //
    - request body content : 
      - products = {
          - `name`: name of the product,
          - `description`: description of the product ,
          - `category`: category of the product,
          - `ref_farmer`: id of the user (specifically farmer) which the product is related to,
          - `price`: price (per unit of measure,
          - `availability`: number of products of that type available,
          - `unit_of_measure`: unit of measure of the product
          - `image_path`: URL of the image
          - `start_date`: starting date from when the product will be available
          - `end_date`: ending date from when the product will be available
        };
    - response body content : JSON containing all the data from the product
- POST `/api/update-product`
    - Add a new product to the database
    - request parameters : //
    - request body content :
        - products = {
            - `product_id`: id of the product
            - `name`: name of the product,
            - `description`: description of the product ,
            - `category`: category of the product,
            - `ref_farmer`: id of the user (specifically farmer) which the product is related to,
            - `price`: price (per unit of measure,
            - `availability`: number of products of that type available,
            - `unit_of_measure`: unit of measure of the product
            - `image_path`: URL of the image
            - `start_date`: starting date from when the product will be available
            - `end_date`: ending date from when the product will be available
            };
    - response body content : JSON containing all the data from the product after the edit
- POST `/api/set-pending-cancellation-order`
    - Update the status order with `pending_cancellation`
    - request parameters : none
    - request body content : json containing the orderID
    - responde body content : //
- GET `/api/set-all-pending-cancellation-order`
    - Update the status of all orders with `pending_cancellation`
    - request parameters : none
    - request body content : //
    - responde body content : True if the operation has been completed, otherwise error 503
- GET `/api/delete-all-pending-cancellation-order`
    - Delete all orders with `pending_cancellation` or reset the status if the wallet has been updated
    - request parameters : none
    - request body content : //
    - responde body content : True if the operation has been completed, otherwise error 503
- DELETE `/api/delete-order/:orderID`
    - Delete a specific order
    - request parameters : order's id
    - request body : none
    - responde body content : //
- POST `/api/set-unretrieved-order`
    - Update the status order with `unretrieved`
    - request parameters : none
    - request body content : json containing the orderID
    - response body content : //
- POST `/api/insert-scheduled-order`
  - Insert order in the DB with the schedule.
  - request parameters and request body content:
    - order: { 
      - "order_id": order's id,
      - "ref_user": user's id,
      - "productList": array of:
        [{ 
        "ref_product": product's id,
        "quantity": product's quantity 
        }],
      - "date_order": order's date
      - "total": total amount 
      - "address": address for the delivery
      - "country": country for the delivery
      - "city": city for the delivery
      - "zip_code": city's zip_code
      - "schedule_date": date scheduled for the delivery
      - "schedule_time": time scheduled for the delivery
      }
  - response body content : none

  ## Server Database
  - Table `USER` - it contains id, name, surname, email, password, Type, balance, address, phone, country, city, zip code and company name for a farmer.
  - Table `PRODUCT` - it contains id, name, description, category, farmer's id, price, availability,unit of measure, path for images, start date and end date
  - Table `ORDERS` - it contains id, product's id, user's id, date, quantity and status.

  ### Triggers
  - `update_availability`
      - This trigger is used to update the availability value on products.

        CREATE TRIGGER update_availability

        AFTER INSERT ON ORDERS
        FOR EACH ROW

        BEGIN

        UPDATE PRODUCT SET availability = availability - new.quantity

        WHERE product_id = new.ref_product;

        END
  - `cancellation_update_availability`
      - This trigger is used to restore the availability value on products after a pending cancellation order is deleted.

        CREATE TRIGGER cancellation_update_availability

        AFTER DELETE ON ORDERS
        FOR EACH ROW

        WHEN OLD.status = 'pending_cancellation'

        BEGIN

        UPDATE PRODUCT

        SET availability = availability + OLD.quantity

        WHERE product_id = OLD.ref_product;
        END
  - `update_wallet`
    - This trigger is used to update the user wallet when an order is accepted.
      
      CREATE TRIGGER update_wallet
    
      AFTER UPDATE ON ORDERS
      FOR EACH ROW
      WHEN NEW.status = 'approved'
    
      BEGIN
    
      UPDATE USER
    
      SET wallet_balance = wallet_balance -
    
      (SELECT price*NEW.quantity 
    
      FROM PRODUCT WHERE product_id = NEW.ref_product)
      
      WHERE user_id = NEW.ref_user;
     
      END;
  ## Workflow notes
    - At Monday 9 AM, the orders for each users are checked and eventually put on pending cancellation.
    - At Monday 9 PM, all the orders still in pending cancellation are deleted.
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


  
