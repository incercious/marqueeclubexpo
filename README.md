# Marquee — DDCUS club directory

A year-round, searchable directory of every club at Downtown Doral Charter
Upper School. Club info in `data/clubs.js` is real, pulled from the school's
own club directory — some clubs are still missing meeting times, join links,
or videos, since that's the gap this project is meant to close.

## Running it on your computer

You only need to do steps 1–2 once. After that, it's just step 3 every time.

**1. Install Node.js** (the program that runs this project)
Go to https://nodejs.org, download the **LTS** version, and install it like
any normal program. If you're not sure whether you already have it, open
your terminal and type `node -v` — if you see a version number, you're set.

**2. Install this project's dependencies**
Open a terminal, navigate into this folder, and run:
```
npm install
```
This downloads the small libraries the project uses (Next.js, React, and an
icon set). You'll see a `node_modules` folder appear — that's normal, don't
touch it.

**3. Start the site**
```
npm run dev
```
Then open **http://localhost:3000** in your browser. That's the live site,
running on your own computer. Edit any file and save it — the page updates
automatically, no restart needed.

To stop it, go back to the terminal and press `Ctrl + C`.

## What each part of the project does

```
data/clubs.js            ← ALL club and category info lives here.
                            This is the only file you edit to add,
                            remove, or update a club.

lib/theme.js              ← Colors and fonts, defined once. Change
                            a color here and it updates everywhere.

lib/schoolConfig.js        ← School name and contact handles. The
                            only file to edit if this ever gets
                            reused for a different school.

components/                Reusable pieces used across pages:
  Header.js                the top navigation bar
  Footer.js                 the bottom bar
  Logo.js                    the "marquee" wordmark/icon — edit
                              this to change branding
  ClubCard.js                 the card shown in club grids
  CategoryBadge.js             the small colored category pill
  VideoPlaceholder.js          the placeholder box where a real
                                video will eventually go
  TicketButton.js               the button style used everywhere

app/                       The actual pages. Next.js turns each
                            folder here into a real URL:
  page.js                    → yoursite.com/            (Home)
  explore/page.js            → yoursite.com/explore     (Explore)
  about/page.js               → yoursite.com/about       (About)
  clubs/[slug]/page.js         → yoursite.com/clubs/hosa,
                                 /clubs/robotics-club, etc. — ONE
                                 file generates a page for every
                                 club in data/clubs.js automatically
  layout.js                    wraps every page with the header
                                and footer
  globals.css                   loads the fonts, a few base styles
```

You'll see `"use client"` at the top of some files. That just marks a page
or component as interactive (it needs to respond to clicks, typing, etc.).
You don't need to do anything with it — just leave it as-is.

## Editing a club or adding a new one

Open `data/clubs.js`. Each club is one block like this:

```js
{
  slug: "key-club",                 // used in the URL: /clubs/key-club
  name: "Key Club",
  category: "service",              // must match an id from CATEGORIES above
  shortDescription: "...",          // shown on club cards
  longDescription: "...",           // shown on the club's own page
  meetingDays: "Tuesdays",          // optional -- leave out if unknown
  meetingTime: "3:15 – 4:15 PM",    // optional
  location: "Room 214",             // optional
  sponsor: "Ms. Heliana Vasquez",   // the faculty sponsor
  email: "hvasquez@dadeschools.net",// optional
  joinLink: "https://...",          // optional -- if missing, the site
                                     // shows an "email to join" button
                                     // using the sponsor's email instead
  social: { instagram: "https://instagram.com/ddcuskeyclub" },
  featured: true,                   // true = shows on the homepage
}
```

Any field left out (no meeting time, no join link, etc.) is just hidden on
the page instead of showing blank text — so it's fine to leave things out
for clubs that haven't provided that info yet.

Copy an existing block, change the values, give it a unique `slug`, and
save the file. A new page appears automatically at `/clubs/your-slug`.

## What's next (not built yet, on purpose)

This MVP intentionally does NOT yet have:
- A real admin form (right now, "adding a club" means editing `data/clubs.js` directly)
- Real video uploads (video is a placeholder box until clubs record theirs)
- Student/admin accounts or login

Those are the logical next steps once this is out in the world and being
used for real.
