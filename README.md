# Tekana-eWallet

# Technology used:
- NodeJs/ExpressJs
- PostgreSQL
- Sequelize

# Step by step to run the project locally:

- Get the project in your laptop with: `git clone https://github.com/erickyvand/tekana-eWallet-backend.git`
- Change to project directory with: `cd tekana-eWallet-backend`
- Open the project in VScode with: `code .`
- Open vscode terminal
- In the project root, create `.env` file with: `touch .env`
- Refer to `.env.example` to update the `.env` file
- Install project packages with: `npm install`
- Create database name of your choice (ex: ewallet)
- Run migration files to create tables in the created database with: `npm run migrate:up`
- Start the project with: `npm run dev:server`

# Endpoints
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Get Customers: `POST /api/customers`
- Create transactions: `POST /api/financials/transactions`
- Get transactions: `POST /api/financials/find/transactions`
- Create account entries: `POST /api/financials/entries`
- Get account entries aggregations: `GET /api/financials/aggregations`
- Get transactions aggregations (Receiver): `GET /api/financials/aggregations/receiver`
- Get transactions aggregations (Sender): `GET /api/financials/aggregations/sender`
- Get Customers wallets: `POST /api/financials/wallets`

# Postman collection
- Download postman collection via this file: [Tekana-ewallet postman collection](https://drive.google.com/file/d/1ZMqtoNJ6nIWQYGzMPfVK482LxnU9I5HT/view?usp=drive_link)

# Here's a step-by-step strategy to guide you from day one until the go-live of the pilot system:

# Strategy:

## 1. Requirement Gathering and Planning:

- Collaborate with the business team and product owner to understand the existing system and gather requirements for the new eWallet platform.
- Define project goals, scope, and success criteria.
- Identify key stakeholders and create a project plan with clear milestones.

## 2. Technology Stack Selection:

- Evaluate and select a modern technology stack for the back-end, considering scalability, security, and maintainability.
- Choose a programming language (e.g. Node.js), a framework (e.g. Express.js), and a database system (e.g., PostgreSQL).

## 3. Architecture Design:

- Design a scalable and modular back-end architecture.
- Implement microservices or a monolithic architecture based on the project's specific needs.
- Define APIs for communication with the front-end and other services.

## 4. Development:

- Implement user registration and customer management features, including user creation and retrieval.
- Develop features for creating and managing customer wallets, allowing users to check their balance and transaction history.
- Implement features for creating and managing transactions between customers' wallets.
- Ensure data consistency, security, and error handling throughout the development process.

## 5. Testing:

- Create unit tests, integration tests, and end-to-end tests to ensure the reliability of the back-end services.
- Implement continuous integration and continuous deployment (CI/CD) pipelines to automate testing and deployment processes.

## 6. Security and Compliance:

- Implement robust security measures, including encryption, authentication, and authorization.
- Ensure compliance with data protection regulations (e.g., GDPR) for international customers.

## 7. Performance Optimization:

- Optimize the back-end system for high performance and scalability to support a large user base.

## 8. Documentation:

- Document the codebase, APIs, and system architecture for easy maintenance and future expansion.

## 9. Pilot System Testing:

- Deploy the pilot system in a controlled environment.
- Conduct rigorous testing, including load testing, to identify and address any issues.

## 10. User Feedback and Iteration:

- Gather feedback from users and stakeholders to identify areas for improvement.
- Iterate on the system to address feedback and enhance the user experience.

## 11. Training and Knowledge Transfer:

- Train the technical team on the new system and ensure they are well-versed in maintaining and supporting it.

## 12. Go-Live and Monitoring:

- Deploy the new back-end system for production use.
- Implement monitoring and alerting systems to track system performance and reliability.
- Establish 24/7 support and incident response procedures.

## 13. Post-Release Support:

- Provide ongoing support and maintenance, addressing any issues and releasing updates as needed.