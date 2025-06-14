import { TravelPlan } from '@/types/travel';

export const mockTravelPlan: TravelPlan = {
  summary: "東京3日間の旅プランです。伝統的な文化体験と現代的な観光スポットをバランスよく組み合わせています。",
  dailyPlans: [
    {
      day: 1,
      activities: [
        {
          time: "10:00",
          description: "浅草寺参拝と雷門での記念撮影"
        },
        {
          time: "12:00",
          description: "浅草で天ぷらランチ"
        },
        {
          time: "14:00",
          description: "東京スカイツリー見学"
        },
        {
          time: "18:00",
          description: "秋葉原で夕食と買い物"
        }
      ]
    },
    {
      day: 2,
      activities: [
        {
          time: "09:00",
          description: "築地市場で朝食"
        },
        {
          time: "11:00",
          description: "銀座でショッピング"
        },
        {
          time: "14:00",
          description: "東京ディズニーランド"
        }
      ]
    },
    {
      day: 3,
      activities: [
        {
          time: "10:00",
          description: "明治神宮参拝"
        },
        {
          time: "12:00",
          description: "原宿でランチ"
        },
        {
          time: "14:00",
          description: "渋谷スクランブル交差点見学"
        },
        {
          time: "16:00",
          description: "新宿都庁展望台"
        }
      ]
    }
  ],
  recommendations: [
    {
      category: "おすすめグルメ",
      items: [
        "浅草の天ぷら",
        "築地の寿司",
        "原宿のクレープ"
      ]
    },
    {
      category: "お土産",
      items: [
        "東京バナナ",
        "雷おこし",
        "和菓子"
      ]
    }
  ],
  estimatedCost: [
    {
      category: "宿泊費",
      amount: 30000
    },
    {
      category: "食事代",
      amount: 15000
    },
    {
      category: "交通費",
      amount: 5000
    },
    {
      category: "観光・買い物",
      amount: 20000
    }
  ]
}; 
