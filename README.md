# SAU AI Ethics Toolkit

The **SAU AI Ethics Toolkit** is a student-facing website created for a **St. Ambrose University PHIL 102 Critical Thinking** class project. The site helps students think critically about artificial intelligence by explaining responsible AI use, academic integrity, privacy, data security, career readiness, human connection, environmental impact, and ethical decision-making.

The goal of the project is to turn class research, interviews, survey work, bibliography work, and web development into a practical resource that students and instructors can use when discussing AI in school, work, and everyday life.

## Live project

- **Live site:** https://sau-ai-ethics-toolkit.pages.dev/
- **Repository:** https://github.com/Entr0pyArchitect/ai-ethics-toolkit

## What the website includes

The toolkit includes:

- Student-friendly explanations of AI basics and generative AI
- Guidance for responsible AI use in the classroom
- Privacy, data security, and copyright considerations
- Career readiness information for an AI-shaped workforce
- Discussion of human connection and environmental impacts
- Interview perspectives from St. Ambrose University faculty, staff, and campus contributors
- A topic-organized bibliography with supporting sources
- A built-in knowledge check quiz
- A downloadable completion badge after a passing quiz score

The site is written as an educational class resource, not as an official university-wide AI policy. Students should still follow individual course syllabi, instructor expectations, and university guidance.

## Security and validation report

A security and deployment-readiness review is included in the `docs/` folder.

```text
docs/security_audit.md
docs/VALIDATION_REPORT.md
```

The security report explains the site’s static architecture, deployment model, security controls, code-level review, remaining limitations, and final deployment-readiness posture.

At a high level:

- The site is static and has no backend, login system, database, file upload, comment system, or stored user input.
- Site content is rendered from `content/content.json`.
- JavaScript uses DOM creation and text rendering rather than raw HTML injection.
- The project avoids common high-risk client-side patterns such as `eval`, `document.write`, inline event handlers, and `javascript:` URLs.
- Cloudflare Pages security headers are included in `_headers`.
- The quiz/badge feature is a learning check, not a tamper-proof official credential.
- Interview transcripts are included as accessibility support and class documentation, not official verbatim records.

## Final project status

The website is complete for the current group/class-review and deployment scope.

Completed:

- Static site structure is complete.
- HTML, CSS, JavaScript, JSON, image assets, media assets, and documentation are organized into separate folders.
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
- Visual polish, section accent colors, neon quiz feedback, transcript formatting, and reduced-motion accessibility support are included.
- Security and validation documentation is included in `docs/`.

Pending:

- Final group/class review of the complete site.
- Any instructor-requested content, citation, or wording edits after review.

## Project structure

```text
sau-ai-ethics-toolkit/
├── .gitattributes
├── favicon.ico
├── index.html
├── README.md
├── _headers
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   ├── accept.gif
│   │   ├── certification-badge.png
│   │   ├── graphic-ai-impacts.png
│   │   ├── graphic-ai-thinking.png
│   │   ├── sau-shield.png
│   │   └── updated-badge.png
│   ├── js/
│   │   └── main.js
│   └── media/
│       ├── phil-interview-samantha-dunn.m4a
│       └── README.md
├── content/
│   └── content.json
└── docs/
    ├── security_audit.md
    └── VALIDATION_REPORT.md
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

## Deployment workflow

1. Review the files locally.
2. Confirm `content/content.json` is valid JSON after edits.
3. Confirm `assets/js/main.js` has no browser console errors.
4. Commit changes in GitHub Desktop.
5. Push to GitHub.
6. Cloudflare Pages should redeploy automatically.
7. Open the live HTTPS Cloudflare Pages URL.
8. Verify navigation, quiz behavior, badge download, interviews, transcripts, bibliography, and credits.

## Interview media workflow

The interview section includes embedded YouTube videos, one local audio file, and transcripts.

For large interview videos, use YouTube embeds instead of storing large video files directly in the repository. After each video is uploaded, update the matching interview entry in `content/content.json`:

- `watchUrl`: the normal YouTube watch/share link
- `embedUrl`: the YouTube embed URL, preferably from YouTube's **Share > Embed** option
- `transcriptStatus`: whether the transcript is available or pending
- `transcriptText`: cleaned transcript text for the dropdown section

The Dr. Samantha Dunn audio file is stored at:

```text
assets/media/phil-interview-samantha-dunn.m4a
```

Additional media guidance is stored at:

```text
assets/media/README.md
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

The bibliography is organized by topic area so that the site content can be connected back to supporting research and source material. Before final presentation, the group should perform one final live-click review of bibliography entries and any instructor-requested citation formatting.

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
9. Confirm `_headers` remains present and correctly formatted.
10. Avoid adding unsafe patterns such as `eval`, `document.write`, inline event handlers, raw HTML injection, or unnecessary third-party scripts.

## Recommended Git commit message

```text
Update README project overview and security report reference
```
