# Trades Pro Marketing — Landing Page

A self-contained, mobile-responsive lead-generation landing page built for **Trades Pro Marketing**, modeled on the high-converting funnel pattern used by remodeling/trade-focused marketing agencies (hero offer → pain points → services → process → social proof → guarantee → calendar booking → FAQ → final CTA).

## Files

```
index.html          Page markup/content
css/styles.css       All styling (black + red trades palette, matches logo)
js/main.js           Mobile nav toggle, FAQ accordion, footer year
assets/img/logo.svg        Logo — dark version (red/black on white, used for favicon)
assets/img/logo-white.svg  Logo — reversed version for dark header/footer backgrounds
```

Open `index.html` directly in a browser, or serve the folder with any static host, to preview.

## 1. Logo

`assets/img/logo.svg` and `assets/img/logo-white.svg` are a vector recreation of your hard-hat worker mark (red/black/white), built from the image you shared — this environment couldn't save your original raster file directly. If you want the exact pixel file used instead of the recreation, drop your real logo (PNG/SVG) into `assets/img/` and update the `<img src="assets/img/...">` references in `index.html` (header + favicon use the white/reversed version on the dark header, footer uses the white version too; the plain `logo.svg` is only used for the favicon).

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
- Guarantee terms if 90 days doesn't match your actual offer, or the "3 new clients per month" scarcity claim in the urgency copy if that's not accurate
