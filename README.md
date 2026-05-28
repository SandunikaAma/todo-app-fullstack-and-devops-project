# Full Stack DevOps Profile Management System

## 📌 Project Overview

This project is a full-stack CRUD (Create, Read, Update, Delete) profile management application built using React, Node.js, MySQL, Docker, and Kubernetes.

The system allows users to:

* Add profiles
* View profiles
* Update profiles
* Delete profiles

The application was containerized using Docker and deployed locally using Kubernetes with Minikube. Persistent storage was implemented using Kubernetes PersistentVolumeClaim (PVC) to ensure database data remains available even after restarting containers or shutting down the system.

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Axios
* React Icons
* Nginx

## Backend

* Node.js
* Express.js
* MySQL2
* CORS
* dotenv

## Database

* MySQL 8

## DevOps & Deployment

* Docker
* Docker Compose
* Kubernetes
* Minikube
* PersistentVolumeClaim (PVC)

---

# 📂 Project Structure

```bash
myprofile/
│
├── backend/
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── k8s/
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── mysql.yaml
│
├── docker-compose.yaml
├── mysql-pvc.yaml
└── README.md
```

---

# ⚙️ System Architecture

```text
User Browser
      ↓
React Frontend (Nginx Container)
      ↓
Node.js Backend API
      ↓
MySQL Database
      ↓
Persistent Volume Claim (PVC)
```

---

# 🔄 Application Flow

## 1. Frontend Layer

The React frontend provides the user interface where users can:

* Add new profiles
* Edit profiles
* Delete profiles
* View all profiles

Axios is used to communicate with the backend API.

---

## 2. Backend Layer

The Node.js + Express backend handles:

* API routing
* Business logic
* Database communication

Implemented REST API endpoints:

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | /profile     | Fetch all profiles |
| POST   | /profile     | Add profile        |
| PUT    | /profile/:id | Update profile     |
| DELETE | /profile/:id | Delete profile     |

---

## 3. Database Layer

MySQL stores all profile information permanently.

Example table structure:

| id | picture | name | age | country |
| -- | ------- | ---- | --- | ------- |

---

# 🐳 Docker Implementation

## Frontend Dockerization

The React application is built and served using Nginx.

### Frontend Flow

```text
React Source Code
        ↓
npm run build
        ↓
Static Files
        ↓
Nginx Container
```

---

## Backend Dockerization

The backend container:

* Installs dependencies
* Runs Express server
* Exposes port 5001

---

# ☸️ Kubernetes Deployment

The application was deployed using Kubernetes with Minikube.

## Kubernetes Components Used

### 1. Deployments

Used to manage pods and container lifecycle.

Created deployments:

* frontend deployment
* backend deployment
* mysql deployment

---

### 2. Services

#### Frontend Service

* Type: NodePort
* Exposes frontend externally

#### Backend Service

* Type: ClusterIP
* Internal communication only

#### MySQL Service

* Type: ClusterIP
* Internal database communication

---

### 3. PersistentVolumeClaim (PVC)

A PersistentVolumeClaim was implemented for MySQL storage.

Purpose:

* Preserve database data
* Prevent data loss after pod/container restart
* Ensure persistent storage

Without PVC:

* Database resets after pod restart

With PVC:

* Data survives:

  * Minikube restart
  * Pod recreation
  * Laptop shutdown

---

# 🚀 Deployment Process

## Step 1 — Start Minikube

```bash
minikube start
```

---

## Step 2 — Connect Docker to Minikube

```bash
eval $(minikube docker-env)
```

---

## Step 3 — Build Docker Images

### Backend

```bash
docker build -t backend:v1 ./backend
```

### Frontend

```bash
docker build -t frontend:v1 ./frontend
```

---

## Step 4 — Deploy Kubernetes Resources

```bash
kubectl apply -f mysql-pvc.yaml

kubectl apply -f k8s/mysql.yaml

kubectl apply -f k8s/backend.yaml

kubectl apply -f k8s/frontend.yaml
```

---

## Step 5 — Verify Pods

```bash
kubectl get pods
```

---

## Step 6 — Open Application

```bash
minikube service frontend-service
```

---

# ⚠️ Challenges Faced & Solutions

## 1. ImagePullBackOff Error

### Cause

Docker images were not built inside Minikube Docker environment.

### Solution

```bash
eval $(minikube docker-env)
```

---

## 2. Frontend API Connection Errors

### Cause

Using localhost inside Kubernetes frontend deployment.

### Solution

Backend service exposure and proper service communication handling.

---

## 3. Data Loss After Restart

### Cause

MySQL container storage was temporary.

### Solution

Implemented Kubernetes PersistentVolumeClaim (PVC).

---

## 4. React Changes Not Reflecting

### Cause

Frontend image was not rebuilt.

### Solution

```bash
npm run build

docker build

kubectl rollout restart deployment frontend
```

---

# 📈 Key DevOps Concepts Demonstrated

* Containerization using Docker
* Multi-container application management
* Kubernetes Deployments & Services
* Service communication
* Persistent storage with PVC
* Container orchestration
* Image management in Minikube
* Full-stack microservice architecture

---

# 🎯 Future Improvements

* Add Kubernetes Ingress
* Implement CI/CD using GitHub Actions
* Add monitoring with Prometheus & Grafana
* Deploy to cloud platforms (AWS/GCP/Azure)
* Use Helm charts for deployment management

---

# 👨‍💻 Author

Sandunika Amarasekara

---

# 📄 License

This project is for educational and portfolio purposes.
