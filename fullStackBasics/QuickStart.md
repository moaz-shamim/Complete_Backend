
# Topic we Learn

1. **Introduction to Fullstack Development:**
   - Definition and scope of fullstack development.
   - Involves both frontend (client-side) and backend (server-side) development.

2. **Frontend and Backend Connection:**
   - Communication between frontend and backend.
   - Use of APIs (Application Programming Interfaces) for interaction.

3. **Deployment Platforms:**
   - Discuss scenarios where frontend and backend are on the same platform.
   - Explore cases where they are on different platforms.

4. **Cross-Origin Resource Sharing (CORS) Errors:**
   - Explanation of CORS and its importance in web security.
   - Common causes of CORS errors.
   - How to handle CORS issues on both frontend and backend.

5. **Server Creation:**
   - Overview of server-side technologies (Node.js, Django, Flask, etc.).
   - Basic steps to create a server.

6. **Server Deployment:**
   - Different hosting platforms (AWS, Heroku, DigitalOcean, etc.).
   - Steps to deploy a server.

7. **Tool Chaining:**
   - Explanation of tool chaining in the context of fullstack development.
   - Integration of development tools for efficient workflow.

8. **Frontend Frameworks and Libraries:**
   - Introduction to popular frontend frameworks (React, Angular, Vue.js).
   - Role in building dynamic user interfaces.

9. **Backend Frameworks and Libraries:**
   - Introduction to backend frameworks (Express.js, Django, Flask, etc.).
   - Role in handling server-side logic and data processing.


By breaking down the topic into these points, you can elaborate on each aspect to provide a comprehensive understanding of fullstack development, connecting frontend with backend, handling CORS errors, server creation and deployment, tool chaining, and various other relevant topics.


***
### Approach in Our Project

To set up a basic frontend and backend, we create two separate files. In the backend, we initialize an empty Node.js application, make necessary modifications, and import the Express template to create a server. In the frontend, we build a basic user interface (UI) using React with the help of the Vite bundler.

***
### Creating a `start script`:

 When setting up a backend project, it's common to define a start script in the package.json file. This script specifies the command to start the backend server. 
***

### Problem while using `import` Syntax:

We use the import syntax to bring React into our application. However, encountering an error like "cannot use import statement outside a module" is common. This issue arises because the import syntax belongs to ECMAScript modules (ES modules), while if you choose to use CommonJS, the appropriate syntax involves the 'require' statement. Notably, the 'require' syntax aligns with CommonJS, allowing the code to execute synchronously. On the contrary, when utilizing the import syntax, the code operates within the realm of ECMAScript modules, introducing asynchronous behavior. It's crucial to be mindful of this distinction when working with different module systems in JavaScript.

*** Resolving the problem ***

To resolve this problem, we turn to the `package.json` file. This file serves as our manifest, acting as our origin point. Here, we specify a type named `module`.

```json
"type": "module",
```

This provides instructions for your manifest file, indicating that you should organize all JavaScript files in the form of modules, as opposed to CommonJS. Since all JavaScript files are stored in the node_modules, the directive is to retrieve those files from node_modules and assemble them in the form of modules.


***Backend part Complete***


### Frontend Part

We assume that the data created in the backend is required in the frontend. The same principle applies in a full-stack application where someone writes the backend and someone else writes the frontend. As backend engineers, our responsibility is to establish the connection between the backend and frontend.

1. **Frontend Setup with Vite Bundler:**
   - Frontend created using the Vite bundler.

2. **Displaying Backend Data in Frontend:**
   - Objective: Display data from the backend in the frontend.

3. **API Requests to Backend:**
   - Methods for making API requests: `fetch`, `axios`, and `React Query`.

4. **Use of Axios in Fetching Data:**
   - Decision to use Axios for API requests.

5. **Installation of Axios Package:**
   - Installation of the Axios package using npm or yarn.

6. **Integration with `useEffect`:**
   - Utilizing Axios within the `useEffect` hook.
   - Ensuring that data from the backend arrives before rendering the app.

7. **Rendering Process:**
   - Ensuring that the app rendering is dependent on the successful API request using Axios.

By following these points, the frontend is set up using the Vite bundler, and Axios is incorporated to make API requests to the backend. The `useEffect` hook is employed to manage the asynchronous nature of data fetching, ensuring that the app rendering waits for the backend data.


### Facing CORS issue:

When attempting to run our frontend, we encounter a CORS (Cross-Origin Resource Sharing) error. This arises because the server operates on a different domain than the app. The issue stems from cross-origin requests when someone accesses the server to retrieve data. The challenge intensifies when the server and the app are on different domains, especially if they use different ports. To address this, proper CORS policies need to be configured, allowing seamless cross-origin communication and resolving the CORS error during the frontend setup.

### Solving CORS issue:

There are different methods to solve this problem. The first solution is to go to our server's `.js` file, install the `cors` package, and allow CORS. The `cors` package has its own npm package.

You have to take care of whitelisting, understanding how whitelisting occurs in production and how it takes place on localhost. 

But why?
That's because when you deploy your app in production, it's not guaranteed that your application will be running on port 3000(process.env.PORT) 


### Shorten the length of URL by using the concept of Proxy:
Every time we write application every time we not write a big url in the request we decrease the length of url by using the concept of proxy .

We employ a standard approach to implement a proxy. To achieve this, we refer to the documentation of Vite. We implement the proxy in the manifest file by opening the Vite configuration file. The goal is that whenever an API request is made, the local host 3000 will be automatically appended to the request URL. This is configured in the toolchain to seamlessly detect and handle any outgoing API requests.

***

Certainly! Let's break down the specific part of the code related to the proxy configuration:

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:3000',
  },
},
```

1. **`server` Object:**
   - The `server` property is an object within the overall Vite configuration. It is used to configure settings related to the development server.

2. **`proxy` Property:**
   - The `proxy` property within the `server` object is used to set up a proxy for handling API requests. 

3. **Proxy Configuration:**
   - Inside the `proxy` property, there's an object where `/api` is the key, and `'http://localhost:3000'` is the corresponding value. This configuration establishes a proxy for requests made to paths starting with `/api`.

4. **Purpose of the Proxy:**
   - The purpose of this proxy is to redirect any API request made by the frontend to the specified backend server, which is running on `http://localhost:3000`. This is particularly useful during development when the frontend and backend are hosted on different servers.

5. **Example Scenario:**
   - For example, if the frontend code contains an API request to `/api/data`, this proxy configuration will intercept that request and forward it to `http://localhost:3000/api/data`. It helps in avoiding CORS (Cross-Origin Resource Sharing) issues that might occur when making requests to a different domain during local development.

In summary, this code is configuring a proxy in Vite, specifying that any request starting with `/api` should be redirected to the backend server running on `http://localhost:3000`. This is a common practice to handle cross-origin requests during the development phase.


