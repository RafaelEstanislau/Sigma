# Sigma Task
The project is a web application that allows users to manage their profiles. Users can log in, view their profile information, and update specific fields based on their permissions.

# Important
In case of any errors in the documentation or questions about the project or how to run it, please contact me via email "rafalevel100@hotmail.com".

As there was no specification regarding how permissions would be assigned to each user, I adopted, by default, the permission to view the form in a readonly state when registering a new user. If you wish to test scenarios with different permissions, in the backend folder, there is a file named "seed.ts". In this file, there is a script to populate the database with users in any desired way. You can find more information in the file mentioned above

## Key Features:

User Authentication: Users can log in securely using their credentials.
Profile Management: Users can view and edit specific profile information, such as first name and email, based on their assigned permissions.
Permission-Based Access: The application implements role-based access control, allowing different users to have different levels of access.
## Technology Stack:

Frontend: React

Backend: Node.js (Express)

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

## Installation
Disclaimer: As I'm not sure whether the test can be public or not, it is a private repository. If there is a need to access it to review the code or clone the project, please contact me via email: "rafalevel100@hotmail.com" to add your user as a collaborator to the project.
1. Clone the repository: `git clone https://github.com/RafaelEstanislau/Sigma.git`() 
2. Navigate to the project directory
3. Install dependencies: `npm install`

## Configuration
(Disclaimer: I removed the env files from gitignore while I´m not able to deploy the application so it´s easier just to install the packages and run. The next steps from this configuration section aren´t necessary, just fill the two env files with the values provided on the email)
1. Create a `.env` file in the project's root and back end folder.
2. Add the necessary environment variables to the `.env` file. Refer to example bellow:
NODE_ENV = string

PORT = your port

JWT_SECRET = random

MONGO_URI = your mongo atlas url connection

There is also an example file on the root folder called `.env.example`

## Usage

On the root folder run `npm install`, after that `cd frontend` and use `npm install` again to install the react packages and test project 

To run the project, on the root folder, run `npm run dev`

## Testing

To run the unit tests, on the root folder, run `npx jest`

