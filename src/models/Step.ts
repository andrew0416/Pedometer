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

    // userId와 date에 해당하는 step[] 반환
    filterByUserIdAndDate(userId: number, date: string): Step[] {
        return this.stepArr.filter(step => {
            const dateOnly = step.created_at.split('T')[0];
            return step.user_id === userId && dateOnly === date;
        });
    }

    // userId와 date range에 해당하는 step[] 반환
    filterByUserIdAndDateRange(user_id:number, startDate: string, endDate: string): Step[] {
        return this.stepArr.filter(step => {
            const dateOnly = step.created_at.split('T')[0];
            return step.user_id ===  user_id && dateOnly >= startDate && dateOnly <= endDate;
        });
    }

    // // date range에 해당하는 step[] 반환
    // filterByDateRange(startDate: string, endDate: string): Step[] {
    //     return this.stepArr.filter(step => {
    //         const dateOnly = step.created_at.split('T')[0];
    //         return dateOnly >= startDate && dateOnly <= endDate;
    //     });
    // }
}

export { Step, Steps };