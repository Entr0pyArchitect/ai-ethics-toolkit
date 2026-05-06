# SAU AI Ethics Toolkit

This folder contains the review build of the **St. Ambrose University Critical Thinking & AI Ethics Toolkit**.

## Project structure

```text
sau-ai-ethics-toolkit/
├── index.html                # Main HTML shell
├── assets/
│   ├── css/styles.css        # Visual design
│   ├── js/main.js            # Interactivity and content rendering
│   └── img/                  # Images used by the site
├── content/content.json      # Main editable content
└── README.md                 # This guide
```

## What to edit

- **Most text changes:** edit `content/content.json`
- **Layout or structure changes:** edit `index.html` or `assets/js/main.js`
- **Visual design changes:** edit `assets/css/styles.css`
- **Image swaps:** replace files inside `assets/img/` and update file names if needed

## Current project status

- Core site structure is complete.
- Quiz logic is built into the site.
- Passing the quiz reveals a downloadable certification badge.
- Interview video links are included where available.
- **Interview transcripts are still pending from the interview group.**

## Publish workflow

1. Review the files.
2. Commit and push changes to GitHub.
3. Cloudflare Pages should redeploy automatically.
4. View the live site at the Cloudflare Pages URL.

## Security notes

- Site text from `content/content.json` is rendered with `textContent`, not raw HTML.
- The site does not use `JavaScript eval`, inline event handlers, external JavaScript libraries, or user-submitted content.
- External interview links open with `rel="noopener noreferrer"`.
- Because this is a static client-side site, the quiz is appropriate for a class learning badge, but it is not a tamper-proof official certification system.

## Note for the group

This build is meant for **review and feedback**. It is presentable, but the interview section should still be updated once the interview group provides final transcript text and any final embed decisions.
