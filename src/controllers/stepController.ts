import { Request, Response } from 'express';
import { Step, Steps } from '../models/Step';
import { DateQuery, DateRangeQuery, AuthPayload, StepCountQuery, ErrorResponse } from '../types/index';
import { PrismaClient  } from '../../generated/prisma';
import { validateUserId } from '../utils/userUtils';
import { validateDate, validateDateRange, getStartOfWeek } from '../utils/dateUtils';
import { validateStepCount } from '../utils/stepUtils';

const prisma = new PrismaClient();

export class StepController {
    // 1. 사용자 걸음 수 저장
    async postSteps(req: Request<{}, {}, StepCountQuery, {}>, res: Response) {   
        try {
            const userId: number | ErrorResponse = validateUserId(req.body); // 
            const stepCount: number | ErrorResponse = validateStepCount(req.body);
            if(typeof userId !== 'number'){
                throw userId
            }
            if(typeof stepCount !== 'number'){
                throw stepCount
            }
            
            const steps: Steps = new Steps()
            const newStep = new Step(0, userId, stepCount, new Date())
        
            await steps.add(newStep);
            return res.status(200).json({ message: '걸음 수 저장 성공' });
        } catch (err: any) {
            if (err.status && err.error) {
                return res.status(err.status).json({ error: err.err, target: err.target });
            }
            return res.status(500).json({ error: '알 수 없는 에러', detail: err });
        }
    }

    // 2. 오늘/특정 날짜 걸음 수 조회
    async getStepsByDate(req: Request<{}, {}, {}, DateQuery>, res: Response){
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        const date: string | ErrorResponse = validateDate(req.query);
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        if(typeof date !== 'string'){
            const { status, error, target } = date;
            return res.status(status).json({ error : error, target: target });
        }

        let steps: Steps = new Steps(); // 임시 사용

        // steps 배열에서 해당 날짜의 걸음 수 찾기
        const stepsOnDate: Step[] = await steps.filterByUserIdAndDate(userId, date)

        // 총합 걸음 수(걸음 수가 존재하지 않을 경우 0)
        const totalSteps: number = stepsOnDate.reduce((sum, step) => sum + step.getCount(), 0);
    
        return res.status(200).json({
            date: date,
            steps: totalSteps
        });        
    }
    
    // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
    async getStatistics(req: Request<{}, {}, {}, DateRangeQuery>, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        // startDate, endDate
        const validatedDateRange: {startDate: string, endDate: string} | ErrorResponse = validateDateRange(req.query, false);
        if('error' in validatedDateRange){
            const { status, error, target } = validatedDateRange;
            return res.status(status).json({ error : error, target: target });
        }
        const { startDate, endDate } = validatedDateRange;

        let steps = new Steps();

        const filtered = await steps.filterByUserIdAndDateRange(userId, startDate, endDate)
        
        if (filtered.length === 0) {
            return res.status(404).json({ error: '해당 기간에 데이터가 없습니다.' });
        }
        
        const counts: number[] = filtered.map(step => step.getCount());
        const average: number = counts.reduce((a, b) => a + b, 0) / counts.length;
        const max: number = Math.max(...counts);
        const min: number = Math.min(...counts);
        
        return res.status(200).json({
            average : average,
            max : max,
            min : min
        });
        
    }

    // 6. 주별 평균 걸음 수
    async getWeeklyStatistics(req: Request<{}, {}, {}, {}>, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }

        const steps: Steps = new Steps();
        const currentDate: Date = new Date();

        // 월요일 기준 이번 주 시작일 구하기
        const startOfWeek = getStartOfWeek()

        // 날짜 변환
        const formatDate = (date: Date): string => date.toISOString().split('T')[0];
        const [startDate, endDate] = [startOfWeek, currentDate].map(formatDate);

        const filtered = await steps.filterByUserIdAndDateRange(userId, startDate, endDate)
        const counts = await filtered.map(step => step.getCount());
        const average = counts.reduce((a, b) => a + b, 0) / counts.length;

        res.status(200).json({
            weekly_average: average,
        });      
    }

    // 7. 시간대별 걸음 수 통계
    async getHourlyStatistics(req: Request<{}, {}, {}, DateQuery>, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        // date
        const date: string | ErrorResponse = validateDate(req.query);
        if(typeof date !== 'string'){
            const { status, error, target } = date;
            return res.status(status).json({ error : error, target: target });
        }
        
        const steps: Steps = new Steps();

        const hourlyArr: {[key: string]: number} = {}
        for (let i = 0; i < 24; i++) {
            const key: string = `${i.toString().padStart(2, '0')}~${(i + 1).toString().padStart(2, '0')}`;
            hourlyArr[key] = 0;
        }

        // 날짜 필터링
        const filtered: Step[] = await steps.filterByUserIdAndDate(userId, date)

        // 시간대별 집계
        for (const step of filtered) {
            const hour: number = new Date(step.createdAt).getHours();
            const key: string = `${hour.toString().padStart(2, '0')}~${(hour + 1).toString().padStart(2, '0')}`;
            hourlyArr[key] += step.getCount();
        }
        
        return res.status(200).json({
            date : date,
            hourlySteps: hourlyArr
        });
    }
}

export const stepController = new StepController();