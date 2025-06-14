export interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  transportation: string;
  budget: number;
  preferences: string;
}

export interface TravelPlan {
  summary: string;
  dailyPlans: {
    day: number;
    activities: {
      time: string;
      description: string;
    }[];
  }[];
  recommendations: {
    category: string;
    items: string[];
  }[];
  estimatedCost: {
    category: string;
    amount: number;
  }[];
} 
