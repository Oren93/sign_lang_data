# Variables
COMPOSE_FILE = docker-compose.yml

# Targets
.PHONY: frontend backend database all

# ------------- Build -------------
# Build frontend service
ui:
	docker-compose -f $(COMPOSE_FILE) build frontend

# Build backend service
back:
	docker-compose -f $(COMPOSE_FILE) build backend

# Build database service
db:
	docker-compose -f $(COMPOSE_FILE) build database

# Build and start all services
all:
	docker-compose -f $(COMPOSE_FILE) up -d --build


# ------------- Bash --------------
# Go into ui container
ui_sh:
	docker exec -it sign_ui sh

# Go into backend container
back_sh:
	docker exec -it sign_backend bash

# Go into database container
db_sh:
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
