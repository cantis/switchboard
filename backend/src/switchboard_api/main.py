from fastapi import FastAPI

app = FastAPI(
    title="Switchboard API",
    root_path="/api",
    version="0.1.0",
    description="## Evan's App Switchboard API\n Switching to different apps and websites with ease. <br> <br> EAY February 2026",
    authors=[{"name": "Evan Young", "email": "cantis@gmail.com"}],
)


@app.get("/health", tags=["Utility"], summary="Health Check")
async def health() -> dict[str, str]:
    """Health check endpoint to verify that the API is running."""
    return {"status": "ok"}
