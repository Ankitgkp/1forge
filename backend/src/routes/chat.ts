// this is the chat streaming endpoint for AI interactions for now using openrouter API

import { Router, Request, Response } from "express";
import { openrouter } from "../services/openrouter.js";
import { config } from "../config/index.js";
import { getSystemPrompt } from "../prompts.js";

const router = Router();

const formatMessages = (messages: any[]) => {
    return messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const,
        content: typeof msg.content === 'string' ? msg.content : msg.content[0]?.text || ''
    }));
};

const setStreamHeaders = (res: Response) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Content-Type-Options', 'nosniff');
};

const FALLBACK_MODELS = [
    'baidu/cobuddy:free',
    'inclusionai/ring-2.6-1t:free',
    'poolside/laguna-xs.2:free',
    'tencent/hy3-preview:free'
];

router.post("/", async (req: Request, res: Response) => {
    try {
        const messages = req.body.messages;
        console.log("Chat endpoint received body:", JSON.stringify(req.body).substring(0, 200));

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ message: "Messages array is required" });
            return;
        }

        const requestedModel = req.body.model || config.aiModel;
        const modelsToTry = [
            requestedModel,
            ...FALLBACK_MODELS.filter((m) => m !== requestedModel)
        ];

        let hasContent = false;
        let headersSet = false;

        const ensureHeaders = () => {
            if (!headersSet) {
                setStreamHeaders(res);
                headersSet = true;
            }
        };

        for (const model of modelsToTry) {
            try {
                const stream = await openrouter.chat.send({
                    model,
                    messages: [
                        { role: "system", content: getSystemPrompt() },
                        ...formatMessages(messages)
                    ],
                    stream: true,
                    streamOptions: { includeUsage: true }
                });

                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        ensureHeaders();
                        hasContent = true;
                        res.write(content);
                        // @ts-ignore
                        if (res.flush) res.flush();
                    }
                }

                if (hasContent) break;
            } catch (error) {
                console.error(`Error in /chat with model ${model}:`, error);
                if (hasContent) break;
            }
        }

        if (!hasContent) {
            if (!headersSet) {
                res.status(502).json({
                    message: "No response from any model",
                    modelsTried: modelsToTry
                });
                return;
            }
        }

        res.end();
    } catch (error) {
        console.error('Error in /chat:', error);
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        } else {
            res.end();
        }
    }
});

export default router;
