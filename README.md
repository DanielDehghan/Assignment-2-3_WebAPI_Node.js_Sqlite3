# Web API with SQLite in Node.js

## Base URL
http://localhost:3000/api/greeting/


## Endpoints

### 1. `/greet` (POST)
#### Description:
This endpoint receives a greeting request and returns the appropriate greeting message based on the `timeOfDay`, `language`, and `tone`.

#### Request Body (JSON):
```json
{
  "timeOfDay": "Morning",
  "language": "English",
  "tone": "Casual"
}

 Example Response (JSON):

{
  "greetingMessage": "Morning, buddy!"
}

 Errors:

    404: "Greeting not found" if no matching greeting is found.
    500: "Database error" for any unexpected issues.

 2. /getAllTimesOfDay (GET)
 Description:

Returns a list of all available times of the day from the database.
 Example Response (JSON):

[
  "Morning",
  "Afternoon",
  "Evening"
]

 3. /getSupportedLanguages (GET)
 Description:

Returns a list of all supported languages from the database.

 Example Response (JSON):
[
  "English",
  "French",
  "Spanish"
]