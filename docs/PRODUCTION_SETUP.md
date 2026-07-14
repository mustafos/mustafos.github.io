# Production setup — mustafabekirov.com

Technical readiness for SEO, localization, analytics, and Search Console.

## Environment variables

| Variable | Where to set | Purpose |
|----------|--------------|---------|
| `GA_MEASUREMENT_ID` | GitHub repository secret | Injected into `assets/js/config.js` during GitHub Pages deploy |

Local testing: copy `assets/js/config.example.js` values into `assets/js/config.js` temporarily, or set `gaMeasurementId` locally. Do not commit a real measurement ID.

## Manual steps (outside code)

1. **Google Analytics 4**
   - Create a GA4 property for `mustafabekirov.com`
   - Copy the measurement ID (`G-XXXXXXXXXX`)
   - Add it as GitHub secret `GA_MEASUREMENT_ID`
   - Redeploy via push to `master`

2. **Google Search Console**
   - Add property `https://www.mustafabekirov.com`
   - Verify ownership (DNS TXT or HTML file)
   - Submit sitemap: `https://www.mustafabekirov.com/sitemap.xml`

3. **DNS / hosting**
   - Ensure `CNAME` points to GitHub Pages
   - Confirm `www` and apex redirect strategy if needed

4. **Legal review**
   - Privacy Policy body is partially template-based and in English only
   - Terms of Use body is English only
   - Have a legal reviewer confirm GDPR wording for your jurisdiction

## What is implemented in code

- Multilingual UI (`en`, `cs`, `es`, `uk`, `sk`) with locale switcher
- Locale-aware title, description, canonical, Open Graph, Twitter, hreflang
- Static + dynamic hreflang alternates
- `robots.txt` and `sitemap.xml`
- Person + WebSite JSON-LD
- Consent banner with localStorage persistence
- GA4 Consent Mode defaults (analytics denied until accepted)
- Custom events: `click_telegram`, `click_email`, `click_linkedin`, `click_github`, `click_download_cv`, `click_project`, `click_contact_cta`, `language_switch`

## Verify after deploy

- `https://www.mustafabekirov.com/robots.txt`
- `https://www.mustafabekirov.com/sitemap.xml`
- View page source: hreflang links and JSON-LD present
- Accept analytics → GA4 Realtime shows activity
- Decline analytics → no GA network requests
- Switch language → URL updates, content translates, `language_switch` event fires
