FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app

RUN mkdir -p /app/storage/usuarios /app/storage/prendas /app/storage/historial

EXPOSE 8000

CMD ["sh", "-c", "sleep 10 && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"]