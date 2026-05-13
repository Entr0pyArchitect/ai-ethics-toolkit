# SAU AI Ethics Toolkit — Security Audit and Deployment Readiness Report

*Prepared for PHIL 102 Critical Thinking & AI Ethics Toolkit*  
*Prepared by: Austin Engels | Final group-review build | May 2026*

| Field | Result |
| --- | --- |
| Project | St. Ambrose University Critical Thinking & AI Ethics Toolkit |
| Repository folder | `sau-ai-ethics-toolkit` |
| Deployment model | Static site deployed through GitHub and Cloudflare Pages |
| Audit scope | Live site checks, static source-code review, root configuration review, security headers, content/data flow, media handling, repository hygiene, and deployment readiness |
| Final result | **PASS — No exploitable application-code vulnerabilities identified in the reviewed scope** |

## 1. Executive Summary

This security audit reviewed the SAU AI Ethics Toolkit as a static, student-facing educational website. The site is designed to support classroom conversations about responsible AI use, academic integrity, privacy, data security, career readiness, human-centered decision-making, and the social effects of artificial intelligence.

The final review did **not** identify exploitable vulnerabilities in the reviewed application code or static-site configuration. The site has a low attack surface because it has no custom backend, no database, no login system, no user accounts, no file upload workflow, no comment system, and no stored user input.

The audit confirmed that the project uses a safe static-site pattern: `index.html` loads local CSS and JavaScript, `main.js` fetches public content from `content/content.json`, and content is rendered through DOM creation/text assignment rather than raw HTML injection. The live deployment is served through Cloudflare Pages over HTTPS.

## 2. Reviewed Files

The following project files were reviewed:

| File | Purpose | SHA-256 |
| --- | --- | --- |
| `index.html` | Static page shell, root containers, favicon, CSS/JS references | `91f0d11ae94286fd6ffef6b40babbc32312b2e027f004488ed17e2c7d5a48c62` |
| `content/content.json` | Public toolkit content, quiz questions, bibliography, credits, interviews, transcripts | `6322a1e7f62591cb249c01b07e2fe7db5fd056a28adefb0f63fb63b1fac726e0` |
| `assets/css/styles.css` | Layout, responsive behavior, visual styling, quiz feedback, transcript styling | `0c5840342356c9d9b12bb4cec5ff595f9f9a6acb206cee3ba34e0e8aec9f4fbd` |
| `assets/js/main.js` | Rendering, navigation, quiz behavior, media handling, transcript formatting, badge workflow | `8bd64c130ed83c3cffd82f33a64957a32dff583d3cb3522b2dbe77986ce7df9c` |
| `_headers` | Cloudflare Pages security header rules | `da6861d6c9b7c2ccce0329a0bf40fcc2b8d9087933e15f70086df34557055bbe` |

## 3. Root Configuration and Repository Hygiene Review

Additional root/configuration files were reviewed after the main source-code audit.

| File | Finding | Security Result |
| --- | --- | --- |
| `_headers` | Correctly defines Cloudflare Pages security headers for the route block, including Content Security Policy, X-Content-Type-Options, Referrer-Policy, and X-Frame-Options. | Pass |
| `.gitattributes` | Contains standard Git line-ending normalization with `* text=auto`. No security issue identified. | Pass |
| `.README.md.kate-swp` | Identified as a Kate editor swap file. It is not needed for the website and should not be committed. The reviewed file did not contain usable source code, credentials, secrets, or public site content; however, editor swap files can sometimes reveal draft text or editing metadata. | Remove before final push |

Repository hygiene decision:

- Keep `_headers`.
- Keep `.gitattributes`.
- Delete `.README.md.kate-swp`.
- Add or maintain a `.gitignore` rule for editor swap files such as `*.kate-swp`, `.*.kate-swp`, `*.swp`, `*.swo`, and `*~`.

## 4. Live Site Network and Header Findings

Live-site testing was performed against:

```text
https://sau-ai-ethics-toolkit.pages.dev/
```

Findings:

- Nmap showed only expected web-facing ports: `80/tcp` and `443/tcp`.
- HTTP redirects to HTTPS.
- The live HTTPS response returned the expected site title: `Critical Thinking & AI Ethics Toolkit | St. Ambrose University`.
- The site is served through Cloudflare.
- Security headers are present on the live HTTPS response.
- WhatWeb fingerprinting identified a normal Cloudflare-served HTML5 site.
- Sensitive-path checks confirmed that `.env`, `.git/config`, `package.json`, `node_modules`, `/admin`, `/login`, `_headers`, `robots.txt`, and `sitemap.xml` return the fallback page rather than exposed sensitive files.
- `content/content.json` is publicly accessible by design because the static site requires it to render public toolkit content.

Security headers confirmed on the live site:

| Header | Status | Notes |
| --- | --- | --- |
| `Content-Security-Policy` | Present | Restricts scripts/styles to self, permits needed YouTube/YouTube-nocookie frames, blocks objects, restricts base URI and form actions |
| `X-Content-Type-Options` | Present | Uses `nosniff` |
| `Referrer-Policy` | Present | Uses `strict-origin-when-cross-origin` |
| `X-Frame-Options` | Present | Uses `SAMEORIGIN` |

## 5. TLS Findings

TLS was reviewed with `sslscan` against the Cloudflare Pages deployment.

Findings:

- SSLv2: disabled
- SSLv3: disabled
- TLS 1.2: enabled
- TLS 1.3: enabled
- TLS compression: disabled
- Heartbleed: not vulnerable
- Certificate: valid for `sau-ai-ethics-toolkit.pages.dev`

Observation:

- `sslscan` reported TLS 1.0 and TLS 1.1 as enabled at the Cloudflare edge. This is a CDN/hosting configuration observation, not an application-code vulnerability in this project. If Cloudflare Pages provides a minimum TLS setting, set the minimum TLS version to TLS 1.2 or higher. If that setting is not available, document it as a hosting limitation.

## 6. Static Source-Code Review

### 5.1 HTML Review

`index.html` is a static page shell. It contains:

- Document metadata and viewport configuration.
- Local favicon references.
- Local stylesheet reference: `assets/css/styles.css`.
- Accessibility skip link.
- Sidebar/navigation root.
- Main content root: `#main-content` and `#content-root`.
- Back-to-top button.
- Local JavaScript reference: `assets/js/main.js`.

No external scripts, inline event handlers, secret values, forms, or user-input collection points were identified in `index.html`.

### 5.2 CSS Review

`assets/css/styles.css` controls site layout, cards, navigation, quiz highlighting, transcript formatting, responsive behavior, and reduced-motion accessibility support.

Findings:

- CSS brace balance check: **PASS**.
- No CSS syntax-balance issue was identified.
- No layout-breaking global overlay pattern was identified.
- CSS comments are code-maintenance comments only and do not render publicly on the site.

### 5.3 JavaScript Review

`assets/js/main.js` dynamically renders the site from `content/content.json` and handles navigation, transcripts, embedded media, quiz behavior, and badge download.

Findings:

- `node --check assets/js/main.js`: **PASS**.
- Dynamic content is rendered using DOM creation and `textContent`-style assignment rather than raw HTML injection.
- Interview embeds are validated through HTTPS YouTube/YouTube-nocookie allowlists.
- External watch links are restricted to HTTPS YouTube-domain URLs.
- Transcript rendering parses timestamped text into DOM nodes and does not inject raw HTML.
- Quiz behavior is client-side only and is appropriately documented as a learning check rather than a tamper-proof credential.

### 5.4 JSON Content Review

`content/content.json` contains public site content. It includes:

- Clean metadata identifying the project and audience.
- 10 quiz questions.
- 12 site sections.
- 7 interview entries.
- 6 embedded video entries.
- 1 local audio interview entry.
- 7 transcript entries.
- 50 bibliography sources grouped by topic.
- Current class credit entries.

Findings:

- JSON parse check: **PASS**.
- Public content file is expected to be accessible because it powers the static site.
- Known public-facing internal/developer notes were not found.
- Quiz content aligns with the educational scope of the toolkit.

## 7. Automated Pattern Scan Results

The reviewed source files were searched for common high-risk client-side patterns.

| Pattern Checked | Result |
| --- | --- |
| `eval()` | PASS — not found |
| `document.write()` | PASS — not found |
| `raw .innerHTML use` | PASS — not found |
| `insertAdjacentHTML()` | PASS — not found |
| `javascript: URLs` | PASS — not found |
| `inline event handlers` | PASS — not found |
| `string-based setTimeout` | PASS — not found |
| `string-based setInterval` | PASS — not found |
| `insecure external script loading` | PASS — not found |
| `API key/secret/token patterns` | PASS — not found |
| `private key blocks` | PASS — not found |


No high-risk client-side vulnerability pattern was identified in the reviewed source files.

## 8. Public-Facing Content Cleanup Review

The reviewed public content was checked for internal/development-stage wording.

| Internal/Public-Facing Phrase Check | Result |
| --- | --- |
| `group can review` | PASS — not found |
| `before the final release` | PASS — not found |
| `lightweight review build` | PASS — not found |
| `pre-interview-final` | PASS — not found |
| `Badge Workflow Status` | PASS — not found |
| `Current status` | PASS — not found |
| `Remember Team` | PASS — not found |
| `Google Forms` | PASS — not found |
| `py -m http.server` | PASS — not found |
| `localhost` | PASS — not found |
| `developer note` | PASS — not found |
| `personal note` | PASS — not found |
| `Go Unlimited to remove this message` | PASS — not found |


The reviewed files do not expose known internal project-stage notes, personal notes, or developer notes in the public-facing content.

## 9. Functional and Scope Validation

| Item | Result |
| --- | --- |
| Site sections | 12 sections present |
| Quiz questions | 10 questions present |
| Quiz pass threshold | 80% |
| Interviews | 7 entries present |
| Embedded videos | 6 present |
| Local audio interviews | 1 present |
| Transcripts | 7 present |
| Bibliography sources | 50 sources present |

The project remains within the expected class-project scope: a static student-facing AI ethics toolkit with interviews, source support, a knowledge check, and documentation.

## 10. Risk Register

| Risk Area | Level | Finding | Mitigation / Note |
| --- | --- | --- | --- |
| Cross-site scripting | Low | No raw HTML injection pattern, `innerHTML`, `insertAdjacentHTML`, or inline event handlers were identified. | Continue using DOM/text rendering when editing JavaScript. |
| Sensitive file exposure | Low | Live checks showed sensitive-looking paths return the fallback page; `content/content.json` is public by design. | Do not commit `.env`, private keys, tokens, or credentials. |
| Clickjacking | Low | `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'` are present. | Keep `_headers` in the deployed project. |
| MIME sniffing | Low | `X-Content-Type-Options: nosniff` is present. | Keep `_headers` in the deployed project. |
| Data privacy | Low | The site does not collect, submit, or store visitor data. | Do not add forms, analytics, or tracking without another review. |
| YouTube unlisted videos | Medium | Unlisted videos can be viewed by anyone with the link. | Use unlisted links only if acceptable for class use. |
| Client-side quiz tampering | Medium | A technical user could manipulate local browser state because the quiz is client-side. | Treat the badge as a learning check, not an official verified credential. |
| Transcript accuracy | Medium | Transcripts are auto-generated and lightly cleaned. | Use transcripts as accessibility support; human review is recommended. |
| TLS 1.0/1.1 at CDN edge | Low/Medium | `sslscan` reported TLS 1.0/1.1 enabled by the Cloudflare edge. | Set minimum TLS to 1.2+ in Cloudflare if available; otherwise document as a hosting limitation. |
| Editor swap/temp files | Low | `.README.md.kate-swp` is an unnecessary editor swap file. It did not contain secrets in the reviewed copy, but swap files should not be committed because they may expose editing metadata or draft content. | Delete the file before final push and add `*.kate-swp`, `.*.kate-swp`, `*.swp`, `*.swo`, and `*~` to `.gitignore` if possible. |
| Repository access | Medium | Anyone with write access could push unwanted changes. | Limit collaborators, use GitHub 2FA, and review changes before deployment. |

## 11. Content Reliability and Credibility Review

The site content is appropriate for a student-facing AI ethics toolkit. It uses careful wording and does not present AI as perfect or as a replacement for human judgment. The major themes are responsible AI use, syllabus/instructor expectations, source verification, privacy, data security, career readiness, human connection, environmental awareness, and academic integrity.

Content review findings:

- The site frames AI as a support tool rather than a substitute for learning or judgment.
- The site warns students not to share sensitive personal, financial, medical, identifying, or confidential information with AI tools.
- The site notes AI limitations such as bias, hallucinations, overconfidence, incomplete answers, and overreliance.
- The bibliography contains 50 supporting sources grouped by topic area.
- Bibliography sections align with the major site topics, making source support easier to locate.
- Interview transcripts and videos provide campus-specific perspectives that support the toolkit's student-facing purpose.
- The toolkit should be presented as an educational class resource unless St. Ambrose University formally approves it as official university policy.

## 12. Deployment Readiness

The SAU AI Ethics Toolkit is ready for final class review and static-site deployment under the current project scope.

Deployment-readiness findings:

- Live site resolves and serves through Cloudflare.
- HTTP redirects to HTTPS.
- Security headers are present.
- Only expected web-facing services were identified.
- Static content files validate successfully.
- No application-code vulnerability was identified in the reviewed source files.
- No sensitive files were exposed by the live sensitive-path checks.
- `_headers` and `.gitattributes` were reviewed and did not introduce code-level vulnerabilities.
- `.README.md.kate-swp` should be deleted before final push because it is an unnecessary editor swap file.

## 13. Recommendations Before Final Presentation

- Perform one final browser walkthrough after Cloudflare redeploys.
- Click every navigation section and test the mobile layout.
- Run the quiz once with incorrect answers and once with passing answers.
- Confirm badge reveal and download still work.
- Open every embedded interview video and the Dr. Samantha Dunn audio file.
- Spot-check transcripts for readability and obvious transcription errors.
- Click bibliography links before final presentation if time allows.
- Keep GitHub two-factor authentication enabled and limit repository write access.
- Delete `.README.md.kate-swp` before the final push.
- Add or keep `.gitignore` rules for editor swap files and temporary files.
- Do not add new scripts, forms, analytics, or third-party embeds without another review.

## 14. Final Audit Verdict

The SAU AI Ethics Toolkit passed the final security audit for the current static-site class project scope.

The audit found a low attack surface: no backend, no database, no login system, no account system, no file uploads, no stored user input, no exposed secrets, and no high-risk client-side patterns in the reviewed code. The live deployment exposes only expected web services through Cloudflare, redirects HTTP to HTTPS, includes security headers, and does not expose sensitive files such as `.env`, `.git/config`, `package.json`, `node_modules`, `/admin`, or `/login` content.

Remaining limitations are expected for the project scope: the quiz badge is client-side and should be treated as a learning check, unlisted YouTube videos are accessible to anyone with the link, transcripts are auto-generated accessibility support rather than official verbatim records, TLS 1.0/1.1 support is a Cloudflare/CDN configuration observation rather than an application-code issue, and temporary editor swap files should be excluded from the repository.

**Overall result: PASS — good for final class review and static-site deployment.**
