import openai
import os
from dotenv import load_dotenv
# Initialize the OpenAI API client
load_dotenv()
openai.api_key =os.getenv('OPENAI_API_KEY')
def chat_with_gpt(prompt):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",  # Use "gpt-3.5-turbo" for GPT-3.5
        prompt=prompt,
        max_tokens=150,  # Adjust as needed
        temperature=0.7,  # Controls the creativity of the responses
        top_p=1.0,        # Controls the diversity of the responses
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

def main():
    print("Chatbot is running... Type 'exit' to end.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break

        # Create the prompt with user input
        prompt = f"User: {user_input}\nAI:"

        # Get the chatbot's response
        response = chat_with_gpt(prompt)
        
        print(f"AI: {response}")

if __name__ == "__main__":
    main()
