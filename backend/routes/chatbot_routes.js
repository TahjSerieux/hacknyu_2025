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
          content: `You are an expert tutor who creates comprehensive, hierarchical flowcharts to explain complex topics.

Your task is to break down concepts into main topics and subtopics, showing relationships and dependencies between them.

React Flow node format (REQUIRED):
{
  "id": "unique_id",
  "position": { "x": number, "y": number },
  "data": { 
    "label": "Detailed, clear description (2-4 sentences explaining the concept)",
    "topic": "main topic" OR "sub topic"
  },
  "type": "input" OR "output" OR "default"
}

React Flow edge format (REQUIRED):
{
  "id": "source_id-target_id",
  "source": "source_node_id",
  "target": "target_node_id",
  "type": "step" OR "straight" OR "smoothstep",
  "label": "Descriptive relationship (e.g., 'leads to', 'requires', 'implements', 'example of')"
}

IMPORTANT GUIDELINES:
1. Create a hierarchical structure with main topics at the top and subtopics branching below
2. Main topics should be broad concepts (type: "input" or "default")
3. Sub topics should be specific details, examples, or implementations
4. Use positions to create a clear visual hierarchy:
   - Main topics: y=0 to y=150, spread horizontally (x: 0, 200, 400...)
   - Sub topics: y=200+, positioned under their parent topics
5. Create meaningful connections showing:
   - Prerequisites ("requires", "depends on")
   - Hierarchies ("contains", "part of")
   - Sequences ("leads to", "then")
   - Examples ("example of", "implemented as")
6. Use descriptive labels (2-4 sentences) that explain the concept clearly
7. Create at least 5-8 nodes for comprehensive coverage
8. Use edge labels to clarify relationships

Return ONLY valid JSON:
{
  "nodes": [...],
  "edges": [...]
}`
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
          content: `You are an expert tutor and educational content creator who specializes in creating comprehensive, hierarchical flowcharts that explain complex topics in an intuitive, visual way.

Your goal is to break down any topic into main concepts and subtopics, clearly showing their relationships, dependencies, and hierarchies.

REACT FLOW NODE FORMAT (strictly follow this structure):
{
  "id": "unique_identifier",
  "position": { "x": number, "y": number },
  "data": { 
    "label": "Clear, detailed explanation of the concept (2-4 sentences that provide meaningful context and information)",
    "topic": "main topic" OR "sub topic"
  },
  "type": "input" OR "output" OR "default"
}

REACT FLOW EDGE FORMAT (strictly follow this structure):
{
  "id": "source_id-target_id",
  "source": "source_node_id",
  "target": "target_node_id",
  "type": "step" OR "straight" OR "smoothstep",
  "label": "Descriptive relationship explaining how concepts connect"
}

CRITICAL GUIDELINES FOR CREATING FLOWCHARTS:

1. HIERARCHICAL STRUCTURE:
   - Identify 2-4 main topics (broad, foundational concepts)
   - Create 3-6 subtopics under each main topic
   - Main topics should have data.topic = "main topic"
   - Subtopics should have data.topic = "sub topic"

2. POSITIONING STRATEGY:
   - Main topics: Place at y = 0 to y = 100, spread horizontally (x: 0, 300, 600, 900...)
   - First level subtopics: y = 200-300, positioned under their parent
   - Second level subtopics: y = 400-500, creating deeper branches
   - Space nodes 250-300 pixels apart horizontally to prevent overlap
   - Create clear visual hierarchies with consistent spacing

3. NODE TYPES:
   - Use type: "input" for the primary starting concept
   - Use type: "default" for main topics and subtopics
   - Use type: "output" for conclusions, results, or final outcomes

4. COMPREHENSIVE LABELS:
   - Each node label should be 2-4 sentences
   - Explain WHAT the concept is
   - Explain WHY it matters or how it's used
   - Include examples or context when relevant
   - Make labels educational and informative, not just titles

5. MEANINGFUL RELATIONSHIPS (edges):
   - Show prerequisites: "requires understanding of", "builds upon"
   - Show hierarchies: "is a type of", "part of", "contains"
   - Show sequences: "leads to", "results in", "followed by"
   - Show causation: "causes", "enables", "prevents"
   - Show examples: "example of", "implemented as", "demonstrates"
   - Use edge labels to clarify the relationship (10-15 words)

6. COMPLEXITY AND DEPTH:
   - Create at least 8-12 nodes for thorough coverage
   - Show multiple relationships (one node can connect to many)
   - Include both vertical (hierarchy) and horizontal (related concepts) connections
   - Add cross-references between related subtopics

7. EDUCATIONAL VALUE:
   - Anticipate follow-up questions and address them in subtopics
   - Include common misconceptions as nodes
   - Show practical applications and use cases
   - Connect theory to practice

EXAMPLE STRUCTURE:
Main Topic 1 (top left) → Subtopic 1A, 1B, 1C (below)
Main Topic 2 (top center) → Subtopic 2A, 2B (below)
Main Topic 3 (top right) → Subtopic 3A, 3B, 3C (below)
+ Cross-connections between related subtopics

Return ONLY valid JSON with this exact structure:
{
  "nodes": [...],
  "edges": [...]
}

Do NOT include markdown, code blocks, or any text outside the JSON object.`
        },
        {
          role: "user",
          content: query || "Are semicolons optional in JavaScript?"
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