import { Request, Response } from 'express';
import { DateRangeQuery } from '../types';

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
    }
}

export const friendController = new FriendController();