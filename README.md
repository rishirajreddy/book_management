# Book Management API

## Prerequisites

Ensure Node.js and NPM are installed on your computer.

## Installation

1. Clone the repository from the GitHub.
2. Navigate to the project directory:
   ```
   cd project_name
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Change the MongoDB URI in `config/dbConfig.js`.
5. Start the application:
   ```
   npm run dev
   ```

## Validations

Request body validations are implemented using the Joi npm package for both Users and Books.

## Postman Collection

Explore and test the API endpoints using the Postman collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/25041489-58efd87c-2af4-46ce-add0-9d3e73981086?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25041489-58efd87c-2af4-46ce-add0-9d3e73981086%26entityType%3Dcollection%26workspaceId%3D597eb560-d46d-465f-8638-e3b72abd08aa)

## APIs

### Users API:

1. **Get All Users:**

   - **Endpoint:** `/api/users`
   - **Method:** GET
   - **Description:** Retrieve all users.
   - **Queries:** `pagination[page]=0&pagination[size]=10` (for pagination)
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** User object with user details (e.g., id, name, email)
   - **Authentication:** Not Required

2. **Get Single User:**
   - **Endpoint:** `/api/users/:id`
   - **Method:** GET
   - **Description:** Retrieve user information by user ID.
   - **Parameters:** `id` (User ID - required)
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** User object with user details (id, name, email)
   - **Authentication:** Required (JWT Token)

3. **Create User:**

   - **Endpoint:** `/api/users`
   - **Method:** POST
   - **Description:** Create a user.
   - **Request Body:**
     ```json
     {
       "email": "star@mail.com",
       "phone": "6760555412",
       "country_code": "+91",
       "password": "12345678"
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** User object with user details (access_token, refresh_token, user_details)
   - **Authentication:** Not Required

4. **Update User:**

   - **Endpoint:** `/api/users/:id`
   - **Method:** PUT
   - **Description:** Update a user.
   - **Parameters:**
     - `id`: User ID
   - **Request Body:**
     ```json
     {
       "email": "star@mail.com",
       "phone": "6760555412",
       "country_code": "+91"
     }
     ```
   - **Response:**
     - **Status Code:** 201 OK
     - **Body:** User object with user details (user_details)
   - **Authentication:** Required (JWT Token: Authenticated User can update only their details)

5. **Delete User:**

   - **Endpoint:** `/api/users/:id`
   - **Method:** DELETE
   - **Description:** Delete a user.
   - **Parameters:**
     - `id`: User ID
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** User object with user details (user_details)
   - **Authentication:** Required (JWT Token: Authenticated User can delete only their data)

6. **Login User:**
   - **Endpoint:** `/api/users/auth/login`
   - **Method:** POST
   - **Description:** User login.
   - **Request Body:**
     ```json
     {
       "email": "star@mail.com",
       "password": "12345678"
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** User object with user details (access_token, refresh_token, user_details)

### Books API:

1. **Create Book:**

   - **Endpoint:** `/api/books`
   - **Method:** POST
   - **Description:** Create a book.
   - **Request Body:**
     ```json
     {
       "title": "Harry Potter",
       "author": "JKRowling",
       "publisher": "HBO",
       "publication_year": "2000",
       "genre": "fantasy"
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Book object with details (book_details)
   - **Authentication:** Required (JWT Token)

2. **Find All Books:**
   - **Endpoint:** `/api/books`
   - **Method:** GET
   - **Description:** Find all books.
   - **Queries:**
     - `authors=author_name` (search using single author)
     - `authors=author_name1,author_name2` (search using multiple authors)
     - `publication_year=year` (search using single year)
     - `publication_year=year1-year2` (search books in range of year1 and year2)
     - `pagination[page]=0&pagination[size]=10` (for pagination)
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** All book objects with details (book_details)
   - **Authentication:** Not Required

3. **Find Single Book:**

   - **Endpoint:** `/api/books/:id`
   - **Method:** GET
   - **Description:** Find a book by ID.
   - **Parameters:**
     - `id`: Book ID
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Book object with details (book_details)
   - **Authentication:** Not Required

4. **Update Book:**

   - **Endpoint:** `/api/books/:id`
   - **Method:** PUT
   - **Description:** Update a book.
   - **Parameters:**
     - `id`: Book ID
   - **Request Body:**
     ```json
     {
       "title": "Harry Potter",
       "author": "JKRowling",
       "publisher": "HBO",
       "publication_year": "2000",
       "genre": "fantasy"
     }
     ```
   - **Response:**
     - **Status Code:** 201 OK
     - **Body:** Book object with details (book_details)
   - **Authentication:** Required (JWT Token of the User)

5. **Delete Book:**
   - **Endpoint:** `/api/books/:id`
   - **Method:** DELETE
   - **Description:** Delete a book.
   - **Parameters:**
     - `id`: Book ID
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Book object with details (book_details)
   - **Authentication:** Required (JWT Token of the User)
