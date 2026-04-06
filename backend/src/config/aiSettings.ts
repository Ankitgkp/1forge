import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'xiaomi/mimo-v2-flash:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
