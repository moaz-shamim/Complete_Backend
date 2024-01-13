# Professional backend Setup:

1. We commence our project by creating a use model for it. Refer to picture one for a visual representation.

![Sample Image](./img1.png)

2. In the model, we observe that we handle images as part of our project.

3. During this phase, we establish our file and folder structure.

4. Initially, we initialize an empty Node application.

5. In our model, we also deal with images. It's crucial to note that when storing images, we utilize third-party services such as Microsoft Azure, Amazon AWS, and Cloudinary.

6. We narrow our focus when uploading photos or other media from users. We ensure that we store this media on our server to mitigate the impact in case of a sub-connection loss. This guarantees the presence of media on our server.

7. In the third process, we upload the photos to the third-party platform.

8. Some companies opt for a directed upload approach, while others use third-party packs. This choice depends on the specific practices of each company.

9. The concept of GitHub keep files is significant in our project.

10. Additionally, we consider the concept of GitHub ignore files.

11. Create a `.env` file.

12. Inside the project's root directory, create a `public` folder.

13. Within the `public` folder, create a `temp` folder.

14. Place the `.gitkeep` file inside the `temp` folder, allowing it to be pushed to GitHub without having extra files we make files in future initially we upload empty folder.

15. Create a `src` folder within the project's root directory.

16. Inside the `src` folder, create three files `app,js` `constants.js` `index.js`.

17. Address the issue of the server restarting repeatedly by exploring different options.

18. Install the `nodemon` dev dependency to handle server reloading upon changes.

19. Use the dev dependency installation process: insert a '-D' between `npm` and the package name, specifying it as a dev dependency.

20. Reload the server automatically when changes are made in the source files.

21. To achieve this, write a script for `nodemon` to execute.

22. Formulate the command for the script.

```js
  "scripts": {
    "dev": "nodemon src/index.js"
  },
```
21. Create additional folders within our source folder.

22. Utilize the following folders accordingly:

    - Controllers: Implement the majority of the application's functionality here.

    - Database: Write the connection logic for the database.

    - Middlewares: Implement middleware functions here.

    - Models: Handle data modeling in this folder.

    - Routes: Manage routes in this folder.

    - Utils: Store utility functions in this folder.

23. Install Prettier plugins so that we can work professionally in a team.

Developers use Prettier and its plugins to ensure a consistent and maintainable codebase, improve collaboration, and save time on manual code formatting. It has become a valuable tool in modern development workflows.

`.prettierrc`
The .prettierrc file is a configuration file used by the Prettier code formatter. It allows you to customize various formatting options to match the coding style preferences of your project. This file typically resides in the root directory of your project.

`.prettierignore`
The .prettierignore file is used to specify files and directories that should be excluded from Prettier formatting. It works similarly to the commonly used .gitignore file but is specific to Prettier.

```js
{
  "singleQuote": false,
  "bracketSpacing": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "semi": true
}
```


# How to connect database in MERN :

## Here we learnt about database connection:

Here, we're looking at different ways to connect to a database and how we deal with problems that may come up. 

We're using MongoDB as our database, specifically MongoDB Atlas, which is a cloud-based service provided by MongoDB. Just to be clear, we're not using a big, complicated database – we're going for MongoDB Atlas.


**What is MongoDB Atlas?**

MongoDB Atlas is like a super convenient and reliable home for your MongoDB databases. Imagine you have a bunch of information (like names, addresses, and other details) that you want to organize and store. MongoDB is a type of database that helps you do that. Now, MongoDB Atlas is a service that takes care of the tricky parts of managing that database, making it easier and more reliable.

**Key Points:**

1. **Cloud Hosting:** MongoDB Atlas lives on the internet (in the cloud). It's not a physical thing you have to set up in your office. This is great because it means your database can be accessed from anywhere, and you don't have to worry about maintaining hardware.

2. **Easy Setup:** Setting up a MongoDB database can be a bit technical, but with MongoDB Atlas, it's much simpler. You choose your preferences like how much storage you need, where you want it to be located (like in the US or Europe), and other settings.

3. **Automatic Updates:** Imagine your database is like a smartphone. You want it to have the latest features and be secure. MongoDB Atlas takes care of updating and fixing things in the background, so you don't have to worry about it.

4. **Backups and Security:** Atlas automatically keeps copies of your database in case something goes wrong. It also has security features to make sure only the right people can access your information.

5. **Scaling Made Easy:** If your business grows and you need more space or power for your database, Atlas can easily scale up to handle more data and traffic without causing you headaches.

6. **Monitoring and Alerts:** Atlas keeps an eye on your database's health. If something looks odd or there's a problem, it can send you a message (alert) so you can fix it before it becomes a big issue.

In simple terms, MongoDB Atlas is like having a reliable caretaker for your MongoDB database. It lives in the cloud, makes sure things run smoothly, and takes care of technical stuff so you can focus on using your data rather than worrying about managing the database.

### Create a Project in MongoDB Atlas

Certainly, let's relate the process of creating a project in MongoDB Atlas to familiar concepts:

1. **Create a Project:**
   - Think of creating a project in MongoDB Atlas like setting up a special workspace or folder on your computer. It's a place where you'll organize and manage all the data related to a specific task or goal.

2. **Name Your Project:**
   - Giving a name to your project is similar to naming a folder on your computer. It helps you quickly identify and remember what's inside.

3. **Add Members:**
   - Adding members means inviting other people (like teammates or collaborators) to join your project. In computer terms, it's like sharing access to a shared folder with specific people.

4. **Project Names Have to be Unique:**
   - Imagine if you had two folders with the same name on your computer – it would be confusing. MongoDB Atlas ensures that each project name is unique within your organization, just like each folder having a unique name on your computer.

In MongoDB Atlas, a project is a way to organize and manage databases, collections, and related resources. Creating a project is like creating a virtual space to neatly arrange and handle data for a specific purpose. It's part of the process that helps you structure and manage your database-related tasks efficiently.

### Deploy your database:

When you go to the "Deploy" section in MongoDB Atlas, it means you are entering a part of the platform where you can set up and configure the deployment of your MongoDB database. Let's break down what this typically involves:

1. **Cloud Provider and Region:**
   - Choose the cloud provider (e.g., AWS, Azure, GCP) where you want to host your MongoDB database.
   - Select the specific region or data center location within the chosen cloud provider's infrastructure. This impacts the physical location of your database servers.

2. **Cluster Configuration (Cluster Tier):**
   - Specify the type and size of your MongoDB cluster. This includes details such as the number of nodes, the type of storage, and the amount of RAM allocated to your cluster.

3. **Cluster Name:**
   - Give your MongoDB cluster a name for easy identification.

4. **Additional Settings:**
   - Depending on the cloud provider, you may have additional settings to configure, such as enabling backups, specifying the MongoDB version, or other provider-specific options.

5. **Cluster Connectivity:**
   - Configure network settings, such as IP whitelisting, to control which devices or services can access your MongoDB cluster. This is an essential security measure.

6. **Authentication and Authorization:**
   - Set up authentication mechanisms (e.g., username and password) to control who has access to your MongoDB cluster. You can also configure roles and permissions for more fine-grained access control.

7. **Cluster Tier and Disk Configuration:**
   - Depending on the chosen cluster tier, you may need to configure disk options, such as storage capacity and the type of storage (e.g., SSD).

8. **Review Configuration:**
   - Before deploying, review all the settings to ensure they align with your requirements and preferences.

9. **Deploy Cluster:**
   - Once you've configured everything, you can initiate the deployment process. MongoDB Atlas will then provision the necessary resources and set up your MongoDB cluster based on your specified configuration.

In essence, the "Deploy" section in MongoDB Atlas guides you through the process of specifying where and how you want your MongoDB database to be hosted. It covers various settings related to infrastructure, security, and performance to tailor the deployment according to your application's needs.

### Network Access Section:

Certainly! The "Network Access" section in MongoDB Atlas is like the bouncer at a club who decides who gets to come in. It's where you set the rules for who can connect to your MongoDB database.

Here's a breakdown in easy language:

1. **Access List Entry:**
   - This is like the VIP list. You specify which IP addresses or ranges are allowed to connect to your MongoDB database.
   - In the example you provided, `49.37.66.88/32` is on the list. It's a specific address or device that's allowed to access your MongoDB. Think of it like having a special invitation.

2. **Comment:**
   - This is like a little note to remind you why a certain IP address is on the list. In this case, it says it was created during the Auto Setup process, so you know it's there for a reason.

3. **ALLOW ACCESS FROM ANYWHERE:**
   - This is like saying, "Okay, everyone is invited!" It means any device or computer from anywhere can connect to your MongoDB database. While convenient, it's generally considered less secure because it opens the door to anyone.


In simpler terms, the "Network Access" section lets you decide who gets the keys to your MongoDB party. You can be specific and invite only certain IP addresses, or you can be more open and allow access from anywhere. It's a security feature that helps control who can interact with your MongoDB database.


### DataBase Access Section:

Absolutely, let's break down the "Database Access" section in MongoDB Atlas using simple language:

1. **Edit User: moazshamim1575@admin:**
   - Think of this like having a special key for a specific person named "moazshamim1575" who is the admin, meaning they have some powerful access rights.

2. **Authentication Method:**
   - This is the way MongoDB checks if the person trying to access the database is who they say they are. It's like choosing between a password, a certificate (a special kind of ID card), or other methods.

   - In this case, the authentication method chosen is "Password," so "moazshamim1575" needs to enter the correct password to get in.

3. **Database User Privileges:**
   - Imagine the user "moazshamim1575" as a guest at a party. The privileges are like the different things they can do at the party.

   - **Built-in Role:**
     - It's like giving "moazshamim1575" a specific role or job at the party. In this case, one role has been selected, maybe something like being the person who can look at and read things (SELECT).

   - **Custom Roles:**
     - These are special roles you can create yourself. It's like making up specific tasks or responsibilities for "moazshamim1575" at the party.

   - **Specific Privileges:**
     - This is like giving "moazshamim1575" certain special abilities or permissions. For example, they might be allowed to do specific things with certain parts of the party (database and collection). You can be very detailed about what they can and cannot do.

4. **Restrict Access to Specific Clusters:**
   - Imagine you're hosting multiple parties in different rooms. This option lets you decide which rooms "moazshamim1575" is allowed to enter.

   - By default, "moazshamim1575" can access everything in this project (the whole party), but you can enable this option to be more specific about where they can go.


In simpler terms, the "Database Access" section is where you decide who gets special access keys, how they prove they're allowed in, and what specific things they can do at the "party" (or database). It's like setting up security and permissions for different users.


### "Clusters" in MongoDB:

**Imagine a City of Databases:**
- Think of a "cluster" as a big city made up of many individual databases.
- Each database is like a separate house in the city, and all these houses together make up the entire cluster.

**City Infrastructure:**
- Just like a city has infrastructure (roads, electricity, water supply), a MongoDB cluster has its own infrastructure that helps databases communicate and work together.

**Roles in the City:**
- In the city, you have different roles like firefighters, police officers, and chefs. In a MongoDB cluster, you have different types of servers or nodes, each with its own role to play.

**Living Together:**
- All the databases in a cluster live together in harmony, just like people in a city. They share resources, help each other out, and make the entire city (or cluster) run smoothly.

**Why Clusters Are Useful:**
- Clusters provide a way to organize and manage lots of information. They ensure that even if one house (or database) has a problem, the rest of the city (or cluster) can still function well.

**Scaling Up:**
- If the city needs to grow, it can add more houses or buildings. Similarly, if your data grows, you can add more databases to your MongoDB cluster.

**Security and Access:**
- Just like cities have gates and guards for security, MongoDB clusters have measures to control who can access and interact with the databases.

**In Simple Terms:**
- A MongoDB cluster is like a busy and well-organized city where databases live, work together, and share resources to make sure everything runs smoothly. Each database is a part of the city, contributing to the overall functioning of the cluster.

### Connect to Cluster :

let's simplify the process of connecting to Cluster in MongoDB Atlas:

1. **Connect to Cluster:**
   - Think of "Cluster0" as a special place where your MongoDB databases live. Connecting to it is like getting the keys to the entrance.

2. **Set Up Connection Security:**
   - Just like having locks on your doors to keep things safe, setting up connection security is about making sure only the right people (or applications) can access your MongoDB data.

3. **Choose a Connection Method:**
   - Imagine you have different ways to enter a building – maybe through the front door, a side entrance, or even a secret passage. Choosing a connection method is like picking how you want to access your MongoDB data.

4. **Connect:**
   - Now, you're ready to actually open the door and go inside (connect). There are different tools or methods you can use:

   - **Access your Atlas data using MongoDB’s native drivers:**
     - This is like using a special key (driver) that MongoDB understands. It's a way for your software (like Node.js or Go) to talk to the MongoDB database.

   - **Access your data through tools:**
     - This is like using a magic tool to see and work with your data. You can choose from different tools based on what you're comfortable with or what suits your needs.

   - **Data Explorer, Compass, Shell, MongoDB for VS Code, Atlas SQL:**
     - These are like different doors or entrances you can use to interact with your MongoDB data. Each one has its own features, like a Data Explorer for browsing, Compass for visualizing data, Shell for quick commands, VS Code for developers, and Atlas SQL for connecting with SQL tools.

   - **Go Back and Close:**
     - If you change your mind or finish what you were doing, you can go back or close the connection, just like leaving a building and locking the door behind you.

In simple terms, connecting to Cluster is like entering a secure place where your MongoDB data is stored. You can choose how you want to get in, use different tools to explore and work with your data, and when you're done, you can leave or close the connection.

### Connecting with MongoDB Compass:

When you click Connecting with MongoDB Compass , MongoDB Atlas provide you a connection string from which you connect to your Clusters(DataBase)

The connection string you see is like a secret code that helps your computer talk to the MongoDB database in the cloud (Cluster0). Let's break it down:

1. `mongodb+srv://`: This is just a way of saying, "Hey, I want to connect to a MongoDB server!"

2. `moazshamim1575`: This is the username you'll use to log in.

3. `<password>`: You need to replace this with the actual password for the user 'moazshamim1575'.

4. `@cluster0.gwa9zwr.mongodb.net/`: This is the address of the MongoDB server. It's like telling your computer where to find the database. In this case, it's Cluster0 in the MongoDB cloud.

So, when you put it all together, it's like telling your computer, "Connect to MongoDB using the username 'moazshamim1575', with this password, and find the database in Cluster0 in the MongoDB cloud."

Make sure to replace `<password>` with the real password, and then you can use this code to connect your computer to the MongoDB database!

You can use this connection string in the env file of your project to connect your project from DataBase. 
