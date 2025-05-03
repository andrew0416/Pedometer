import { ErrorResponse, StepCountQuery } from "../types";
import {MISSING_PARAMETER, INVALID_PARAMETER, EQUAL_FRIENDSHIP, INVALID_DATE_FORMAT} from "./defineError";

export function validateStepCount(body: any): number | ErrorResponse {
    const stepCountString = body.stepCount;
    if (!stepCountString) {
        return {...MISSING_PARAMETER, target: 'stepCount'};
    }

    const stepCount = parseInt(stepCountString);
    if (isNaN(stepCount)) {
        return {...INVALID_PARAMETER, target: 'stepCount'};
    }
    return stepCount;
}