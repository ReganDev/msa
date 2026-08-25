/* ============================================================
   Common injuries & conditions
   ------------------------------------------------------------
   One entry per panel on /conditions.

   COPY STATUS: client-approved. The body copy below was written
   and signed off by Matthew — transcribed from his document with
   only light editing for house style (sentence-case headings,
   third person, UK punctuation). Three points depart from the
   source and were agreed separately:
     - ticks are reserved for the "assessment will include"
       checklists; symptom and cause lists use plain bullets;
     - "nerve pain is nothing to worry about" softened to
       "common and usually settles";
     - red-flag notes added to lower back pain and sciatica,
       which the FAQs used to carry.
   Edit the text here, not in the components.
   ============================================================ */

export interface ConditionSection {
  heading: string
  /** Paragraphs before any list. */
  body?: string[]
  /** Plain bulleted list — symptoms, causes, aggravating factors, related conditions. */
  bullets?: string[]
  /** Ticked list — reserved for the "assessment will include" checklists. */
  ticks?: string[]
  /** Paragraphs after the list, e.g. a closing caveat. */
  outro?: string[]
  /**
   * Renders open and uncollapsible instead of as a dropdown. Reserved for the
   * red-flag sections: nobody should have to click to find the symptoms that
   * mean A&E rather than an appointment.
   */
  alwaysOpen?: boolean
}

/**
 * Body region, used to group the picker on /conditions. Cervicogenic headaches
 * sit under the neck deliberately — they arise from it, which is the point the
 * copy makes.
 */
export type Region = 'Back & neck' | 'Shoulder & elbow' | 'Hip, knee & ankle'

export interface Condition {
  /** URL fragment: /conditions#<slug> */
  slug: string
  /** Display name, as supplied by the client */
  name: string
  region: Region
  /** Card / hero image on /conditions */
  image: string
  imageAlt: string
  /**
   * Per-condition meta description. Currently unused — the separate condition
   * pages were folded into /conditions, which has its own description in
   * src/routes.ts. Kept as authored copy for structured data.
   */
  metaDescription: string
  /** One or two sentences directly under the condition heading */
  intro: string
  sections: ConditionSection[]
}

/** Ordered head to toe: spine, neck, head, shoulder, elbow, hip, knee, ankle. */
export const conditions: Condition[] = [
  {
    slug: 'lower-back-pain',
    name: 'Lower Back Pain',
    region: 'Back & neck',
    image: '/conditions/lower-back-pain.jpg',
    imageAlt: 'Person at a desk holding their lower back, suggesting lumbar pain',
    metaDescription:
      'Osteopathy for lower back pain in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight at the Tennis Centre, Avebury Rd.',
    intro:
      'Lower back pain is one of the most common reasons people see an osteopath. Most episodes settle well, and the right assessment helps you understand what is driving your symptoms and what to do about them.',
    sections: [
      {
        heading: 'What is lower back pain?',
        body: [
          'Lower back pain describes discomfort felt in the lumbar region between the bottom of the ribs and the top of the pelvis. It may remain in the back or spread into the buttock, hip or leg.',
          'Back pain is very common and, in most cases, does not mean that the spine is seriously damaged. Symptoms may come from several sensitive structures, including the joints, muscles, ligaments, discs and nerves.',
        ],
      },
      {
        heading: 'What causes lower back pain?',
        body: [
          'Lower back pain may appear to begin after lifting, twisting, exercising or spending a long time in one position. However, these movements are not always the sole cause. They may simply be the point at which pain begins after several contributing factors have gradually built up.',
          'These factors may include:',
        ],
        bullets: [
          'Poor or reduced-quality sleep.',
          'Increased stress.',
          'Inadequate nutrition or hydration.',
          'Fatigue and insufficient recovery.',
          'A sudden increase in physical activity.',
          'Repetitive lifting or bending.',
          'Reduced strength or physical conditioning.',
          'Staying in one position for prolonged periods.',
          'Previous episodes of back pain.',
          'Irritation or sensitivity involving a spinal joint, muscle, disc or nerve.',
        ],
        outro: [
          'For example, bending or twisting may trigger pain on a particular day, but poor sleep, stress, fatigue and reduced recovery may have already made the back more sensitive beforehand.',
        ],
      },
      {
        heading: 'How can I tell whether the pain may involve a nerve?',
        body: [
          'Nerve-related pain from the lower back is common and usually settles. It may cause pain that travels from the back or buttock into the leg.',
          'Possible signs include:',
        ],
        bullets: [
          'Shooting or electric-shock-like pain.',
          'Pain travelling below the knee.',
          'Pins and needles or numbness.',
          'Weakness in the leg, ankle or foot.',
          'Leg pain that is stronger than the back pain.',
        ],
        outro: [
          'Pain travelling into the leg is not always caused by a nerve. Muscles and joints can also refer pain into the buttock or thigh, so a physical assessment is important.',
        ],
      },
      {
        heading: 'Why lower back pain can persist',
        body: [
          'Sensitivity over damage. Pain does not always persist because tissue is still damaged. The nervous system can become more protective following an injury or repeated flare-ups.',
          'The sensitivity cycle. Sleep difficulties, stress, worries about movement, reduced activity and loss of strength can all increase sensitivity. This can create a cycle in which pain leads to less movement, and reduced movement makes it harder to regain confidence and function.',
          'Gradual recovery. Persistent pain often responds best to a gradual plan that helps you understand your symptoms, remain active and rebuild your tolerance to movement.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: ['Your assessment will include:'],
        ticks: [
          'A detailed conversation to understand your symptoms, concerns and goals.',
          'A physical and active examination of your lower back, as well as the joints and muscles above and below your spine, as these areas can sometimes contribute to or maintain your pain.',
          'A clear explanation of the findings so you can better understand the cause of your discomfort.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation and activity modifications to help you return to your normal activities and reach your goals.',
        ],
      },
      {
        heading: 'When to seek urgent medical advice',
        alwaysOpen: true,
        body: [
          'A small number of symptoms need same-day medical attention rather than an osteopathic appointment. Contact your GP or go to A&E if you develop numbness around the groin or saddle area, loss of bladder or bowel control, or rapidly worsening weakness in one or both legs. These are rare, and checking for signs like them is part of every assessment.',
        ],
      },
    ],
  },
  {
    slug: 'sciatica',
    name: 'Sciatica',
    region: 'Back & neck',
    image: '/conditions/sciatica.jpg',
    imageAlt: 'Person gripping their thigh, suggesting sciatic or leg pain',
    metaDescription:
      'Osteopathy for sciatica and nerve-related leg pain in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight.',
    intro:
      'Sciatica describes pain that travels along the path of the sciatic nerve, often into the buttock and down the leg. Working out what is irritating the nerve is what shapes the treatment plan.',
    sections: [
      {
        heading: 'What is sciatica?',
        body: [
          'Sciatica is a term used to describe symptoms caused by the irritation or compression of a nerve in the lower back.',
        ],
      },
      {
        heading: 'Common symptoms',
        body: ['Common symptoms include:'],
        bullets: [
          'Radiating pain that travels from the lower back through the buttock and down the back of the leg, sometimes reaching the calf, foot or toes.',
          'Neurological sensations such as pins and needles, numbness or weakness in the affected leg.',
        ],
      },
      {
        heading: 'How to tell sciatica from other back pain',
        body: [
          'Sciatica is more likely when leg pain is a prominent symptom and follows the specific pathway of the nerve, particularly when accompanied by tingling, numbness, altered sensation or muscle weakness.',
          'By contrast, non-nerve-related injuries are typically more focal, unlikely to travel below the knee, and are not associated with neurological symptoms.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: ['Your assessment will include:'],
        ticks: [
          'A detailed conversation to understand your symptoms, concerns and goals.',
          'A physical and active examination of your lower back, hip and leg, along with the joints and muscles above and below, to identify where the nerve is being irritated.',
          'A clear explanation of the findings so you can better understand the cause of your symptoms.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation and activity modifications to help you return to your normal activities and reach your goals.',
        ],
      },
      {
        heading: 'When to seek urgent medical advice',
        alwaysOpen: true,
        body: [
          'Go to A&E if you develop numbness around the groin or saddle area, loss of bladder or bowel control, or rapidly worsening weakness in both legs. These are rare but need immediate assessment.',
        ],
      },
    ],
  },
  {
    slug: 'neck-pain',
    name: 'Neck Pain',
    region: 'Back & neck',
    image: '/conditions/neck-pain.jpg',
    imageAlt: 'Person holding the back of their neck in discomfort',
    metaDescription:
      'Osteopathy for neck pain and stiffness in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight at the Tennis Centre, Avebury Rd.',
    intro:
      'Neck pain may be felt anywhere from the base of the skull to the shoulders and upper back. Most episodes are not caused by serious damage, but the symptoms can affect sleep, concentration, work and exercise.',
    sections: [
      {
        heading: 'What is neck pain?',
        body: [
          'Neck pain may be felt anywhere from the base of the skull to the shoulders and upper back. It may develop suddenly, such as after an awkward movement, or gradually over time.',
          'Most episodes of neck pain are not caused by serious damage. The symptoms can, however, significantly affect sleep, concentration, work, driving and exercise.',
        ],
      },
      {
        heading: 'What can cause neck pain?',
        body: ['Common contributing factors include:'],
        bullets: [
          'Spending long periods in one position.',
          'A sudden increase in work, exercise or lifting.',
          'Sleeping in an unfamiliar position.',
          'Stress, fatigue or poor sleep.',
          'Reduced strength or movement.',
          'Irritation of the muscles or joints.',
          'Age-related changes in the neck.',
          'A previous injury, including whiplash.',
        ],
      },
      {
        heading: 'What symptoms can occur?',
        body: ['Neck pain may involve:'],
        bullets: [
          'Aching or stiffness.',
          'Pain when turning or tilting the head.',
          'Muscle tightness around the neck and shoulders.',
          'Headaches beginning near the back of the head.',
          'Pain around the shoulder blade.',
          'Pain travelling into the arm.',
          'Pins and needles, numbness or weakness if a nerve is irritated.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: ['The assessment and treatment process will include:'],
        ticks: [
          'A detailed conversation to understand your symptoms and concerns.',
          'A physical examination of the neck, as well as the joints and muscles above and below it, such as the shoulders and upper back, to identify factors contributing to your pain.',
          'A clear explanation of the findings so you can better understand what treatment and rehabilitation will entail.',
          'Manual, hands-on treatment and professional advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you regain strength and mobility, and reach your goals.',
          'A gradual plan for returning to regular activity or sport.',
        ],
      },
      {
        heading: 'Other conditions of the neck osteopathy can treat',
        bullets: [
          'Disc prolapses and herniations.',
          'Facet joint irritation.',
          'Muscle and ligament sprains in the neck.',
          'Age-related changes in the neck (osteoarthritis).',
          'Temporomandibular joint (TMJ) issues.',
          'Neck sporting injuries.',
          'Whiplash.',
          'Cervicogenic headaches.',
          'Postural pain.',
        ],
      },
    ],
  },
  {
    slug: 'cervicogenic-headaches',
    name: 'Cervicogenic Headaches',
    region: 'Back & neck',
    image: '/conditions/cervicogenic-headaches.jpg',
    imageAlt: 'Therapist treating the base of the neck with thumbs',
    metaDescription:
      'Osteopathy for cervicogenic headaches (headaches arising from the neck) in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight.',
    intro:
      'A cervicogenic headache is a headache linked to structures in or around the neck. Sensitive muscles and joints in the upper neck can refer pain into the head.',
    sections: [
      {
        heading: 'What are cervicogenic headaches?',
        body: [
          'A cervicogenic headache is a headache associated with structures in or around the neck. Sensitive muscles and joints in the upper neck can refer pain into the head.',
          'The headache may begin around the base of the skull before spreading towards the side or front of the head. Symptoms are often felt on one side, although this is not always the case.',
          'Cervicogenic headaches are considered secondary headaches, because the symptoms are linked to the neck rather than beginning within the head itself.',
        ],
      },
      {
        heading: 'Symptoms can include',
        bullets: [
          'Neck pain or stiffness.',
          'Reduced neck movement.',
          'Pain triggered or aggravated by moving the neck.',
          'Tenderness at the top of the neck.',
          'A tight band, or throbbing pain, around the temple, forehead or behind the eye.',
          'Symptoms after remaining in one position for a long time.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: [
          'Headaches are a common reason people seek care, but their causes, symptoms and intensity can differ greatly from person to person.',
          'The assessment and treatment process will include:',
        ],
        ticks: [
          'A detailed conversation to understand your specific symptoms and concerns.',
          'A physical examination of the joints and muscles in the neck and shoulders; identifying restrictions in these areas can help pinpoint what is contributing to or maintaining your pain.',
          'A clear explanation of the findings so you can better understand what treatment and rehabilitation will entail.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you achieve your specific goals.',
        ],
      },
    ],
  },
  {
    slug: 'rotator-cuff',
    name: 'Rotator Cuff Shoulder Pain',
    region: 'Shoulder & elbow',
    image: '/conditions/rotator-cuff.jpg',
    imageAlt: 'Person holding their shoulder, suggesting rotator cuff pain',
    metaDescription:
      'Osteopathy for rotator cuff and shoulder pain in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight.',
    intro:
      'The rotator cuff is a group of four muscles that control and stabilise the shoulder. Irritation or overload within these tendons is one of the most common sources of shoulder pain.',
    sections: [
      {
        heading: 'What is the rotator cuff?',
        body: [
          'The rotator cuff is a group of four muscles and their tendons that surround the shoulder joint.',
          'These muscles help keep the ball of the shoulder centred in its socket. They also help you lift and rotate your arm during everyday activities such as dressing, reaching, carrying and exercising.',
        ],
      },
      {
        heading: 'What rotator cuff pain feels like',
        body: [
          'Rotator cuff-related pain can develop gradually or follow an injury. Symptoms may include:',
        ],
        bullets: [
          'Pain when lifting the arm.',
          'Difficulty reaching overhead or behind the back.',
          'Pain when putting on a coat or fastening clothing.',
          'Discomfort when carrying or lifting.',
          'Weakness or reduced confidence using the arm.',
          'Pain at night, particularly when lying on the affected side.',
          'Clicking or a crackling sensation during movement.',
        ],
      },
      {
        heading: 'Where is rotator cuff pain normally felt?',
        body: [
          'Pain is commonly felt around the front or the side of the shoulder. This often occurs because the deltoid, the muscle on the side of the shoulder, takes on increased force to compensate for the rotator cuff. While the pain may travel down the outer upper arm, it does not usually extend into the hand.',
          'Shoulder pain can also originate from the neck, joints or other structures. Numbness, pins and needles, or symptoms travelling into the hand may indicate that the nerves or neck require assessment.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: [
          'Your assessment will consider the shoulder itself as well as the neck, upper back and shoulder blade.',
          'The assessment will include:',
        ],
        ticks: [
          'A detailed conversation to understand your symptoms, concerns and goals.',
          'A physical examination of your shoulder, as well as the joints and muscles above and below it, as these areas can often contribute to or maintain your pain.',
          'A clear explanation of the findings so you can better understand what may be causing your discomfort.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you return to your normal activities and reach your goals.',
        ],
      },
      {
        heading: 'Other conditions osteopathy can treat around the shoulder',
        bullets: [
          'Frozen shoulder.',
          'Adhesive capsulitis.',
          'Bursitis.',
          'Osteoarthritis.',
          'Tendinopathies.',
          'Acromioclavicular joint (ACJ) pain.',
          'Chronic shoulder instability.',
        ],
      },
    ],
  },
  {
    slug: 'tennis-elbow',
    name: 'Tennis Elbow',
    region: 'Shoulder & elbow',
    image: '/conditions/tennis-elbow.jpg',
    imageAlt: 'Tennis player holding their elbow in pain',
    metaDescription:
      'Osteopathy for tennis elbow (lateral elbow tendinopathy) in Orpington. Assessment, hands-on treatment and loading rehabilitation with Matthew Knight.',
    intro:
      'Tennis elbow affects the tendons that attach the forearm muscles to the outside of the elbow. Despite the name, you do not have to play tennis to develop it.',
    sections: [
      {
        heading: 'What is tennis elbow?',
        body: [
          'Tennis elbow is a painful condition affecting the tendons that attach the forearm muscles to the outside of the elbow. Its medical name is lateral elbow tendinopathy.',
          'Despite its name, you do not have to play tennis to develop it. Symptoms may include:',
        ],
        bullets: [
          'Pain or tenderness on the outside of the elbow.',
          'Pain when gripping, lifting or carrying.',
          'Discomfort when opening jars or turning a door handle.',
          'Pain when using a mouse, keyboard or hand tools.',
          'Reduced grip strength.',
        ],
      },
      {
        heading: 'How does tennis elbow develop?',
        body: [
          'Tennis elbow commonly develops when the muscles and tendons of the forearm are repeatedly placed under more demand than they are used to, causing the tendon to struggle to adapt. It often follows a sudden increase in activity rather than one specific injury.',
          'Activities that may contribute include:',
        ],
        bullets: [
          'Racquet sports.',
          'Weight training.',
          'Repetitive gripping.',
          'Manual work or DIY.',
          'Gardening.',
          'Frequent computer or mouse use.',
          'Repeated lifting with the palm facing down.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: [
          'Treatment begins by identifying which movements and activities are placing the greatest demand on your tendon. Your assessment will consider the elbow itself, as well as the wrist, shoulder and potentially the neck.',
          'The assessment will include:',
        ],
        ticks: [
          'A conversation to understand your symptoms, concerns and goals.',
          'A physical examination of the elbow, wrist, shoulder and neck to identify how these areas may be contributing to or maintaining your pain.',
          'A clear explanation of the findings so you can better understand the cause of your discomfort.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you reach your goals.',
        ],
        outro: [
          'Tendons can take time to adapt, so consistent rehabilitation and sensible activity management are usually more helpful than complete long-term rest.',
        ],
      },
      {
        heading: 'Other conditions osteopathy can treat around the elbow',
        bullets: [
          'Golfer’s elbow.',
          'Cubital tunnel syndrome.',
          'Olecranon bursitis.',
          'Osteoarthritis.',
          'Muscle and ligament strains and sprains.',
        ],
      },
    ],
  },
  {
    slug: 'gluteal-tendinopathy',
    name: 'Hip Pain: Gluteal Tendinopathy',
    region: 'Hip, knee & ankle',
    image: '/conditions/gluteal-tendinopathy.jpg',
    imageAlt: 'Person holding their hip, suggesting hip or gluteal pain',
    metaDescription:
      'Osteopathy for gluteal tendinopathy and pain on the outside of the hip, in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight.',
    intro:
      'Gluteal tendinopathy is one of the most common causes of pain on the outside of the hip. It occurs when the gluteal tendons become painful and less able to tolerate load.',
    sections: [
      {
        heading: 'What are the glutes?',
        body: ['The gluteal muscles are a group of three muscles located in the buttocks:'],
        bullets: [
          'Gluteus maximus.',
          'Gluteus medius.',
          'Gluteus minimus.',
        ],
        outro: [
          'Their tendons attach these muscles to the pelvis and the upper part of the thigh bone, the femur.',
        ],
      },
      {
        heading: 'Why the glutes matter',
        body: ['The gluteal muscles are essential for movement and stability. They help:'],
        bullets: [
          'Move the hip.',
          'Support the pelvis.',
          'Control the leg when walking or running.',
          'Maintain balance when standing on one leg.',
          'Generate power when climbing stairs, jumping or sprinting.',
          'Control the position of the hip and knee during movement.',
        ],
      },
      {
        heading: 'What is gluteal tendinopathy?',
        body: [
          'Gluteal tendinopathy occurs when one or more of the gluteal tendons become painful and less able to tolerate load. Pain is usually felt around the bony area on the outside of the hip and may spread down the outer thigh.',
          'Symptoms may be aggravated by:',
        ],
        bullets: [
          'Lying on the painful side.',
          'Crossing the legs.',
          'Walking for long periods.',
          'Climbing stairs or hills.',
          'Standing on one leg.',
          'Running or jumping.',
          'Getting up after sitting.',
          'A sudden increase in exercise.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: ['The assessment and treatment process will include:'],
        ticks: [
          'A detailed conversation to understand your symptoms and concerns.',
          'A physical examination of the hip and the joints above and below it; identifying restrictions in these areas can help pinpoint what is contributing to or maintaining your pain.',
          'A clear explanation of the findings so you can better understand what treatment and rehabilitation will entail.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you regain strength and mobility, and reach your goals.',
          'A gradual plan for returning to regular activity or sport.',
        ],
      },
      {
        heading: 'Other conditions osteopathy can treat around the hip',
        bullets: [
          'Labrum pathologies.',
          'Osteoarthritis.',
          'Femoroacetabular impingement (FAI).',
          'Bursitis around the hip joint.',
          'Tendinopathies around the hip.',
          'Muscle strains around the hip.',
        ],
      },
    ],
  },
  {
    slug: 'knee-meniscus',
    name: 'Meniscus Injury',
    region: 'Hip, knee & ankle',
    image: '/conditions/knee-meniscus.jpg',
    imageAlt: 'Therapist examining a patient\'s knee',
    metaDescription:
      'Osteopathy for meniscus and knee cartilage injuries in Orpington. Assessment, hands-on treatment and rehabilitation with Matthew Knight.',
    intro:
      'The menisci are two C-shaped pieces of cartilage that cushion and stabilise each knee. Meniscus pain can follow a twist, or build gradually with no clear injury at all.',
    sections: [
      {
        heading: 'What is the meniscus?',
        body: [
          'The menisci are two strong, C-shaped pieces of cartilage inside each knee. They sit between the thigh bone and shin bone, where they help distribute pressure, absorb force and support the stability of the knee.',
          'You have an inner meniscus, known as the medial meniscus, and an outer meniscus, known as the lateral meniscus.',
        ],
      },
      {
        heading: 'Why meniscus injuries happen',
        body: [
          'A meniscus can be injured when the knee twists while the foot remains planted. This may happen during sport, when changing direction, squatting or getting up awkwardly.',
          'Meniscus pain can also develop gradually. As the tissue changes with age, it may become more sensitive during everyday activities, even when there has not been a clear injury.',
        ],
      },
      {
        heading: 'Common symptoms',
        body: ['Symptoms can include:'],
        bullets: [
          'Pain along the joint line of the knee.',
          'Clicking, catching or a feeling that the knee may give way.',
          'Pain along the inside or outside of the knee.',
          'Swelling or stiffness.',
          'Difficulty fully bending or straightening the knee.',
          'Pain when twisting, squatting or using stairs.',
        ],
      },
      {
        heading: 'Why this injury can take time to heal',
        body: [
          'Some parts of the meniscus have a better blood supply than others. Areas with limited blood flow may take longer to heal.',
          'Recovery also depends on the location and size of the injury, how it occurred, your general health and the demands placed on your knee. Many meniscus injuries can improve without surgery, but progress may be gradual.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: [
          'Your assessment will consider your knee movement, strength and balance, and the way your hip, ankle and foot may interact with the knee.',
          'The assessment will include:',
        ],
        ticks: [
          'A conversation to understand your symptoms, concerns and goals.',
          'A physical and active assessment of the knee, hip, spine, ankle and foot; identifying where there is restriction can help with rehabilitation of the knee.',
          'A clear explanation of the findings so you can better understand what rehabilitation and treatment will entail.',
          'Manual, hands-on treatment and advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you reach your goals.',
        ],
      },
      {
        heading: 'Other conditions osteopathy can treat around the knee',
        bullets: [
          'Osteoarthritis.',
          'ACL and PCL injuries.',
          'Patellofemoral pain syndrome.',
          'Hoffa’s fat pad syndrome.',
          'Runner’s knee.',
          'Bursitis around the knee.',
          'MCL, LCL and other ligament injuries.',
        ],
      },
    ],
  },
  {
    slug: 'ankle-sprains',
    name: 'Ankle Sprains',
    region: 'Hip, knee & ankle',
    image: '/conditions/ankle-sprains.jpg',
    imageAlt: 'Runner holding their ankle after a sprain',
    metaDescription:
      'Osteopathy for ankle sprains and ligament injuries in Orpington. Assessment, hands-on treatment and a graded return to sport with Matthew Knight.',
    intro:
      'An ankle sprain happens when one or more of the ligaments supporting the ankle are overstretched or torn. Most settle well with the right balance of protection, movement and graded loading.',
    sections: [
      {
        heading: 'What is an ankle sprain?',
        body: [
          'An ankle sprain occurs when one or more of the ligaments supporting the ankle are overstretched or torn. Ligaments are strong bands of tissue that connect one bone to another and help control excessive movement at a joint.',
        ],
      },
      {
        heading: 'How ankle sprains happen',
        body: [
          'The most common ankle sprain happens when the foot suddenly rolls inwards, straining the ligaments on the outside of the ankle. Common causes include:',
        ],
        bullets: [
          'Landing awkwardly from a jump.',
          'Changing direction during sport.',
          'Stepping off a kerb.',
          'Walking or running on an uneven surface.',
          'Losing balance while wearing unsuitable footwear.',
        ],
      },
      {
        heading: 'What are the signs of an ankle sprain?',
        body: ['Symptoms vary depending on the severity of the sprain. Common signs include:'],
        bullets: [
          'Pain around the ankle.',
          'Swelling.',
          'Bruising.',
          'Difficulty walking.',
          'Reduced ankle movement.',
          'Tenderness around the outside of the foot.',
          'A feeling of weakness or instability.',
        ],
      },
      {
        heading: 'How osteopathy can help',
        body: [
          'In the early stages, your ankle may need protection and a temporary modification of painful activities. As symptoms improve, movement and loading can usually be gradually reintroduced.',
          'Your assessment will consider the ankle itself, as well as the foot, knee and hip. It will include:',
        ],
        ticks: [
          'A conversation to understand your symptoms, concerns and goals.',
          'A physical examination of the ankle, foot, knee and hip; identifying restrictions in these areas can help with rehabilitation of the injury.',
          'A clear explanation of the findings so you can better understand what treatment and rehabilitation will entail.',
          'Manual, hands-on treatment and tailored advice based on the assessment findings.',
          'Rehabilitation advice and activity modifications to help you regain strength and mobility, and reach your goals.',
          'A gradual plan for returning to regular activity or sport.',
        ],
      },
    ],
  },
]

export const conditionBySlug = new Map(
  conditions.map((condition) => [condition.slug, condition]),
)

/**
 * Conditions bucketed into their regions, in authored order. Shared by the
 * /conditions rail and the nav dropdown so both stay in step with the data.
 */
export const conditionGroups = conditions.reduce<
  { region: Region; items: Condition[] }[]
>((acc, condition) => {
  const last = acc[acc.length - 1]
  if (last?.region === condition.region) last.items.push(condition)
  else acc.push({ region: condition.region, items: [condition] })
  return acc
}, [])

/**
 * Slugs that were published under an earlier name. Kept so old links and
 * bookmarks still land on the right panel rather than falling back to the
 * first one.
 */
const renamedSlugs: Record<string, string> = {
  'sciatica-slipped-disc': 'sciatica',
}

/** Current slug for `slug`, or undefined if no such condition exists. */
export function resolveSlug(slug: string): string | undefined {
  const current = renamedSlugs[slug] ?? slug
  return conditionBySlug.has(current) ? current : undefined
}
