# Trades Pro Marketing — Landing Page

A self-contained, mobile-responsive lead-generation funnel built for **Trades Pro Marketing**, modeled on the high-converting pattern used by remodeling/trade-focused marketing agencies. It's a 3-step flow:

**`survey.html` (entry point) → `index.html` (offer + calendar) → `thank-you.html` (confirmation, VSL, testimonials)**

Point your ads/links at `survey.html` — that's the first thing visitors see, not `index.html`.

## Files

```
survey.html          Step 1: quick qualifying survey (GHL Survey/Form embed slot)
index.html           Step 2: main offer page + calendar booking
thank-you.html        Step 3: post-booking confirmation page (VSL + testimonials)
css/styles.css        All styling (black + red trades palette, matches logo), shared by all three pages
js/main.js            Mobile nav toggle, FAQ accordion, footer year
assets/img/logo.png        Your real logo — original colors, transparent background (favicon)
assets/img/logo-white.png  Your real logo — recolored white/red, transparent background (dark header/footer)
```

Open any of the three HTML files directly in a browser, or serve the folder with any static host, to preview.

## 1. Logo

`assets/img/logo.png` is your real logo, pulled directly from the file you shared, with the white background removed (transparent PNG) so it drops cleanly onto any section.

`assets/img/logo-white.png` is the same artwork with the black portions recolored white (red stays red) for use on the dark header/footer — the original file has a black silhouette that would disappear against a black background, so this reversed version is used there instead. It's a programmatic recolor, not a separate file you sent, so double-check it against your actual brand guidelines if you have a formal reversed/white logo version already.

If you'd rather supply your own pre-made white/reversed version instead of the auto-generated one, drop it in as `assets/img/logo-white.png` (same filename) and it'll be picked up automatically.

## 2. Brand colors

Colors are defined once at the top of `css/styles.css`, matched to the logo:

```css
:root{
  --navy-900:#0d0d0d;  /* near-black, header/footer/dark sections */
  --orange:#e4172a;    /* brand red, buttons/accents */
  ...
}
```

Change these values and every section updates automatically.

## 3. GHL Calendar — already connected

The booking section in `index.html` already has your live calendar embedded:

```html
<iframe src="https://api.leadconnectorhq.com/widget/bookings/test-test-personal-calendar-0xxmpurse-fb0febbb-a2e2-4578-84ce-3a34a0b51e4eh7ypkq"
        style="width:100%;height:100%;min-height:700px;border:none;overflow:hidden"
        scrolling="no" id="ghl-calendar" title="Book your free strategy call"></iframe>
```

plus the required `form_embed.js` script before `</body>`. If you swap calendars later, replace just the `src` URL with the new one from **Settings → Calendars → (your calendar) → Embed Code**.

Note: this sandbox's network policy blocks `leadconnectorhq.com`, so it couldn't be visually verified from here — but the markup is standard GHL embed syntax and will render normally once the page is hosted for real or opened in GHL.

## 4. Survey page (`survey.html`) — the new front door

This is the first page visitors land on, before they ever see the offer or calendar. It's intentionally minimal: logo, a short "before we book your call" intro, and your live GHL survey embedded below it.

```html
<iframe src="https://api.leadconnectorhq.com/widget/survey/tun1SD6PHfLc4ovBnPAc" style="border:none;width:100%;" scrolling="no" id="tun1SD6PHfLc4ovBnPAc" title="survey"></iframe>
```

plus the required `form_embed.js` script before `</body>`. If you swap in a different survey later, replace just the `src` URL and `id` with the new one from the survey's **Embed** option in GHL.

Note: this sandbox's network policy blocks `leadconnectorhq.com`, so it couldn't be visually verified from here (same limitation as the calendar embed) — but the markup is standard GHL embed syntax and will render normally once the page is hosted for real or opened in GHL.

**To chain it to the rest of the funnel:** in your survey's settings in GHL, set the "after submit" action to **redirect to a URL**, pointing at your hosted `index.html` (the booking page). That's what actually makes this "the first thing they see" — GHL sends people from the survey straight into the offer/calendar page once they finish, no custom JS gating required.

## 5. Thank-you page (`thank-you.html`)

A simple, single-focus follow-up page that visitors land on after booking — logo, confirmation message, VSL slot, testimonials, minimal footer. No nav, no upsell sections, matching the "keep it simple" style of the reference funnel page.

**To add your VSL:** open `thank-you.html`, find the `<div class="video-embed" id="vslEmbed">` block, and replace the `.embed-placeholder` div inside it with your video's embed code (Wistia, Vimeo, YouTube, or a GHL Video element). The `.video-embed` container already handles the responsive 16:9 sizing, rounded corners, and shadow — just drop an `<iframe>` (or GHL's video embed snippet) directly inside it.

**To update testimonials:** the three `.testimonial-card` blocks are identical in structure to the ones on the main page — copy/paste more, or edit the quote/name text in place.

**To connect it to your calendar:** in GHL, open your calendar's settings and look for **Actions → Redirect URL / Confirmation Page** (naming varies slightly by GHL version), and set it to your hosted `thank-you.html` URL (e.g. `https://yourdomain.com/thank-you.html`). That makes GHL send people here automatically right after they book, instead of showing its default confirmation screen.

## 6. Integrating into GoHighLevel

You have two options. Option A puts the pages directly inside GHL's Sites/Funnels product (what most people mean by "put it in GHL"). Option B hosts them elsewhere and only uses GHL for the survey/calendar/automations.

### Option A — Paste it into a GHL Funnel/Website (recommended)

GHL's page builder can't read relative file paths like `css/styles.css` or `assets/img/logo.png` — its Custom Code element only accepts one self-contained HTML block. So instead of pasting `survey.html` / `index.html` / `thank-you.html` as-is, use the pre-built files in **`ghl-embed/`**, which have the CSS and JS already inlined:

- `ghl-embed/survey-embed.html` → for the survey/entry funnel step
- `ghl-embed/main-page-embed.html` → for the main offer + calendar step
- `ghl-embed/thank-you-embed.html` → for the follow-up step

Steps:
1. **Upload your logo images to GHL first**, so they have a public URL Custom Code can point to:
   - In GHL: **Sites → Media Storage** (or **Settings → Media Storage**) → Upload `assets/img/logo.png` and `assets/img/logo-white.png`.
   - Click each uploaded file and copy its URL.
2. **Open each file in `ghl-embed/`** in a text editor and replace every `{{LOGO_WHITE_URL}}` with the logo-white.png URL you just copied (2 occurrences per file).
3. **Create the funnel:** in GHL go to **Sites → Funnels → + New Funnel**, name it, and add three steps — Survey, Booking, Thank You — each on a **blank** template so there's no pre-built content in the way.
4. On the Survey step, delete any default sections GHL added, drag in a **Custom Code / Custom HTML** element covering the page, and paste in the entire contents of your edited `survey-embed.html`. Save.
5. Repeat for the Booking step using `main-page-embed.html`, and the Thank You step using `thank-you-embed.html`.
6. **Set your favicon** separately — that's a page/funnel **Settings** option in GHL (not part of the Custom Code block); upload `assets/img/logo.png` there.
7. **Publish the funnel**, then connect your real domain under **Settings → Domains** if you don't want to launch on GHL's default subdomain.
8. **Chain the steps together**: set your survey's post-submit redirect (survey settings → after-submit action) to the published Booking step's URL, and your calendar's redirect (calendar settings → Actions → Redirect URL) to the published Thank You step's URL.
9. **Point your ads/links at the Survey step's URL** — that's the funnel's actual entry point now, not the Booking page.
10. **Test it end to end**: open the published Survey step, fill it out, confirm you land on the Booking page, book a real test appointment, confirm you land on Thank You, and confirm the contact shows up in GHL.

The calendar iframe and `form_embed.js` script are already correct GHL syntax in these embed files, so you don't need to touch those — they just need to be inside a live GHL page (or any real domain) to work; they won't render from a local file.

### Option B — Host it yourself, use GHL only for survey/calendar/automations

1. Deploy this repo's root folder (as-is, with the relative paths intact) to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own server.
2. Point your domain at it, and point your ads/links at `survey.html` (not `index.html`). The GHL survey/calendar embeds and redirects work exactly the same either way.

Option A keeps everything inside GHL (one dashboard, easier for non-technical edits later via the page builder). Option B is faster to stand up and easier to keep in version control, but lives outside GHL.

## 7. Lead capture / form → GHL automations

The survey step (`survey.html`) is now the top-of-funnel qualifier — once you've built it in GHL and wired up the redirect (see section 4), every submission already creates/updates a GHL contact automatically, and every calendar booking on the following step updates that same contact. No extra webhook needed for either.

## 8. Content you'll likely want to personalize

- Phone number and email in the footer (`tel:` / `mailto:` links)
- Testimonials (currently placeholder quotes/names)
- Stats in the hero trust bar (`$14M+`, `3,200+`, `4.9/5`)
- The 90-day money-back guarantee copy (hero, guarantee section, booking list) — this is a real refund promise as written, so make sure it matches what you're actually willing to honor before this goes live, or swap it for a guarantee you can back up
- The "3 new clients per month" scarcity claim in the urgency copy if that's not accurate
