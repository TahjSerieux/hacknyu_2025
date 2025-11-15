import express from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai';
const router = express.Router();
dotenv.config()

router.get("/get_conversation", async (req, res) => {
  console.log("Been called")
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a tutor. Answer the question and format your response as a JSON object with "nodes" and "edges" arrays suitable for React Flow.

React Flow node format:
- id (string): unique identifier
- position (object): { x: number, y: number }
- data (object): { label: string }
- type (string, optional): 'input', 'output', 'default'

React Flow edge format:
- id (string): unique identifier (e.g., 'n1-n2')
- source (string): id of source node
- target (string): id of target node
- type (string, optional): 'step', 'straight', 'smoothstep'
- label (string, optional): edge label

Return ONLY a JSON object with this structure:
{
  "nodes": [...],
  "edges": [...]
}

Do NOT include any markdown, code blocks, or extra text.`
        },
        {
          role: 'user',
          content: 'Are semicolons optional in JavaScript?'
        }
      ],
      response_format: { type: "json_object" }
    });

    const rawText = response.choices[0].message.content;
    console.log("rawtext", rawText)
    
    const flowData = JSON.parse(rawText);
    console.log("flowData", flowData)
    res.send(flowData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to generate flow chart' });
  }
});

router.post("/query", async (req, res) => {
  console.log("called")
  console.log(req.body)
  try {
    const { query } = req.body;
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a tutor  helping students study and organize complex topics by showing the relationship between topics and ideas please be descriptive. Create a flowchart to explain concepts. 

            React Flow requires this exact format:

            Nodes array - each node must have:
            {
            "id": "n1",
            "position": { "x": 0, "y": 0 },
            "data": { "label": "Node Label" },//be descriptive of the label
            "type": "input"  // optional: 'input', 'output', or 'default'
            }

            Edges array - each edge must have:
            {
            "id": "n1-n2",
            "source": "n1",
            "target": "n2",
            "type": "step",  // optional: 'step', 'straight', 'smoothstep'
            "label": "edge description"  
            }
            Have the root node contain the query and the nodes containing explinations connect to it.
            Return ONLY valid JSON with "nodes" and "edges" arrays.`
        },
        {
          role: "user",
          content: query
        }
      ],
      response_format: { type: "json_object" }
    });

    const rawText = response.choices[0].message.content;
    const flowData = JSON.parse(rawText);
    console.log("Generated flowData:", flowData);
    
    res.send(flowData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to generate flow chart" });
  }
})

export { router }