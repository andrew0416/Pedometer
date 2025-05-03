import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Goal {
    id: number;
    created_at: string;
    uid: number;
    goal: number;

    constructor(id: number, date: string, uid: number, goal: number) {
        this.id = id;
        this.created_at = date;
        this.uid = uid; 
        this.goal = goal;
    }
}

class Goals {
    GoalArr: Goal[];

    constructor(GoalArr: Goal[] = []) {
        this.GoalArr = GoalArr;
    }
    async add(goal: Goal): Promise<void> {
        await prisma.goal.create({
            data: {
                created_at: goal.created_at,
                uid: goal.uid,
                goal: goal.goal,
            },
        });
    }

    async updateGoal(userId: number, date: string, goalValue: number): Promise<void> {
        const start = new Date(date + 'T00:00:00.000Z');
        const end = new Date(date + 'T23:59:59.999Z');
    
        await prisma.goal.updateMany({
            where: {
                uid: userId,
                created_at: {
                    gte: start,
                    lte: end,
                },
            },
            data: {
                goal: goalValue,
            },
        });
    }

    async filterByUserIdAndDate(userId: number, date: string): Promise<Goal[]> {
        const start = new Date(date + 'T00:00:00.000Z');
        const end = new Date(date + 'T23:59:59.999Z');

        const goals = await prisma.goal.findMany({
            where: {
                uid: userId,
                created_at: {
                    gte: start,
                    lte: end,
                },
            },
        });

        return goals.map(goal => new Goal(goal.id, goal.created_at.toISOString().split('T')[0] , goal.uid, goal.goal));
    }
}

export { Goal, Goals };


