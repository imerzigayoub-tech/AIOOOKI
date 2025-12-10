export interface Project {
  id: string;
  title: string;
  category: 'interior' | 'graphic';
  description: string;
  imageUrl: string;
  year: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}