'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ResultCard from '@/components/ResultCard';
import BackButton from '@/components/BackButton';
import { TravelPlan } from '@/types/travel';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

function ResultContent() {
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

        const { data } = await supabase.auth.getSession();
        const access_token = data.session?.access_token;

        const response = await fetch('/api/planner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            toast.error(errorData.error || '認証が必要です');
            router.push('/');
            return;
          }
          toast.error(errorData.error || '旅行プランの生成に失敗しました');
          throw new Error('旅行プランの生成に失敗しました');
        }

        const dataRes = await response.json();
        setPlan(dataRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [searchParams, router]);

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <BackButton href="/planner" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">プランが見つかりません</div>
        <BackButton href="/planner" />
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

export default function Result() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

