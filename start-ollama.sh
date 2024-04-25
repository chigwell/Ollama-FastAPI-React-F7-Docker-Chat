#!/bin/sh

MODEL_DIR="/root/.ollama/models/manifests/registry.ollama.ai/library/mistral"

ollama serve &

echo 'Waiting for Ollama service to start...'
sleep 30

if [ ! "$(ls -A $MODEL_DIR)" ]; then
    echo 'Mistral model not found, downloading...'
    ollama pull mistral:latest
    echo 'Model downloaded successfully.'
else
    echo 'Mistral model already present, skipping download.'
fi

# Keep the container running
tail -f /dev/null
