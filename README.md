# Trades Pro Marketing — Landing Page

A self-contained, mobile-responsive lead-generation landing page built for **Trades Pro Marketing**, modeled on the high-converting funnel pattern used by remodeling/trade-focused marketing agencies (hero offer → pain points → services → process → social proof → guarantee → calendar booking → FAQ → final CTA).

## Files

```
index.html        Page markup/content
css/styles.css     All styling (navy + orange trades palette)
js/main.js         Mobile nav toggle, FAQ accordion, footer year
assets/img/        Logo (placeholder — swap with your real logo)
```

Open `index.html` directly in a browser, or serve the folder with any static host, to preview.

## 1. Swap in your real logo

Replace `assets/img/logo-placeholder.svg` with your actual logo file (PNG/SVG). Keep the filename the same, or update the two `<img src="assets/img/...">` references in `index.html` (header and footer).

## 2. Update brand colors (optional)

Colors are defined once at the top of `css/styles.css`:

```css
:root{
  --navy-900:#0a1830;
  --orange:#ff6b35;
  ...
}
```

Change `--orange` and the `--navy-*` values to match your brand and every section updates automatically.

## 3. Connect your GHL Calendar

Find the placeholder block in `index.html` inside `<section class="booking">`:

```html
<div class="calendar-placeholder" id="calendarPlaceholder">
  ...
</div>
```

In GoHighLevel: **Settings → Calendars → (your calendar) → Embed Code**, then replace the whole `calendar-placeholder` div with the snippet GHL gives you, which looks like:

```html
<iframe src="https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID"
        style="width:100%;height:100%;min-height:700px;border:none;overflow:hidden"
        scrolling="no" id="ghl-calendar"></iframe>
<script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>
```

The `.booking-widget` container is already styled (rounded corners, shadow, min-height) so the iframe will sit nicely once dropped in.

## 4. Integrating into GoHighLevel

You have two options:

**Option A — Import as a GHL Funnel/Website page (recommended)**
1. In GHL, go to **Sites → Funnels (or Websites) → + New**.
2. Add a **Custom HTML/CSS/JS** element (or use "Import from URL/Code" if your subaccount has it) and paste the contents of `index.html`, `css/styles.css`, and `js/main.js` in, or upload the CSS/JS as custom code in the page's Settings → Custom CSS/Custom JS panels.
3. Rebuild the sections that need native GHL elements (the Calendar block, and the lead form if you want GHL to own submissions/automations) using GHL's drag-and-drop elements dropped into the matching sections — the rest of the page (hero, services, testimonials, FAQ) can stay as custom HTML.

**Option B — Host it yourself and link/iframe from GHL**
1. Deploy this folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.) or your own server.
2. Point your domain (or a subdomain) at it, or embed it inside a GHL page via an iframe element pointing to your hosted URL.

Option A is generally better for lead tracking, since GHL's native form/calendar elements automatically create contacts and trigger your automations. Option B is faster to stand up if you just need the page live.

## 5. Lead capture / form → GHL automations

This page currently drives all traffic to the calendar booking section rather than a separate form, so once step 3 is done (real GHL calendar embedded), every booking already creates/updates a GHL contact automatically — no extra webhook needed.

If you'd also like a top-of-funnel lead form (e.g., "Get My Free Growth Plan") before the calendar step, add a GHL **Form** element in the `booking` section and connect it to a workflow that triggers your follow-up automations.

## 6. Content you'll likely want to personalize

- Phone number and email in the footer (`tel:` / `mailto:` links)
- Testimonials (currently placeholder quotes/names)
- Stats in the hero trust bar (`$14M+`, `3,200+`, `4.9/5`)
- Guarantee terms if 60 days doesn't match your actual offer
