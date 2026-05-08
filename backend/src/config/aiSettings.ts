import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'openrouter/owl-alpha';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
