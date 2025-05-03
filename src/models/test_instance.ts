import { User, Users } from "./User";
import { Step, Steps } from "./Step";
import { Goal, Goals } from "./Goal";
import { Friend, Friends } from "./Friend";

let testUser1: User = new User(1, "abc@naver.com", "encodedPW1", "salt1", "Kim")
let testUser2: User = new User(2, "def@naver.com", "encodedPW2", "salt2", "hwang")
let testUser3: User = new User(3, "zyx@naver.com", "encodedPW3", "salt3", "cho")
let testUser4: User = new User(4, "zyx1@naver.com", "encodedPW4", "salt4", "choi")

let testUser: Users = new Users([testUser1, testUser2, testUser3, testUser4])

let friends1: Friend = new Friend(1, 1, 2)
let friends2: Friend = new Friend(2, 1, 3)
let friends3: Friend = new Friend(3, 2, 4)
let testFriends: Friends = new Friends([friends1, friends2, friends3])

let goal1: Goal = new Goal(1, "2025-04-16", 1, 3000)
let goal2: Goal = new Goal(2, "2025-04-30", 1, 5000)
let goal3: Goal = new Goal(3, "2025-05-03", 1, 4000)
let testGoals: Goals = new Goals([goal1, goal2, goal3])

let step1: Step = new Step(1, 1, 1500, "2025-04-17 12:50:50")
let step2: Step = new Step(2, 1, 1500, "2025-04-17 17:50:50")
let step3: Step = new Step(3, 1, 1500, "2025-04-30 12:50:50")
let step4: Step = new Step(4, 1, 1500, "2025-04-30 17:50:50")
let step5: Step = new Step(5, 1, 3000, "2025-05-02 12:50:50")
let step6: Step = new Step(6, 1, 1500, "2025-05-02 17:50:50")
let testSteps: Steps = new Steps([step1, step2, step3, step4, step5, step6])

let step7: Step = new Step(7, 2, 500, "2025-04-17 12:50:50")
let step8: Step = new Step(8, 2, 500, "2025-04-17 17:50:50")
let step9: Step = new Step(9, 2, 500, "2025-04-30 12:50:50")
let step10: Step = new Step(10, 2, 500, "2025-04-30 17:50:50")
let step11: Step = new Step(11, 2, 700, "2025-05-02 12:50:50")
let step12: Step = new Step(12, 2, 500, "2025-05-02 17:50:50")

let step13: Step = new Step(13, 3, 2500, "2025-04-17 12:50:50")
let step14: Step = new Step(14, 3, 2500, "2025-04-17 17:50:50")
let step15: Step = new Step(15, 3, 2500, "2025-04-30 12:50:50")
let step16: Step = new Step(16, 3, 2500, "2025-04-30 17:50:50")
let step17: Step = new Step(17, 3, 2700, "2025-05-02 12:50:50")
let step18: Step = new Step(18, 3, 2500, "2025-05-02 17:50:50")

let step19: Step = new Step(19, 1, 2700, "2025-05-03 12:50:50")
let step20: Step = new Step(20, 1, 2500, "2025-05-03 17:50:50")

let arr1to3: Step[] = [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13, step14, step15, step16, step17, step18, step19, step20]
arr1to3.sort(() => Math.random() - 0.5);

let testSteps2: Steps = new Steps(arr1to3)



export {
    testUser,
    testFriends,
    testGoals,
    testSteps,
    testSteps2
  };



  