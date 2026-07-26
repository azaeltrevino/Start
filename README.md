# Trades Pro Marketing — Landing Page

A self-contained, mobile-responsive lead-generation funnel built for **Trades Pro Marketing**, modeled on the high-converting pattern used by remodeling/trade-focused marketing agencies. It's a 2-step flow:

**`index.html` (entry point: offer + calendar) → `thank-you.html` (confirmation, VSL, testimonials)**

Point your ads/links at `index.html` — that's the first thing visitors see.

## Files

```
index.html           Step 1: main offer page + calendar booking (entry point)
thank-you.html        Step 2: post-booking confirmation page (VSL + testimonials)
css/styles.css        All styling (black + red trades palette, matches logo), shared by every page
js/main.js            Footer year
assets/img/logo.png        Your real logo — original colors, transparent background (favicon)
assets/img/logo-white.png  Your real logo — recolored white/red, transparent background (dark header/footer)
survey.html           Not part of the funnel right now — see section 7
```

Open `index.html` or `thank-you.html` directly in a browser, or serve the folder with any static host, to preview.

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

## 4. Thank-you page (`thank-you.html`)

A simple, single-focus follow-up page that visitors land on after booking — logo, confirmation message, VSL slot, testimonials, minimal footer. No nav, no upsell sections, matching the "keep it simple" style of the reference funnel page.

**To add your VSL:** open `thank-you.html`, find the `<div class="video-embed" id="vslEmbed">` block, and replace the `.embed-placeholder` div inside it with your video's embed code (Wistia, Vimeo, YouTube, or a GHL Video element). The `.video-embed` container already handles the responsive 16:9 sizing, rounded corners, and shadow — just drop an `<iframe>` (or GHL's video embed snippet) directly inside it.

**To update testimonials:** the three `.testimonial-card` blocks (still placeholder quotes/names) can be edited in place, or swapped for real quotes.

**To connect it to your calendar:** in GHL, open your calendar's settings and look for **Actions → Redirect URL / Confirmation Page** (naming varies slightly by GHL version), and set it to your hosted `thank-you.html` URL (e.g. `https://yourdomain.com/thank-you.html`). That makes GHL send people here automatically right after they book, instead of showing its default confirmation screen.

## 5. Integrating into GoHighLevel

You have two options. Option A puts the pages directly inside GHL's Sites/Funnels product (what most people mean by "put it in GHL"). Option B hosts them elsewhere and only uses GHL for the calendar/automations.

### Option A — Paste it into a GHL Funnel/Website (recommended)

GHL's page builder can't read relative file paths like `css/styles.css` or `assets/img/logo.png` — its Custom Code element only accepts one self-contained HTML block. So instead of pasting `index.html` / `thank-you.html` as-is, use the pre-built files in **`ghl-embed/`**, which have the CSS and JS already inlined:

- `ghl-embed/main-page-embed.html` → for the main offer + calendar step
- `ghl-embed/thank-you-embed.html` → for the follow-up step

(There's also a `ghl-embed/survey-embed.html` left over from an earlier 3-step version — ignore it unless you bring the survey step back; see section 7.)

Steps:
1. **Upload your logo images to GHL first**, so they have a public URL Custom Code can point to:
   - In GHL: **Sites → Media Storage** (or **Settings → Media Storage**) → Upload `assets/img/logo.png` and `assets/img/logo-white.png`.
   - Click each uploaded file and copy its URL.
2. **Open each file in `ghl-embed/`** in a text editor and replace every `{{LOGO_WHITE_URL}}` with the logo-white.png URL you just copied (2 occurrences per file).
3. **Create the funnel:** in GHL go to **Sites → Funnels → + New Funnel**, name it, and add two steps — Booking, Thank You — each on a **blank** template so there's no pre-built content in the way.
4. On the Booking step, delete any default sections GHL added, drag in a **Custom Code / Custom HTML** element covering the page, and paste in the entire contents of your edited `main-page-embed.html`. Save.
5. Repeat for the Thank You step using `thank-you-embed.html`.
6. **Set your favicon** separately — that's a page/funnel **Settings** option in GHL (not part of the Custom Code block); upload `assets/img/logo.png` there.
7. **Publish the funnel**, then connect your real domain under **Settings → Domains** if you don't want to launch on GHL's default subdomain.
8. **Point the calendar's redirect** (calendar settings → Actions → Redirect URL) at the published Thank You step's URL.
9. **Point your ads/links at the Booking step's URL** — that's the funnel's entry point.
10. **Test it end to end**: open the published Booking step, book a real test appointment, confirm you land on Thank You, and confirm the contact shows up in GHL.

The calendar iframe and `form_embed.js` script are already correct GHL syntax in these embed files, so you don't need to touch those — they just need to be inside a live GHL page (or any real domain) to work; they won't render from a local file.

### Option B — Host it yourself, use GHL only for calendar/automations

1. Deploy this repo's root folder (as-is, with the relative paths intact) to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own server.
2. Point your domain at it. The GHL calendar embed and redirect work exactly the same either way.

Option A keeps everything inside GHL (one dashboard, easier for non-technical edits later via the page builder). Option B is faster to stand up and easier to keep in version control, but lives outside GHL.

## 6. Lead capture / form → GHL automations

`index.html` drives all traffic straight to the calendar rather than a separate form, so every booking already creates/updates a GHL contact automatically — no extra webhook needed.

## 7. Survey page (`survey.html`) — built, but not currently part of the funnel

Earlier this became a 3-step funnel (Survey → Booking → Thank You), with a real GHL survey embedded on `survey.html`. That's been reverted back to 2 steps, so `survey.html` isn't linked from anywhere and isn't part of the live flow — but the file (and its live survey embed) is still sitting in the repo if you want it back:

- To re-add it as a front door: bring back a redirect chain — survey's post-submit action → `index.html`'s URL — and point your ads/links at `survey.html` instead of `index.html`.
- To bring it into GHL alongside the other two: use `ghl-embed/survey-embed.html` the same way as the other two files (Custom Code element on its own funnel step).

## 8. Content you'll likely want to personalize

- Phone number and email in the footer (`tel:` / `mailto:` links)
- Testimonials — `thank-you.html` still has placeholder quotes/names; `index.html`'s video testimonials are real Loom videos but still have generic "Client Testimonial" captions until you send over the real names/businesses
- Stats in the hero trust bar (`$14M+`, `3,200+`, `4.9/5`)
- The 90-day money-back guarantee copy (hero headline and the booking checklist on `index.html`) — this is a real refund promise as written, so make sure it matches what you're actually willing to honor before this goes live, or swap it for a guarantee you can back up
- The "3 new clients per month" scarcity claim in the urgency copy if that's not accurate
