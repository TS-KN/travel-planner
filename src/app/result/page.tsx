'use client';

import { useSearchParams } from 'next/navigation';
import ResultCard from '@/components/ResultCard';
import BackButton from '@/components/BackButton';

export default function Result() {
  const searchParams = useSearchParams();
  // TODO: フォームデータを使用してAPIからプランを取得

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h1 className="text-3xl font-bold">旅行プラン結果</h1>
          <div className="w-24"></div> {/* スペーサー */}
        </div>
        <ResultCard />
      </div>
    </main>
  );
}

