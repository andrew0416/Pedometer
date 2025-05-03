import { ErrorResponse } from "../types";
import {MISSING_PARAMETER, INVALID_PARAMETER, EQUAL_FRIENDSHIP, INVALID_DATE_FORMAT} from "./defineError";

export function validateUserId(body: any): number | ErrorResponse {
    const userIdString = body.userId;
    if (!userIdString) {
        return {...MISSING_PARAMETER, target: 'userId'};
    }

    const userId = parseInt(userIdString);
    if (isNaN(userId)) {
        return {...INVALID_PARAMETER, target: 'userId'};
    }

    return userId;
}

// export function validateFriendship (userId: number, body: {error: string}, followeeId: number) {
export function validateFriendship (userId: number, followeeId: number): ErrorResponse | null {
    if (!followeeId) {
        return {...MISSING_PARAMETER, target: 'followeeId'};
    }

    if (userId === followeeId) {
        return {...INVALID_PARAMETER, target: 'followeeId'};
    }

    return null;
}
