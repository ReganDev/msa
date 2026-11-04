/* ============================================================
   Patient reviews, shown in the carousel on the home page
   ------------------------------------------------------------
   Real Google reviews of Knight Osteopathy Orpington, copied
   from the listing in November 2026. The only editing:
     - curly apostrophes, no space before a comma, and a run of
       dots or a trailing "… More" set as a single ellipsis;
     - "5⭐️" set as "5★", so the emoji's colour doesn't clash
       with the palette;
     - lowercase display names capitalised.
   Shaun's, Iman's and daisydeb's reviews are cut short on
   Google behind "More". The text below stops where the copied
   text stopped. Swap in the full wording when it is available,
   but never add words a patient didn't write.

   Every review is five stars, confirmed by Regan on
   4 November 2026 (the copied text didn't carry the ratings).
   Dates are left out on purpose: "a month ago" would be out of
   date as soon as it was prerendered.

   Order matters a little: the two Jason Williams reviews are
   kept apart so the same name never appears twice in a row.
   ============================================================ */

export interface Review {
  name: string
  text: string
  /** Star rating out of 5, as given on Google. */
  rating: number
}

export const reviews: Review[] = [
  {
    rating: 5,
    name: 'Shaun Ward',
    text:
      'After a handful of sessions, I highly highly recommend Matthew. Before delving into solutions, he took the time to fully understand my area of difficulty and my hopes from treatment. He then explored and clearly explained potential causes…',
  },
  {
    rating: 5,
    name: 'Iman',
    text:
      'With Matthew’s support and expertise, he has helped to put together a clear and effective plan of treatment and exercises that’s really helped with my back pain.',
  },
  {
    rating: 5,
    name: 'Jason Williams',
    text:
      'If you need treatment, then defo go see Matthew, man knows his stuff, puts you at ease with his knowledge, and how he manipulates you, highly recommended, dont sit in pain, book a appointment and get it sorted…',
  },
  {
    rating: 5,
    name: 'Quinten Northfield',
    text:
      'I’m very happy with the treatment received from Matthew, and am starting to see progress for a long time issue I thought I was stuck with. Highly recommended. Thanks',
  },
  {
    rating: 5,
    name: 'Daisydeb',
    text:
      'Excellent. I have increased the range of movement in my left arm and for the first time in 15 years I can reach around my neck. He knows exactly where the location of any problem is and was able to improve…',
  },
  {
    rating: 5,
    name: 'Jason Williams',
    text:
      'Brilliant, great guy, knows his stuff, highly recommend to any one that needs treatment 5★',
  },
]
