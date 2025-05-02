import { Request, Response } from 'express';
import {testUser1,testUser2,testUser3,testFriends,testGoals,testSteps} from '../models/test_instance'
import { Step } from '../models/Step';
import { DateQuery, DateRangeQuery, AuthPayload } from '../types/index';

export class StepController {

    // 1. 사용자 걸음 수 저장
    postSteps(req: Request, res: Response) {
        console.log ('사용자 걸음 수 저장');
    }

    // 2. 오늘/특정 날짜 걸음 수 조회
    getStepsByDate(req: Request<{}, {}, {}, DateQuery>, res: Response){
        let { date } = req.query;

        console.log('오늘/특정 날짜 걸음 수 조회');

        let steps = testSteps; // 임시 사용

        if (!date) {
            date = new Date().toISOString().split('T')[0];  // yyyy-mm-dd 형식으로 오늘 날짜
        }

        // 날짜 포맷 검증
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).send({ error: 'Invalid date format. Please use yyyy-mm-dd.' });
        }

        // steps 배열에서 해당 날짜의 걸음 수 찾기
        const stepsOnDate: Step[] = steps.filterByDate(date)

        // 총합 걸음 수(걸음 수가 존재하지 않을 경우 0)
        const totalSteps = stepsOnDate.reduce((sum, step) => sum + step.getCount(), 0);
    
        return res.status(200).json({date: date, steps: totalSteps});
       
        
    }
    
    // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
    getStatistics(req: Request<{}, {}, AuthPayload, DateRangeQuery>, res: Response) {
        let { startDate, endDate } = req.query;
        const userId = req.body.userId; //jwt

        let steps = testSteps; // 임시 사용

        if (!startDate || !endDate) {
            return res.status(400).send({ error: 'startDate와 endDate는 빈 상태로 존재할 수 없습니다.' });
        }

        // 날짜 포맷 검증
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            return res.status(400).send({ error: 'yyyy-mm-dd 형태가 아닙니다.' });
        }

        const filtered = steps.filterByDateRange(startDate, endDate)
        
        if (filtered.length === 0) {
            return res.status(404).json({ error: '해당 기간에 데이터가 없습니다.' });
        }
        
        const counts = filtered.map(step => step.getCount());
        const average = counts.reduce((a, b) => a + b, 0) / counts.length;
        const max = Math.max(...counts);
        const min = Math.min(...counts);
        
        return res.status(200).json({ average, max, min });
        
    }

    // 6. 주별 평균 걸음 수
    getWeeklyStatistics(req: Request, res: Response): void {

        const steps = testSteps;
        const currentDate = new Date();

        // 월요일 기준 이번 주 시작일 구하기

        const dayOfWeek = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - dayOfWeek);


        // 날짜 변환
        const formatDate = (date: Date): string => date.toISOString().split('T')[0];
        const startDate = formatDate(startOfWeek);
        const endDate = formatDate(currentDate);
        

        const filtered = steps.filterByDateRange(startDate, endDate)
        const counts = filtered.map(step => step.getCount());
        const average = counts.reduce((a, b) => a + b, 0) / counts.length;
        const total = counts.reduce((a, b) => a + b, 0);
    

        res.status(200).json({
            weekly_average: average,
        })
        
        
        
      
    }

    // 7. 시간대별 걸음 수 통계
    getHourlyStatistics(req: Request<{}, {}, AuthPayload, DateQuery>, res: Response) {
        let { date } = req.query;
        const userId = req.body.userId;
        let steps = testSteps; // 임시 사용

        if (!date) {
            date = new Date().toISOString().split('T')[0]; // 오늘 날짜로 설정 (yyyy-mm-dd)
        }
        
        // 날짜 포맷 검증
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({ error: 'yyyy-mm-dd 형태가 아닙니다.' });
        }
        const hourlyArr: {[key: string]: number} = {}
        for (let i = 0; i < 24; i++) {
            const key = `${i.toString().padStart(2, '0')}~${(i + 1).toString().padStart(2, '0')}`;
            hourlyArr[key] = 0;
        }

        // 날짜 필터링
        const filtered = steps.filterByDate(date)

        // 시간대별 집계
        for (const step of filtered) {
            const hour = new Date(step.created_at).getHours();
            const key = `${hour.toString().padStart(2, '0')}~${(hour + 1).toString().padStart(2, '0')}`;
            hourlyArr[key] += step.getCount();
        }
        
        return res.status(200).json({
            date,
            hourlySteps: hourlyArr
        });

    }

        
        
}

export const stepController = new StepController();