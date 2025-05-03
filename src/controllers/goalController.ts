import { Request, Response } from 'express';
import { Step, Steps } from '../models/Step';
import { Goal, Goals } from '../models/Goal';
import {testGoals, testSteps} from '../models/test_instance'
import { Prisma } from '../../generated/prisma';
import { validateUserId } from '../utils/userUtils';
import { ErrorResponse } from '../types/index';

export class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    async setGoal(req: Request, res: Response) {
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }

        const goalCount = parseInt(req.body.goalCount);

        if (!goalCount) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const today = new Date().toISOString().split('T')[0]; 
        const goals = new Goals();

        const existingGoal = await goals.filterByUserIdAndDate(userId, today);

        if (existingGoal.length > 0) {
            goals.updateGoal(userId, today, goalCount)
            return res.status(200).json({ message: '목표가 업데이트 되었습니다.' });
        } else {
            const newGoal = new Goal(0, today, userId, goalCount);
            goals.add(newGoal);
            return res.status(201).json({ message: '목표 설정이 완료되었습니다.' });
        }
    }

    // 5. 목표 달성 여부 확인
    async checkGoal(req: Request, res: Response) {        
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        
        const today = new Date().toISOString().split('T')[0];

        let steps = new Steps();
        let goals = new Goals();
        
        // steps와 goals 배열에서 해당하는 userId의 오늘 날짜 데이터 필터링
        const filteredSteps: Step[] = await steps.filterByUserIdAndDate(userId, today);
        const filteredGoals: Goal[] = await goals.filterByUserIdAndDate(userId, today);

        // totalSteps와 목표 걸음 수 구하기 (없으면 0으로 설정)
        const totalSteps: number = filteredSteps.length > 0 ? filteredSteps.reduce((sum, step) => sum + step.stepCount, 0) : 0;

        const stepGoal: number = filteredGoals.length > 0 ? filteredGoals[filteredGoals.length - 1].goal : 0;

        // 목표 달성 여부 확인
        const achieveGoal: boolean = totalSteps >= stepGoal;
        
        res.status(200).json({
            achieve_goal : achieveGoal,
            goal: stepGoal,
            current_steps: totalSteps
        });
    }
}

export const goalController = new GoalController();