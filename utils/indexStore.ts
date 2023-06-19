import { OpenAI } from "../utils/openAI";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { getIndexNamePrompt, getPriorityDecisionPrompt, getAnswerPrompt } from "./prompts";
import jsonData from '../scripts/docs.json'

dotenv.config();
const key = process.env.OPENAI_API_KEY || "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";
const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
const inMemorySearchURL = process.env.IN_MEMORY_SEARCH_URL || "https://sherlock-inmemorysearch-production.up.railway.app";

export const openAI = new OpenAI(key);

export async function getIndexName(question: string): Promise<string | undefined> {

    // Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
    let sanitizedQuestion: string = question.trim().replace(/\n/g, " ");;

    // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model, and max token value
    const ans = await openAI.generateText(
        getIndexNamePrompt(jsonData, sanitizedQuestion),
        model, 800, 0);

    const regex = /(?<=Action:\s)[\w-]+/;
    const match = ans?.match(regex);
    return match ? match[0] : undefined;
}

export async function getPriorityDecision(kpiJsonData: Record<string, number>): Promise<{ high_constraint: string, other_constraints: string[] } | undefined> {
    let prompt = getPriorityDecisionPrompt(kpiJsonData);
    const ans = await openAI.generateText(
        prompt,
        model, 800, 0);
    if (ans)
        return JSON.parse(ans);
    else
        return undefined;
}

export async function getContextFromIndex(question: string, indexing: string): Promise<any[] | undefined> {
    let url = inMemorySearchURL + "/api/match";
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sentence: question,
            indexName: indexing,
            neighbors: process.env.NN || 1,
        }),
    });
    return res.json();
}

export async function getAnswer(context: any[], question: string, priorityConstraint: string, actionSteps: string): Promise<string | undefined> {
    // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model, and max token value
    const ans = await openAI.generateText(getAnswerPrompt(context, question, priorityConstraint, actionSteps),
        model, 800, 0);
    return ans;
}
