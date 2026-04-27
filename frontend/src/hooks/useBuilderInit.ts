// hooks for init builder wtih template and chat

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { Step } from '../types';

interface UseBuilderInitProps {
    prompt: string;
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
    initializeChat: (prompts: string[], userPrompt: string) => Promise<void>;
    model?: string;
}

export function useBuilderInit({ prompt, setSteps, initializeChat, model }: UseBuilderInitProps) {
    const [templateSet, setTemplateSet] = useState(false);

    useEffect(() => {
        async function init() {
            try {
                const templateResponse = await axios.post(`${BACKEND_URL}/template`, {
                    prompt: prompt.trim(),
                    model
                });
                setTemplateSet(true);

                const { prompts, uiPrompts } = templateResponse.data;

                setSteps(
                    parseXml(uiPrompts[0]).map((x: Step) => ({
                        ...x,
                        status: "pending",
                    }))
                );

                await initializeChat(prompts, prompt);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const apiData = error.response?.data as { message?: string; error?: string; hint?: string } | undefined;
                    const status = error.response?.status;
                    const details = apiData?.error || apiData?.message || error.message;
                    const hint = apiData?.hint ? `\n${apiData.hint}` : "";

                    console.error("Error during initialization:", {
                        status,
                        details,
                        apiData,
                    });

                    alert(`Initialization failed${status ? ` (${status})` : ""}: ${details}${hint}`);
                    return;
                }

                const message = error instanceof Error ? error.message : "Unknown error";
                console.error("Error during initialization:", message);
                alert(`Failed to generate content: ${message}`);
            }
        }

        if (prompt) {
            init();
        }
    }, []);

    return { templateSet };
}
