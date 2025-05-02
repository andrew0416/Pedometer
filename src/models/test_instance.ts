import { User } from "./User";
import { Step, Steps } from "./Step";
import { Goal, Goals } from "./Goal";
import { Friend, Friends } from "./Friend";

let testUser1: User = new User(1, "abc@naver.com", "encodedPW1", "salt1", "Kim")
let testUser2: User = new User(2, "def@naver.com", "encodedPW2", "salt2", "hwang")
let testUser3: User = new User(3, "zyx@naver.com", "encodedPW3", "salt3", "cho")

let friends1: Friend = new Friend(1, 1, 2)
let friends2: Friend = new Friend(2, 1, 3)
let testFriends: Friends = new Friends([friends1, friends2])

let goal1: Goal = new Goal(1, "2025-04-16", 1, 3000)
let goal2: Goal = new Goal(2, "2025-04-30", 1, 5000)
let testGoals: Goals = new Goals([goal1, goal2])

let step1: Step = new Step(1, 1, 1500, "2025-04-17 12:50:50")
let step2: Step = new Step(2, 1, 1500, "2025-04-17 17:50:50")
let step3: Step = new Step(3, 1, 1500, "2025-04-30 12:50:50")
let step4: Step = new Step(4, 1, 1500, "2025-04-30 17:50:50")
let step5: Step = new Step(5, 1, 3000, "2025-05-02 12:50:50")
let step6: Step = new Step(6, 1, 1500, "2025-05-02 17:50:50")
let testSteps: Steps = new Steps([step1, step2, step3, step4, step5, step6])

export {
    testUser1,
    testUser2,
    testUser3,
    testFriends,
    testGoals,
    testSteps
  };



  