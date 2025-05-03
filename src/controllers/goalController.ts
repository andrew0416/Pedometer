import { Request, Response } from 'express';
import { Step, Steps } from '../models/Step';
import { Goal, Goals } from '../models/Goal';
import {testGoals, testSteps} from '../models/test_instance'

export class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    setGoal(req: Request, res: Response) {
        const userId = parseInt(req.body.userId); //jwt
        const goalCount = parseInt(req.body.goalCount);
 
        if (!userId || !goalCount) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const today = new Date().toISOString().split('T')[0]; 
        const newId = testGoals.goalArr.length + 1;

        let goals = testGoals;

        //오늘 날짜 기준 userId 동일한 goal 있는지 확인 후 있으면 수정, 없으면 추가
        const existingGoal = goals.filterByUserIdAndDate(userId, today);

        if (existingGoal.length > 0) {
            existingGoal[0].goal = goalCount;
            return res.status(200).json({ message: '목표가 업데이트 되었습니다.' });
        } else {
            const newGoal = new Goal(userId, today, goalCount, newId);
            goals.add(newGoal);
            return res.status(201).json({ message: '목표 설정이 완료되었습니다.' });
        }
    }

    // 5. 목표 달성 여부 확인
    checkGoal(req: Request, res: Response) {
        const userId = parseInt(req.body.userId); //jwt
        const today = new Date().toISOString().split('T')[0];

        if(!userId){
            return res.status(400).json({ error : '유효하지 않은 userId입니다.' });
        }

        let steps = testSteps; // 임시 사용
        let goals = testGoals;
        
        // steps와 goals 배열에서 해당하는 userId의 오늘 날짜 데이터 필터링
        const filteredSteps: Step[] = steps.filterByUserIdAndDate(userId, today);
        const filteredGoals: Goal[] = goals.filterByUserIdAndDate(userId, today);

        // totalSteps와 목표 걸음 수 구하기 (없으면 0으로 설정)
        const totalSteps: number = filteredSteps.length > 0
            ? filteredSteps.reduce((sum, step) => sum + step.count, 0)
            : 0;

        const stepGoal: number = filteredGoals.length > 0 
            ? filteredGoals[filteredGoals.length - 1].goal 
            : 0;

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