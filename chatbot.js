(function () {
  'use strict';

  // ── FAQ rules ────────────────────────────────────────────────────────────────

  var RULES = [
    {
      patterns: [/\b(hi|hello|hey|howdy)\b|good\s*(morning|afternoon|evening)/i],
      reply: 'Hello! I\'m the Meridien assistant. Ask me about services, hours, location, insurance, or how to book an appointment. <em>Please don\'t share personal health information here.</em><br><br>How can I help you?'
    },
    {
      patterns: [/hours?|open|clos(ed?|ing)?|when (are|do)|what time/i],
      reply: '<strong>Office Hours</strong><br>Mon &ndash; Thu: 8:20 am &ndash; 4:30 pm<br>Friday: 8:20 am &ndash; 12:30 pm<br>Sat &ndash; Sun: Closed<br><br>Same-day appointments are often available &mdash; <a href="tel:9722007446">call (972) 200-7446</a>.'
    },
    {
      patterns: [/address|location|where|directions?|park(ing)?|find us|suite|building|floor/i],
      reply: '<strong>Meridien Dermatology</strong><br>Baylor Scott &amp; White Medical Pavilion<br>3900 Junius Street, Suite 420<br>Dallas, TX 75246<br><br>We\'re on the 4th floor. Covered parking in the attached garage (Junius entrance) &mdash; first hour free. Valet and street parking also available.'
    },
    {
      patterns: [/phone|call|number|reach|fax|contact us/i],
      reply: 'You can reach us at <a href="tel:9722007446"><strong>(972) 200-7446</strong></a>.<br><br>You can also message and book online through our <a href="https://meridienderm.ema.md" target="_blank" rel="noopener noreferrer">patient portal</a>.'
    },
    {
      patterns: [/insurance|accept(ed)?|coverage|plan|aetna|cigna|united|blue.?cross|bcbs|humana|medicare|tricare|tri.?west|self.?pay|pay/i],
      reply: 'We accept most major commercial plans and Medicare:<br><br>Aetna &middot; Cigna &middot; United HealthCare &middot; BCBS Texas &middot; Baylor Scott &amp; White &middot; Humana &middot; Medicare &middot; Tricare / Triwest &middot; First Health &middot; Healthcare Highways &middot; Sana PPO &middot; Self-Pay<br><br>Please <a href="tel:9722007446">call us</a> to verify your specific plan before your visit.'
    },
    {
      patterns: [/appoint(ment)?|book|schedul|new patient|see (a |the )?doctor|visit/i],
      reply: 'Same-day appointments are often available!<br><br>&#128222; Call: <a href="tel:9722007446">(972) 200-7446</a><br>&#127760; Online: <a href="https://meridienderm.ema.md" target="_blank" rel="noopener noreferrer">Patient Portal</a>'
    },
    {
      patterns: [/portal|online|patient.?portal|meridienderm/i],
      reply: 'Our secure patient portal is at <a href="https://meridienderm.ema.md" target="_blank" rel="noopener noreferrer">meridienderm.ema.md</a> &mdash; book appointments, message the care team, and view your records securely.'
    },
    {
      patterns: [/hidradenitis|hs\b|suppurativa|modes\b|boil|abscess|tunnel/i],
      reply: 'Dr. Paek is a leading HS specialist. We offer comprehensive Hidradenitis Suppurativa care:<br>&bull; Medical management<br>&bull; Biologic therapy (Humira, Cosentyx, Bimzelx)<br>&bull; The <strong>MODES surgical procedure</strong><br><br><a href="hidradenitis.html">Learn more about our HS care &rarr;</a>'
    },
    {
      patterns: [/psoriasis|atopic|eczema/i],
      reply: 'We treat psoriasis, atopic dermatitis (eczema), and other chronic inflammatory skin conditions with evidence-based approaches including topical therapies, phototherapy, and advanced biologics.'
    },
    {
      patterns: [/cosmetic|botox|filler|juv[eé]derm|restylane|peel|microneedl|wrinkle|anti.?aging|lip|volume/i],
      reply: 'We offer cosmetic dermatology including:<br>&bull; Botox&reg; injections<br>&bull; Dermal fillers (Juv&eacute;derm&reg;, Restylane&reg;)<br>&bull; VI Peel &amp; PCA chemical peels<br>&bull; Microneedling for collagen and scar treatment<br><br><a href="tel:9722007446">Call us</a> to schedule a cosmetic consultation.'
    },
    {
      patterns: [/skin.?cancer|melanoma|basal.?cell|squamous|mole|biopsy|suspicious|lesion/i],
      reply: 'We provide expert skin cancer screening and treatment:<br>&bull; Full-body skin exams<br>&bull; Detection of melanoma, basal cell, and squamous cell carcinoma<br>&bull; Surgical treatment and biopsies<br><br>Same-day appointments available: <a href="tel:9722007446">(972) 200-7446</a>.'
    },
    {
      patterns: [/acne|rosacea|vitiligo|wart|hair.?loss|fungal|molluscum|birthmark|infection/i],
      reply: 'We treat a wide range of general dermatology conditions including acne, rosacea, vitiligo, hair loss, warts, fungal infections, molluscum, birthmarks, and more &mdash; for all ages.'
    },
    {
      patterns: [/pediatric|child(ren)?|kids?|adolescent|teen|baby|infant|young/i],
      reply: 'Yes &mdash; we offer pediatric dermatology with a gentle, child-friendly approach, treating eczema, warts, molluscum, birthmarks, acne, and other conditions in children and adolescents.'
    },
    {
      patterns: [/biologic|humira|cosentyx|dupixent|rinvoq|bimzelx|injecti(on|able)/i],
      reply: 'Dr. Paek offers advanced biologic therapy for moderate-to-severe psoriasis, atopic dermatitis, and hidradenitis suppurativa, with expert management and monitoring.'
    },
    {
      patterns: [/light|laser|photodynamic|pdt|photo.?therapy|hair.?removal/i],
      reply: 'We offer light-based treatments including photodynamic therapy (PDT) for actinic keratoses and pre-cancerous lesions, and laser hair removal for cosmetic use and HS management.'
    },
    {
      patterns: [/surger|surgic|cryotherapy|excis|electrod|curettage|procedure/i],
      reply: 'Our surgical services include cryotherapy, cyst and lesion excisions, electrodesiccation &amp; curettage, shave and punch biopsies, and skin cancer surgery.'
    },
    {
      patterns: [/clinical.?trial|research|study|txdrc/i],
      reply: 'Dr. Paek is Principal Investigator at the Texas Dermatology Research Center (TXDRC), which runs clinical trials for new dermatology treatments. <a href="https://www.txdrc.com/" target="_blank" rel="noopener noreferrer">Learn more at txdrc.com &rarr;</a>'
    },
    {
      patterns: [/dr\.?\s*(so\s*yeon\s*)?paek|about (the )?doctor|physician|credentials|who is|who are/i],
      reply: 'Dr. So Yeon Paek (MD, FAAD) is a board-certified dermatologist specializing in HS, psoriasis, atopic dermatitis, skin cancer, biologic therapy, and cosmetic dermatology.<br><br>She trained at Yale (B.S.), UT Southwestern (M.D.), NIH (fellowship), and Henry Ford Hospital (residency). She is Program Director for the Baylor University Medical Center Dermatology Residency.'
    },
    {
      patterns: [/service|treat|speciali|what do you|what can you|what does meridien|what (conditions?|do you see)/i],
      reply: 'We offer comprehensive dermatology care:<br>&bull; General &amp; Pediatric Dermatology<br>&bull; Skin Cancer Detection &amp; Surgery<br>&bull; Psoriasis &amp; Atopic Dermatitis<br>&bull; Hidradenitis Suppurativa (HS)<br>&bull; Biologic Therapy<br>&bull; Surgical &amp; Procedural Care<br>&bull; Light-Based Treatments<br>&bull; Cosmetic Dermatology<br><br>Ask me about any of these for more detail!'
    },
    {
      patterns: [/thank|thanks|appreciate|great|perfect|awesome|helpful|that help/i],
      reply: 'You\'re welcome! Feel free to ask if you have more questions. We look forward to seeing you at Meridien Dermatology.'
    }
  ];

  var FALLBACK = 'I\'m not sure about that one. For personalized help, please:<br>&#128222; <a href="tel:9722007446">Call (972) 200-7446</a><br>&#127760; <a href="https://meridienderm.ema.md" target="_blank" rel="noopener noreferrer">Patient Portal</a>';

  var QUICK_REPLIES = [
    { label: 'Hours & location',    query: 'What are your hours and address?' },
    { label: 'Book appointment',    query: 'How do I book an appointment?' },
    { label: 'Insurance accepted',  query: 'What insurance do you accept?' },
    { label: 'Services offered',    query: 'What services do you offer?' },
    { label: 'About HS',            query: 'Tell me about your hidradenitis suppurativa care' },
    { label: 'Cosmetic services',   query: 'What cosmetic services do you offer?' }
  ];

  function getResponse(text) {
    var t = (text || '').trim();
    if (!t) return null;
    for (var i = 0; i < RULES.length; i++) {
      var rule = RULES[i];
      for (var j = 0; j < rule.patterns.length; j++) {
        if (rule.patterns[j].test(t)) return rule.reply;
      }
    }
    return FALLBACK;
  }

  // ── Styles ───────────────────────────────────────────────────────────────────

  var CSS = [
    '#mc-toggle{',
      'position:fixed;bottom:24px;right:24px;z-index:9999;',
      'width:56px;height:56px;border-radius:50%;',
      'background:#1A5C38;border:none;cursor:pointer;',
      'display:flex;align-items:center;justify-content:center;',
      'box-shadow:0 4px 18px rgba(26,92,56,0.38);',
      'transition:transform 0.18s,background 0.18s;',
    '}',
    '#mc-toggle:hover{background:#2D8655;transform:scale(1.06);}',
    '#mc-toggle svg{pointer-events:none;}',
    '#mc-panel{',
      'position:fixed;bottom:92px;right:24px;z-index:9998;',
      'width:340px;max-height:520px;',
      'background:#F5EFE6;border-radius:1.25rem;',
      'box-shadow:0 8px 40px rgba(0,0,0,0.18);',
      'display:flex;flex-direction:column;',
      "font-family:'Inter',sans-serif;font-size:0.875rem;",
      'overflow:hidden;',
      'transition:opacity 0.2s,transform 0.2s;',
    '}',
    '#mc-panel.mc-hidden{opacity:0;pointer-events:none;transform:translateY(8px);}',
    '.mc-header{',
      'background:#1A5C38;color:white;',
      'padding:0.9rem 1.1rem 0.8rem;',
      'display:flex;align-items:center;justify-content:space-between;',
    '}',
    '.mc-header-info{display:flex;flex-direction:column;gap:0.1rem;}',
    '.mc-header-title{font-weight:500;font-size:0.9rem;line-height:1.2;}',
    '.mc-header-sub{font-size:0.7rem;opacity:0.65;}',
    '.mc-close{',
      'background:none;border:none;cursor:pointer;color:white;',
      'opacity:0.7;padding:0.25rem;line-height:1;font-size:1.1rem;',
      'transition:opacity 0.15s;',
    '}',
    '.mc-close:hover{opacity:1;}',
    '.mc-disclaimer{',
      'background:#E8F5EE;border-bottom:1px solid #E0E0E0;',
      'padding:0.55rem 1rem;font-size:0.71rem;color:#444;line-height:1.5;',
    '}',
    '.mc-disclaimer a{color:#1A5C38;}',
    '.mc-messages{',
      'flex:1;overflow-y:auto;padding:0.875rem;',
      'display:flex;flex-direction:column;gap:0.6rem;',
    '}',
    '.mc-msg{',
      'max-width:90%;padding:0.6rem 0.85rem;border-radius:1rem;',
      'line-height:1.55;font-size:0.83rem;',
    '}',
    '.mc-msg a{color:#1A5C38;}',
    '.mc-msg.mc-bot{',
      'background:white;border:1px solid #E0E0E0;',
      'border-bottom-left-radius:0.2rem;color:#333;align-self:flex-start;',
    '}',
    '.mc-msg.mc-user{',
      'background:#1A5C38;color:white;',
      'border-bottom-right-radius:0.2rem;align-self:flex-end;',
    '}',
    '.mc-quick-wrap{',
      'padding:0 0.875rem 0.6rem;',
      'display:flex;flex-wrap:wrap;gap:0.35rem;',
    '}',
    '.mc-chip{',
      'padding:0.26rem 0.65rem;',
      'background:white;border:1px solid #E0E0E0;border-radius:2rem;',
      'cursor:pointer;font-size:0.74rem;color:#444;',
      "transition:border-color 0.15s,color 0.15s;font-family:'Inter',sans-serif;",
    '}',
    '.mc-chip:hover{border-color:#1A5C38;color:#1A5C38;}',
    '.mc-input-row{',
      'display:flex;gap:0.5rem;padding:0.7rem 0.875rem;',
      'border-top:1px solid #E0E0E0;background:white;',
    '}',
    '.mc-input{',
      'flex:1;border:1px solid #E0E0E0;border-radius:2rem;',
      'padding:0.45rem 0.85rem;font-size:0.83rem;',
      "font-family:'Inter',sans-serif;outline:none;background:#F5EFE6;",
      'transition:border-color 0.15s;',
    '}',
    '.mc-input:focus{border-color:#1A5C38;}',
    '.mc-send{',
      'background:#1A5C38;border:none;border-radius:50%;',
      'width:34px;height:34px;cursor:pointer;flex-shrink:0;',
      'display:flex;align-items:center;justify-content:center;',
      'transition:background 0.15s;',
    '}',
    '.mc-send:hover{background:#2D8655;}',
    '.mc-home-btn{',
      'align-self:center;background:none;cursor:pointer;',
      'border:1px solid #D5CDBE;border-radius:2rem;',
      'padding:0.22rem 0.8rem;font-size:0.71rem;color:#888;',
      "font-family:'Inter',sans-serif;",
      'transition:border-color 0.15s,color 0.15s;margin-top:0.05rem;',
    '}',
    '.mc-home-btn:hover{border-color:#1A5C38;color:#1A5C38;}',
    '@media(max-width:420px){',
      '#mc-panel{width:calc(100vw - 16px);right:8px;bottom:82px;}',
      '#mc-toggle{right:16px;bottom:16px;}',
    '}'
  ].join('');

  // ── DOM ──────────────────────────────────────────────────────────────────────

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  var panelOpen = false;

  var CHAT_ICON = '<svg width="23" height="23" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
  var CLOSE_ICON = '<svg width="20" height="20" fill="none" stroke="white" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9l-7 7-7-7"/></svg>';
  var SEND_ICON  = '<svg width="15" height="15" fill="none" stroke="white" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

  function init() {
    var style = el('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var toggle = el('button', {
      id: 'mc-toggle',
      'aria-label': 'Open chat assistant',
      'aria-expanded': 'false',
      'aria-controls': 'mc-panel'
    }, CHAT_ICON);

    var panel = el('div', {
      id: 'mc-panel',
      role: 'dialog',
      'aria-label': 'Meridien Dermatology assistant',
      'aria-modal': 'false'
    });
    panel.className = 'mc-hidden';

    var header = el('div', { class: 'mc-header' });
    var headerInfo = el('div', { class: 'mc-header-info' });
    headerInfo.appendChild(el('div', { class: 'mc-header-title' }, 'Meridien Assistant'));
    headerInfo.appendChild(el('div', { class: 'mc-header-sub' }, 'General info &middot; No PHI collected'));
    var closeBtn = el('button', { class: 'mc-close', id: 'mc-close', 'aria-label': 'Close chat' }, '&#x2715;');
    header.appendChild(headerInfo);
    header.appendChild(closeBtn);

    var disclaimer = el('div', { class: 'mc-disclaimer' },
      '&#9432; General information only. Do not share personal health data here. ' +
      'For medical questions or urgent matters, call <a href="tel:9722007446">(972)&nbsp;200-7446</a>.'
    );

    var messages = el('div', { id: 'mc-messages', class: 'mc-messages', 'aria-live': 'polite', 'aria-label': 'Chat messages' });

    var quickWrap = el('div', { id: 'mc-quick-wrap', class: 'mc-quick-wrap' });
    QUICK_REPLIES.forEach(function (qr) {
      var chip = el('button', { class: 'mc-chip', type: 'button' }, qr.label);
      chip.addEventListener('click', function () {
        hideQuickReplies();
        addMsg(qr.query, 'user');
        var reply = getResponse(qr.query);
        setTimeout(function () { addMsg(reply || FALLBACK, 'bot'); addHomeBtn(); }, 300);
      });
      quickWrap.appendChild(chip);
    });

    var inputRow = el('div', { class: 'mc-input-row' });
    var input = el('input', {
      id: 'mc-input', class: 'mc-input', type: 'text',
      placeholder: 'Ask a question…', autocomplete: 'off', maxlength: '300',
      'aria-label': 'Type your question'
    });
    var sendBtn = el('button', { id: 'mc-send', class: 'mc-send', type: 'button', 'aria-label': 'Send message' }, SEND_ICON);
    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(disclaimer);
    panel.appendChild(messages);
    panel.appendChild(quickWrap);
    panel.appendChild(inputRow);

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    // Welcome message
    addMsg('Hello! I\'m the Meridien assistant. Ask me about our services, hours, location, insurance, or how to book an appointment. <em>Please don\'t share personal health information here.</em>', 'bot');

    // Events
    toggle.addEventListener('click', function () {
      panelOpen ? closePanel() : openPanel();
    });
    closeBtn.addEventListener('click', closePanel);
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panelOpen) closePanel();
    });
  }

  function openPanel() {
    var panel = document.getElementById('mc-panel');
    var toggle = document.getElementById('mc-toggle');
    panel.classList.remove('mc-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.innerHTML = CLOSE_ICON;
    panelOpen = true;
    var input = document.getElementById('mc-input');
    if (input) input.focus();
  }

  function closePanel() {
    var panel = document.getElementById('mc-panel');
    var toggle = document.getElementById('mc-toggle');
    panel.classList.add('mc-hidden');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = CHAT_ICON;
    panelOpen = false;
  }

  function addMsg(html, sender) {
    var msgs = document.getElementById('mc-messages');
    if (!msgs) return;
    var div = el('div', { class: 'mc-msg mc-' + sender }, html);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideQuickReplies() {
    var wrap = document.getElementById('mc-quick-wrap');
    if (wrap) wrap.style.display = 'none';
  }

  function showQuickReplies() {
    var wrap = document.getElementById('mc-quick-wrap');
    if (wrap) { wrap.style.display = ''; }
    var msgs = document.getElementById('mc-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function addHomeBtn() {
    var msgs = document.getElementById('mc-messages');
    if (!msgs) return;
    var btn = el('button', { class: 'mc-home-btn', type: 'button' }, '&#8592;&nbsp;Back to menu');
    btn.addEventListener('click', showQuickReplies);
    msgs.appendChild(btn);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendMessage() {
    var input = document.getElementById('mc-input');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    hideQuickReplies();
    addMsg(text, 'user');
    var reply = getResponse(text);
    setTimeout(function () { addMsg(reply || FALLBACK, 'bot'); addHomeBtn(); }, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
