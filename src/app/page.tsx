'use client';

import TravelForm from '@/components/TravelForm';
import { TravelFormData } from '@/types/travel';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (data: TravelFormData) => {
    console.log('Form submitted:', data);
    // フォームデータをクエリパラメータとして結果ページに渡す
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      queryParams.append(key, value.toString());
    });
    router.push(`/result?${queryParams.toString()}`);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">旅行プランナー</h1>
        <TravelForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
