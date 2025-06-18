'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import TravelForm from '@/components/TravelForm';
import { TravelFormData } from '@/types/travel';

export default function PlannerPage() {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  const handleSubmit = (data: TravelFormData) => {
    console.log('Form submitted:', data);
    // フォームデータをクエリパラメータとして結果ページに渡す
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      queryParams.append(key, value.toString());
    });
    router.push(`/result?${queryParams.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">旅行プランナー</h1>
        <TravelForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
} 
