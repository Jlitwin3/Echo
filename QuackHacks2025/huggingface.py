from transformers import pipeline

# Specify a model explicitly
sentiment_pipeline = pipeline(
    "question-answering", 
    model="microsoft/phi-4", 
    revision="main"  # Optional: specify a branch, tag, or commit hash
)

# Use the pipeline
result = sentiment_pipeline("What is the capital of France?")
print(result)

