/* ============================================================
   Blog posts
   ------------------------------------------------------------
   COPY STATUS: PLACEHOLDER. These are realistic drafts written
   to test the blog design against real structure (headings,
   lists, callouts, varied lengths). None of it is Matthew's
   writing and none of it is approved. Every post here is
   replaced by Sanity content before launch.

   The shape mirrors what the Sanity fetch will produce, so the
   pages built against it should not need to change.
   ============================================================ */

/** One block of article body. A small, hand-writable stand-in for Portable Text. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  /** Pulled-out line, set large. Use at most once per post. */
  | { type: 'quote'; text: string }
  /** Quiet emphasis panel — red flags, "when to get help". */
  | { type: 'note'; title?: string; text: string }

export interface Post {
  slug: string
  title: string
  /** One or two sentences. Card summary and meta description. */
  excerpt: string
  /** ISO date */
  publishedAt: string
  body: Block[]
}

const posts: Post[] = [
  {
    slug: 'desk-lower-back-pain',
    title: 'Why your lower back aches after a day at the desk',
    excerpt:
      'Sitting is not the enemy, but sitting still is. What actually loads your lower back at work, and five small changes that make a real difference.',
    publishedAt: '2026-10-14',
    body: [
      {
        type: 'p',
        text: 'It is one of the most common things people tell me in clinic: "I haven’t done anything, it just aches by the end of the day." No lifting, no fall, no obvious injury, just a dull, tight ache across the lower back that builds through the afternoon and eases by the morning.',
      },
      {
        type: 'p',
        text: 'The good news is that this pattern is rarely a sign of damage. Far more often it is a sign of a back that has been asked to hold one position for too long.',
      },
      { type: 'h2', text: 'It is not about perfect posture' },
      {
        type: 'p',
        text: 'For years we were told there was one correct way to sit: upright, feet flat, shoulders back. The research has moved on. There is no single posture that protects your back, and people with "poor" posture are not more likely to have back pain than people who sit bolt upright.',
      },
      {
        type: 'quote',
        text: 'Your best posture is your next posture. Movement matters more than position.',
      },
      {
        type: 'p',
        text: 'What does seem to matter is variety. Tissues like a change of load. Hold any position, even a good one, for two hours and the muscles and joints around your spine will start to complain.',
      },
      { type: 'h2', text: 'What is actually going on' },
      {
        type: 'p',
        text: 'When you sit for long periods, the muscles that support your spine work at a low level without a break, the hip flexors at the front of your hips stay shortened, and the joints of the lower back sit in one part of their range. None of this is harmful in itself, but together they produce that familiar stiff, achy feeling.',
      },
      { type: 'h3', text: 'Common contributing factors' },
      {
        type: 'ul',
        items: [
          'Long, unbroken stretches of sitting, often in meetings or on deadline',
          'A screen set too low, so you gradually slump towards it',
          'Low overall activity outside work, so the back is less conditioned',
          'Stress and poor sleep, which both lower your tolerance to discomfort',
        ],
      },
      { type: 'h2', text: 'Five changes that help' },
      {
        type: 'ol',
        items: [
          'Set a reminder to stand or walk for two minutes every 30 to 45 minutes.',
          'Raise your screen so the top of it sits roughly at eye level.',
          'Take phone calls standing up, or walking if you can.',
          'Alternate between sitting and standing if you have a sit-stand desk, rather than standing all day.',
          'Build some strength: a short routine of bridges, squats and planks a few times a week makes your back far more tolerant of long days.',
        ],
      },
      { type: 'h2', text: 'When to get it looked at' },
      {
        type: 'p',
        text: 'If the ache is lingering into the weekend, waking you at night, or starting to travel into your buttock or leg, it is worth an assessment. Osteopathic treatment can ease the stiffness, but the real value is working out what is driving it for you and building a plan that keeps it from coming back.',
      },
      {
        type: 'note',
        title: 'Get urgent help if',
        text: 'Back pain comes with numbness around the groin or buttocks, new difficulty controlling your bladder or bowels, or weakness in both legs. These are rare, but they need same-day medical attention: call 999 or go to A&E.',
      },
    ],
  },
  {
    slug: 'runners-knee',
    title: 'Runner’s knee: what it is and how to keep running',
    excerpt:
      'Pain around the kneecap is the most common running complaint there is. Why it happens, and why stopping completely is rarely the answer.',
    publishedAt: '2026-09-30',
    body: [
      {
        type: 'p',
        text: 'Patellofemoral pain, better known as runner’s knee, is a dull ache around or behind the kneecap. It tends to flare on hills, stairs and after sitting for a while with your knees bent, and it is the single most common reason runners come to see me.',
      },
      { type: 'h2', text: 'Why it happens' },
      {
        type: 'p',
        text: 'In most cases runner’s knee is a load problem rather than a structural one. The joint behind the kneecap has been asked to do more than it is currently prepared for, usually because training has ramped up quickly.',
      },
      {
        type: 'ul',
        items: [
          'A sudden jump in weekly distance, or a new hilly route',
          'Adding speed work or races without easing back elsewhere',
          'Weakness around the hips and thighs, which changes how the knee is loaded',
          'Less recovery than usual: poor sleep, a busy work period, illness',
        ],
      },
      {
        type: 'quote',
        text: 'The aim is not to stop running. It is to find the amount of running your knee can tolerate today, and build from there.',
      },
      { type: 'h2', text: 'What to do about it' },
      { type: 'h3', text: 'Adjust, don’t abandon' },
      {
        type: 'p',
        text: 'Complete rest tends to make the knee less tolerant, not more. Most runners do well by reducing distance and intensity to a level where pain stays mild (around 3 out of 10 or less) and settles by the next morning.',
      },
      { type: 'h3', text: 'Strengthen the hips and thighs' },
      {
        type: 'p',
        text: 'There is good evidence that strengthening the quadriceps and the muscles around the hip reduces pain and helps prevent it returning. Exercises like step-downs, split squats and side-lying leg raises are a good starting point.',
      },
      { type: 'h3', text: 'Rebuild gradually' },
      {
        type: 'p',
        text: 'Once the knee is settled, increase weekly distance gradually and change one thing at a time: distance, speed or terrain, not all three at once.',
      },
      {
        type: 'note',
        title: 'Worth knowing',
        text: 'Swelling, locking, or a knee that gives way is not typical of runner’s knee and should be assessed properly before you carry on running.',
      },
    ],
  },
  {
    slug: 'neck-tension-headaches',
    title: 'Headaches that start in your neck',
    excerpt:
      'If your headaches seem to begin at the base of your skull and creep forwards, your neck may be part of the story. Here is how to tell.',
    publishedAt: '2026-09-12',
    body: [
      {
        type: 'p',
        text: 'Not every headache comes from the head. Cervicogenic headaches are referred from the joints and muscles of the upper neck, and they behave differently from migraines or tension headaches.',
      },
      { type: 'h2', text: 'The typical pattern' },
      {
        type: 'ul',
        items: [
          'Usually on one side, and often the same side each time',
          'Starts at the base of the skull and spreads towards the forehead or behind the eye',
          'Brought on by neck movement or by holding one position, such as a long drive or a day at the screen',
          'The neck itself often feels stiff or restricted',
        ],
      },
      {
        type: 'p',
        text: 'Because the nerves of the upper neck share a pathway with nerves from the head, irritation in the neck can be felt as pain in the head. Treating the head alone, with painkillers for example, can leave the source untouched.',
      },
      {
        type: 'quote',
        text: 'Where you feel the pain and where it comes from are not always the same place.',
      },
      { type: 'h2', text: 'What helps' },
      {
        type: 'p',
        text: 'Hands-on treatment to the upper neck, combined with exercises to improve its movement and the endurance of the deep neck muscles, has good support for this type of headache. Simple changes to how you set up your desk and how often you move also matter.',
      },
      {
        type: 'ol',
        items: [
          'Chin tucks: gently draw your chin back, as if making a double chin, and hold for five seconds.',
          'Upper-back mobility: rotate through the upper back while seated, keeping the hips still.',
          'Screen at eye level, so you are not craning forwards all day.',
        ],
      },
      {
        type: 'note',
        title: 'See a GP urgently if',
        text: 'A headache is sudden and severe, comes with fever, a stiff neck, confusion, changes in vision, weakness or numbness, or is unlike any headache you have had before.',
      },
    ],
  },
  {
    slug: 'tennis-elbow',
    title: 'Tennis elbow isn’t just for tennis players',
    excerpt:
      'Most people with tennis elbow have never held a racket. Why the outside of the elbow gets sore, and how long it really takes to settle.',
    publishedAt: '2026-08-21',
    body: [
      {
        type: 'p',
        text: 'Lateral elbow tendinopathy, the proper name for tennis elbow, is pain on the outside of the elbow where the forearm muscles attach. It is most common between the ages of 35 and 55, and far more often caused by gripping, typing or DIY than by tennis.',
      },
      { type: 'h2', text: 'Why it gets sore' },
      {
        type: 'p',
        text: 'The tendon that attaches the wrist extensor muscles to the elbow does a lot of work whenever you grip. Repeated gripping, especially with the wrist bent back, can overload it faster than it adapts. The result is a tendon that becomes sensitive and less able to take load.',
      },
      {
        type: 'ul',
        items: [
          'Painful gripping: lifting a kettle, shaking hands, opening jars',
          'Tenderness on the bony point on the outside of the elbow',
          'Stiffness first thing in the morning',
        ],
      },
      { type: 'h2', text: 'How long it takes' },
      {
        type: 'p',
        text: 'Tendons are slow to change. With the right approach most people improve significantly over three to six months. That can feel like a long time, which is why understanding the plan matters as much as the treatment.',
      },
      {
        type: 'quote',
        text: 'Tendons respond to load. Rest calms them down, but only loading builds them back up.',
      },
      { type: 'h2', text: 'What a good plan includes' },
      {
        type: 'ol',
        items: [
          'Reducing the aggravating activity for a while, without stopping using the arm.',
          'A progressive strengthening programme for the forearm, starting with gentle holds.',
          'Looking at grip, tools and workstation set-up.',
          'Hands-on treatment to ease pain and keep the elbow, wrist and shoulder moving well.',
        ],
      },
    ],
  },
  {
    slug: 'ankle-sprain-first-72-hours',
    title: 'Rolled your ankle? The first 72 hours',
    excerpt:
      'What to do in the first three days after an ankle sprain, when to worry about a fracture, and why getting moving early pays off.',
    publishedAt: '2026-08-04',
    body: [
      {
        type: 'p',
        text: 'Ankle sprains are among the most common sports injuries, and most heal well. But how you manage the first few days has a real effect on how quickly you get back, and on whether it happens again.',
      },
      { type: 'h2', text: 'First, rule out a fracture' },
      {
        type: 'p',
        text: 'If you cannot take four steps on the injured ankle, or there is tenderness directly on the bony points of the ankle or the outside of the foot, get it checked at a minor injuries unit for an X-ray before anything else.',
      },
      { type: 'h2', text: 'Days one to three' },
      {
        type: 'ul',
        items: [
          'Protect it: avoid activities that clearly make it worse',
          'Elevate it above the level of your heart when resting',
          'Compression can help control swelling',
          'Move it gently within comfort: draw circles, point and flex the foot',
          'Walk on it as soon as you comfortably can, even with a slight limp',
        ],
      },
      {
        type: 'quote',
        text: 'Gentle movement early on is one of the best things you can do for a sprained ankle.',
      },
      { type: 'h2', text: 'After the first few days' },
      {
        type: 'p',
        text: 'Once swelling starts to settle, the focus moves to restoring movement, strength and balance. Balance work in particular is what helps prevent the repeat sprains that many people go on to have.',
      },
      {
        type: 'ol',
        items: [
          'Single-leg balance, building up to 30 seconds with your eyes closed.',
          'Calf raises, first on two legs, then on one.',
          'Hopping and change-of-direction drills before returning to sport.',
        ],
      },
    ],
  },
  {
    slug: 'sciatica-explained',
    title: 'Sciatica, explained',
    excerpt:
      'Pain that runs down the back of the leg can be alarming. What sciatica actually is, why it usually settles, and what you can do in the meantime.',
    publishedAt: '2026-07-17',
    body: [
      {
        type: 'p',
        text: '"Sciatica" describes pain that travels along the path of the sciatic nerve, from the lower back or buttock down the back of the leg, sometimes as far as the foot. It is a description of symptoms rather than a diagnosis in itself.',
      },
      { type: 'h2', text: 'What it feels like' },
      {
        type: 'ul',
        items: [
          'Burning, shooting or electric pain down one leg',
          'Pins and needles or numbness in the leg or foot',
          'Often worse with sitting, coughing or sneezing',
          'Leg pain that is worse than the back pain',
        ],
      },
      { type: 'h2', text: 'Why it usually settles' },
      {
        type: 'p',
        text: 'Most sciatica comes from irritation of a nerve root in the lower back, often from a disc. It can be very painful, but the body is remarkably good at resolving it: the majority of people improve significantly within six to twelve weeks.',
      },
      {
        type: 'quote',
        text: 'Nerve pain is common and usually settles. Understanding that is often the first step to feeling better.',
      },
      { type: 'h2', text: 'What helps in the meantime' },
      {
        type: 'ol',
        items: [
          'Stay as active as you can. Short, frequent walks are often easier than long ones.',
          'Change position regularly rather than sitting for long periods.',
          'Find positions of relief, such as lying on your back with your calves on a chair.',
          'Work with a practitioner on gentle nerve mobility and a graded return to activity.',
        ],
      },
      {
        type: 'note',
        title: 'Get urgent help if',
        text: 'You have numbness around the groin or buttocks, difficulty passing urine or controlling your bowels, or weakness in both legs. Call 999 or go to A&E.',
      },
    ],
  },
]

/** Newest first. */
export const allPosts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const postBySlug = new Map(allPosts.map((post) => [post.slug, post]))

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00`))

const blockText = (block: Block) =>
  'text' in block ? block.text : block.items.join(' ')

/** Minutes to read at ~220 wpm, never less than one. */
export function readingMinutes(post: Post) {
  const words = post.body.map(blockText).join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

/** Stable id for an h2, so a section can be linked to directly. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The newest posts other than this one. */
export const otherPosts = (post: Post, count = 2) =>
  allPosts.filter((other) => other.slug !== post.slug).slice(0, count)
