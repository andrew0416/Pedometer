class RankingBoard {
    rankHeap: { user_Id: number; stepCount: number }[]

    constructor() {
        this.rankHeap = [];
    }

    addUser(user_Id: number, stepCount: number): void {
        this.rankHeap.push({ user_Id, stepCount });
        this.heapify();
    }
    private heapify(): void {
        this.rankHeap.sort((a, b) => b.stepCount - a.stepCount); // 높은 순
    }

    getRanking(): { user_Id: number; stepCount: number }[] {
        return this.rankHeap;
    }
    
}

export { RankingBoard };