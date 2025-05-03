class Friend {
    id: number;
    followee_id: number;
    follower_id: number;
    
    constructor(id: number, followee_id: number, follower_id: number) {
        this.id = id;
        this.followee_id = followee_id;
        this.follower_id = follower_id;
    }
}

class Friends {
    FriendArr: Friend[];

    constructor(FriendArr: Friend[]) {
        this.FriendArr = FriendArr;
    }

    add(friend: Friend): void {
        this.FriendArr.push(friend);
    }

    findFollower(user_id: number): number[] {
        return this.FriendArr.filter(f => f.followee_id === user_id).map(f => f.follower_id)
    }
}

export { Friend, Friends };