import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm";
import {db} from "./db"
import { userSubsription } from "./db/schema";

const DAY_IN_MS = 1000* 60 * 60 * 24
export const checkSubscription = async () => {
    const {userId} = await auth();
    if(!userId){
        return false
    }
    const _userSubscriptions = await db.select().from(userSubsription).where(eq(userSubsription.userId, userId))

    if (!_userSubscriptions[0]) {
        return false
    }

    const userSubsriptions = _userSubscriptions[0]

    const isValid = userSubsriptions.stripePriceId &&
     userSubsriptions.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now() 

    return !!isValid;

}