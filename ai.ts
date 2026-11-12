/**
 * MarketPilot Intelligence – Provider abstraction
 *
 * Designed for open-source models (Ollama, Llama.cpp, vLLM, etc.)
 * No OpenAI / ChatGPT dependency.
 *
 * Configure via environment or Settings UI:
 *   MARKETPILOT_LLM_BASE_URL=http://localhost:11434
 *   MARKETPILOT_LLM_MODEL=qwen2.5:14b  (or llama3.1, mistral, etc.)
 */

export type MessageRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  description: string;
  systemPrompt: string;
  color: string;
  icon: string;
}

export const AI_EMPLOYEES: AIEmployee[] = [
  {
    id: "marketing",
    name: "Alex Rivera",
    role: "AI Marketing Manager",
    description:
      "Generates campaigns, social posts, ad concepts, content calendars and performance recommendations.",
    systemPrompt: `You are Alex Rivera, the AI Marketing Manager of MarketPilot AI. 
You specialise in growth marketing, content strategy, social media, paid ads and brand storytelling.
Be creative, data-informed and concise. Always align recommendations with the customer's brand and goals.
When asked, produce ready-to-use content (posts, email sequences, ad copy).`,
    color: "#087BFF",
    icon: "megaphone",
  },
  {
    id: "sales",
    name: "Jordan Hale",
    role: "AI Sales Agent",
    description:
      "Researches leads, drafts personalised outreach, tracks opportunities and recommends sales strategies.",
    systemPrompt: `You are Jordan Hale, the AI Sales Agent of MarketPilot AI.
You excel at lead research, personalised outreach sequences, pipeline management and closing strategies.
Be professional, persuasive and highly personalised. Never be pushy. Focus on value and relationships.`,
    color: "#00D5FF",
    icon: "target",
  },
  {
    id: "support",
    name: "Sam Ellis",
    role: "AI Customer Support",
    description:
      "Answers customer questions, drafts responses, categorises tickets and surfaces common issues.",
    systemPrompt: `You are Sam Ellis, the AI Customer Support specialist of MarketPilot AI.
You are empathetic, clear and solution-oriented. Draft helpful replies, categorise issues and escalate when needed.
Always protect the customer's brand voice and aim for first-contact resolution.`,
    color: "#10b981",
    icon: "headphones",
  },
  {
    id: "analyst",
    name: "Riley Chen",
    role: "AI Business Analyst",
    description:
      "Analyses performance, generates reports, identifies opportunities and tracks key metrics.",
    systemPrompt: `You are Riley Chen, the AI Business Analyst of MarketPilot AI.
You turn raw data into clear insights, forecasts and actionable recommendations.
Be precise, visual where helpful (describe charts/tables) and always tie findings back to business goals.`,
    color: "#792BFF",
    icon: "chart",
  },
  {
    id: "ops",
    name: "Casey Morgan",
    role: "AI Operations Manager",
    description:
      "Organises tasks, builds workflows, monitors projects and spots operational inefficiencies.",
    systemPrompt: `You are Casey Morgan, the AI Operations Manager of MarketPilot AI.
You design efficient workflows, prioritise work, track progress and eliminate bottlenecks.
Be structured, practical and focused on execution. Provide clear next actions and owners.`,
    color: "#f59e0b",
    icon: "workflow",
  },
];

export function getEmployee(id: string): AIEmployee | undefined {
  return AI_EMPLOYEES.find((e) => e.id === id);
}

/** Configuration stored in localStorage / env */
export interface LLMConfig {
  baseUrl: string;
  model: string;
  apiKey?: string; // optional for some providers
  temperature?: number;
}

const DEFAULT_CONFIG: LLMConfig = {
  baseUrl: "http://localhost:11434",
  model: "qwen2.5:14b",
  temperature: 0.7,
};

export function getLLMConfig(): LLMConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem("marketpilot_llm_config");
    if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveLLMConfig(config: Partial<LLMConfig>) {
  if (typeof window === "undefined") return;
  const current = getLLMConfig();
  localStorage.setItem(
    "marketpilot_llm_config",
    JSON.stringify({ ...current, ...config })
  );
}

/**
 * Stream a chat completion from an Ollama-compatible endpoint
 * (also works with many other open-source serving layers that expose /api/chat or /v1/chat/completions)
 */
export async function* streamChat(
  messages: ChatMessage[],
  options?: { employeeId?: string; signal?: AbortSignal }
): AsyncGenerator<string> {
  const config = getLLMConfig();
  const employee = options?.employeeId ? getEmployee(options.employeeId) : null;

  const systemMessages: ChatMessage[] = [];
  if (employee) {
    systemMessages.push({ role: "system", content: employee.systemPrompt });
  } else {
    systemMessages.push({
      role: "system",
      content: `You are MarketPilot Intelligence, the central AI engine of MarketPilot AI.
You coordinate a team of specialised AI employees and provide strategic business advice.
Be professional, insightful and action-oriented. When appropriate, suggest which specialist AI employee should handle a task.`,
    });
  }

  // Inject business context if available
  if (typeof window !== "undefined") {
    const profile = localStorage.getItem("marketpilot_business_profile");
    if (profile) {
      systemMessages.push({
        role: "system",
        content: `Current business context:\n${profile}`,
      });
    }
  }

  const fullMessages = [...systemMessages, ...messages];

  // Prefer Ollama native /api/chat, fall back to OpenAI-compatible
  const ollamaUrl = `${config.baseUrl.replace(/\/$/, "")}/api/chat`;

  try {
    const res = await fetch(ollamaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        messages: fullMessages,
        stream: true,
        options: { temperature: config.temperature ?? 0.7 },
      }),
      signal: options?.signal,
    });

    if (!res.ok) {
      // Fallback mock for demo when no model is running
      yield* mockStream(
        employee
          ? `[${employee.name}] I am ready to help with ${employee.role.toLowerCase()} tasks. Connect an open-source model (Ollama + Qwen/Llama) in Settings → AI Engine to enable full responses.`
          : "MarketPilot Intelligence is online. Connect a local open-source model (Ollama recommended) under Settings → AI Engine to unlock full capability. Meanwhile I can still guide you through the platform."
      );
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const json = JSON.parse(trimmed);
          const token = json.message?.content ?? json.response ?? "";
          if (token) yield token;
          if (json.done) return;
        } catch {
          // ignore partial JSON
        }
      }
    }
  } catch (err: any) {
    if (err.name === "AbortError") return;
    // Graceful demo mode
    yield* mockStream(
      "Unable to reach the configured model endpoint. Please verify the Base URL and Model name in Settings → AI Engine (default: http://localhost:11434 with a pulled Qwen or Llama model). The rest of the platform remains fully usable."
    );
  }
}

async function* mockStream(text: string): AsyncGenerator<string> {
  const words = text.split(" ");
  for (const word of words) {
    yield word + " ";
    await new Promise((r) => setTimeout(r, 25 + Math.random() * 40));
  }
}

/** Simple non-streaming helper */
export async function chat(
  messages: ChatMessage[],
  options?: { employeeId?: string }
): Promise<string> {
  let result = "";
  for await (const token of streamChat(messages, options)) {
    result += token;
  }
  return result;
}
