import { TravelPlan } from "@/types/travel";

interface ResultCardProps {
  plan: TravelPlan;
}

export default function ResultCard({ plan }: ResultCardProps) {
  return (
    <div className="space-y-8">
      {/* 概要 */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">プラン概要</h2>
        <p className="text-gray-700">{plan.summary}</p>
      </div>

      {/* 日別スケジュール */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">日別スケジュール</h2>
        <div className="space-y-6">
          {plan.dailyPlans.map((dayPlan) => (
            <div key={dayPlan.day} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Day {dayPlan.day}</h3>
              <div className="space-y-3">
                {dayPlan.activities.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-gray-600 min-w-[60px]">
                      {activity.time}
                    </span>
                    <span>{activity.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* おすすめ情報 */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">おすすめ情報</h2>
        <div className="space-y-4">
          {plan.recommendations.map((rec, index) => (
            <div key={index}>
              <h3 className="font-medium text-gray-800 mb-2">{rec.category}</h3>
              <ul className="list-disc list-inside space-y-1">
                {rec.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 予算 */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">予算内訳</h2>
        <div className="space-y-3">
          {plan.estimatedCost.map((cost, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">{cost.category}</span>
              <span className="font-medium">
                ¥{cost.amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center font-semibold">
              <span>合計</span>
              <span>
                ¥
                {plan.estimatedCost
                  .reduce((sum, cost) => sum + cost.amount, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
