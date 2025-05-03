import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    constructor(FriendArr: Friend[] = []) {
        this.FriendArr = FriendArr;
    }
    async add(friend: Friend): Promise<void> {
        await prisma.friend.create({
            data: {
                followeeId: friend.followee_id,
                followerId: friend.follower_id,
            },
        });
    }

    async delete(friend: Friend): Promise<number> {
        const deleted = await prisma.friend.deleteMany({
            where: {
                followerId: friend.follower_id,
                followeeId: friend.followee_id,
            },
        });
        return deleted.count;
    }

    async findFollower(user_id: number): Promise<number[]> {
        const friends = await prisma.friend.findMany({
            where: {
                followeeId: user_id,
            },
        });

        return friends.map(f => f.followerId);
    }
}

export { Friend, Friends };