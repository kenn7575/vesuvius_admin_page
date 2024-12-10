
# Cafe Vesuvius Admin Page

This is the CMS and admin page for the Cafe Vesuvius project. It is a server side rendered react app that uses next.js and tailwindcss. It is a highly optimized and secure application, that is designed to be used by the cafe owner to manage the menu and view analytics. The app is designed to be used on a desktop or tablet, however it is also responsive and optimized for mobile devices.


## Authors

- [@kenn7575](https://www.github.com/kenn7575)


## Features

- Light/dark theme 🌗
- Server side rendered dynamic data. 🔥
- Highly optimized performance ⚡️
- modern design and dynamic charts. 📈
- CMS system with form validation and live feedback. 👨‍💻
- Secure authenticatio middleware that automaticlly renews access tokens. 🔐


## To Run Locally

Clone the project

```bash
  git clone https://github.com/kenn7575/vesuvius_admin_page
```


Install dependencies

```bash
  npm install --force
```

Build the project in dev mode

```bash
  npm run dev
```

Build and run the project in prod mode

```bash
  npm run build && npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_BACKEND_URL` for the backend backend endpoints

`JWT_SECRET` for validating the token expiration and attempting to renew expired tokens.

