import { Request, Response } from 'express';
import { Step } from '../models/Step';
import {testUser1, testGoals, testSteps} from '../models/test_instance'

export class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    setGoal(req: Request, res: Response) {
        console.log('현재의 목표 걸음 수 설정');
    }

    // 5. 목표 달성 여부 확인
    checkGoal(req: Request, res: Response) {
        const userId = parseInt(req.body.userId); //jwt
        const today = new Date().toISOString().split('T')[0];

        let steps = testSteps; // 임시 사용
        let goals = testGoals;

        // steps 배열에서 해당하는 userId의 오늘 날짜 데이터 필터링
        // TODO : filterByUserId, filterByDate로 나누어서 사용할 수 있는 방법 찾아보기
        let stepsForUser: Step[] = steps.filterByUserIdAndDate(userId, today);
        


        console.log('목표 달성 여부 확인');
    }
}

export const goalController = new GoalController();