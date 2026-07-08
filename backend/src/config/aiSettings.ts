import 'dotenv/config';

export const DEFAULT_AI_MODEL = 'tencent/hy3:free';

export const aiSettings = {
    aiName: process.env.AI_NAME || 'Tencent HY3',
    model: process.env.AI_MODEL || DEFAULT_AI_MODEL
};
