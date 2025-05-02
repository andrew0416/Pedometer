import { Request, Response } from 'express';

export class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    setGoal(req: Request, res: Response) {
        console.log('현재의 목표 걸음 수 설정');
    }

    // 5. 목표 달성 여부 확인
    checkGoal(req: Request, res: Response) {
        console.log('목표 달성 여부 확인');

    }
}

export const goalController = new GoalController();