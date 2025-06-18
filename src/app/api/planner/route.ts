import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { TravelPlan } from '@/types/travel';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// OpenAIクライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

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
    const prompt = `
以下の条件に基づいて、詳細な旅行プランを作成してください：

目的地: ${destination}
滞在期間: ${duration}日間（${startDate}から${endDate}まで）
人数: ${numberOfPeople}人
交通手段: ${transportation}
予算: ${budget}円
希望・好み: ${preferences || '指定なし'}

以下の形式でJSONとして回答してください：
{
  "summary": "旅行プランの概要（100文字程度）",
  "dailyPlans": [
    {
      "day": 1,
      "activities": [
        {
          "time": "10:00",
          "description": "活動内容"
        }
      ]
    }
  ],
  "recommendations": [
    {
      "category": "カテゴリー名",
      "items": ["アイテム1", "アイテム2"]
    }
  ],
  "estimatedCost": [
    {
      "category": "カテゴリー名",
      "amount": 金額
    }
  ]
}

注意事項：
1. 必ずJSON形式で回答してください
2. 金額は数値で入力してください
3. 時間は24時間表記で入力してください
4. 日本語で回答してください
`;

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

  } catch (error) {
    console.error('旅行プラン生成エラー:', error);
    return NextResponse.json(
      { error: '旅行プランの生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 
