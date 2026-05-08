
/*
  SAU AI Ethics Toolkit JavaScript
  --------------------------------
  Purpose:
  - Load editable site content from content/content.json.
  - Build sidebar navigation dynamically.
  - Render each section of the toolkit.
  - Add interactivity: dropdown navigation, mobile menu, back-to-top,
    an expandable quiz panel, and a badge download workflow.

  Security notes:
  - Site content is inserted with textContent instead of raw HTML.
  - No JavaScript eval calls, inline event handlers, external scripts, or user-submitted data are used.
  - The quiz is client-side only, so it is appropriate for a class toolkit,
    but it is not a tamper-proof official certification system.
*/

const CONTENT_URL = "content/content.json";
let activeQuizQuestions = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const siteData = await fetchSiteContent();
    renderNavigation(siteData.sections || []);
    renderSections(siteData);
    initializeNavigationBehavior();
    initializeMobileMenu();
    initializeBackToTop();
    initializeScrollGlow();
    initializeQuiz(siteData.quiz);
  } catch (error) {
    renderLoadError(error);
  }
});

async function fetchSiteContent() {
  const response = await fetch(CONTENT_URL);
  if (!response.ok) {
    throw new Error(`Unable to load ${CONTENT_URL}. Status: ${response.status}`);
  }
  return response.json();
}

function renderNavigation(sections) {
  const navRoot = document.getElementById("sidebar-nav");
  navRoot.textContent = "";

  sections
    .filter((section) => section.showInNav !== false)
    .forEach((section, index) => {
      const navItem = document.createElement("div");
      navItem.className = "nav-item";

      const button = document.createElement("button");
      button.className = "dropdown-btn";
      button.type = "button";
      button.setAttribute("aria-expanded", index === 0 ? "true" : "false");

      const label = document.createElement("span");
      label.textContent = section.navTitle || section.title || "Section";

      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "▼";

      button.appendChild(label);
      button.appendChild(arrow);

      const dropdown = document.createElement("div");
      dropdown.className = "dropdown-container";
      dropdown.appendChild(createNavLink(`#${section.id}`, "Overview"));

      (section.subsections || []).forEach((subsection) => {
        dropdown.appendChild(createNavLink(`#${subsection.id}`, subsection.title));
      });

      navItem.appendChild(button);
      navItem.appendChild(dropdown);
      navRoot.appendChild(navItem);

      if (index === 0) {
        button.classList.add("active");
        requestAnimationFrame(() => {
          dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
        });
      }
    });
}

function createNavLink(href, label) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  return link;
}

function renderSections(siteData) {
  const root = document.getElementById("content-root");
  root.textContent = "";
  (siteData.sections || []).forEach((section) => root.appendChild(renderSection(section)));
}

function renderSection(section) {
  const sectionEl = document.createElement("section");
  sectionEl.className = `content-section ${section.type === "hero" ? "hero-section" : ""}`;
  sectionEl.id = section.id;

  if (section.kicker) sectionEl.appendChild(textElement("div", section.kicker, "section-kicker"));
  sectionEl.appendChild(textElement("h2", section.title || "Untitled Section"));
  (section.summary || []).forEach((paragraph) => sectionEl.appendChild(textElement("p", paragraph)));

  if (section.visual) sectionEl.appendChild(renderVisualCard(section.visual));
  if (section.cards) sectionEl.appendChild(renderCards(section.cards));
  (section.subsections || []).forEach((subsection) => sectionEl.appendChild(renderSubsection(subsection)));

  if (section.kind === "interviews") sectionEl.appendChild(renderInterviews(section.interviews || []));
  if (section.kind === "quiz") sectionEl.appendChild(renderQuizArea(section.quizIntro || []));
  if (section.kind === "bibliography") sectionEl.appendChild(renderBibliography(section.sourceGroups || []));
  if (section.kind === "credits") sectionEl.appendChild(renderCredits(section.creditGroups || []));

  if (section.footerNote) sectionEl.appendChild(textElement("p", section.footerNote, "footer-note"));
  return sectionEl;
}

function renderSubsection(subsection) {
  const wrapper = document.createElement("div");
  wrapper.className = `subsection ${subsection.boxType || ""}`;
  wrapper.id = subsection.id;
  if (subsection.boxType) wrapper.classList.add(subsection.boxType);

  wrapper.appendChild(textElement("h3", subsection.title || "Subsection"));
  (subsection.paragraphs || []).forEach((paragraph) => wrapper.appendChild(textElement("p", paragraph)));
  if (subsection.actions) wrapper.appendChild(renderList(subsection.actions, "action-list"));
  if (subsection.items) wrapper.appendChild(renderList(subsection.items));
  if (subsection.details) subsection.details.forEach((detail) => wrapper.appendChild(renderDetails(detail.title, detail.body)));

  return wrapper;
}

function renderVisualCard(visual) {
  const card = document.createElement("div");
  card.className = "visual-card";

  const image = document.createElement("img");
  image.src = visual.src;
  image.alt = visual.alt || "Toolkit visual";
  card.appendChild(image);

  const text = document.createElement("div");
  text.appendChild(textElement("h3", visual.title || "Visual Guide"));
  (visual.paragraphs || []).forEach((paragraph) => text.appendChild(textElement("p", paragraph)));
  card.appendChild(text);
  return card;
}

function renderCards(cards) {
  const grid = document.createElement("div");
  grid.className = "card-grid";

  cards.forEach((cardData) => {
    const card = document.createElement("article");
    card.className = "card";
    card.appendChild(textElement("h3", cardData.title || "Card"));
    (cardData.body || []).forEach((paragraph) => card.appendChild(textElement("p", paragraph)));
    grid.appendChild(card);
  });

  return grid;
}

function renderInterviews(interviews) {
  const wrapper = document.createElement("div");
  wrapper.className = "interview-grid";

  interviews.forEach((interview) => {
    const card = document.createElement("article");
    card.className = "interview-card";

    card.appendChild(textElement("h3", interview.title || "Interview"));

    const meta = document.createElement("p");
    meta.className = "interview-meta";
    meta.textContent = [interview.interviewee, interview.role, interview.format].filter(Boolean).join(" • ");
    card.appendChild(meta);

    card.appendChild(textElement("p", interview.description || "Interview description pending."));

    const mediaBlock = renderInterviewMedia(interview);
    card.appendChild(mediaBlock);

    if (interview.transcriptText) {
      if (interview.transcriptNote) {
        card.appendChild(textElement("p", interview.transcriptNote, "transcript-note"));
      }
      card.appendChild(renderTranscriptDetails("Transcript", interview.transcriptText));
    } else {
      card.appendChild(renderDetails("Transcript status", interview.transcriptStatus || "Transcript pending from the interview team."));
    }

    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderInterviewMedia(interview) {
  const mediaBlock = document.createElement("div");
  mediaBlock.className = "interview-media";

  if (interview.audioUrl) {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = interview.audioUrl;
    mediaBlock.appendChild(audio);
    return mediaBlock;
  }

  if (interview.embedUrl && isSafeYouTubeEmbedURL(interview.embedUrl)) {
    const iframe = document.createElement("iframe");
    iframe.src = interview.embedUrl;
    iframe.title = interview.title || "Interview video";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    mediaBlock.appendChild(iframe);
    return mediaBlock;
  }

  if (interview.watchUrl && isSafeExternalURL(interview.watchUrl)) {
    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    const link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = interview.watchUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = interview.mediaStatus === "Video processing on YouTube" ? "Open video link" : "Open interview video";

    buttonRow.appendChild(link);
    mediaBlock.appendChild(buttonRow);

    if (interview.mediaStatus) {
      mediaBlock.appendChild(textElement("p", interview.mediaStatus, "interview-status"));
    }

    return mediaBlock;
  }

  const placeholder = document.createElement("div");
  placeholder.className = "embed-placeholder";
  placeholder.appendChild(textElement("strong", interview.mediaStatus || "Interview media pending"));
  mediaBlock.appendChild(placeholder);
  return mediaBlock;
}

function renderTranscriptDetails(title, transcript) {
  const details = document.createElement("details");
  details.className = "transcript-details";

  const summary = document.createElement("summary");
  summary.textContent = title;

  const transcriptBox = document.createElement("div");
  transcriptBox.className = "transcript-text";

  const blocks = parseTranscriptBlocks(transcript);

  blocks.forEach((block) => {
    const blockElement = document.createElement("section");
    blockElement.className = "transcript-block";

    if (block.timestamp) {
      const time = document.createElement("span");
      time.className = "transcript-time";
      time.textContent = block.timestamp;
      blockElement.appendChild(time);
    }

    block.paragraphs.forEach((paragraph) => {
      const paragraphElement = document.createElement("p");
      paragraphElement.textContent = paragraph;
      blockElement.appendChild(paragraphElement);
    });

    transcriptBox.appendChild(blockElement);
  });

  details.appendChild(summary);
  details.appendChild(transcriptBox);
  return details;
}

function parseTranscriptBlocks(transcript) {
  // Transcripts are stored as plain text in content.json.
  // This parser turns timestamped text into clean visual blocks without using raw HTML injection.
  const text = transcript || "";
  const timestampPattern = /\[([0-9:]+(?:[–-][0-9:]+)?)\]\s*/g;
  const matches = [...text.matchAll(timestampPattern)];

  if (matches.length === 0) {
    return [{
      timestamp: "",
      paragraphs: splitTranscriptParagraphs(text)
    }];
  }

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    return {
      timestamp: match[1],
      paragraphs: splitTranscriptParagraphs(text.slice(start, end))
    };
  }).filter((block) => block.paragraphs.length > 0);
}

function splitTranscriptParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function isSafeYouTubeEmbedURL(value) {
  try {
    const parsed = new URL(value, window.location.href);
    const allowedHosts = ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"];
    return parsed.protocol === "https:" && allowedHosts.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function renderQuizArea(introParagraphs) {
  const wrapper = document.createElement("div");
  wrapper.className = "quiz-card";
  wrapper.id = "quiz-area";

  introParagraphs.forEach((paragraph) => wrapper.appendChild(textElement("p", paragraph)));

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "btn btn-primary quiz-toggle";
  toggleButton.id = "quiz-toggle";
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-controls", "quiz-panel");
  toggleButton.textContent = "Open quiz";
  wrapper.appendChild(toggleButton);

  const panel = document.createElement("div");
  panel.id = "quiz-panel";
  panel.className = "quiz-panel";
  panel.hidden = true;

  const helper = document.createElement("div");
  helper.className = "note-box";
  helper.appendChild(textElement("p", "Answer the questions below. A passing score unlocks the certification badge and the download button."));
  panel.appendChild(helper);

  const quizForm = document.createElement("form");
  quizForm.id = "knowledge-check-form";
  quizForm.setAttribute("aria-label", "AI Ethics Toolkit knowledge check");

  // Questions render here so the submit/reset buttons do not get deleted.
  const questionList = document.createElement("div");
  questionList.id = "quiz-question-list";
  quizForm.appendChild(questionList);

  panel.appendChild(quizForm);

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";

  const submitButton = document.createElement("button");
  submitButton.className = "btn btn-primary";
  submitButton.type = "submit";
  submitButton.textContent = "Check my score";

  const resetButton = document.createElement("button");
  resetButton.className = "btn btn-secondary";
  resetButton.type = "button";
  resetButton.id = "reset-quiz";
  resetButton.textContent = "Reset quiz";

  buttonRow.appendChild(submitButton);
  buttonRow.appendChild(resetButton);

  // Important: these buttons must be inside the form so "Check my score" triggers the submit handler.
  quizForm.appendChild(buttonRow);

  const result = document.createElement("div");
  result.id = "quiz-result";
  result.className = "quiz-result";
  result.hidden = true;
  panel.appendChild(result);

  const badge = document.createElement("div");
  badge.id = "badge-preview";
  badge.className = "badge-preview";
  badge.hidden = true;

  badge.appendChild(textElement("h3", "Certification badge unlocked"));
  badge.appendChild(textElement("p", "You passed the knowledge check. You can preview and download the certification badge below."));

  const badgeImage = document.createElement("img");
  badgeImage.src = "assets/img/certification-badge.png";
  badgeImage.alt = "Saint Ambrose University AI Ethics Certification Award badge";
  badge.appendChild(badgeImage);

  const badgeActions = document.createElement("div");
  badgeActions.className = "button-row badge-actions";

  const downloadLink = document.createElement("a");
  downloadLink.className = "btn btn-secondary";
  downloadLink.href = "assets/img/certification-badge.png";
  downloadLink.download = "sau-ai-ethics-certification-badge.png";
  downloadLink.textContent = "Download certification badge";

  badgeActions.appendChild(downloadLink);
  badge.appendChild(badgeActions);
  panel.appendChild(badge);

  wrapper.appendChild(panel);
  return wrapper;
}

function renderBibliography(sourceGroups) {
  const wrapper = document.createElement("div");

  sourceGroups.forEach((group) => {
    const details = document.createElement("details");
    details.open = group.open || false;

    const summary = document.createElement("summary");
    summary.textContent = group.title || "Source Group";
    details.appendChild(summary);
    details.appendChild(renderList(group.sources || [], "sources-list", true));
    wrapper.appendChild(details);
  });

  return wrapper;
}

function renderCredits(groups) {
  const wrapper = document.createElement("div");
  const grid = document.createElement("div");
  grid.className = "card-grid";

  groups.forEach((group) => {
    const card = document.createElement("div");
    card.className = "card";
    card.appendChild(textElement("h3", group.title || "Credits"));
    card.appendChild(renderList(group.names || []));
    grid.appendChild(card);
  });

  wrapper.appendChild(grid);
  return wrapper;
}


function isSafeExternalURL(value) {
  try {
    const parsed = new URL(value, window.location.href);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function initializeNavigationBehavior() {
  const dropdowns = document.getElementsByClassName("dropdown-btn");

  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const dropdownContent = this.nextElementSibling;
      const isOpen = Boolean(dropdownContent.style.maxHeight);
      dropdownContent.style.maxHeight = isOpen ? null : `${dropdownContent.scrollHeight}px`;
      this.setAttribute("aria-expanded", String(!isOpen));
    });
  }
}

function initializeMobileMenu() {
  const button = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");

  button.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function initializeBackToTop() {
  const button = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 600);
  });

  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}


function initializeScrollGlow() {
  // Smoothly adjusts hue and glow strength based on scroll depth.
  // This keeps the site visually alive while still relying on CSS variables.
  const updateGlow = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const hueShift = Math.round(progress * 32);
    const glowBoost = (1 + progress * 0.38).toFixed(2);

    document.documentElement.style.setProperty("--glow-hue", `${hueShift}deg`);
    document.documentElement.style.setProperty("--glow-boost", glowBoost);
  };

  updateGlow();
  window.addEventListener("scroll", updateGlow, { passive: true });
}

function initializeQuiz(quizData) {
  const form = document.getElementById("knowledge-check-form");
  const quizPanel = document.getElementById("quiz-panel");
  const toggleButton = document.getElementById("quiz-toggle");
  const questionList = document.getElementById("quiz-question-list");
  if (!form || !quizData || !quizPanel || !toggleButton || !questionList) return;

  // Shuffle question order on each load when enabled in content.json.
  activeQuizQuestions = quizData.randomizeQuestions
    ? shuffleArray(quizData.questions || [])
    : [...(quizData.questions || [])];

  renderQuizQuestions(questionList, activeQuizQuestions);

  toggleButton.addEventListener("click", () => {
    const isOpen = !quizPanel.classList.contains("open");
    setQuizPanelOpen(quizPanel, toggleButton, isOpen);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const score = calculateQuizScore(activeQuizQuestions);
    showQuizResult(score, activeQuizQuestions.length, quizData.passPercent || 80);
    markQuizAnswers(activeQuizQuestions);
    setQuizPanelOpen(quizPanel, toggleButton, true);

    const result = document.getElementById("quiz-result");
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("reset-quiz")?.addEventListener("click", () => {
    form.reset();
    clearQuizHighlights();
    const result = document.getElementById("quiz-result");
    const badge = document.getElementById("badge-preview");
    result.hidden = true;
    badge.hidden = true;
    result.textContent = "";
    setQuizPanelOpen(quizPanel, toggleButton, true);
  });
}

function setQuizPanelOpen(panel, button, isOpen) {
  panel.hidden = false;
  panel.classList.toggle("open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  button.textContent = isOpen ? "Hide quiz" : "Open quiz";

  if (!isOpen) {
    window.setTimeout(() => {
      if (!panel.classList.contains("open")) panel.hidden = true;
    }, 320);
  }
}

function renderQuizQuestions(questionList, questions) {
  questionList.textContent = "";

  questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-question";
    fieldset.dataset.questionIndex = String(index);

    const legend = document.createElement("legend");
    legend.textContent = `${index + 1}. ${question.question}`;
    fieldset.appendChild(legend);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";
      label.dataset.optionIndex = String(optionIndex);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = String(optionIndex);

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      fieldset.appendChild(label);
    });

    questionList.appendChild(fieldset);
  });
}

function calculateQuizScore(questions) {
  return questions.reduce((score, question, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    return selected && Number(selected.value) === question.correctIndex ? score + 1 : score;
  }, 0);
}

function markQuizAnswers(questions) {
  clearQuizHighlights();

  questions.forEach((question, index) => {
    const fieldset = document.querySelector(`.quiz-question[data-question-index="${index}"]`);
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    const correctOption = fieldset?.querySelector(`.quiz-option[data-option-index="${question.correctIndex}"]`);
    const selectedValue = selected ? Number(selected.value) : -1;
    const answeredCorrectly = selectedValue === question.correctIndex;

    if (!fieldset) return;

    fieldset.classList.add(answeredCorrectly ? "question-correct" : "question-incorrect");

    if (correctOption) {
      correctOption.classList.add("option-correct");
    }

    if (!answeredCorrectly && selected) {
      selected.closest(".quiz-option")?.classList.add("option-incorrect");
    }
  });
}

function clearQuizHighlights() {
  document.querySelectorAll(".quiz-question").forEach((question) => {
    question.classList.remove("question-correct", "question-incorrect");
  });

  document.querySelectorAll(".quiz-option").forEach((option) => {
    option.classList.remove("option-correct", "option-incorrect");
  });
}

function showQuizResult(score, total, passPercent) {
  const result = document.getElementById("quiz-result");
  const badge = document.getElementById("badge-preview");
  const percent = Math.round((score / total) * 100);
  const passed = percent >= passPercent;

  result.hidden = false;
  result.className = `quiz-result ${passed ? "pass" : "retry"}`;
  result.textContent = passed
    ? `Score: ${score}/${total} (${percent}%). You passed the knowledge check.`
    : `Score: ${score}/${total} (${percent}%). Review the highlighted questions and try again.`;

  badge.hidden = !passed;
}

function shuffleArray(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
}

function renderDetails(title, body) {
  const details = document.createElement("details");

  const summary = document.createElement("summary");
  summary.textContent = title;

  const paragraph = textElement("p", body);
  details.appendChild(summary);
  details.appendChild(paragraph);

  return details;
}

function renderList(items, className = "", ordered = false) {
  const list = document.createElement(ordered ? "ol" : "ul");
  if (className) list.className = className;

  items.forEach((item) => list.appendChild(textElement("li", item)));
  return list;
}

function textElement(tag, text, className = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  return el;
}

function renderLoadError(error) {
  const root = document.getElementById("content-root");
  root.textContent = "";

  const section = document.createElement("section");
  section.className = "content-section warning-box";
  section.appendChild(textElement("h2", "Content failed to load"));
  section.appendChild(textElement("p", "The site could not load its content file. Use the live Cloudflare Pages deployment or check that content/content.json exists in the project."));
  section.appendChild(textElement("p", `Error: ${error.message}`));
  root.appendChild(section);
}
