import OpenAI from "openai";

export default class Summariser {
    readonly client: OpenAI
    constructor(client: OpenAI) {
        this.client = client;
    }
    async summarise(message: String): Promise<string> {
        const response = await this.client.chat.completions.create({
            messages: [{ role: "user", content: "Simplify the language used. please remove any salutations & sign-offs from the start & end. make the summary EXTREMELY brief:\n" + message }],
            model: "gpt-3.5-turbo"
        });
        console.log(response.choices[0])
        return response.choices[0].message.content!
    } 
}
