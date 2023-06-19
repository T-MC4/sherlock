import { ReactNode } from "react";

export function getActionSteps(priorityConstraint: string): ReactNode {
    if (priorityConstraint === "Setter Output Is Too Low") {
        return (
            <div>
                <p>a. Raise KPI's</p>
                <p className="ml-2">i. Increase Your Output KPI's For Your Setters. We Recommend Setting A KPI Of "20 1 Minute Conversations OR 4 Sets"</p>
                <p className="ml-2">ii. Your Setters Dial Output Should Be 200% Of Total Leads, So For Example: If You Get 50 New Leads Per Day, Each Setter Should Be Making bare minimum 100 Dials</p>
                <p>b. Hire More Setters</p>
                <p className="ml-2">i. Your ads/marketing should produce 50 new leads/day for each setter you have on your team. This will compound over time, as you will exhaust leads by day 3-4 of their lifecycle. That means each setter will have a pool of 150-200 leads to allow them to reach daily KPI. If you are producing more than 50 new leads per setter, hire another setter.</p>
            </div>
        )
    } else if (priorityConstraint === "Organic Output Is Too Low") {
        return (
            <div>
                <p>a. Your system is producing repeatable results, increase your outreach</p>
                <p className="ml-2">i. If you are utilizing cold email, purchase a second sending domain to allow for more sending. If you are doing social media outreach, add a VA to your outreach to 2x output.</p>
            </div>
        )
    } else if (priorityConstraint === "Pickup-To-Set Rate Is Too Low") {
        return (
            <div>
                <p>a. Refer to the “Straight Line Of Evaluation” to identify the problem areas for your setters (Found in the appointment setting training)</p>
                <p className="ml-2">i. Low pickup-to-set rate is most often caused by 1 of 3 areas of the set call: Introduction, Gap, or Button Down</p>
                <p className="ml-2">ii. Once you have identified the core constraint, implement training on that ONE specific area. If no improvement is occurring, look into adjusting your script.</p>
                <p className="ml-2">iii. By the end of this evaluation, you should be able to identify the single core constraint and begin testing solutions 1-by-1 until the constraint is solved.</p>
            </div>
        )
    } else if (priorityConstraint === "Show Rate Is Too Low") {
        return (
            <div>
                <p>a. Implement the $100 no-show fee</p>
                <p className="ml-2">i. Ensure you and/or your setters are confident and convicted in this process. The no-show fee is a filter, not a threat.</p>
                <p>b. Implement The Pre-Call Video</p>
                <p className="ml-2">i. This process will add an extra layer of excitement and urgency for your prospects. Ensure you build a compelling and informative video.</p>
                <p className="ml-2">ii. If you have your pre-call video implemented: </p>
                <p className="ml-4">1. Add more context</p>
                <p className="ml-5">a. This could be context on the results you've provided for past customers/clients or context on how the system works</p>
                <p className="ml-4">2. Make sure you make note of the no-show fee in the video</p>
            </div>
        )
    } else if (priorityConstraint === "Close Rate Is Too Low") {
        return (
            <div>
                <p>a. Ensure prospects are watching pre-call video</p>
                <p className="ml-2">i. Check your pre-call video watch rate. Low watch rate can cause a low close rate. If this is the case, ensure your setters are buttoning down watching the video when booking appointments.</p>
                <p>b. Eliminate the common objections</p>
                <p className="ml-2">i. Identify what the root cause is. Are your prospects saying "i'm not interested", are they financially incapable of purchasing, are you getting spouse/partner objections, etc? Each case will have a different solution.</p>
                <p className="ml-2">ii. Once you've identified the root cause, reverse engineer the solution. For example:</p>
                <p className="ml-4">
                    1. My close rate is 15%<br/>
                    2. 50% of my calls are "i'm not interested" objections<br/>
                    3. I'm going to test a new discovery in my close call<br/>
                    4. The new discovery will build a deeper gap<br/>
                    5. The deeper gap will build more desire<br/>
                    6. Test
                </p>
                <p className="ml-2">iii. Or example two:</p>
                <p className="ml-4">
                    1. My close rate is 15%
                    2. 50% of my calls are financial DQ's
                    3. My setters are not qualifying in their calls
                    4. I'm going to test a tougher qualifying process in my setter script
                    5. I'm going to review calls on well qualified sets
                    6. The qualifications will filter our DQ's
                    7. Test
                </p>
            </div>
        )
    } else if (priorityConstraint === "DQ Rate Is Too High") {
        return (
            <div>
                <p>a. Test new ads audiences</p>
                <p className="ml-2">i. Your ads are optimizing for DQ'd leads, it's time to test new audiences</p>
                <p>b. Add a clear call out in your headlines</p>
                <p className="ml-2">ii. "Attention: Busy parents making over $10k per month, etc……"</p>
                <p>c. Implement an attribution software like HYROS, Cometly, or ThoughtMetric</p>
                <p className="ml-2">iii. Attribution software will allow you to feed data back on qualified leads and optimize your ads based on those prospects</p>
            </div>
        )
    } else if (priorityConstraint === "Organic Response Rate Is Too Low") {
        return (
            <div>
                <p>a. Use a more friend-to-friend introduction</p>
                <p className="ml-2">
                    i. Your copy could be too sales focused. Don't sell your product in a DM / Email, leave the selling for the phone<br/>
                    ii. Test new introductions based on the "context based conversation" framework in the Hunting For Deals training.<br/>
                    iii. Be a service to those you reach out to, it should not feel as if you have anything to sell
                </p>
                <p>b. Test new Call-To-Actions</p>
                <p className="ml-2">i. Here's a short list of CTA's that have been winners for us, use your creative freedom on these:</p>
                <p className="ml-4">
                    1. Let's hop on for a quick 7-10 minute chat, I'll show you how I [overcame constraint / fixed problem]<br/>
                    2. Can I steal you away for a 15-minute phone call tomorrow at 5 pm PST?<br/>
                    3. Is fixing [pain point] a high priority for you now?<br/>
                    4. Do I have your permission to share a personalized video on how I can help you with [goal]?
                </p>
            </div>
        )
    } else if (priorityConstraint === "Organic Set Rate Is Too Low") {
        return (
            <div>
                <p>a. Ensure your response time is sub 5 minutes</p>
                <p className="ml-2">i. People move quick, never let a response go cold</p>
                <p>b. Offer more value</p>
                <p className="ml-2">i. For example:</p>
                <p className="ml-4">
                   1. If your current CTA is something like this: "Let's hop on a quick call", try adding more value: “I want to take 5-10 minutes and show you how I fixed [problem], give you some insight into how i've helped a friend [overcome issue, fix problem] and overall just be a resource for you, I know the pain you're going through so I'd be more than happy to help you fix it”
                </p>
            </div>
        )
    } else if (priorityConstraint === "Cost Per Lead Is Too High") {
        return (
            <div>
                <p>a. This is typically a reaction to a deeper root cause</p>
                <p className="ml-2">i. Are your CPM's above $75?</p>
                <p className="ml-4">1. Test new ad creatives</p>
                <p className="ml-5">
                    a. Blend new videos and images into your campaigns<br/>
                    b. Change the scenery of the videos, add motion or brighter environments<br/>
                    c. Add transitions, keep the focal point moving<br/>
                    d. Create curiosity with physical objects (juggling for example)<br/>
                </p>
                <p className="ml-2">ii. Is your CTR below 1.5%?</p>
                <p className="ml-4">a. Test new headlines</p>
                <p className="ml-5">i. Your headlines are not inciting enough curiosity, test 2-3 new ones</p>
                <p className="ml-4">b. Add a mix of long-form and short-form copy</p>
                <p className="ml-5">i. If your copy is leaning one way or the other, add more of what you're not using. Tell more stories, use case studies, shorten your copy if you only use long form to only include the pre, main, and sub headline</p>
                <p className="ml-2">iii. Is your opt-in rate below 10%?</p>
                <p className="ml-4">1. Your funnel is too “noisy” - SIMPLIFY</p>
                <p className="ml-5">a. Limit the visuals in your funnel. Use no more than 3 colors, eliminate flashy or loud backgrounds, eliminate all buttons that distract from the goal - conversions</p>
                <p className="ml-4">2. Shorten the opt-in form</p>
                <p className="ml-5">a. Your opt-in form should only include name, email, and phone number</p>
                <p className="ml-4">3. Delete unnecessary copy</p>
                <p className="ml-5">a. Your funnel should include your headline, small amounts of social proof, and your opt-in buttons, no more</p>
                <p className="ml-4">4. If you need more to reference, head to the "Building The Funnel" training and copy our template</p>
            </div>
        )
    } else if (priorityConstraint === "CPM's Are Too High") {
        return (
            <div>
                <p>a. Test new ad creatives</p>
                <p className="ml-2">
                    i. Blend new videos and images into your campaigns<br/>
                    ii. Change the scenery of the videos, add motion or brighter environments<br/>
                    iii. Add transitions, keep the focal point moving<br/>
                    iv. Create curiosity with physical objects (juggling for example)
                </p>    
            </div>
        )
    } else if (priorityConstraint === "CTR Is Too Low") {
        return (
            <div>
                <p>a. Test new headlines</p>
                <p className="ml-2">
                    i. Your headlines are not inciting enough curiosity, test 2-3 new ones
                </p>
                <p>b. Add a mix of long-form and short-form copy</p>
                <p className="ml-2">
                    i. If your copy is leaning one way or the other, add more of what you're not using. Tell more stories, use case studies, shorten your copy if you only use long form to only include the pre, main, and sub headline
                </p>
            </div>
        )
    } else if (priorityConstraint === "Opt-In Rate Is Too Low") {
        return (
            <div>
                <p>a. Your funnel is too “noisy” - SIMPLIFY</p>
                <p className="ml-2">
                    i. Limit the visuals in your funnel. Use no more than 3 colors, eliminate flashy or loud backgrounds, eliminate all buttons that distract from the goal - conversions
                </p>
                <p>b. Shorten the opt-in form</p>
                <p className="ml-2">i. Your opt-in form should only include name, email, and phone number</p>
                <p>c. Delete unnecessary copy</p>
                <p className="ml-2">i. Your funnel should include your headline, small amounts of social proof, and your opt-in buttons, no more</p>
                <p>d. If you need more to reference, head to the “Building The Funnel” training and copy our template</p>
            </div>
        )
    } else if (priorityConstraint === "PiF Rate Is Too Low") {
        return (
            <div>
                <p>a. Tighten up your qualifications</p>
                <p className="ml-2">
                    i. We recommend 700+CS & $40k+ Annual Income for tier 1 qualifications
                </p>
                <p>b. Ensure your setters are qualifying correctly</p>
                <p className="ml-2">i. Review set calls to confirm you setters are screening deep enough</p>
                <p className="ml-4">
                    1. The difference between "is your credit score above 700" and "So [name], the last time you checked your credit, what was your transunion score specifically? And when was that that you checked?" is detrimental to your qualification process
                </p>
            </div>
        )
    } else if (priorityConstraint === "Collection Rate Is Too Low") {
        return (
            <div>
                <p>a. Get agreements signed before the funding process begins</p>
                <p className="ml-2">
                    i. If you have a high backout rate, we want to get more skin in the game and concrete commitment bias from the prospect
                </p>
                <p>b. Take small deposits before running through funding</p>
                <p className="ml-2">
                    i. Like above, we want to create a commitment bias. Take $500-1,000 deposits before attempting to run through funding. If you have to, take even as small as $100 deposits.
                </p>
            </div>
        )
    } else if (priorityConstraint === "Return On Ad Spend Is Too Low") {
        return (
            <div>
                <p>a. This is a reaction from a deeper root cause, let's identify</p>
                <p className="ml-2">
                    i. Check your other potential constraints and identify needle moving areas that are underperformed in the business (is your set team underperformed, is your close rate suffering, etc)<br/>
                    ii. Once identified, put 100% of your energy into solving the one core constraint at hand<br/>
                    iii. Remember the principles of machine mindset: Identify through analysis, Hypothesize potential solutions, Test your theory, Evaluate results, Solution found or new theory tested until solved.
                </p>
                <p>b. Raise your prices</p>
                <p className="ml-2">
                    i. If you are charging less than $5,800 for your offer, evaluate how to bring more perceived value to your offer and increase your price. The same % of people saying yes at $1,500-$2,500 will still say yes at $5,800, $9,800, or more, it's how we position the offer.
                </p>
            </div>
        )
    } else {
        return "Invalid Constraint";
    }
}
