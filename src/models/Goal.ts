class Goal {
    id: number;
    date: string;
    user_id: number;
    goal: number;

    constructor(id: number, date: string, user_id: number, goal: number) {
        this.id = id;
        this.date = date;
        this.user_id = user_id;
        this.goal = goal;
    }
}

class Goals {
    goalArr: Goal[];

    constructor(goalArr: Goal[]) {
        this.goalArr = goalArr;
    }

    add(goal: Goal): void {
        this.goalArr.push(goal);
    }

    // userId 말고 date도 고려해야 할 수도 있음음
    filterByUserId(userId: number): Goal[] {
        return this.goalArr.filter(goal => goal.user_id === userId);
    }
}

export { Goal, Goals };


