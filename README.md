# SAU AI Ethics Toolkit

This repository contains the polished class-review build of the **St. Ambrose University Critical Thinking & AI Ethics Toolkit**.

The toolkit is designed for **St. Ambrose University students** and supports classroom conversations about responsible AI use, academic integrity, privacy, data security, career readiness, and human-centered decision-making.

## Final project status

The website is complete for class-review and deployment scope.

Completed:
- Static site structure is complete.
- HTML, CSS, JavaScript, JSON, media, image assets, and documentation are organized into separate folders.
- Cloudflare Pages security headers are included in `_headers`.
- HTTPS deployment is handled by Cloudflare Pages.
- Student-facing sections are organized, polished, and readable.
- Bibliography is grouped by topic and alphabetized within each topic.
- Credits are updated from the latest class-provided role list.
- Quiz is built directly into the site.
- Quiz questions randomize on page load.
- Correct and incorrect quiz answers are highlighted after scoring.
- Passing quiz score reveals the certification badge and download option.
- Interview videos/audio and transcripts are included.
- Visual polish, section accent colors, neon feedback, and reduced-motion accessibility support are included.
- A detailed security audit is included in `docs/security_audit.docx`.

Pending:
- Final class review of the complete site.
- Any instructor-requested content or citation edits after review.

## Project structure

```text
sau-ai-ethics-toolkit/
├── .gitattributes
├── favicon.ico
├── index.html                # Main HTML shell and page structure
├── README.md                 # Project guide and maintenance notes
├── _headers                  # Cloudflare Pages security headers
├── assets/
│   ├── css/
│   │   └── styles.css        # Visual design, layout, animations, responsive styling
│   ├── img/                  # Images, icons, graphics, and badge assets
│   │   ├── accept.gif
│   │   ├── certification-badge.png
│   │   ├── graphic-ai-impacts.png
│   │   ├── graphic-ai-thinking.png
│   │   ├── sau-shield.png
│   │   └── updated-badge.png
│   ├── js/
│   │   └── main.js           # Content rendering, navigation, quiz behavior, transcript rendering
│   └── media/
│       ├── phil-interview-samantha-dunn.m4a
│       └── README.md         # Media-specific notes
├── content/
│   └── content.json          # Main editable site content, bibliography, quiz, credits, interviews
└── docs/
    ├── Austin Engels_Final_Contribution_Report.docx
    └── security_audit.docx   # Detailed final security audit and deployment-readiness notes
```

## What to edit

- **Most text/content updates:** `content/content.json`
- **Bibliography, credits, quiz questions, interview metadata, and transcripts:** `content/content.json`
- **Visual design, colors, spacing, animations, and responsive behavior:** `assets/css/styles.css`
- **Navigation, rendering, quiz behavior, media handling, and transcript display:** `assets/js/main.js`
- **Page shell, favicon, root containers, and script/style references:** `index.html`
- **Images or badge replacements:** `assets/img/`
- **Local audio or media notes:** `assets/media/`
- **Project documentation:** `docs/`

## Security summary

This is a static educational website. The current build avoids common high-risk client-side patterns:

- no `eval`
- no `document.write`
- no inline event handlers
- no raw HTML injection pattern
- no `javascript:` URL usage
- no external JavaScript libraries
- no user accounts, database, login system, comment system, file upload, or stored user input
- no exposed API keys or secrets

The `_headers` file adds Cloudflare Pages security headers, including:

- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `X-Frame-Options`

A detailed security audit is included at:

```text
docs/security_audit.docx
```

## Deployment workflow

1. Review the files locally.
2. Confirm `content/content.json` is valid JSON after edits.
3. Commit changes in GitHub Desktop.
4. Push to GitHub.
5. Cloudflare Pages should redeploy automatically.
6. Open the live HTTPS Cloudflare Pages URL.
7. Verify navigation, quiz, badge download, interviews, transcripts, bibliography, and credits.

## Interview media workflow

The interview section includes embedded YouTube videos, one local audio file, and transcripts.

For large interview videos, use YouTube embeds instead of storing large video files directly in the repository. After each video is uploaded, update the matching interview entry in `content/content.json`:

- `watchUrl`: the normal YouTube watch/share link
- `embedUrl`: the YouTube embed URL, preferably from YouTube's Share > Embed option
- `transcriptStatus`: whether the transcript is available or pending
- `transcriptText`: cleaned transcript text for the dropdown section

The Dr. Samantha Dunn audio file is stored at:

```text
assets/media/phil-interview-samantha-dunn.m4a
```

## Current interview status

Available and embedded:
- Taylor Kilgus
- Dr. Bechen
- Kristin Enright
- Ann Garton
- Allison Tollas
- Coach Bernard

Available as local audio:
- Dr. Samantha Dunn

Transcripts currently included:
- Taylor Kilgus
- Dr. Bechen
- Kristin Enright
- Ann Garton
- Allison Tollas
- Coach Bernard
- Dr. Samantha Dunn

Transcript note:
- Transcripts are auto-generated and lightly cleaned for readability. They are included as accessibility support and class documentation, not as official verbatim records.

## Content and bibliography notes

The toolkit is written as a student-facing educational resource, not as an official university-wide AI policy document. Students should still follow individual course syllabi, instructor expectations, and university guidance.

The bibliography is organized by topic area so that the site content can be connected back to supporting research and source material. Before a final public presentation, the class should perform one final link-click review of bibliography entries and any instructor-requested citation formatting.

## Quiz and badge notes

The quiz is a learning check built into the static website. Questions are randomized, and passing the quiz unlocks the downloadable badge.

Important limitation:
- The quiz and badge are client-side and should be treated as an educational knowledge check, not as a tamper-proof official credential.

## Maintenance checklist before future pushes

Before pushing future changes:

1. Validate JSON syntax in `content/content.json`.
2. Check the browser console for errors.
3. Test navigation and responsive layout.
4. Test the quiz, score display, badge reveal, and badge download.
5. Test interview embeds and audio playback.
6. Review transcripts for formatting or obvious transcription mistakes.
7. Verify bibliography links and topic grouping.
8. Confirm credits are still accurate.
9. Confirm `_headers` remains present.
10. Avoid adding unsafe patterns such as `eval`, `document.write`, inline event handlers, or raw HTML injection.

## Recommended Git commit message

```text
Finalize SAU AI Ethics Toolkit with docs and security audit
```
