'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultCard from '@/components/ResultCard';
import BackButton from '@/components/BackButton';
import { TravelPlan } from '@/types/travel';

export default function Result() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const formData = {
          destination: searchParams.get('destination') || '',
          startDate: searchParams.get('startDate') || '',
          endDate: searchParams.get('endDate') || '',
          numberOfPeople: Number(searchParams.get('numberOfPeople')) || 1,
          transportation: searchParams.get('transportation') || 'train',
          budget: Number(searchParams.get('budget')) || 0,
          preferences: searchParams.get('preferences') || '',
        };

        const response = await fetch('/api/planner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('旅行プランの生成に失敗しました');
        }

        const data = await response.json();
        setPlan(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [searchParams]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h1 className="text-3xl font-bold">旅行プラン結果</h1>
          <div className="w-24"></div> {/* スペーサー */}
        </div>
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">旅行プランを生成中...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">エラー: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {plan && <ResultCard plan={plan} />}
      </div>
    </main>
  );
}

