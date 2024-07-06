# Personal Budget System

#Link to live website https://coruscating-dasik-375aa2.netlify.app/register

## Tech used:

**Runtime environment**

-   [x] React.js

**Language**

-   [x] Typescript

## How to get the project:

#### Using Git (recommended)

1. Navigate & open CLI into the directory where you want to put this project & Clone this project using this command.

```bash
git clone https://github.com/Adedhoney/personal-budget-system-frontend
```

#### Using manual download ZIP

1. Download repository
2. Extract the zip file, navigate into it & copy the folder to your desired directory
3. use npm install to download all dependencies

## Setting up environments

1. There is a file named `.env.example` on the root directory of the project
2. Make sure to have the backend server running
3. Create a new file by copying & pasting the file on the root directory & rename it to just `.env`
4. The `.env` file is already ignored, so your credentials inside it won't be committed
5. Change the values of the file. Make changes of comment to the `.env.example` file while adding new constants to the `.env` file.

## Run the project

1. To run build

    ```bash
    npm run build <!-- from the root folder. You can host the build folder  -->
    ```

2. dev

    ```bash
    npm run dev
    ```

## Approach and Assumptions

User cannot access the user management page and super admin cannot access the dashboard page. The admins can access both pages

I added the user status (active - pending), but I did not implement any restrictions on this, because I didn't build a notification system that will alert either the admin of a new user, or the user when an admin accepts them.

Admins can accepts users, make users admin and or delete user. The superAdmin cannot be deleted

I didnt add a edit user endpoint for the admin because there is not user information that the admin should have control over.

Each records can be delete or edited
