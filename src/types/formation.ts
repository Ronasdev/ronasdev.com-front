export interface Formation {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  startDate: string;
  maxParticipants: number;
  level: string;
  topics: string[];
  prerequisites: string[];
  objectives: string[];
  category?: string;
  instructor?: {
    name: string;
    title: string;
    avatar?: string;
  };
  rating?: number;
  totalReviews?: number;
  language?: string;
  certification?: boolean;
  online?: boolean;
}
