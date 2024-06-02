# KaziCode - DataCurve Take Home

![KaziCode](https://github.com/UmerKazi/kazicode-dc-take-home/blob/main/readme_images/app_ss.png?raw=true)

## Overview

This project is a code execution website where users can write Python3 code in an editor, execute it, and see the results. Users can also submit their code, which validates the execution, and then persists the code and its output in a database. The website is built with modern web technologies and follows best practices for security and code organization. The entire project is dockerized, streamlining the local hosting and development procedure, all you need is one command to get the project running!

## Features

- **Code Editor:** Users can write Python 3 code using a built-in code editor.
- **Code Execution:** Code can be executed to see results immediately.
- **Code Submission:** Validates the execution and persists the code and output in a database.
- **Security:** User-submitted code is executed in a secure, isolated environment to prevent malicious actions.

## Tech Stack

### Frontend

- **Framework:** `Next`
- **Language:** `TypeScript`
- **Styling:** `Tailwind CSS`
- **Animations:** `framer-motion`
- **Icons:** `@tabler/icons-react`
- **Code Editor:** `CodeMirror`
- **Containerization:** `Docker`

### Backend

- **Framework:** `FastAPI (Python3)`
- **Database:** `PostgreSQL (Dockerized)`
- **Code Execution:** `Isolated Docker Container (secure_code_exec)`

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node
- Yarn or npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/UmerKazi/kazicode-dc-takehome-main.git
   cd kazicode-dc-take-home-main
   ```

2. **Build the project:**
   ```bash
   docker-compose up --build
   ```

- **Access the application:** Open your browser and navigate to `http://localhost:3000`.
- **Write and execute code:** Use the code editor to write Python 3 code and click "Test Code" to see the results.
- **Submit code:** Click "Submit" to validate and save your code and its output in the database.

## Security Considerations

- The backend abstracts code execution into a separate Docker container (`secure_code_exec`) to prevent malicious code from affecting the main application.
- User-submitted code is executed in an isolated environment to mitigate security risks.
