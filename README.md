# Icelandic Sign Language Data Collection Project

**This project aims to build a user friendly platform for sign language data collection.**

_Funded by the Icelandic innovation fund (Rannís) and is built in collaboration with the communication center._

We first focus on the Icelandic deaf community, but we aim to bring it to other countries, regions and languages later on.

---

## Weekly Meeting Notes

### 27/05/2024

We met with representatives of the communication center, and a deaf programmer, Árni, who will likely join us for two months. We discussed the best approaches to collect data, one way is the platform we are building, another way, which they take charge with, is to collect existing data from many different sources, including children interactive books, news with sign caption, and other sources traced back to 1996.

We then discussed possible features we would like to have on our website:

**Backend**

- **User authenthication** - sign up, log in, profile settings.
- **Design a correctly structured database:**
  - **Users table** - Login info, hashed password, Email...
  - **Profiles** - Age, language, region, deaf or not, and other factors that may influence the language.
  - **Glosses** - List of glosses (words/patterns) that we would like to record, ideally ordered by popularity.
  - **Recordings** - Metadata about the recorded videos.
  - **Score** - Counting how many videos a user has uploaded and how many videos they have rated (two separate scores on their profile).
  - **Leaderboard** - Showing activity with respect to the scores above (need to check if this is something people want to see though).
  - **Badges** (low priority) - Gamified experience, to encourage users to contribute.
- **Vocabulary** - Build a dictionary of possible glosses, prioritize by popularity.
- **Video Storing** - Explore the best approach for storing the videos.
- **Uploading glosses** - Give the user the ability to upload a .csv file of glosses. Any new glosses in the file would then be added to the database.

**Frontend**

- **UI with good UX:**
  - **Instant recording** - Hassle free, minimal clicks to start recording, countdown after press strart.
  - **Preview** - Possibility to play the recorded video before submitting.
  - **Smooth transition** - Allow instantly to move to the next gloss after submitting.

Lastly we came up with a very short to do list for the coming week

**To Do**

- Prioritize feature
- Start coding the most important features.

### 03/06/2024

Oren is working on authentication. Joao was away, but is now going to work on glosses and internationalization. The aim is to do everything in English and then translate it to Icelandic.

Oren is away next week and Joao is back then. We aim for a demo meeting in two weeks.

### 25/06/2024

We discussed the data model. We need to add models for videos and a table that connects a video to a user and a gloss. We might also want to consider having a rating table, but that would be something extra.

The user registration and authentication is working, but needs a bit of polishing. Oren mentioned that he needs to figure out which user is sending a request in the backend when the user is logged in.

Video uploading works, but the video is not associated with a user yet.

The scraping is still ongoing.

We discussed how to prioritize the glosses and we decided it might be reasonable to give users the ability to mark a gloss as important, meaning it should be prioritized.

We also discussed the project complexity. Currently, it is organized as three containers and we discussed simplifying to be a single container. We further discussed the possibility of serving templates through fastapi instead of having a separate react front-end.

### 17/07/2024

- We changed the name conventions for the videos. In the future, we want to upload the videos automatically to Youtube.
- We need to add the gloss to the video as well.
- Tried moving to one docker container, caused problems so we have three containers.
- Decided to keep on using React.
- Work on video evaluation has started.
- Migration system for database.

Next steps:
- Deploy the system (highest priority).
- Finish video evaluation.
- Consider how to upload videos to youtube (unlisted).

Things that need to be done before the project ends:
- Saving videos, who did what and what glosses are covered.
- The UI must look better.
- Should deploy the system (check Heroku) and get feedback from Árni.

### 24/07/2024

- We discussed deployment. The aim is to use Heroku without containers.
- We need to serve the frontend from the backend when the site is deployed. This means that we build the front-end (using npm build) and configure the backend to serve the static resources generated as a result.
- On Heroku, we need to add a resource to the project (Heroku Postgres). We need to configure the project such that for local development, we use the database container, but in production, we use the Heroku Postgres database.

- Joao pushed updates for the rating system and now he's working on the front-end and he's connecting it to the backend.
- We talked about using DaisyUI for the front-end: https://daisyui.com/
- Oren tried to do the Youtube integration, but it was not successful so far.
- We also discussed adding an export functionality. We decided to add an export button (under the 'about' section of the page or another section called 'Data export'), which is accessible to logged in users. We will log what users have exported the data. We only export the youtube links, the gloss, and the signer ID. Possibly, we might want to export more information (rating?).
