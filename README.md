# Icelandic Sign Language Data Collection Project

## Project Overview

This project aims to collect and manage video data of Icelandic sign language to create a large, open dataset. The dataset will be valuable for AI experts developing tools such as speech-to-sign and sign-to-speech translation systems. It is designed for use by the Icelandic deaf community, researchers, and AI engineers, empowering them to contribute and utilize video data to advance sign language technology.

_Funded by the Icelandic innovation fund (Rannís) and is built in collaboration with the communication center._

## Key Features:

- **Video Recording**: Signers can record themselves signing Icelandic sign language, one video per gloss.
- **Video Rating**: Users can rate and comment on videos, to ensure high data quality.
- **Data Exploration**: View and search the collected video data.
- **Open Dataset**: Contributions help grow the open-access dataset for Icelandic sign language.

## Technologies:

- **Frontend**: React with Tailwind CSS
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Containerization**: Docker containers for development
- **Hosting**: Heroku (for production deployment)

---

## Getting Started with Development

Follow these instructions to set up your local development environment.

### Prerequisites

Ensure that you have the following installed:

- **Docker**
- **Git**
- **Make** (not a must)

### Step 1: Clone the Repository

```bash
git clone git@github.com:Oren93/sign_lang_data.git
cd sign_lang_data
```

### Step 2: Set up Docker

You’ll use Docker to spin up all services (frontend, backend, and database) in isolated containers.

- **To build and start all services**:
  ```bash
  make all
  ```
  Or alternatively:
  ```bash
  docker-compose up --build -d
  ```

This will set up the following services:

- **Frontend**: React application running on `http://localhost:3001`
- **Backend**: FastAPI server running on `http://localhost:8000`
- **Database**: PostgreSQL instance on port `5432`

### Step 3: Run the Frontend in Development Mode

For frontend development, run the following command to start the React development server:

```bash
make dev
```

Or:

```bash
docker exec -it sign_ui npm start # can add -d flag for detuch mode, to keep using the same terminal instance
```

This will spin up all services and run the frontend in development mode. The app will be accessible at `http://localhost:3001`.

### Step 4: Building the Frontend

Once you are happy with the result you should build the frontend for production and move the static files to the backend:

```bash
make build
```

Or manually copy the commands described in `Makefile` under `build`

This will:

- Build the frontend
- Move the static files to the backend directory to be served by the backend
- Stage the new files in Git for the backend repository

The FastAPI backend with the newly built static files will be accessible at `http://localhost:8000`. API documentation is available at `http://localhost:8000/docs` (Swagger UI).

### Step 5: Make a Pull Request

After you are satisfied with the results, you can commit and push your branch, then open a new pull request. Please write detailed information about the changes, and if a known error exists, add it to the issues page of the repo.

```bash
git checkout -b <new-branch-name>
git commit -m "commit message"
git push
```

## Troubleshooting

There is a known issue, that in the first time setting up the docker environment, the database isn't set up. To manually activate the database migrations, follow this steps:

- Run make `make back_bash` or `docker exec -it sign_backend bash` to go into the bash of the backend container
- Inside the backend bash run `python cli.py migrate` to manually trigger the migration

Sometimes you may want to reinstall all node modules and start fresh. To do this go to the UI container bash, remove the `node_modeules` directory and `package-lock.json` and install everything againg:

```bash
make ui_bash
rm -rf node_modules
rm package-lock.json
npm install
npm start
```

## Additional information

### Database Access

A PostgreSQL database is provided in the development environment. You can access the database directly using:

```bash
make db_bash
```

This opens a PostgreSQL shell where you can query the database.

### Access Logs

You can view logs for each service using the following commands:

- Frontend logs: `make ui_logs`
- Backend logs: `make back_logs`
- Database logs: `make db_logs`

_Note: Since the UI container does no longer run the `npm start` on start up, the logs are irrelevant, to get the logs you should run the dev mode without the `-d` flag_

---

## Contribution

If you're contributing to the project, you can fork the repository and make a PR.

If you haven't done so yet, please contact hafsteine@hi.is to let us know that you're joining the coding effort.

### Tasks to help with

- An important task at the moment is to review the content and correct it if needed, both in Icelandic and English.
- There are open issues to address, check out the issues tab.
  A
  dditionally, there are feature ideas waiting to be implemented, which can be found here:

- **YouTube integration:** The project should have its own YouTube account. Every video uploaded should be immediately added to YouTube from the backend, and the URL should be stored in the database. The videos will not be accessible on YouTube except by using that URL. With this change, updates are also needed to the video overview and video rating pages to play the video directly from YouTube within the website.
- **Export data:** Currently, users can view the recorded videos. However, since the goal is to create an open dataset, we need an easy way to download the data. There should be a button that runs a script to gather all relevant information from the database excluding private information and provides a script to download all the sign videos from YouTube directly.
- **Project Email:** Since, in the first step, you created a project YouTube page, you must have created a Google account. This account can be used for the website's Contact Us page. It needs to be properly set up with the contact form.
- **Settings page:** A standard page where users can change their password, email, and perhaps even district and language, in case the website's goal expands to collect multiple sign languages.
- **Get creative:** Any new ideas you come up with are welcome.
- **Deploy:** Find sponsors to help deploy this website.
