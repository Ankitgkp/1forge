import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'inclusionai/ling-2.6-1t:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
