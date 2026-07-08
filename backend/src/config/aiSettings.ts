import 'dotenv/config';

export const DEFAULT_AI_MODEL = 'cohere/north-mini-code:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'North Mini Code',
    model: process.env.AI_MODEL || DEFAULT_AI_MODEL
};
