import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'z-ai/glm-4.5-air:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
