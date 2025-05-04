import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Goal {
    id: number;
    created_at: Date;
    uid: number;
    goal: number;

    constructor(id: number, date: Date, uid: number, goal: number) {
        this.id = id;
        this.created_at = date;
        this.uid = uid; 
        this.goal = goal;
    }

    getDateTimeString(): string{
        const yyyy = this.created_at.getFullYear();
        const mm = String(this.created_at.getMonth() + 1).padStart(2, '0');
        const dd = String(this.created_at.getDate()).padStart(2, '0');
        const hh = String(this.created_at.getHours()).padStart(2, '0');
        const mi = String(this.created_at.getMinutes()).padStart(2, '0');
        const ss = String(this.created_at.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }
}

class Goals {
    GoalArr: Goal[];

    constructor(GoalArr: Goal[] = []) {
        this.GoalArr = GoalArr;
    }

    async add(goal: Goal): Promise<void> {
            await prisma.$executeRaw`
            INSERT INTO "Goal" ("uid", "goal", "created_at")
            VALUES (${goal.uid}, ${goal.goal}, ${goal.getDateTimeString()})
        `;
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


