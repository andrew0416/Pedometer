"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = validateDate;
exports.validateDateRange = validateDateRange;
exports.getStartOfWeek = getStartOfWeek;
const defineError_1 = require("./defineError");
function validateDate(query) {
    let { date } = query;
    // date가 없을 경우 오늘 날짜로 설정
    if (!date) {
        date = new Date().toISOString().split('T')[0];
    }
    // date 형식이 YYYY-MM-DD가 아닐 경우 에러 처리
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_DATE_FORMAT), { target: 'date' });
    }
    return date;
}
function validateDateRange(query, isEndDateOptional) {
    let { startDate, endDate } = query;
    // startDate가 없거나, endDate가 있어야 하는데 없는 경우 에러 처리
    if ((!startDate) || (!isEndDateOptional && !endDate)) {
        return Object.assign(Object.assign({}, defineError_1.MISSING_PARAMETER), { target: 'startDate, endDate' }); // target 부분 확인
    }
    // endDate가 없어도 되고 없는 경우, startDate 할당당
    if (isEndDateOptional && !endDate) {
        endDate = startDate;
    }
    // 날짜 형식이 YYYY-MM-DD가 아닐 경우 에러 처리
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate)) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_DATE_FORMAT), { target: 'startDate' });
    }
    if (endDate && !dateRegex.test(endDate)) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_DATE_FORMAT), { target: 'endDate' });
    }
    return { startDate, endDate: endDate };
}
function getStartOfWeek(date = new Date()) {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
    currentDate.setDate(currentDate.getDate() - dayOfWeek);
    return currentDate;
}
