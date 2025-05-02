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
}

export { Goal, Goals };


