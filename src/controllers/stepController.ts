import { Request, Response } from 'express';
import {testUser1,testUser2,testUser3,testFriends,testGoals,testSteps} from '../models/test_instance'

export class StepController {

    // 1. 사용자 걸음 수 저장
    postSteps(req: Request, res: Response) {
        console.log ('사용자 걸음 수 저장');

    }

    // 2. 오늘/특정 날짜 걸음 수 조회
    getStepsByDate(req: Request, res: Response) {
        const { date } = req.query;

        let targetDate = date || new Date().toISOString().split('T')[0];  // 오늘 날짜를 yyyy-mm-dd 형식으로

        console.log('오늘/특정 날짜 걸음 수 조회');
    }
    
    // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
    getStatistics(req: Request, res: Response) {
        const { startDate, endDate } = req.query;

        console.log('기간별 통계 조회');
    }

    // 6. 주별 평균 걸음 수
    getWeeklyStatistics(req: Request, res: Response) {
        console.log('주별 평균 걸음 수');
    }
        
    // 7. 시간대별 걸음 수 통계
    getHourlyStatistics(req: Request, res: Response) {
        const { date } = req.query;
        
        console.log('시간대별 걸음 수 통계');
    }
}

export const stepController = new StepController();