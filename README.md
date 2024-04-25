# Ollama-FastAPI-React-F7-Docker Chat Application

This project provides a simple template for setting up a chat application using FastAPI and websockets for the backend, and React with Framework7 for the frontend. It is designed to be fully local and containerized using Docker, leveraging the Ollama language model service with the Mistral model for natural language understanding tasks.

## Features

- **Backend**: FastAPI with WebSocket support for real-time communication.
- **Frontend**: React application using Framework7 for UI components.
- **Language Model**: Utilizes Ollama with the Mistral model, which can be configured to use other models from the Ollama library.
- **Docker**: Fully containerized setup including the Ollama service.

## Prerequisites

Before you begin, ensure you have Docker installed on your system. You can download it from [Docker's website](https://www.docker.com/products/docker-desktop).

## Getting Started

To get the application up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/chigwell/Ollama-FastAPI-React-F7-Docker-Chat.git
   cd Ollama-FastAPI-React-F7-Docker-Chat
   ```

2. Start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

This command will build the Docker images and start all the services defined in the `docker-compose.yml`. The backend will be accessible on port 80, and the frontend will be available on port 3000.

## Usage

Open your web browser and navigate to `http://localhost:3000` to access the frontend. The backend and Ollama services will be running in the background, handling requests and processing natural language inputs.

## Configuration

To change the Ollama model, update the `OLLAMA_BASE_URL` in the backend `main.py` file  and `start-ollama.sh` file to point to a different model URL found at [Ollama Library](https://ollama.com/library).

## Improvements

The current setup does not include chat history or advanced chat features, but it can be easily expanded based on your needs. Contributions and improvements are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
