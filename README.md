# SAU AI Ethics Toolkit

This repository contains the polished class-review build of the **St. Ambrose University Critical Thinking & AI Ethics Toolkit**.

The toolkit is designed for **St. Ambrose University students** and supports classroom conversations about responsible AI use, academic integrity, privacy, data security, career readiness, and human-centered decision-making.

## Project structure

```text
sau-ai-ethics-toolkit/
├── index.html                # Main HTML shell and page structure
├── favicon.ico               # Browser tab icon approved for use
├── _headers                  # Cloudflare Pages security headers
├── assets/
│   ├── css/styles.css        # Visual design, layout, animations, responsive styling
│   ├── js/main.js            # Content rendering, navigation, quiz behavior, animation behavior
│   └── img/                  # Images and badge assets used by the site
├── content/content.json      # Main editable site content and bibliography
└── README.md                 # Project guide
```

## Current status

Completed:
- Static site structure is complete.
- HTML/CSS/JS/JSON are separated for maintainability.
- Cloudflare Pages security headers are included.
- HTTPS deployment is handled by Cloudflare Pages.
- Student-facing sections are organized and polished.
- Bibliography is grouped by topic and alphabetized within each topic.
- Credits are updated from the class credits file.
- Quiz is built directly into the site.
- Quiz questions randomize on page load.
- Correct and incorrect quiz answers are highlighted after scoring.
- Passing quiz score reveals the certification badge and download option.
- Visual polish, neon accents, smooth animations, and reduced-motion accessibility support are included.

Pending:
- Final class review of the site.
- Interview section final update after the interview group provides final videos, clips, titles, interviewee labels, and transcripts.

Not currently complete:
- Final interview media and transcript integration.

## What to edit

- **Most content edits:** `content/content.json`
- **Visual design / colors / animations:** `assets/css/styles.css`
- **Quiz logic / navigation / rendering behavior:** `assets/js/main.js`
- **Page shell / favicon / root structure:** `index.html`
- **Image or badge replacements:** `assets/img/`

## Security notes

This is a static educational website. The current build avoids common high-risk client-side patterns:
- no `eval`
- no `document.write`
- no inline event handlers
- no raw HTML injection
- no `javascript:` URL usage
- no external JavaScript libraries
- no user accounts, database, login system, or stored user input

The `_headers` file adds Cloudflare Pages security headers, including a Content Security Policy.

## Deployment workflow

1. Review the files.
2. Commit and push changes to GitHub.
3. Cloudflare Pages should redeploy automatically.
4. View the live site through the project’s HTTPS Cloudflare Pages URL.

## Notes for future updates

When the interview team provides final materials, update the `interviews` section in `content/content.json`. Add transcript text as expandable/dropdown content and keep the section student-readable rather than turning it into a long transcript dump.
