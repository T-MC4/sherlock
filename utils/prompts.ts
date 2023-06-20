import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";

export function getIndexNamePrompt(jsonData: any[]) {
  let promptString = "Answer the following questions as best you can. You have access to the following tools:";
  let indexes = "";
  for (let index in jsonData) {
    const { indexName, description } = jsonData[index];
    promptString += `\n\n${indexName}: ${description}`;
    indexes += indexName + ",";
  }
  indexes = indexes.slice(0, -1);
  promptString +=
    `\n\nUse the following format in your response:` +
    `\nQuestion: the input question you must answer` +
    `\nThought: you should always think about what to do` +
    `\nAction: the action to take, should be one of [${indexes}]` +
    `\nNow respond with the only Action:` +
    `\nBegin!` +
    `\nQuestion: {question}` +
    `\nThought:.`;

  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(""),
    HumanMessagePromptTemplate.fromTemplate(promptString),
  ]);
}

export function getPriorityDecisionPrompt(kpiJsonData: Record<string, number>) {
  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(`Your job is now to act as my business analyst. I'm going to provide you with a set of current metrics in the business, you are going to evaluate the metrics given with the objective of finding constraints and then identify the #1 focus point based on the order of priority in the list I provide.
            
    Each category has a threshold of what is considered a constraint.
        
    The Metrics You Are Given:
    Contacted Leads - ${kpiJsonData["Contacted Leads"]}
    Responses - ${kpiJsonData["Responses"]}
    Appointments Set - ${kpiJsonData["Appts Set"]}
    CPM - ${kpiJsonData["CPM"]}
    CTR - ${kpiJsonData["CTR"]}
    Opt-In Rate - ${kpiJsonData["Opt-in Rate"]}
    Ad Spend - ${kpiJsonData["Ad Spend"]}
    Leads - ${kpiJsonData["Leads"]}
    Dials - ${kpiJsonData["Dials"]}
    Pickups - ${kpiJsonData["Pickups"]}
    Sets - ${kpiJsonData["Sets"]}
    DQ's - ${kpiJsonData["DQ's"]}
    Shows - ${kpiJsonData["Shows"]}
    Closes - ${kpiJsonData["Closes"]}
    PiF's - ${kpiJsonData["PIF's"]}
    Pay Plans - ${kpiJsonData["Pay Plans"]}
    Cash Collected - ${kpiJsonData["Cash"]}
    
    Based on the inputs above, discover constraints based on the following criteria of each
    category:
    
    Category: Organic Output
    If “responses” is more than 10% of the value given for “contacted leads” AND
    “appointments set” is more than 30% of the value given for “responses” AND “Contacted
    Leads” is less than “250” rule as Constraint
    If “Contacted Leads” is 0, do not evaluate category “Organic Output”
    
    Category: Organic Response Rate
    If “responses” is less than 10% of the value of “contacted leads” rule as Constraint
    
    Category: Organic Set Rate-
    If “appointments set” is less than 30% of the value of “responses” rule as Constraint
    
    Category: CPM's
    If “CPM” is more than $100 rule as Constraint
    
    Category: CTR
    If “CTR” is less than 1.5% rule as Constraint
    
    Category: Opt-In Rate
    If “Opt-In Rate” is less than 10% rule as Constraint
    
    Category: Setter Output
    If “Dials” is less than 200% of “Leads”, rule as Constraint
    
    Category: Pickup-To-Set Rate
    If “Sets” is less than 10% of “pickups”, rule as Constraint
    
    Category: DQ Rate
    If “DQ's” is more than 30% of the value of “pickups”, rule as Constraint
    
    Category: Show Rate
    If “Shows” is less than 70% of the value give for “sets”, rule as constraint
    
    Category: Close Rate
    If “Closes” is less than 25% of the value given for “shows”, rule as constraint
    
    Category: PiF Rate
    If “PiF's” is less than 30% of the value given for “closes”, rule as constraint
    
    Category: Collection Rate
    If “PiF's” PLUS “Pay Plans” is less than 75% of the value given for “closes”, rule as
    constraint
    
    Category: Return On Ad Spend
    If “Cash Collected” is not equal to or greater than the value given for “ad spend”, rule as
    constraint
    
    Category: Cost Per Lead
    If “Ad Spend” divided by the value of “leads” is more than $30, rule as constraint
    
    The following is the list of categories in order of importance:
    1. Setter Output Is Too Low
    2. Organic Output Is Too Low
    3. Pickup-To-Set Rate Is Too Low
    4. Show Rate Is Too Low
    5. Close Rate Is Too Low
    6. DQ Rate Is Too High
    7. Organic Response Rate Is Too Low
    8. Organic Set Rate Is Too Low
    9. Cost Per Lead Is Too High
    10. CPM's Are Too High
    11. CTR Is Too Low
    12. Opt-In Rate Is Too Low
    13. PiF Rate Is Too Low
    14. Collection Rate Is Too Low
    15. Return On Ad Spend Is Too Low
    
    Now respond with the following message only customizing the areas in the following json format:
    (
      "high_constraint": [Highest Numbered Constraint Identified],
      "other_constraints": [List Of Other Identified Constraints In Order Of Importance In Array Form]
    )`),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
}

export function getAnswerPrompt(context: any[], priorityConstraint: string, actionSteps: string) {
  let totalContext = "";
  // Transfer context from {question,answer} => string
  context.forEach(({ question }) => {
    totalContext += `\n ${question}`;
  });

  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `you are a hyper emotionally intelligent ai. Your client is a business owner. Your ONE job is to keep the client focused on their highest priority constraint:
        ${priorityConstraint}
        
        If the client asks you a question, answer it using this context:
        
        BEGINNING OF CONTEXT
        ${totalContext}
        END OF CONTEXT

        Clients often ask questions unrelated to the highest priority constraint. In your response to the question, after answering their main question with emotional intelligence, ALWAYS make sure to mention the action steps for the highest priority constraint:
        
        ${actionSteps}

        The client will now say something about the constraints above or the action steps or ask you questions - respond in order to be in full alignment with the instructions.`
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
}
