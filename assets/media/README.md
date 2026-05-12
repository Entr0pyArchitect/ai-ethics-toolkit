# Media Folder

This folder stores local media files used by the SAU AI Ethics Toolkit.

## Current local media

```text
assets/media/phil-interview-samantha-dunn.m4a
```

This audio file is referenced from `content/content.json` and is used for the Dr. Samantha Dunn interview entry.

## Large interview videos

Large interview videos should not be committed directly to this repository unless the file size is safely below the hosting limit and the group intentionally wants local hosting.

Recommended workflow for larger videos:

1. Upload the video to YouTube as **unlisted** or public, depending on the class decision.
2. Copy the video watch/share URL.
3. Copy the YouTube embed URL.
4. Update the matching interview entry in `content/content.json`.
5. Keep the transcript text in `content/content.json` once it is reviewed and cleaned.

## Privacy and access note

Unlisted YouTube videos do not appear publicly on the channel page in the same way as public videos, but anyone with the link can view them. Do not treat unlisted links as private or confidential.

## Safe editing notes

When updating media references:

- Use HTTPS links only.
- Prefer `youtube-nocookie.com` embed URLs when possible.
- Do not add API keys, account tokens, passwords, or private links.
- Do not add oversized video files without checking Cloudflare Pages and repository limits.
- After editing media entries, test the live site to confirm the video/audio loads correctly.

## Related files

```text
content/content.json       # Interview metadata, watch URLs, embed URLs, transcripts
assets/js/main.js          # Media rendering and URL validation logic
docs/security_audit.docx   # Security notes and deployment-readiness review
```
