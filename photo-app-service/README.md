<div id="top"></div>

<div align="center">
  <h1>Photo App Service</h1>
</div>

[[_TOC_]]

## 📍 About The Project

- `photo-app-service` is a service that stores uploded images information. This service makes related data available by storing it in the `photo-app` MongoDB collection. Images are uploaded to GCP cloud.

### Dependencies

- [![TypeScript][typescript]][typescript-url]
- [![NodeJS][nodejs]][node-url]
- [![MongoDB][mongodb]][mongo-url]

### Databases

- photo-app-service (mongo)

<div align="right">
  <p>(<a href="#top">back to top</a>)</p>
</div>

<!-- GETTING STARTED
*** Include any instructions that would be useful
    to get this project up and running
    as well as info about troubleshooting known issues
-->

## 🚀 Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running, follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- node

  ```sh
  brew install node
  ```

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:umairfarooq44/photo-app-management.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file. You can also copy `.env.example` file content to `.env` file and provide the following environment variables:

   ```sh
    NODE_ENV=development
    PORT=4000
    MONGODB_CONNECTION_STRING=mongodb+srv://umairfarooq:mGRypIdUwgHC6sro@photo-app.39pjrtd.mongodb.net/?retryWrites=true&w=majority
   ```

4. Run the Project
   ```sh
    npm run dev
   ```

<div align="right">
  <p>(<a href="#top">back to top</a>)</p>
</div>

## 🕹 Usage

This service is used by the Frontend Application `photo-app`

<div align="right">
  <p>(<a href="#top">back to top</a>)</p>
</div>

[typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[nodejs]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[mongodb]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongo-url]: https://www.mongodb.com/
