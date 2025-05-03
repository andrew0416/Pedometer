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
    
    // userId와 date에 해당하는 goal[] 반환
    filterByUserIdAndDate(userId: number, date: string){
        return this.goalArr.filter(goal => {
            const dateOnly = goal.date.split('T')[0];
            return goal.user_id === userId && dateOnly === date;
        });
    }
}

export { Goal, Goals };


