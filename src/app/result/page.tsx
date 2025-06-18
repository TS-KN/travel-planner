'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ResultCard from '@/components/ResultCard';
import BackButton from '@/components/BackButton';
import { TravelPlan } from '@/types/travel';

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading: isAuthLoading } = useAuth();
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
          if (response.status === 401) {
            router.push('/');
            return;
          }
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

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">プランを生成中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">プランが見つかりません</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <BackButton href="/planner" />
          <h1 className="text-3xl font-bold">旅行プラン結果</h1>
          <div className="w-24"></div> {/* スペーサー */}
        </div>
        {plan && <ResultCard plan={plan} />}
      </div>
    </main>
  );
}

