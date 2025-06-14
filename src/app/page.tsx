'use client';

import TravelForm from '@/components/TravelForm';
import { TravelFormData } from '@/types/travel';

export default function Home() {
  const handleSubmit = (data: TravelFormData) => {
    console.log('Form submitted:', data);
    // TODO: API呼び出しの実装
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
