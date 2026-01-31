## About

A full-stack CRUD application written in React, NestJS, and PostgreSQL. The system manages Superhero, Superpower, and SuperheroImage entities with their relationshipts, featuring filtering and pagination. It implements a simple synchronization strategy between the local filesystem and database records to ensure data consistency.

## How to start:

Copy .env.example into .env files on both the server and the client.
Server port - 5000.
Client port - 3009.

### Using Docker

- Execute npm run dev from the root directory.
- If the service fails to initialize, manually execute docker compose up to trigger the container orchestration.

### Local Environment

- Ensure a PostgreSQL instance is active and configured according to the parameters specified in /server/.env.
- Client: cd client && npm run dev
- Server: cd server && npm run start:dev

## Assumptions:

- Storage: Images are stored locally, with the database maintaining relative paths.
- Schema: Superpowers are isolated in a separate table to enable efficient filtering and relational integrity.
- ORM: TypeORM is selected for its seamless, native integration with the existing NestJS architecture.
- Layering: The repository layer is considered redundant, as TypeORM’s built-in repository pattern is already deeply integrated.
- Data Integrity: POST, PUT, and DELETE actions utilize transactions; filesystem operations for images occur only after a successful database commit.
- Error Handling: Custom error classes are implemented to maintain consistency across the application.
- Frontend: A UI library is required to meet tight deadlines and ensure UI/UX uniformity.
- State Logic: Custom hooks are designed to expose only the specific data and functionality required by the components.
- Navigation & State: Filtering logic is managed via URL query parameters to ensure state persistence and enable link sharing.
- Data Fetching: The combination of TanStack Query (React Query) and Axios is utilized to provide robust caching, synchronization, and standardized HTTP requests.
