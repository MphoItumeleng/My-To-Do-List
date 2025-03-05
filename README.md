# To-Do List Application

A simple **To-Do List** application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This project helps users manage their tasks by adding, marking as completed, and deleting items from their to-do list. The tasks are saved in a MongoDB database, ensuring that data persists across sessions and devices, without relying on local storage.

## Overview

This application allows users to:

- **Add tasks** to the to-do list.
- **Mark tasks** as completed.
- **Delete tasks** from the list.
- Data is persisted across page reloads by using **MongoDB** as the backend database.

## Installation

Follow these steps to get the project up and running on your local machine.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todo-list.git

2. **Navigate into the project directory:**

    ```bash
    cd todo-list-app

3. **Install the dependencies:**

   ```bash
   npm install

4. **Create a .env file in the root of the project and add your MongoDB connection string:**

   ```ini
   MONGO_URI=<your_mongodb_connection_string>
   PORT=3000

5. **Start the application:**

   ```bash
   npm start

6. **Open your browser and go to:**

   ```arduino
   http://localhost:3000

## Usage

- **Home Page:** Displays the list of tasks.
- **Add Task:** Use the input field to add a new task and click "Add".
- **Complete Task:** Click the checkbox to mark a task as completed (crossed out).
- **Delete Task:** Click the trash icon to delete a task.

## Deployment

1. **MongoDB Atlas:** For cloud-based MongoDB hosting, sign up at MongoDB Atlas.
2. **Deployment Platforms:** You can deploy this app on platforms like Render, Railway, or Heroku. Make sure to configure your environment variables (like MONGO_URI) accordingly.

## Contact

If you have any questions or suggestions, feel free to reach out:

  - **Email:** mpho.itumeleng@icloud.com
