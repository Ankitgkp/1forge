import 'dotenv/config';

const configuredModel = process.env.AI_MODEL || 'tencent/hy3-preview:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'OpenRouter',
    model: configuredModel
};
