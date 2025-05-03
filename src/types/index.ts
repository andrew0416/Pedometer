export interface StepCountQuery {
    stepCount?: number;
}

export interface DateQuery {
    date?: string;
}

export interface DateRangeQuery {
    startDate?: string;
    endDate?: string;
}

export interface followeeParams {
    followee_id: string;
}

export interface AuthPayload {
    userId: string;
}

export interface UserInfo {
    id: number; 
    email: string; 
    nickName: string
}

export interface ErrorResponse {
    status: number;
    error: string;
    target?: string | string[];
}