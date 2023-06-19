import fs from "fs";
import fetch from "node-fetch";
import { CustomDocxLoader } from "../utils/docxLoader";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const inMemoryURL = process.env.IN_MEMORY_SEARCH_INDEX_URL || "http://sherlock-inmemorysearch-production.up.railway.app";
const apiURL = inMemoryURL + "/api/json";

interface JsonData {
  path: string;
  indexName: string;
  isUsed?: boolean;
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}
const run = async () => {
  let jsonData: JsonData[] = [];
  try {
    // Parse the JSON data
    jsonData = JSON.parse(fs.readFileSync(__dirname + "/docs.json", "utf8"));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  for (let index in jsonData) {
    try {
      const { path, indexName, isUsed = false } = jsonData[index];

      if (isUsed) continue;

      const loader = new CustomDocxLoader(path);

      const rawDocs = await loader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);

      let sentData = docs.map((doc) => ({
        question: doc.pageContent.replace(/\n/g, " "),
        answer: "",
        indexName,
      }));

      console.log(sentData)

      let newSentData = chunkArray(sentData, 128);
      for (let i = 0; i < newSentData.length; i++) {
        const start = performance.now();
        await fetch(apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSentData[i]),
        });
        console.log("time taken", performance.now() - start);
      }

      jsonData[index].isUsed = true;

      fs.writeFileSync(
        __dirname + "/docs.json",
        JSON.stringify(jsonData, null, 2)
      );
    } catch (error) {
      console.log("error", error);
      jsonData[index].isUsed = false;

      fs.writeFileSync(
        __dirname + "/docs.json",
        JSON.stringify(jsonData, null, 2)
      );
      throw new Error("Failed to ingest your data");
    }
  }
};

(async () => {
  await run();
  console.log("ingestion complete");
})();
