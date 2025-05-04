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
        await prisma.$executeRaw`
            UPDATE "Goal"
            SET "goal" = ${goalValue}
            WHERE "uid" = ${userId}
            AND DATE("created_at") = ${date}
        `;
    }

    async filterByUserIdAndDate(userId: number, date: string): Promise<Goal[]> {
        const goals = await prisma.$queryRaw<Goal[]>`
        SELECT * FROM "Goal"
        WHERE "uid" = ${userId}
        AND DATE("created_at") = ${date}
    `;

        return goals.map(goal => new Goal(goal.id, goal.created_at, goal.uid, goal.goal));
    }
}

export { Goal, Goals };


