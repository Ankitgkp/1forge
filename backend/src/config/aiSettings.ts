import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'arcee-ai/trinity-large-preview:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
