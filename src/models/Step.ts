class Step {
    id: number;
    user_id: number;
    count: number;
    created_at: string;

    constructor(id: number, user_id: number, count: number, created_at: string) {
        this.id = id;
        this.user_id = user_id;
        this.count = count;
        this.created_at = created_at;
    }

    getCount(): number{
        return this.count
    }

}

class Steps {
    stepArr: Step[];

    constructor(stepArr: Step[]) {
        this.stepArr = stepArr;
    }

    add(step: Step): void {
        this.stepArr.push(step);
    }

    filterByDate(date: string): Step[] {
        return this.stepArr.filter(step => step.created_at.split(' ')[0] === date);
    }

    filterByDateRange(startDate: string, endDate: string): Step[] {
        const filteredArr = this.stepArr.filter(step => {
            const dateOnly = step.created_at.split('T')[0];
            return dateOnly >= startDate && dateOnly <= endDate;
        });
        return filteredArr
    }

    filterByUserId(userId: number): Step[] {
        return this.stepArr.filter(step => step.user_id === userId);
    }

    filterByUserIdAndDate(userId: number, date: string): Step[] { // 나중에 수정할 수 있음
        return this.stepArr.filter(step => {
            const stepDate = step.created_at.split(' ')[0];
            return step.user_id === userId && stepDate === date;
        });
    }





}

export { Step, Steps };