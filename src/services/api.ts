const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-production-4d5be.up.railway.app';

export interface ChatMessage {
  session_id: string;
  user_message: string;
}

export interface ChatResponse {
  ai_message: string;
  deal_closed: boolean;
  final_price?: number;
  discount_percentage?: number;
  is_first_message?: boolean;
}

export interface WaitlistSignup {
  contact_type: 'email' | 'phone';
  contact_value: string;
  source?: string;
  referred_by?: string | null;
}

export interface ConversationHistory {
  session_id: string;
  messages: Array<{
    role: string;
    content: string;
    timestamp: string;
  }>;
  created_at: string;
  deal_closed: boolean;
  final_price?: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async sendChatMessage(sessionId: string, userMessage: string): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        user_message: userMessage,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }

  async addToWaitlist(signup: WaitlistSignup): Promise<{ success: boolean; message: string; id: number; referral_code: string }> {
    const response = await fetch(`${this.baseUrl}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signup),
    });

    if (!response.ok) {
      throw new Error('Failed to join waitlist');
    }

    return response.json();
  }

  async getSessionHistory(sessionId: string): Promise<ConversationHistory> {
    const response = await fetch(`${this.baseUrl}/api/sessions/${sessionId}`);

    if (!response.ok) {
      throw new Error('Failed to get session history');
    }

    return response.json();
  }

  async getWaitlistCount(): Promise<{ count: number }> {
    const response = await fetch(`${this.baseUrl}/api/waitlist/count`);

    if (!response.ok) {
      throw new Error('Failed to get waitlist count');
    }

    return response.json();
  }

  async getSessionStats(): Promise<{
    total_sessions: number;
    closed_deals: number;
    conversion_rate: string;
    average_final_price: number;
  }> {
    const response = await fetch(`${this.baseUrl}/api/sessions/stats`);

    if (!response.ok) {
      throw new Error('Failed to get session stats');
    }

    return response.json();
  }
}

export const apiService = new ApiService();

