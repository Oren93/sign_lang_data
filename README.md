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
