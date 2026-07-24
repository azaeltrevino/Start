# Trades Pro Marketing — Landing Page

A self-contained, mobile-responsive lead-generation landing page built for **Trades Pro Marketing**, modeled on the high-converting funnel pattern used by remodeling/trade-focused marketing agencies (hero offer → pain points → services → process → social proof → guarantee → calendar booking → FAQ → final CTA).

## Files

```
index.html          Main landing page
thank-you.html       Post-booking confirmation page (VSL + testimonials)
css/styles.css       All styling (black + red trades palette, matches logo), shared by both pages
js/main.js           Mobile nav toggle, FAQ accordion, footer year
assets/img/logo.png        Your real logo — original colors, transparent background (favicon)
assets/img/logo-white.png  Your real logo — recolored white/red, transparent background (dark header/footer)
```

Open `index.html` directly in a browser, or serve the folder with any static host, to preview.

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

**To update testimonials:** the three `.testimonial-card` blocks are identical in structure to the ones on the main page — copy/paste more, or edit the quote/name text in place.

**To connect it to your calendar:** in GHL, open your calendar's settings and look for **Actions → Redirect URL / Confirmation Page** (naming varies slightly by GHL version), and set it to your hosted `thank-you.html` URL (e.g. `https://yourdomain.com/thank-you.html`). That makes GHL send people here automatically right after they book, instead of showing its default confirmation screen.

## 5. Integrating into GoHighLevel

You have two options:

**Option A — Import as a GHL Funnel/Website page (recommended)**
1. In GHL, go to **Sites → Funnels (or Websites) → + New**.
2. Add a **Custom HTML/CSS/JS** element (or use "Import from URL/Code" if your subaccount has it) and paste the contents of `index.html`, `css/styles.css`, and `js/main.js` in, or upload the CSS/JS as custom code in the page's Settings → Custom CSS/Custom JS panels.
3. Rebuild the sections that need native GHL elements (the Calendar block, and the lead form if you want GHL to own submissions/automations) using GHL's drag-and-drop elements dropped into the matching sections — the rest of the page (hero, services, testimonials, FAQ) can stay as custom HTML.

**Option B — Host it yourself and link/iframe from GHL**
1. Deploy this folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.) or your own server.
2. Point your domain (or a subdomain) at it, or embed it inside a GHL page via an iframe element pointing to your hosted URL.

Option A is generally better for lead tracking, since GHL's native form/calendar elements automatically create contacts and trigger your automations. Option B is faster to stand up if you just need the page live.

## 6. Lead capture / form → GHL automations

This page currently drives all traffic to the calendar booking section rather than a separate form, so once step 3 is done (real GHL calendar embedded), every booking already creates/updates a GHL contact automatically — no extra webhook needed.

If you'd also like a top-of-funnel lead form (e.g., "Get My Free Growth Plan") before the calendar step, add a GHL **Form** element in the `booking` section and connect it to a workflow that triggers your follow-up automations.

## 7. Content you'll likely want to personalize

- Phone number and email in the footer (`tel:` / `mailto:` links)
- Testimonials (currently placeholder quotes/names)
- Stats in the hero trust bar (`$14M+`, `3,200+`, `4.9/5`)
- Guarantee terms if 90 days doesn't match your actual offer, or the "3 new clients per month" scarcity claim in the urgency copy if that's not accurate
