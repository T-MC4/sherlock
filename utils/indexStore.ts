import { OpenAI } from "../utils/openAI";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { getIndexNamePrompt, getPriorityDecisionPrompt, getAnswerPrompt } from "./prompts";
import jsonData from "../scripts/docs.json";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain, ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

dotenv.config();
const key = process.env.OPENAI_API_KEY;
const inMemorySearchURL =
  process.env.IN_MEMORY_SEARCH_URL || "https://sherlock-inmemorysearch-production.up.railway.app";

export async function getIndexName(question: string): Promise<string | undefined> {
  // Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
  let sanitizedQuestion: string = question.trim().replace(/\n/g, " ");

  // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model, and max token value
  const chain = new LLMChain({
    prompt: getIndexNamePrompt(jsonData),
    llm: new ChatOpenAI({
      openAIApiKey: key,
      modelName: "gpt-4",
      temperature: 0,
      maxTokens: 2048,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            process.stdout.write(token);
          },
        },
      ],
    }),
  });

  const ans = await chain.call({
    question: sanitizedQuestion,
  });
  console.log(ans);

  const regex = /(?<=Action:\s)[\w-]+/;
  const match = ans?.response?.match(regex);
  return match ? match[0] : undefined;
}

export async function getPriorityDecision(
  kpiJsonData: Record<string, number>
): Promise<{ high_constraint: string; other_constraints: string[] } | undefined> {
  // Create chain and set LLM options
  const chain = new LLMChain({
    prompt: getPriorityDecisionPrompt(kpiJsonData),
    llm: new ChatOpenAI({
      openAIApiKey: key,
      modelName: "gpt-4",
      temperature: 0,
      maxTokens: 2048,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            process.stdout.write(token);
          },
        },
      ],
    }),
  });
  const ans = await chain.call({
    input: "Below is the answer you have written based on this while adhering to all the guidelines I gave you:",
  });
  console.log(ans);
  console.log(ans.response);
  if (ans) return JSON.parse(ans.response);
  else return undefined;
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

export async function getAnswer(
  context: any[],
  question: string,
  priorityConstraint: string,
  actionSteps: string
): Promise<string | undefined> {
  // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model, and max token value
  const chain = new ConversationChain({
    memory: new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    }),
    prompt: getAnswerPrompt(context, priorityConstraint, actionSteps),
    llm: new ChatOpenAI({
      openAIApiKey: key,
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      maxTokens: 2048, // SET A PRE-DETERMINED LENGTH BEFORE COMPLETION CUTS OFF
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            process.stdout.write(token);
            // dataCallback(token);
          },
        },
      ],
    }),
  });

  const ans = await chain.call({
    input: question,
  });

  console.log(ans.response);

  return ans.response;
}
