import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Step {
    id: number;
    userId: number;
    stepCount: number;
    createdAt: Date;

    constructor(id: number, userId: number, stepCount: number, createdAt: Date) {
        this.id = id;
        this.userId = userId;
        this.stepCount = stepCount;
        this.createdAt = createdAt;
    }

    getCount(): number{
        return this.stepCount
    }

}

class Steps {
    stepArr: Step[];

    constructor(stepArr: Step[] = []) {
        this.stepArr = stepArr;
    }

    async add(step: Step): Promise<void> {
        await prisma.step.create({
            data: {
                userId: step.userId,
                stepCount: step.stepCount,
                createdAt: step.createdAt,
            },
        });
    }

    // userId와 date에 해당하는 step[] 반환
    async filterByUserIdAndDate(userId: number, date: string): Promise<Step[]> {
        const steps = await prisma.$queryRaw<Step[]>`
        SELECT * FROM "Step"
        WHERE "userId" = ${userId}
        AND DATE("createdAt") = ${date}
    `;
        return steps.map(step => new Step( step.id, step.userId, step.stepCount, step.createdAt));
    }

    // userId와 date range에 해당하는 step[] 반환
    async filterByUserIdAndDateRange(userId: number, startDate: string, endDate: string): Promise<Step[]> {
        const wideStart = new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0] + 'T00:00:00.000Z';
        const wideEnd = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0] + 'T23:59:59.999Z';

        // 쿼리
        const steps = await prisma.$queryRaw<Step[]>`
            SELECT * FROM "Step"
            WHERE "userId" = ${userId}
            AND "createdAt" BETWEEN ${wideStart} AND ${wideEnd}
        `;

        // 정확한 범위 필터링
        const strictStart = new Date(startDate + 'T00:00:00.000Z');
        const strictEnd = new Date(endDate + 'T23:59:59.999Z');

        const filtered = steps.filter(step => {
            const createdAt = new Date(step.createdAt);
            return createdAt >= strictStart && createdAt <= strictEnd;
        });

        console.log(filtered.length)

        return filtered.map(step => new Step(step.id, step.userId, step.stepCount, step.createdAt));
}
}

export { Step, Steps };