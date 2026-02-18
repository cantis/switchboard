FROM python:3.12-slim

WORKDIR /app

# Install uv (simple approach)
RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock /app/
RUN uv sync --frozen --no-dev

COPY src/ /app/src/

EXPOSE 8000
CMD ["uv", "run", "uvicorn", "src.switchboard_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
