'use client';

import { useState } from 'react';
import { TravelFormData } from '@/types/travel';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
}

export default function TravelForm({ onSubmit }: TravelFormProps) {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
    transportation: 'plane',
    budget: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' || name === 'budget' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <FormInput
        label="目的地"
        id="destination"
        name="destination"
        type="text"
        value={formData.destination}
        onChange={handleChange}
        required
        placeholder="例：東京"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="出発日"
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <FormInput
          label="帰着日"
          id="endDate"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <FormInput
        label="人数"
        id="numberOfPeople"
        name="numberOfPeople"
        type="number"
        value={formData.numberOfPeople}
        onChange={handleChange}
        required
        min={1}
      />

      <FormSelect
        label="交通手段"
        id="transportation"
        name="transportation"
        value={formData.transportation}
        onChange={handleChange}
        required
        options={[
          { value: 'plane', label: '飛行機' },
          { value: 'train', label: '電車' },
          { value: 'car', label: '車' },
          { value: 'bus', label: 'バス' },
          { value: 'walk', label: '徒歩' },
        ]}
      />

      <FormInput
        label="予算（円）"
        id="budget"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        required
        min={0}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors cursor-pointer"
      >
        プランを作成
      </button>
    </form>
  );
} 
