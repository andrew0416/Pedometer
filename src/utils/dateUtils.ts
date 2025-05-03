import { DateQuery, DateRangeQuery } from "../types";
import { ErrorResponse } from "../types/index";
import {MISSING_PARAMETER, INVALID_PARAMETER, EQUAL_FRIENDSHIP, INVALID_DATE_FORMAT} from "./defineError";

export function validateDate(query: DateQuery): string | ErrorResponse {
    let { date } = query;

    // date가 없을 경우 오늘 날짜로 설정
    if(!date){
        date = new Date().toISOString().split('T')[0];
    }

    // date 형식이 YYYY-MM-DD가 아닐 경우 에러 처리
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return {...INVALID_DATE_FORMAT, target: 'date'}
    }

    return date;
}

export function validateDateRange(query: DateRangeQuery, isEndDateOptional: boolean): {startDate: string, endDate: string} | ErrorResponse {

    let { startDate, endDate } = query;

    // startDate가 없거나, endDate가 있어야 하는데 없는 경우 에러 처리
    if((!startDate) || (!isEndDateOptional && !endDate)){
        return {...MISSING_PARAMETER, target: 'startDate, endDate'}; // target 부분 확인
    }
    // endDate가 없어도 되고 없는 경우, startDate 할당당
    if(isEndDateOptional && !endDate){
        endDate = startDate;
    }

    // 날짜 형식이 YYYY-MM-DD가 아닐 경우 에러 처리
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate)) {
        return {...INVALID_DATE_FORMAT, target: 'startDate'};
    }
    if (endDate && !dateRegex.test(endDate)) {
        return {...INVALID_DATE_FORMAT, target: 'endDate'};
    }

    return { startDate, endDate: endDate! };
}

export function getStartOfWeek(date: Date = new Date()): Date {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
    currentDate.setDate(currentDate.getDate() - dayOfWeek);
    
    return currentDate;
}
