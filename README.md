# Bun Server Setup

This project uses **Bun**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**, with custom decorators implemented.

## Prerequisites

Make sure you have the following installed on your machine:

- **Bun** (v1.1.40 or higher)
- **Node.js** (optional but may be needed for compatibility)
- **PostgreSQL** (or a PostgreSQL database instance)
- **Prisma CLI** (installed via Bun)

## Installation

Follow these steps to set up the project:

### 1. Install Project Dependencies

Run the following command to install the required dependencies:

```bash
bun install
```

### 2. Initialize Prisma

Set up Prisma with PostgreSQL as the data source by running:

```bash
bunx prisma init --datasource-provider postgresql
```
This will generate a prisma folder with necessary files for setting up your database schema.

### 3. Generate Prisma Client
After initializing Prisma, generate the Prisma client:

```bash
bunx prisma generate
```

### 4. Run Prisma Migrations
To create your initial database schema, run the following migration command:

```bash
bunx prisma migrate dev --name init
```

This will apply the migrations to your PostgreSQL database.

Running the Server
To run the application, use the following command:

```bash
bun run index.ts
```
This will start the server using Bun and load the application with Express.

### Next.js 15 Setup
This project is integrated with a Next.js 15 app router. To get started with Next.js 15:

Set up the Next.js 15 project as usual:
```bash
npx create-next-app@15 my-next-app
```
Implement the app router by creating your files in the app directory as per Next.js 15's app router structure. Ensure the project is compatible with this version of Next.js.

Update tsconfig.json for TypeScript to work seamlessly with the app router if you haven't already.

Add necessary Prisma and custom decorators code to integrate with your Next.js project.

Custom Decorators
Custom decorators are implemented in this project to enhance functionality. Ensure you're familiar with TypeScript decorators for using them in your code. You can create decorators to handle functionality like validation, logging, and more.

Project Structure
````bash
├── prisma/                # Prisma schema and migration files
├── src/                   # Source code for Express server
├── pages/                  # Next.js pages directory
└── app/                    # Next.js app router directory (for Next.js 15)
Usage
Once the project is set up, you can:

Develop the Express server with Bun for fast runtime execution.
Use Prisma ORM for interacting with your PostgreSQL database.
Leverage custom decorators for additional functionality in your app.
Integrate the Next.js 15 app router for a modern and scalable React app.