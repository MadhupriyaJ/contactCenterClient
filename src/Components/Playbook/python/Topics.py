import time
import os
import json
from openai import AzureOpenAI
from dotenv import load_dotenv

# Initialize Azure OpenAI client
client = AzureOpenAI(
    azure_endpoint='https://11234.openai.azure.com/',
    api_key='382dOzcfVVReqzAl2Rd38wBSoC3UaOaXI2QR8Nk580dXqseuJABtJQQJ99AKACYeBjFXJ3w3AAABACOG7zP9',
    api_version="2024-05-01-preview"
)

# Create the assistant
assistant = client.beta.assistants.create(
    model="gpt-4o",  # Replace with model deployment name.
    instructions=(
         "You are an expert in topic modeling and text analysis. Analyze the following texts, one by one, and identify the main topics for each. For each text, provide a list of 1-3 topics without a description. Texts: {text_1}, {text_2}, {text_3}, ... {text_n}"
    ),
    # tools=None,
    # tool_resources={},
    temperature=1,
    top_p=1
)

# Topics.py
def process_topic_modeling(text_documents):
    results = []
    attempt = 0
    max_retries = 3
    success = False

    while attempt < max_retries and not success:
        try:
            print(f"Processing {len(text_documents)} documents for topic modeling. (Attempt {attempt + 1})")
            
            # Prepare inputs
            inputs = [{"fileName": doc["fileName"], "transcription": doc["transcription"]} for doc in text_documents]
            print(f"Inputs for processing: {json.dumps(inputs, indent=2)}")
            
            # Create a thread for topic modeling
            thread = client.beta.threads.create()

            # Send documents' transcriptions
            client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=json.dumps({"textDocuments": [doc['transcription'] for doc in text_documents]})
            )

            # Run assistant processing
            run = client.beta.threads.runs.create(
                thread_id=thread.id,
                assistant_id=assistant.id
            )

            while run.status in ['queued', 'in_progress', 'cancelling']:
                time.sleep(1)
                run = client.beta.threads.runs.retrieve(
                    thread_id=thread.id,
                    run_id=run.id
                )

            if run.status == 'completed':
                # Retrieve the assistant's response
                messages = client.beta.threads.messages.list(thread_id=thread.id)
                assistant_response = next(
                    (message.content[0].text.value for message in messages.data if message.role == 'assistant'),
                    {}
                )
                print("Assistant response:", assistant_response)  # Debugging
                
                # Process response into a list
                topics_list = assistant_response.split("\n") if isinstance(assistant_response, str) else assistant_response
                topics_list = [topic.split(": ", 1)[1] if ": " in topic else topic for topic in topics_list]

                # Validate lengths
                if len(topics_list) != len(text_documents):
                    raise ValueError("Mismatch between response topics and input documents.")

                # Map topics to files
                for i, doc in enumerate(text_documents):
                    results.append({
                        "fileName": doc["fileName"],
                        "topics": topics_list[i].split(", ") if i < len(topics_list) else ["No topics identified"]
                    })

                success = True
            elif run.status == "requires_action":
                results.append({"error": "Assistant requires further action."})
                success = True
            else:
                print(f"Run failed with status: {run.status}")
                results.append({"error": f"Run failed. Status: {run.status}"})
                success = True

        except Exception as e:
            print(f"Error on attempt {attempt + 1}: {e}")
            attempt += 1
            if attempt == max_retries:
                results.append({"error": f"Failed after {max_retries} attempts: {str(e)}"})

    return results
