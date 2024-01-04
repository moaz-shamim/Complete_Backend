Check out the [Code Source](https://stackblitz.com/edit/stackblitz-starters-zagqvp?description=&file=README.md&title=Express%20Starter) for better understanding.

# Here we learn the concept of data modeling:

Before starting any backend project, the first important step is to analyze the data that we intend to store. This involves clarifying all the fields such as username, email, photos, password, date of birth, etc. Once we have a clear understanding of the data points we need to store, we can then proceed with the development process.

### When creating a backend,

it's essential to carefully approach the process. Tools commonly used for data modeling include well-known options such as Moon Modeler, Eraser.io, and other modular solutions data modeling .

### Here, we observe the manual approach to data modeling.

In data modeling, it is crucial to pay attention to how data is structured in the database.

If we design a schema and later realize that we need to add more fields, the structure of our schema undergoes a complete change.

See img1.png

**_The major role of a backend engineer_** is to think how the data in the application is structured, what data has been stored, and then determine how to retrieve and validate that data.

## Lets learn about ODM

ODM stands for Object-Document Mapper, and it is a concept often used in the context of NoSQL databases, particularly MongoDB. In easy language, an ODM is like a translator between the way data is stored in a database and how it is represented in the code of a programming language.

Let's break it down:

1. **Object:** In programming, an object is a way to organize and structure data. It can have properties (attributes) and methods (functions) associated with it.

2. **Document:** In NoSQL databases like MongoDB, data is often stored in a format called a document. A document is a set of key-value pairs, similar to a JSON object.

3. **Mapper:** A mapper is something that converts or maps data from one form to another.

So, an ODM essentially helps in translating the data in your code (which is in the form of objects) into the format that the database understands (documents), and vice versa. It makes it easier for developers to work with databases by allowing them to interact with data in a way that is more natural to the programming language they are using.

## Lets learn about mongoosejs

Mongoose.js is an Object-Document Mapping (ODM) library for MongoDB and Node.js. MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON). Mongoose.js provides a way for developers to interact with MongoDB using an object-oriented approach, making it easier to work with MongoDB in a Node.js environment.

Key features of Mongoose.js:

1. **Schema Definition:**
   Mongoose allows you to define a schema for your MongoDB documents. A schema specifies the structure of the data, including the types of fields and their constraints. This helps in maintaining a consistent structure across documents.

2. **Model Creation:**
   Once you define a schema, Mongoose lets you create models based on that schema. Models are used to interact with MongoDB collections. They provide a programming interface to perform CRUD (Create, Read, Update, Delete) operations on the database.

3. **Validation:**
   Mongoose allows you to define validation rules for each field in your schema. This helps ensure that the data stored in the database adheres to a predefined structure and set of rules.

4. **Middleware:**
   Mongoose supports middleware functions that allow you to execute logic before or after certain operations, such as saving or querying documents. This provides hooks for customizing the behavior of your application based on database interactions.

5. **Query Building:**
   Mongoose provides a powerful query API that simplifies the process of querying MongoDB. You can use methods like `find`, `findOne`, and `update` to perform common database operations.

6. **Population:**
   Mongoose supports population, which allows you to reference documents in other collections and retrieve their data in a single query. This is similar to joins in traditional relational databases.

Here's a simple example of using Mongoose:

```javascript
const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Example usage
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
});

// Save the user to the database
newUser.save((err, savedUser) => {
  if (err) return console.error(err);
  console.log('User saved:', savedUser);
});
```

In this example, we define a schema for a user, create a model based on that schema, and then use the model to interact with the MongoDB database.

## Initially setup of mongoose and creation of models:

```javascript
// Importing the mongoose library
import mongoose from 'mongoose';

// Creating a schema using Mongoose
const userSchema = new mongoose.Schema({});

// Creating a model based on the schema
export const User = mongoose.model('User', userSchema);
```

1. **Importing Mongoose:**
   The first line imports the Mongoose library into your JavaScript file. Mongoose is a tool that helps you interact with MongoDB, a type of database. Think of it as a bridge that allows your JavaScript code to talk to and work with a MongoDB database.

2. **Creating a Schema:**
   The `mongoose.Schema` function is used to create a blueprint for how your data should be structured in the MongoDB database. In the provided code snippet, an empty object `{}` is passed to `mongoose.Schema`. However, in a real-world scenario, you would define the fields and their data types within this object to specify the structure of your data.

   For example, if you were creating a schema for a user, you might define fields like `username`, `email`, and `password`, along with their respective data types.

3. **Creating a Model:**
   The `mongoose.model` function is used to create a model based on the schema. A model is like a constructor that allows you to create, read, update, and delete documents in the MongoDB collection associated with that model. In the code, a model named 'User' is created based on the `userSchema`.

   When you later use this model (`User` in this case) in your code, you'll be able to perform operations on the 'User' collection in the MongoDB database. For instance, you can create a new user, retrieve user data, update user information, and so on.

4. **Exporting the Model:**
   The `export const User = ...` line makes the `User` model available for use in other parts of your code. This means you can import and use the `User` model in other files to interact with the 'User' collection in the MongoDB database.

In summary, this code sets up a basic structure using Mongoose for interacting with a MongoDB database. It creates a schema to define the structure of the data and then creates a model based on that schema to perform database operations. The `User` model is then exported for use in other parts of your application.

### Note :

A "model" in programming is like a blueprint or template for creating something. Imagine you want to build many houses that all have the same basic design. Instead of starting from scratch each time, you create a blueprint that outlines the common features and structure of the houses.

At this point in time, our focus isn't on handling the passing of data to our application; that responsibility lies with the controller, a concept we will explore later. Our current emphasis is on two primary topics:

1. **Data Storage:**
   Our attention is directed towards understanding how to store data effectively. This involves considerations of database design, structuring information, and ensuring efficient data management.

2. **Model Blueprint Creation:**
   In this context, we create a blueprint structure known as models. These models are defined in files within the "models" directory. It's a standard practice to name these files with a dot model extension. Although these model files are simple JavaScript files, appending "model" to their name signifies their role as models. This adherence to the "dot model" naming convention is a standard industry practice.

eg:
user.models.js
todo.models.js

As we progress, we will delve deeper into the role of controllers and their significance in managing data flow within our application.

Certainly! Let's delve deeper into point 3, which involves creating a model based on the schema using the `mongoose.model` function.

```javascript
export const User = mongoose.model('User', userSchema);
```

1. **`mongoose.model`:**
   The `mongoose.model` function is a method provided by Mongoose that helps in creating a model. A model, in the context of Mongoose, represents a collection in MongoDB. Think of a collection as a table in a relational database. Each document in a collection corresponds to a record in a table.

2. **Parameters of `mongoose.model`:**

   - **First Parameter ('User'):**

     - This is the name of the model. In this case, it's 'User'. This name is used to identify the model when performing operations on the associated MongoDB collection.

   - **Second Parameter (`userSchema`):**
     - This is the schema that the model is based on. The schema defines the structure of the documents that will be stored in the MongoDB collection. It specifies the fields, their types, and any additional configurations or constraints.

3. **Exporting the Model:**

   - The `export const User = ...` part means that you are making the created model (`User` in this case) available for use in other parts of your code. By exporting it, you allow other files or modules to import and use the `User` model.

4. **Usage of the Model:**
   - Once the model is created, you can use it to interact with the MongoDB collection it represents. For example, you can use the `User` model to create new user documents, find existing users, update user information, or delete users from the 'User' collection in the MongoDB database.

Here's an example of using the `User` model:

```javascript
// Creating a new user document
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
});

// Saving the new user to the 'User' collection in the MongoDB database
newUser.save((err, savedUser) => {
  if (err) return console.error(err);
  console.log('User saved:', savedUser);
});
```

In this example, `User` is used to create a new user document (`newUser`) and then save it to the 'User' collection in the MongoDB database. The `save` method is provided by Mongoose to insert the document into the associated collection.

Here, we grasp the basics of Mongoose, understanding how Mongoose handles models and how it exports them.

The provided code snippet creates a schema inside MongoDB, but it does not establish a connection to MongoDB. This deliberate choice is part of our focus on practicing data modeling rather than setting up a database connection.

### Note

When the name of the model is passed to the MongoDB database, the model name  becomes lowercase and is pluralized.

---

### Now, we proceed to the Mongoose documentation to delve into the concept of models.

Subsequently, we explore how to store data by defining collections using our schema. Inside the structure, we specify various fields.

Let's break down the code for the `userSchema` in detail:

```javascript
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
```

Here's an explanation of each part:

1. **`username` Field:**

   - **`type: String`**: Specifies that the `username` field should store text (string) data.
   - **`required: true`**: Indicates that a `username` must be provided; it cannot be empty or null.
   - **`unique: true`**: Ensures that each `username` in the collection must be unique. No two users can have the same username.
   - **`lowercase: true`**: Converts the `username` to lowercase before saving it. This helps in ensuring case-insensitive uniqueness.

2. **`email` Field:**

   - **`type: String`**: Specifies that the `email` field should store text (string) data.
   - **`required: true`**: Indicates that an `email` must be provided; it cannot be empty or null.
   - **`unique: true`**: Ensures that each `email` in the collection must be unique. No two users can have the same email address.
   - **`lowercase: true`**: Converts the `email` to lowercase before saving it. This helps in ensuring case-insensitive uniqueness.

3. **`password` Field:**

   - **`type: String`**: Specifies that the `password` field should store text (string) data.
   - **`required: true`**: Indicates that a `password` must be provided; it cannot be empty or null.

4. **Schema Configuration:**
   - The object passed as the second parameter to `mongoose.Schema` contains additional configuration options for the schema.
   - **`timestamps: true`**: Automatically adds two fields, `createdAt` and `updatedAt`, to each document. These fields store the timestamp of when a document is created and when it is last updated.

So, in simple terms, the `userSchema` defines the structure of a user document in a MongoDB collection. It specifies that each user document should have a `username`, an `email`, and a `password`. The `username` and `email` must be unique, and all three fields are required. Additionally, the schema includes a feature (`timestamps: true`) that automatically tracks when each user document is created and updated. This schema is then used to create a model named `User` for interacting with the MongoDB collection of users.

---

Is models also called collection?

Yes, in the context of MongoDB and Mongoose, the term "collection" is often used interchangeably with the term "model." Let me clarify:

- **Model:** In Mongoose, a model is a constructor function that corresponds to a specific MongoDB collection. It defines the structure of the documents within that collection and provides an interface for interacting with the documents.

- **Collection:** In MongoDB, a collection is a grouping of MongoDB documents. It is the equivalent of an RDBMS table. Each document within a collection can have a different structure, but typically, documents in a collection are of a similar or related type.

When you define a Mongoose model, it is associated with a specific collection in the MongoDB database. The model is used to perform CRUD (Create, Read, Update, Delete) operations on documents in that collection. So, in practice, you often refer to the "User" model in Mongoose as the means to interact with the "users" collection in MongoDB.

### what document in mongo DB

In MongoDB, a document is a basic unit of data storage and retrieval. It is a JSON-like, BSON (Binary JSON) formatted object that contains field-value pairs. These documents are stored in collections, which are similar to tables in a relational database.

Here are some key points about MongoDB documents:

1. **Structure:** A document is a set of key-value pairs. Each key is a field or attribute, and its associated value can be a variety of data types, including other documents, arrays, or even binary data.

2. **BSON Format:** BSON is a binary representation of JSON-like documents. It extends the JSON model to provide additional data types and to be more efficient in terms of encoding and decoding.

3. **No Schema Constraints:** Unlike traditional relational databases, MongoDB is schema-less at the document level. This means that documents in the same collection can have different structures, allowing for more flexibility.

4. **Example:**
   ```json
   {
     "username": "john_doe",
     "email": "john@example.com",
     "age": 30,
     "address": {
       "city": "New York",
       "state": "NY"
     },
     "hobbies": ["reading", "hiking"],
     "isActive": true
   }
   ```

In this example, you have a document representing a user with various attributes such as "username," "email," "age," "address," "hobbies," and "isActive." The values of these attributes can be of different data types, including nested documents (e.g., "address") and arrays (e.g., "hobbies").

Documents are at the core of MongoDB's flexible and scalable data model, and they provide a powerful way to represent and organize data within the database.

### what is collection :

In the context of MongoDB and Mongoose, a collection is a grouping of MongoDB documents. A document, in MongoDB, is a JSON-like data structure, and a collection is simply a set of these documents.

Here's a breakdown:

1. **Document:**

   - A document is a single unit of data in MongoDB. It is a JSON-like object, and it can contain various fields with values. For example, in the case of a 'User' document, it might have fields like `username`, `email`, and `password`.

2. **Collection:**
   - A collection is a grouping of documents in MongoDB. Think of it as roughly equivalent to a table in a relational database. Each collection is identified by a name and contains a set of documents.
   - Collections don't enforce a strict schema, meaning documents within a collection can have different fields. However, Mongoose often provides a schema to add some structure and consistency.

In your provided code, you have a 'Todo' collection:

```javascript
export const Todo = mongoose.model('Todo', todoSchema);
```

This line is creating a Mongoose model named 'Todo', and this model is associated with the 'Todo' collection in the MongoDB database. When you later use this 'Todo' model in your code, it allows you to interact with the 'Todo' collection—performing operations like creating new documents, querying existing ones, updating, or deleting them.

Similarly, when you see references like `ref: 'User'`, it means that the ObjectId stored in a particular field (e.g., `createdBy`) of a 'Todo' document refers to a document in the 'User' collection. It establishes a relationship between documents in different collections.

## Defining relation between collection in mongoDB

Certainly! Let's break down the specific part of the `todoSchema`:

```javascript
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
```

This code is defining a field named `createdBy` within the `todoSchema`. Here's a detailed explanation in easy language:

1. **`type: mongoose.Schema.Types.ObjectId`**:

   - This line specifies that the `createdBy` field will store MongoDB ObjectIds. MongoDB uses ObjectIds as unique identifiers for documents in a collection.
   - In simpler terms, it's like saying, "The `createdBy` field will store the unique identifier of another document in MongoDB."

2. **`ref: 'User'`**:
   - This line tells Mongoose that the values stored in the `createdBy` field will refer to documents in the 'User' collection.
   - When you see a `ref` (reference) like this, it establishes a relationship between two collections in MongoDB. In this case, it means that the `createdBy` field will contain the ObjectId of a document in the 'User' collection.

To put it more concretely, imagine you have a 'Todo' document in your database, and this `createdBy` field is like a link to a specific 'User' document. By storing the ObjectId of the user who created the todo, you can later retrieve details about that user by referencing the 'User' collection.

So, in summary, this part of the code is saying that each 'Todo' document has a field called `createdBy`, which contains the ObjectId of a user from the 'User' collection. It establishes a connection between the 'Todo' and 'User' collections in your MongoDB database.
