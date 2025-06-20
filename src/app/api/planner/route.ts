import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { TravelPlan } from '@/types/travel';
import { checkAndUpdateApiUsage } from '@/lib/rateLimit';
import { createPlannerPrompt } from '@/lib/plannerPrompt';
import { createClient } from '@/utils/supabase/server';

// OpenAIクライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
  }
  const userId = data.user.id;
  await checkAndUpdateApiUsage(userId, 10);

  const body = await request.json();
  const {
    destination,
    startDate,
    endDate,
    numberOfPeople,
    transportation,
    budget,
    preferences,
  } = body;

  // 入力のバリデーション
  if (!destination || !startDate || !endDate) {
    return NextResponse.json(
      { error: '目的地、出発日、帰着日は必須です' },
      { status: 400 }
    );
  }

  // 滞在日数の計算
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // プロンプトの作成
  const prompt = createPlannerPrompt({
    destination,
    startDate,
    endDate,
    duration,
    numberOfPeople,
    transportation,
    budget,
    preferences,
  });

  // OpenAI APIを使用して旅行プランを生成
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "あなたは旅行プランナーの専門家です。ユーザーの要望に合わせて、実用的で魅力的な旅行プランをJSON形式で作成してください。"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-4.1-nano",
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" }
  });

  const planContent = completion.choices[0].message.content;
  if (!planContent) {
    throw new Error('旅行プランの生成に失敗しました');
  }

  const plan: TravelPlan = JSON.parse(planContent);

  return NextResponse.json(plan);
} 
