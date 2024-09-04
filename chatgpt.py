import openai

openai.api_key = "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"

def chat_with_gpt(prompt):
    response = openai.Completion.create(
        model = "gpt-3.5-turbo",
        messages = [{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

if __name__ ==  "__main__":
    while True:
        user_input = input("You: ")  
        if user_input.lower() in ["quit","exit","bye"]:
            break

        response = chat_with_gpt(user_input) 
        print("Chatbot:",response)