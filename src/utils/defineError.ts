import { ErrorResponse } from '../types/index';

const MISSING_PARAMETER: ErrorResponse = { status: 400, error: '파라미터가 비어있습니다.' };
const INVALID_PARAMETER: ErrorResponse = { status: 400, error: '파라미터가 유효하지 않은 값입니다.'}
const EQUAL_FRIENDSHIP: ErrorResponse = { status: 400, error: 'Follower와 followee는 동일할 수 없습니다.' }
const INVALID_DATE_FORMAT: ErrorResponse = { status: 400, error: 'yyyy-mm-dd 형식이 아닙니다.' }

export {MISSING_PARAMETER, INVALID_PARAMETER, EQUAL_FRIENDSHIP, INVALID_DATE_FORMAT}