export function createPlannerPrompt(params: {
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  numberOfPeople: number;
  transportation: string;
  budget: number;
  preferences?: string;
}) {
  const {
    destination,
    startDate,
    endDate,
    duration,
    numberOfPeople,
    transportation,
    budget,
    preferences,
  } = params;

  return `
以下の条件に基づいて、詳細な旅行プランを作成してください：

目的地: ${destination}
滞在期間: ${duration}日間（${startDate}から${endDate}まで）
人数: ${numberOfPeople}人
交通手段: ${transportation}
予算: ${budget}円
希望・好み: ${preferences || "指定なし"}

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
}
