class Step {
    id: number;
    uid: number;
    count: number;
    created_at: string;

    constructor(id: number, uid: number, count: number, created_at: string) {
        this.id = id;
        this.uid = uid;
        this.count = count;
        this.created_at = created_at;
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
}

export { Step, Steps };