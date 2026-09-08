# Trades Pro Marketing — Landing Pages

A self-contained, mobile-responsive lead-generation funnel built for **Trades Pro Marketing**, modeled on the high-converting pattern used by remodeling/trade-focused marketing agencies.

**`index.html`** — general trades offer/hero → survey → testimonials (text quotes + videos) → footer
**`thank-you.html`** — confirmation page after the survey is submitted
**`metal-buildings.html`** — vertical-specific sales page for metal building / pole barn contractors (see below)

Point your ads/links at whichever page matches the campaign — `index.html` for general trades, `metal-buildings.html` for metal building contractors.

## Files

```
index.html                  Main page: offer, survey, testimonials (general trades entry point)
thank-you.html               Confirmation page (VSL + testimonials)
metal-buildings.html         Sales page for metal building contractors, with a live building configurator demo
css/styles.css                Shared styling (black + red trades palette, matches logo) used by every page
css/metal-buildings.css       Extra styles for the configurator, pricing cards, and FAQ on metal-buildings.html
js/main.js                    Footer year
js/metal-buildings.js         Configurator geometry/pricing logic + lead form handling for metal-buildings.html
assets/img/logo.png        Your real logo — original colors, transparent background (favicon)
assets/img/logo-white.png  Your real logo — recolored white/red, transparent background (dark header/footer)
```

Open any `.html` file directly in a browser, or serve the folder with any static host, to preview.

## `metal-buildings.html` — the contractor sales page

This page pitches metal building / pole barn contractors on a done-for-you website with a built-in **"Design Your Own Building" configurator** — the tool their own homeowner visitors would use to pick a building size, roof style and colors and get an instant price estimate, which then becomes a qualified lead.

- The configurator (in the "Try The Live Demo" section) is a real, working widget — not a mockup. It's driven entirely by `js/metal-buildings.js`: dimensions/roof/colors update an SVG building preview and a price estimate live, using illustrative `$/sqft` rates in `BASE_RATES`. Swap those rates for a contractor's real numbers before quoting anyone for real.
- The **Packages** section is the upsell ladder (Starter Site → Growth Site → Elite Site + Configurator) — this is what you'd walk a contractor prospect through on a sales call.
- The lead form at the bottom (`#get-started`) auto-fills with whatever config the visitor tried in the demo. It currently has no backend wired up — `LEAD_ENDPOINT_URL` in `js/metal-buildings.js` is empty, so submissions just show a success message locally. Point it at a webhook (GHL, Zapier, your CRM), or replace the `<form>` with a GHL survey iframe embed the same way `index.html` does, before sending real traffic.
- Testimonials and stats are placeholders — swap them for real client results before launch, same as the rest of the site.

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

## 3. GHL Survey — already connected

The survey section in `index.html` (between the offer and testimonials) has your live GHL survey embedded:

```html
<iframe src="https://api.leadconnectorhq.com/widget/survey/tun1SD6PHfLc4ovBnPAc"
        style="border:none;width:100%;height:100%;min-height:700px;"
        scrolling="no" id="tun1SD6PHfLc4ovBnPAc" title="survey"></iframe>
```

plus the required `form_embed.js` script before `</body>`. If you swap in a different survey later, replace just the `src` URL and `id` with the new one from the survey's **Embed** option in GHL.

**Note — this replaced the calendar:** the calendar booking widget that used to sit here has been swapped out for this survey, per your last request (offer → survey → testimonials, no separate calendar section). If your GHL survey doesn't already end with its own booking/calendar step, you'll want to add one in GHL so people can still actually book a call — otherwise there's currently no calendar anywhere on the site. Let me know if you want the calendar added back (either alongside the survey, or as what the survey redirects to).

Note: this sandbox's network policy blocks `leadconnectorhq.com`, so neither this nor the testimonial videos could be visually verified from here — but the markup is standard GHL embed syntax and will render normally once the page is hosted for real or opened in GHL.

## 4. Thank-you page (`thank-you.html`)

A simple, single-focus follow-up page that visitors land on after booking — logo, confirmation message, VSL slot, testimonials, minimal footer. No nav, no upsell sections, matching the "keep it simple" style of the reference funnel page.

**To add your VSL:** open `thank-you.html`, find the `<div class="video-embed" id="vslEmbed">` block, and replace the `.embed-placeholder` div inside it with your video's embed code (Wistia, Vimeo, YouTube, or a GHL Video element). The `.video-embed` container already handles the responsive 16:9 sizing, rounded corners, and shadow — just drop an `<iframe>` (or GHL's video embed snippet) directly inside it.

**To update testimonials:** the three `.testimonial-card` blocks (still placeholder quotes/names) can be edited in place, or swapped for real quotes.

**To connect it to your survey:** in GHL, open your survey's settings and look for its "after submit" / redirect action, and set it to your hosted `thank-you.html` URL (e.g. `https://yourdomain.com/thank-you.html`). That makes GHL send people here automatically right after they submit the survey, instead of showing its default confirmation screen.

## 5. Integrating into GoHighLevel

You have two options. Option A puts the pages directly inside GHL's Sites/Funnels product (what most people mean by "put it in GHL"). Option B hosts them elsewhere and only uses GHL for the survey/automations.

### Option A — Paste it into a GHL Funnel/Website (recommended)

GHL's page builder can't read relative file paths like `css/styles.css` or `assets/img/logo.png` — its Custom Code element only accepts one self-contained HTML block. So instead of pasting `index.html` / `thank-you.html` as-is, use the pre-built files in **`ghl-embed/`**, which have the CSS and JS already inlined:

- `ghl-embed/main-page-embed.html` → for the main page (offer + survey + testimonials)
- `ghl-embed/thank-you-embed.html` → for the follow-up step

Steps:
1. **Upload your logo images to GHL first**, so they have a public URL Custom Code can point to:
   - In GHL: **Sites → Media Storage** (or **Settings → Media Storage**) → Upload `assets/img/logo.png` and `assets/img/logo-white.png`.
   - Click each uploaded file and copy its URL.
2. **Open each file in `ghl-embed/`** in a text editor and replace every `{{LOGO_WHITE_URL}}` with the logo-white.png URL you just copied (2 occurrences per file).
3. **Create the funnel:** in GHL go to **Sites → Funnels → + New Funnel**, name it, and add two steps — Main, Thank You — each on a **blank** template so there's no pre-built content in the way.
4. On the Main step, delete any default sections GHL added, drag in a **Custom Code / Custom HTML** element covering the page, and paste in the entire contents of your edited `main-page-embed.html`. Save.
5. Repeat for the Thank You step using `thank-you-embed.html`.
6. **Set your favicon** separately — that's a page/funnel **Settings** option in GHL (not part of the Custom Code block); upload `assets/img/logo.png` there.
7. **Publish the funnel**, then connect your real domain under **Settings → Domains** if you don't want to launch on GHL's default subdomain.
8. **Point the survey's redirect** (survey settings → after-submit action) at the published Thank You step's URL.
9. **Point your ads/links at the Main step's URL** — that's the funnel's entry point.
10. **Test it end to end**: open the published Main step, submit the survey, confirm you land on Thank You, and confirm the contact shows up in GHL.

The survey iframe and `form_embed.js` script are already correct GHL syntax in these embed files, so you don't need to touch those — they just need to be inside a live GHL page (or any real domain) to work; they won't render from a local file.

### Option B — Host it yourself, use GHL only for survey/automations

1. Deploy this repo's root folder (as-is, with the relative paths intact) to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own server.
2. Point your domain at it. The GHL survey embed and redirect work exactly the same either way.

Option A keeps everything inside GHL (one dashboard, easier for non-technical edits later via the page builder). Option B is faster to stand up and easier to keep in version control, but lives outside GHL.

## 6. Lead capture / form → GHL automations

`index.html` drives all traffic straight to the survey rather than a separate form, so every submission already creates/updates a GHL contact automatically — no extra webhook needed.

## 7. Content you'll likely want to personalize

- Phone number and email in the footer (`tel:` / `mailto:` links)
- Testimonials — `thank-you.html` still has placeholder quotes/names; `index.html`'s text quotes are the same placeholders, and its video testimonials are real Loom videos but still have generic "Client Testimonial" captions until you send over the real names/businesses
- Stats in the hero trust bar (`$14M+`, `3,200+`, `4.9/5`)
- The 90-day money-back guarantee copy (hero headline and the survey section's checklist on `index.html`) — this is a real refund promise as written, so make sure it matches what you're actually willing to honor before this goes live, or swap it for a guarantee you can back up
- The "3 new clients per month" scarcity claim in the urgency copy if that's not accurate
- Whether you still want a calendar/booking step somewhere (see the note in section 3) — right now nothing on the site actually books a call unless your GHL survey handles that itself
