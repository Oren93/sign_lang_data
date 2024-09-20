# Variables
COMPOSE_FILE = docker-compose.yml

# Targets
.PHONY: frontend backend database all dev build stop_ui stop_back stop_db

# ------------- Build -------------
# Build frontend service
ui:
	docker-compose -f $(COMPOSE_FILE) up --build -d frontend

# Build backend service
back:
	docker-compose -f $(COMPOSE_FILE) up --build -d backend

# Build database service
db:
	docker-compose -f $(COMPOSE_FILE) up --build -d database

# Build and start all services
all:
	docker-compose -f $(COMPOSE_FILE) up -d --build

# Start all services with frontend in development mode
dev:
	docker-compose -f $(COMPOSE_FILE) up -d
	docker exec -it sign_ui npm start

# Build frontend and move static files to backend
build:
	docker-compose -f $(COMPOSE_FILE) up -d
	docker exec -it sign_ui npm run build
	rm -rf backend/build
	mv frontend/build backend/.
	git add backend/build

# ------------- Stop --------------
# Stop frontend service
stop_ui:
	docker-compose -f $(COMPOSE_FILE) stop frontend

# Stop backend service
stop_back:
	docker-compose -f $(COMPOSE_FILE) stop backend

# Stop database service
stop_db:
	docker-compose -f $(COMPOSE_FILE) stop database

# ------------- Bash --------------
# Go into ui container
ui_bash:
	docker exec -it sign_ui bash

# Go into backend container
back_bash:
	docker exec -it sign_backend bash

# Go into database container
db_bash:
	docker exec -it sign_db bash -c "psql -d \$${POSTGRES_DB} -U \$${POSTGRES_USER}"

# ------------- Logs --------------
ui_logs:
	docker logs -f sign_ui

# Go into backend container
back_logs:
	docker logs -f sign_backend

# Go into database container
db_logs:
	docker logs -f sign_db
