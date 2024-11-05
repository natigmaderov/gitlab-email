
---

# Pipeline Notification Service

This service listens for webhook events and sends customized email notifications for pipeline status updates using **Node.js**, **Express**, and **Nodemailer**. 

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Configuration](#configuration)
- [License](#license)

## Features

- Listens for incoming webhook events with pipeline status details.
- Sends email notifications with customizable HTML content based on pipeline status.
- Color-coded headers based on status (e.g., success, failed, canceled).

## Project Structure

```plaintext
project/
├── app.js               # Main application entry point
├── config/
│   └── mailconfig.js    # Mail configuration settings
├── controllers/
│   └── emailController.js # Controller handling the email sending logic
├── routes/
│   └── webhook.js       # Route for handling /webhook requests
├── utils/
│   ├── emailTemplate.js # Helper for creating the HTML email template
│   └── emailLists.js    # Reads and exports email lists
├── emailLists.json      # JSON file with email lists
└── README.md            # Documentation for the project
```

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- A configured SMTP email server (e.g., Gmail, Outlook)

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure mail settings:**

   In `config/mailconfig.js`, set up the SMTP configuration with your email provider.

4. **Set up email lists:**

   Create an `emailLists.json` file in the project root with the following structure to manage different recipient lists:

   ```json
   {
     "key1": ["recipient1@example.com", "recipient2@example.com"],
     "key2": ["recipient3@example.com"]
   }
   ```

5. **Run the application:**

   ```bash
   npm start
   ```

   By default, the application runs on `http://localhost:3003`.

## Environment Variables

- `PORT`: Port on which the server will run (default: `3003`).

## Usage

### Endpoints

- **POST** `/webhook/:key`

   This endpoint receives pipeline status data and sends an email notification to the recipient list associated with the specified `key`.

   #### Request Parameters:
   - `key` (path parameter): Key to identify the list of recipients.

   #### Request Body Example:
   ```json
   {
     "project": {
       "name": "Example Project",
       "namespace": "example-namespace",
       "web_url": "https://gitlab.example.com/project-url"
     },
     "object_attributes": {
       "id": 123,
       "ref": "main",
       "status": "success",
       "detailed_status": "Pipeline succeeded"
     },
     "user": {
       "name": "John Doe"
     }
   }
   ```

## Configuration

### `config/mailconfig.js`

Define SMTP email configuration for **Nodemailer**. Example configuration:

```javascript
module.exports = {
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
};
```

### `utils/emailLists.js`

This file reads the email lists from `emailLists.json`. Make sure this file has the proper JSON structure and includes a list of email recipients associated with different keys.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

