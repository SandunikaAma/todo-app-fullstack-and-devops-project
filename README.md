Application Flow
1. Frontend Layer

The React frontend provides the user interface where users can:

Create new tasks
Edit task information
Mark tasks as completed
Delete tasks
View all tasks

Axios is used to communicate with the backend API.

2. Backend Layer

The Node.js + Express backend handles:

API routing
Business logic
Database communication

Implemented REST API endpoints:

Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create a new task
PUT	/tasks/:id	Update task
DELETE	/tasks/:id	Delete task
3. Database Layer

MySQL stores all task information permanently.

Example table structure:

id	title	description	status	created_at
1	Complete Assignment	Finish Kubernetes report	Pending	2026-01-10
Task Status Types
Pending
In Progress
Completed
🐳 Docker Implementation
Frontend Dockerization

The React application is built and served using Nginx.

Frontend Flow
React Source Code
        ↓
npm run build
        ↓
Static Files
        ↓
Nginx Container
Backend Dockerization

The backend container:

Installs dependencies
Runs Express server
Exposes port 5001
☸️ Kubernetes Deployment

The application was deployed using Kubernetes with Minikube.

Kubernetes Components Used
1. Deployments

Used to manage pods and container lifecycle.

Created deployments:

frontend deployment
backend deployment
mysql deployment
2. Services
Frontend Service
Type: NodePort
Exposes frontend externally
Backend Service
Type: ClusterIP
Internal communication only
MySQL Service
Type: ClusterIP
Internal database communication
3. PersistentVolumeClaim (PVC)

A PersistentVolumeClaim was implemented for MySQL storage.

Purpose:

Preserve task data
Prevent data loss after pod/container restart
Ensure persistent storage

Without PVC:

Task data is lost after pod restart

With PVC:

Data survives:
Minikube restart
Pod recreation
Laptop shutdown
