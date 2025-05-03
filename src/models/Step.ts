import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Step {
    id: number;
    userId: number;
    stepCount: number;
    createdAt: string;

    constructor(id: number, userId: number, stepCount: number, createdAt: string) {
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
        const start = new Date(date + 'T00:00:00.000Z');
        const end = new Date(date + 'T23:59:59.999Z');
    
        const steps = await prisma.step.findMany({
            where: {
                userId,
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
        });
    
        return steps.map(step => new Step( step.id, step.userId, step.stepCount, step.createdAt.toISOString()));
    }

    // userId와 date range에 해당하는 step[] 반환
    async filterByUserIdAndDateRange(userId: number, startDate: string, endDate: string): Promise<Step[]> {
        const start = new Date(startDate + 'T00:00:00.000Z');
        const end = new Date(endDate + 'T23:59:59.999Z');
    
        const steps = await prisma.step.findMany({
            where: {
                userId,
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
        });
    
        return steps.map(step => new Step( step.id, step.userId, step.stepCount, step.createdAt.toISOString()));
    }
}

export { Step, Steps };