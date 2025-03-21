# Ottonova City Explorer

## 🌍 Project Overview

Ottonova City Explorer is a **full-stack web application** that allows users to explore cities interactively using a **dashboard and map interface**. Users can **view, filter, sort, add, edit, and delete cities**, as well as analyze city statistics using dynamic charts.

## 🚀 Features

- **Interactive Map**: Displays cities with custom markers and clustering.
- **City Management**: Add, edit, and delete cities.
- **Filtering & Sorting**: Dynamic filtering and sorting options.
- **Charts & Analytics**: Visualize city statistics using ngx-charts.
- **Backend with NestJS & PostgreSQL**: REST API with Swagger documentation.
- **State Management with Angular Signals**: Efficient UI updates.
- **Dockerized Deployment**: Separate environments for development and production.

## 🛠 Technology Stack

### **Backend (NestJS + TypeORM + PostgreSQL)**

- **NestJS** - Modular, TypeScript-based backend framework
- **TypeORM** - ORM for PostgreSQL
- **Swagger** - API documentation
- **Docker & Docker Compose** - Deployment setup

### **Frontend (Angular 19 + Leaflet.js + Angular Material)**

- **Angular 19** - Frontend framework with standalone components
- **Leaflet.js** - Interactive maps
- **Angular Material** - UI components
- **Signals & Computed Properties** - State management
- **ngx-charts** - Charts and analytics

## 📂 Project Folder Structure
```
ottonova-city-explorer/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── cities/       # City module
│   │   ├── data/         # Data Source
│   │   ├── app.module.ts # Main module
│   ├── .env              # Environment variables
│   ├── Dockerfile        # Backend Docker setup
│   ├── swagger.json      # API Documentation
│   ├── package.json      # Dependencies
├── frontend/             # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/city/  # City components & services
│   │   │   ├── components/      # Shared UI components
│   │   │   ├── styles/          # Global styles
│   ├── angular.json      # Angular project config
│   ├── Dockerfile        # Frontend Docker setup
│   ├── package.json      # Dependencies
├── docker-compose.yml    # Container orchestration entrypoints
├── docker-compose.prod.yml    # Container orchestration production environment entrypoints
├── docker-compose.dev.yml    # Container orchestration development environment entrypoints
└── README.md             # Project documentation
```

## ⚙️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/mehmet-yilmaz/ottonova-city-explorer.git
cd ottonova-city-explorer
```

### **2️⃣ Set Up Environment Variables**

#### **Backend (.env)**
```
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=city_explorer
```

#### **Frontend (frontend/src/environment/environment(*).ts)**
```
export const environment = {
  production: false,
  apiHost: 'localhost:3100',
};

```

### **3️⃣ Run the Application with Docker**

> **PLEASE USE THE DEVELOPMENT MODE**
> **PRODUCTION MODE IS ONLY SUITABLE WITH AN ACTIVE DATABASE**

> _Please ensure you have already bind your desired ports in the related docker-compose file_

#### **Development Mode**
```sh
docker compose -f docker-compose.dev.yml up --build
```

#### **Production Mode**
```sh
docker compose -f docker-compose.prod.yml up --build -d
```

## 🔥 API Documentation

Once the backend is running, access **Swagger UI** at:

**Prod:**
```
http://localhost/api/docs
```

**Dev:**
```
http://[backend_ip:port]/docs
```

### **Example Endpoints**

#### **1️⃣ Get All Cities**
**GET** `/cities`
Response:
```json
{
  "data": [
    { "id": 1, "name": "Berlin", "country": "Germany" }
  ],
  "total": 10,
  "limit": 10,
  "page": 1
}
```

#### **2️⃣ Add a City**
**POST** `/cities`
```json
{
  "name": "Paris",
  "country": "France",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "population": 2148327,
  "landmarks": ["Eiffel Tower", "Louvre"]
}
```

#### **3️⃣ Edit a City**
**PUT** `/cities/{id}`

#### **4️⃣ Delete a City**
**DELETE** `/cities/{id}`

## 🧪 Running Tests

### **Backend Tests (Jest)**
```sh
cd backend
npm run test
```

### **Frontend Tests (Jasmine/Karma)**
```sh
cd frontend
npm run test
```


