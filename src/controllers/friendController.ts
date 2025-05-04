import { Request, Response } from 'express';
import { DateRangeQuery, ErrorResponse, followeeParams, UserInfo } from '../types';
import { Step, Steps } from '../models/Step';
import { RankingBoard } from '../models/RankingBoard';
import { Prisma } from '../../generated/prisma';
import { Users } from '../models/User';
import { Friend, Friends } from '../models/Friend';
import { validateUserId } from '../utils/userUtils';
import { validateDateRange } from '../utils/dateUtils';
import { validateFriendship } from '../utils/userUtils';



export class FriendController {
    
    // 8.1 친구 추가
    async addFriend(req: Request, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        const { followee_id } = req.body;

        try {
            const validationError: null | ErrorResponse = validateFriendship(userId, followee_id);
            if (validationError) throw validationError;
            
    
            const friends = new Friends();
            const newFriend = new Friend(0, userId as number, followee_id);
            await friends.add(newFriend);
    
            return res.status(200).json({ message: '친구가 성공적으로 추가되었습니다.' });
    
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                return res.status(400).json({ error: '이미 존재하는 친구 관계입니다.' });
            }

            if (error.status && error.message) {
                return res.status(error.status).json({ error: error.message });
            }
    
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }   

    // 8.2 친구 삭제
    async deleteFriend(req: Request<followeeParams, {}, {}, {}>, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }

        const { followee_id }: {followee_id: string} = req.params
        const followeeId: number = parseInt(followee_id)

        try {
            const validationError: null | ErrorResponse = validateFriendship(userId, followeeId);
            if (validationError) throw validationError;
        
    
            const friends = new Friends();
            const toDelete = new Friend(0, userId as number, followeeId);
            const deletedCount = await friends.delete(toDelete);
    
            if (deletedCount === 0) {
                return res.status(400).json({ error: '해당 친구 관계가 존재하지 않습니다.' });
            }
    
            return res.status(200).json({ message: '친구 관계가 성공적으로 삭제되었습니다.' });
    
        } catch (error: any) {

            if (error.status && error.message) {
                return res.status(error.status).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // 9. 친구 걸음 수 비교 (랭킹)
    async getStepRanking(req: Request<{}, {}, {}, DateRangeQuery>, res: Response) {
        // userId
        const userId: number | ErrorResponse = validateUserId(req.body); // jwt
        if(typeof userId !== 'number'){
            const { status, error, target } = userId;
            return res.status(status).json({ error : error, target: target });
        }
        // starDate, endDate
        const validatedDateRange: {startDate: string, endDate: string} | ErrorResponse = validateDateRange(req.query, true);
        if('error' in validatedDateRange){
            const { status, error, target } = validatedDateRange;
            return res.status(status).json({ error : error, target: target });
        }
        let { startDate, endDate } = validatedDateRange;

        const [users, steps, friends, ranking] = [new Users, new Steps, new Friends, new RankingBoard]

        let followee_ids: number[] = await friends.findFollower(userId)
        followee_ids.push(userId); // 유저 본인도 추가해야함.
        let followeeInfos: UserInfo[] = await users.getUsersInfo(followee_ids)

        await addAllUserRanking(steps, ranking, followeeInfos, [startDate, endDate])

        const result = ranking.getRanking();
        const dateRange = startDate === endDate ? startDate : `${startDate}~${endDate}`;

        let rankingArr = []
        for (let e of result){
            let json = {[e.user_Id]: e.stepCount};
            rankingArr.push(json)
        }
        
        const response = {
            date: dateRange,
            ranking: rankingArr
        };

        res.status(200).json(response);
    }
}

const addAllUserRanking = async (steps: Steps, ranking: RankingBoard, followeeInfos: UserInfo[], dateRange: string[]) => {
    const [startDate, endDate] = dateRange

    for (const info of followeeInfos) {

        let userStepArr: Step[] = await steps.filterByUserIdAndDateRange(info.id, startDate, endDate)
        const counts = userStepArr.map(step => step.getCount());
        const average = counts.reduce((a, b) => a + b, 0) / counts.length;
        ranking.addUser(info.id , average)
    }
}


export const friendController = new FriendController();