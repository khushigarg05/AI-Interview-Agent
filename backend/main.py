from fastapi import FastAPI


app = FastAPI(
    title="InterviewIQ AI"
)


@app.get("/")
def home():

    return {
        "status":"running",
        "project":"InterviewIQ AI"
    }