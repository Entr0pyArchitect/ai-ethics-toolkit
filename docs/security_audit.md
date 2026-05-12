SAU AI Ethics Toolkit
Security Audit and Deployment Readiness Report

*Prepared for PHIL 102 Critical Thinking & AI Ethics Toolkit
Prepared by: Austin Engels | Final group-review build | May 2026*

| Project | St. Ambrose University Critical Thinking & AI Ethics Toolkit |
| --- | --- |
| Repository folder | sau-ai-ethics-toolkit |
| Deployment model | Static site deployed through GitHub and Cloudflare Pages |
| Audit scope | Static site source files, content/data flow, media handling, security headers, documentation, and deployment-readiness posture |
| Audit result | Good for class-project deployment and final group/class review, with limitations noted below |

## 1. Executive Summary

This audit reviewed the final SAU AI Ethics Toolkit as a static, student-facing educational website. The site is designed to support classroom conversations about responsible AI use, academic integrity, privacy, data security, career readiness, and human-centered decision-making. The final build is appropriate for group review, class review, and deployment as a class project resource.

The technical attack surface is low because the site does not use a backend, database, login system, account system, comment section, file upload flow, or stored user input. The reviewed source files did not contain common high-risk client-side patterns such as eval(), document.write, raw innerHTML rendering, inline event handlers, javascript: URLs, insecure external scripts, or raw HTML insertion patterns.

## 2. Audit Scope

Reviewed components:

- index.html main page shell and root containers

- assets/css/styles.css visual styling, responsive behavior, quiz feedback styling, and transcript styling

- assets/js/main.js dynamic content rendering, navigation, quiz logic, media handling, transcript rendering, and badge workflow

- content/content.json site content, bibliography, quiz questions, credits, interview metadata, and transcripts

- _headers Cloudflare Pages security header configuration

- assets/img image and badge assets

- assets/media local Dr. Samantha Dunn audio file and media notes

- docs directory documentation workflow, including contribution report, security audit, and validation report

Items outside the audit scope:

- YouTube platform security and YouTube account security

- Cloudflare account security beyond the presence of deployment headers

- GitHub account security beyond repository hygiene recommendations

- Formal university policy approval

- Server-side penetration testing, because the site is static and has no custom backend

## 3. Site Architecture and Data Flow

The project is a static website. The HTML page loads local CSS and JavaScript. The JavaScript reads content from content/content.json and renders sections, cards, interviews, transcripts, quiz questions, bibliography entries, and credits in the browser. The site does not collect, store, or submit visitor data.

- Primary content source: content/content.json

- Rendering method: DOM creation with textContent-style assignment rather than raw HTML injection

- Media model: YouTube/YouTube-nocookie embeds for larger interview videos and one local audio file for Dr. Samantha Dunn

- Quiz model: client-side randomized knowledge check with badge reveal/download after passing score

- Hosting model: static GitHub repository deployed through Cloudflare Pages over HTTPS

## 4. Security Controls Present

| Control | Finding | Status |
| --- | --- | --- |
| Static deployment model | No custom backend, database, login, account system, or stored user input. | Pass |
| Content Security Policy | The _headers file should restrict scripts/styles to self, limit frames to YouTube/YouTube-nocookie, block objects, and restrict form actions. | Pass |
| X-Content-Type-Options | nosniff should remain present to reduce MIME-sniffing risk. | Pass |
| Referrer-Policy | strict-origin-when-cross-origin should remain present to reduce unnecessary referrer leakage. | Pass |
| X-Frame-Options | SAMEORIGIN should remain present as a clickjacking defense for the site itself. | Pass |
| Safe dynamic rendering | JavaScript renders content using DOM methods and textContent-style behavior rather than injecting untrusted raw HTML. | Pass |
| External media validation | External watch links are limited to HTTPS YouTube-domain URLs. | Pass |
| No exposed secrets | No API keys, passwords, tokens, or private credentials are required or exposed in the static project. | Pass |

## 5. Code-Level Security Audit

The final source files were checked for common client-side web security risks. The following high-risk patterns were not present in the reviewed files:

- eval()

- document.write

- raw innerHTML rendering pattern

- inline onclick, onerror, or onload event handlers

- javascript: URL pattern

- insecure external script loading

- hardcoded secrets, API keys, or tokens

- raw HTML insertion patterns such as insertAdjacentHTML

The quiz and transcript features use JavaScript to render content dynamically, but the rendering approach uses structured DOM creation and plain text assignment. This is safer than inserting raw HTML strings into the page.

## 6. Risk Register

| Risk Area | Level | Finding | Mitigation / Note |
| --- | --- | --- | --- |
| Cross-site scripting | Low | No raw HTML injection pattern or inline event handlers were identified. | Continue using DOM/text rendering when editing JavaScript. |
| Clickjacking | Low | X-Frame-Options: SAMEORIGIN should remain present in _headers. | Keep _headers in the deployed project. |
| MIME sniffing | Low | X-Content-Type-Options: nosniff should remain present. | Keep _headers in the deployed project. |
| Data privacy | Low | The site does not collect or store user data. | Do not add forms, analytics, or tracking without another review. |
| YouTube unlisted videos | Medium | Unlisted videos can be viewed by anyone with the link. | Use unlisted links only if acceptable for class use. |
| Client-side quiz tampering | Medium | A technical user could manipulate their local browser because the quiz is client-side. | Treat the badge as a learning check, not an official verified credential. |
| Transcript accuracy | Medium | Transcripts are auto-generated and lightly cleaned. | Use transcripts as accessibility support; human review is recommended. |
| Repository access | Medium | Anyone with write access could push unwanted changes. | Limit collaborators, use GitHub 2FA, and review changes before deployment. |

## 7. Content Reliability and Credibility Review

The content is appropriate for a student-facing AI ethics toolkit. It uses careful wording and does not present AI as perfect or as a replacement for human judgment. The major themes are responsible AI use, syllabus/instructor expectations, source verification, privacy, data security, career readiness, human connection, environmental awareness, and academic integrity.

- The bibliography contains 50 supporting sources grouped by topic area.

- Bibliography sections align with the major site topics, making source support easier to locate.

- The site frames AI as a support tool rather than a substitute for learning or judgment.

- The site warns students not to share sensitive personal, financial, medical, identifying, or confidential information with AI tools.

- The site notes AI limitations such as bias, hallucinations, overconfidence, incomplete answers, and overreliance.

- Interview transcripts and videos provide campus-specific perspectives that support the toolkit's student-facing purpose.

Final note: the toolkit should be presented as an educational class resource unless St. Ambrose University formally approves it as official university policy.

## 8. Deployment Readiness

- Ready for GitHub push and Cloudflare Pages redeployment.

- Ready for final group/class review.

- Ready for professor/student review as a student-facing educational resource.

- Security posture is good for the static-site class-project scope.

- Domain-level review was separately performed by the developer and did not identify a site-level issue according to the developer's report.

## 9. Recommendations Before Final Presentation

- Perform one final browser walkthrough after Cloudflare redeploys.

- Click every navigation section and test the mobile layout.

- Run the quiz once with incorrect answers and once with passing answers.

- Confirm badge reveal and download still work.

- Open every embedded interview video and the Dr. Samantha Dunn audio file.

- Spot-check transcripts for readability and obvious transcription errors.

- Click bibliography links before final presentation if time allows.

- Keep GitHub two-factor authentication enabled and limit repository write access.

- Do not add new scripts, forms, analytics, or third-party embeds without another review.

## 10. Final Audit Verdict

The SAU AI Ethics Toolkit is secure enough, credible enough, and polished enough for class-project deployment and final group/class review. The site is not a formal policy system and should not be treated as a tamper-proof credentialing platform, but it is appropriate as a student-facing educational resource.

| Category | Verdict |
| --- | --- |
| Security | Good for deployment as a static educational site |
| Content credibility | Good for a student-facing class resource |
| Bibliography connection | Good; sources are grouped and aligned to site topics |
| Quiz/badge workflow | Functional as a learning check; not an official verified credential |
| Interviews/transcripts | Included; transcripts are accessibility support and should be treated as lightly cleaned auto-generated text |
| Final status | Ready for final group/class review and push |

SAU AI Ethics Toolkit Security Audit | PHIL 102 | May 2026
