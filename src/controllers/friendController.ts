import { Request, Response } from 'express';
import { DateRangeQuery } from '../types';
import {testUser, testFriends, testSteps2} from '../models/test_instance'
import { Step } from '../models/Step';

export class FriendController {
    // 8.1 친구 추가
    addFriend(req: Request, res: Response) {
        console.log('친구 추가');
    }

    // 8.2 친구 삭제
    deleteFriend(req: Request, res: Response) {
        console.log('친구 삭제');
    }

    // 9. 친구 걸음 수 비교 (랭킹)
    getStepRanking(req: Request<{}, {}, {}, DateRangeQuery>, res: Response) {
        const { startDate, endDate } = req.query;
        console.log('랭킹 조회');

        let user_id = 1 // 1이라고 가정
        let users = testUser
        let steps = testSteps2
        let friends = testFriends

        if (!startDate || !endDate) {
            return res.status(400).send({ error: 'startDate와 endDate는 빈 상태로 존재할 수 없습니다.' });
        }

        // 날짜 포맷 검증
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            return res.status(400).send({ error: 'yyyy-mm-dd 형태가 아닙니다.' });
        }

        let follower_ids: number[] = friends.findFollower(user_id)
        let followerInfos: { id: number; email: string; nickName: string }[] = users.getUsersInfo(follower_ids)

        let rankTable
        for (const info of followerInfos) {
            let userStepArr: Step[] = steps.filterByUserIdDateRange(info.id, startDate, endDate)

            const counts = userStepArr.map(step => step.getCount());

        }

    }
}

export const friendController = new FriendController();