/* ============================================================================
   ANIMATRIX LIVE PATCH v10.5 — KID-FRIENDLY 1-CODE CONNECT + 3-HOUR AUTO-LOCK
   + MULTI-STUN WEBRTC VOICE & VIDEO CALL ENGINE
   ============================================================================ */

window.ANIMATRIX_PATCHES = window.ANIMATRIX_PATCHES || [];

window.ANIMATRIX_PATCHES.push(function() {
  const chatView = document.getElementById("viewChat");
  if (!chatView) return;

  // Replace complicated chat sidebar with Ultra-Simple Kid-Friendly 1-Code Interface
  chatView.innerHTML = [
    '<div id="lockOverlayScreen" style="display:none;position:fixed;inset:0;background:rgba(4,5,14,0.96);z-index:9999;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center;">',
    '  <div style="font-size:4.5rem;">🔒</div>',
    '  <h1 style="font-size:2rem;color:#ff416c;font-weight:900;">3 HOURS COMPLETE — SESSION LOCKED!</h1>',
    '  <p style="color:#9aa5c4;max-width:480px;font-size:1rem;">Suraksha ke liye 3 ghante poore hone par yeh code, chat aur call lock ho chuke hain. Naya session shuru karne ke liye niche Reset button dabayein.</p>',
    '  <button onclick="resetAndUnlockSession()" style="background:linear-gradient(135deg,#00f5a0,#00f2fe);color:#04050e;border:none;padding:16px 32px;border-radius:16px;font-size:1.1rem;font-weight:900;cursor:pointer;box-shadow:0 8px 30px rgba(0,245,160,0.4);">🔄 RESET & START NEW 3-HOUR SESSION</button>',
    '</div>',

    '<div class="chat-layout">',
    '  <!-- Left Card: Super Simple 1-Code Connect + 3-Hour Timer -->',
    '  <section class="crystal-panel" style="border:2px solid rgba(0,242,254,0.4);">',
    '    <div class="panel-head">',
    '      <span>⚡ STEP 1: EASY 1-CODE CONNECT</span>',
    '      <span id="simpleConnBadge" style="color:#ffbe3d;font-weight:900;">WAITING</span>',
    '    </div>',

    '    <label class="lbl">AAPKA NAAM (YOUR NAME)</label>',
    '    <input type="text" id="myChatName" value="Gourav" style="font-size:1rem;font-weight:700;" />',

    '    <div style="background:rgba(0,242,254,0.08);border:2px dashed rgba(0,242,254,0.45);border-radius:16px;padding:16px;text-align:center;display:flex;flex-direction:column;gap:10px;">',
    '      <span style="font-size:0.75rem;color:#9aa5c4;font-weight:800;">APNA CODE GENERATE KAREIN YA DOST KA CODE DALEIN</span>',
    '      <input type="text" id="magicRoomCodeInput" placeholder="Ex: 4589" maxlength="10" style="font-size:1.8rem;font-weight:900;text-align:center;letter-spacing:5px;color:#00f5a0;background:#04050e;border:2px solid #00f5a0;border-radius:14px;padding:12px;" />',
    '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">',
    '        <button class="btn-sub" style="padding:12px;font-size:0.85rem;border-color:#00f2fe;color:#00f2fe;" onclick="generateEasyCode()">🎲 Generate Code</button>',
    '        <button class="btn-main" style="padding:12px;font-size:0.9rem;background:linear-gradient(135deg,#00f5a0,#00f2fe);" onclick="connectWithEasyCode()">🟢 CONNECT NOW</button>',
    '      </div>',
    '      <button class="btn-sub" style="width:100%;padding:9px;" onclick="shareEasyCodeLink()">📲 Copy Direct Auto-Connect Link</button>',
    '    </div>',

    '    <!-- 3-Hour Countdown Lock Box -->',
    '    <div style="background:rgba(255,190,61,0.12);border:1.5px solid #ffbe3d;border-radius:14px;padding:12px;text-align:center;display:flex;flex-direction:column;gap:6px;">',
    '      <span style="font-size:0.72rem;font-weight:800;color:#ffbe3d;">⏳ 3-HOUR AUTO-LOCK TIMER</span>',
    '      <div id="threeHourCountdown" style="font-size:1.45rem;font-weight:900;font-family:monospace;color:#fff;">03:00:00</div>',
    '      <button class="btn-sub" style="font-size:0.75rem;padding:6px;" onclick="resetAndUnlockSession()">🔄 Reset Code & Restart 3h Timer</button>',
    '    </div>',

    '    <!-- Hidden compatibility inputs -->',
    '    <input type="hidden" id="roomPasscode" value="4589" />',
    '  </section>',

    '  <!-- Center Card: Big Call Buttons + Incoming Call Alert + E2EE Chat -->',
    '  <section class="crystal-panel">',
    '    <div class="panel-head">',
    '      <span id="liveRoomHeader">💬 STEP 2: CHAT, VOICE CALL & VIDEO CALL</span>',
    '      <span id="callStatusPill" style="color:#00f5a0;font-weight:800;">READY</span>',
    '    </div>',

    '    <!-- Big Kid-Friendly Voice & Video Call Buttons -->',
    '    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">',
    '      <button onclick="initiateReliableCall(false)" style="background:linear-gradient(135deg,#00b09b,#96c93d);color:#04050e;border:none;padding:13px;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 4px 15px rgba(0,245,160,0.3);">📞 VOICE CALL</button>',
    '      <button onclick="initiateReliableCall(true)" style="background:linear-gradient(135deg,#9d6cff,#00f2fe);color:#04050e;border:none;padding:13px;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 4px 15px rgba(0,242,254,0.3);">📹 VIDEO CALL</button>',
    '      <button id="hangupCallBtn" onclick="terminateReliableCall()" style="background:rgba(255,65,108,0.2);color:#ff416c;border:1.5px solid #ff416c;padding:13px;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;">❌ END CALL</button>',
    '    </div>',

    '    <!-- Incoming Call Banner -->',
    '    <div id="incomingCallBanner" style="display:none;background:linear-gradient(135deg,rgba(0,245,160,0.22),rgba(0,242,254,0.22));border:2px solid #00f5a0;border-radius:14px;padding:12px;align-items:center;justify-content:space-between;gap:10px;">',
    '      <span id="incomingCallText" style="font-weight:900;color:#00f5a0;">📲 Incoming Call...</span>',
    '      <div style="display:flex;gap:8px;">',
    '        <button onclick="acceptIncomingCallNow()" style="background:#00f5a0;color:#04050e;border:none;padding:8px 16px;border-radius:10px;font-weight:900;cursor:pointer;">✅ ACCEPT CALL</button>',
    '        <button onclick="terminateReliableCall()" style="background:#ff416c;color:#fff;border:none;padding:8px 14px;border-radius:10px;font-weight:800;cursor:pointer;">❌ REJECT</button>',
    '      </div>',
    '    </div>',

    '    <!-- Video & Audio Streams Box -->',
    '    <div class="call-grid" id="videoCallStage" style="display:none;">',
    '      <div style="position:relative;">',
    '        <small style="color:#9aa5c4;font-size:0.72rem;font-weight:800;">🟢 AAP (YOU)</small>',
    '        <video id="localVideo" autoplay muted playsinline style="width:100%;height:190px;background:#050714;border-radius:12px;object-fit:cover;"></video>',
    '      </div>',
    '      <div style="position:relative;">',
    '        <small style="color:#00f2fe;font-size:0.72rem;font-weight:800;">🟣 DOST (FRIEND LIVE)</small>',
    '        <video id="remoteVideo" autoplay playsinline style="width:100%;height:190px;background:#050714;border-radius:12px;object-fit:cover;"></video>',
    '        <audio id="remoteAudioFallback" autoplay></audio>',
    '      </div>',
    '    </div>',

    '    <!-- Live Auto-Translation Bar -->',
    '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(0,242,254,0.06);padding:8px 10px;border-radius:10px;">',
    '      <div>',
    '        <label class="lbl">🌐 MERA MESSAGE TRANSLATE KAREIN</label>',
    '        <select id="outgoingTranslateSelect">',
    '          <option value="none" selected>Send As-Is (Original)</option>',
    '          <option value="English">Hindi &rarr; Send in English</option>',
    '          <option value="Hindi">English &rarr; Send in Hindi</option>',
    '        </select>',
    '      </div>',
    '      <div>',
    '        <label class="lbl">🌐 DOST KA MESSAGE TRANSLATE KAREIN</label>',
    '        <select id="incomingTranslateSelect">',
    '          <option value="none" selected>Show Original</option>',
    '          <option value="Hindi">Translate to Hindi (हिंदी)</option>',
    '          <option value="English">Translate to English</option>',
    '        </select>',
    '      </div>',
    '    </div>',

    '    <!-- Chat Messages Box -->',
    '    <div class="chat-feed" id="chatMessagesBox">',
    '      <div class="bubble clone">',
    '        <div class="b-meta">💎 SUPER SIMPLE 1-CODE CONNECT</div>',
    '        <b>Kaise Connect Karein:</b> Left side mein <b>🎲 Generate Code</b> dabayein (ya koi bhi 4-digit code jaise <b>4589</b> dalein) aur <b>🟢 CONNECT NOW</b> dabayein. Apne dost ko bhi wahi 4-digit code dalne bolein — 1 second mein Chat, Voice Call aur Video Call connect ho jayega!',
    '      </div>',
    '    </div>',

    '    <!-- Message Input Row -->',
    '    <div style="display:flex;gap:8px;">',
    '      <input type="text" id="chatInputBox" placeholder="Yahan message likhein aur Enter dabayein..." style="font-size:0.95rem;" onkeydown="if(event.key===\'Enter\') sendSimpleChatMsg()" />',
    '      <button class="btn-main" style="padding:12px 20px;" onclick="sendSimpleChatMsg()">🚀 SEND</button>',
    '      <button class="btn-sub" onclick="askHumanCloneDirectly()">🤖 Clone Test</button>',
    '    </div>',
    '  </section>',

    '  <!-- Right Card: AI Human Clone + Scheduler -->',
    '  <section style="display:flex;flex-direction:column;gap:16px;">',
    '    <div class="crystal-panel">',
    '      <div class="panel-head">',
    '        <span>🤖 AI HUMAN CLONE (AUTO-REPLY)</span>',
    '        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">',
    '          <input type="checkbox" id="cloneActiveToggle" />',
    '          <span style="color:#00f5a0;font-size:0.74rem;font-weight:800;">AWAY MODE</span>',
    '        </label>',
    '      </div>',
    '      <label class="lbl">CLONE STATUS & SCHEDULE</label>',
    '      <textarea id="clonePersonaInput" rows="3">Main Gourav ka AI Human Clone hun. Gourav abhi busy hai aur shaam 6 baje free hoga. Doston se friendly Hinglish mein baat karo.</textarea>',
    '      <small style="color:#9aa5c4;font-size:0.72rem;">Jab aap available na hon toh "AWAY MODE" tick kar dein — aapka AI Clone dost se baat karega.</small>',
    '    </div>',

    '    <div class="crystal-panel">',
    '      <div class="panel-head">',
    '        <span>⏰ AUTO MESSAGE SCHEDULER</span>',
    '        <span id="scheduledCountBadge">0 Pending</span>',
    '      </div>',
    '      <input type="text" id="scheduleMsgInput" placeholder="Message jo baad mein bhejna hai..." />',
    '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">',
    '        <select id="scheduleDelaySelect">',
    '          <option value="10">After 10 Sec</option>',
    '          <option value="30">After 30 Sec</option>',
    '          <option value="60" selected>After 1 Min</option>',
    '          <option value="180">After 3 Min</option>',
    '        </select>',
    '        <button class="btn-main" style="padding:8px;" onclick="addScheduledMessage()">⏰ Schedule</button>',
    '      </div>',
    '      <div id="scheduleListBox" style="display:flex;flex-direction:column;gap:5px;max-height:110px;overflow-y:auto;"></div>',
    '    </div>',
    '  </section>',
    '</div>'
  ].join("\n");
});

// ============================================================================
// SYMMETRIC 1-CODE PEERJS ENGINE + 3-HOUR LOCK + RELIABLE VOICE/VIDEO CALL
// ============================================================================

const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 3 Hours = 10,800,000 ms
let sessionLockDeadline = 0;
let lockTimerHandle = null;
let incomingPendingCall = null;
let remotePeerIdTarget = "";

const RTC_ICE_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:global.stun.twilio.com:3478" }
  ]
};

function startThreeHourLockTimer(customDeadline) {
  sessionLockDeadline = customDeadline || (Date.now() + THREE_HOURS_MS);
  localStorage.setItem("animatrix_3h_deadline", String(sessionLockDeadline));
  if (lockTimerHandle) clearInterval(lockTimerHandle);

  function updateClock() {
    const remaining = sessionLockDeadline - Date.now();
    const clockEl = document.getElementById("threeHourCountdown");
    if (remaining <= 0) {
      clearInterval(lockTimerHandle);
      if (clockEl) clockEl.textContent = "00:00:00 (LOCKED)";
      lockEntireSessionNow();
      return;
    }
    const totalSec = Math.floor(remaining / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    if (clockEl) clockEl.textContent = hrs + ":" + mins + ":" + secs;
  }
  updateClock();
  lockTimerHandle = setInterval(updateClock, 1000);
}

function lockEntireSessionNow() {
  terminateReliableCall();
  if (window.activeConn) {
    try { window.activeConn.close(); } catch (e) {}
    window.activeConn = null;
  }
  if (window.peerInstance) {
    try { window.peerInstance.destroy(); } catch (e) {}
    window.peerInstance = null;
  }
  const lockScreen = document.getElementById("lockOverlayScreen");
  if (lockScreen) lockScreen.style.display = "flex";
}

window.resetAndUnlockSession = function() {
  localStorage.removeItem("animatrix_3h_deadline");
  const lockScreen = document.getElementById("lockOverlayScreen");
  if (lockScreen) lockScreen.style.display = "none";
  generateEasyCode();
};

window.generateEasyCode = function() {
  const random4Digit = String(Math.floor(1000 + Math.random() * 9000));
  const inp = document.getElementById("magicRoomCodeInput");
  if (inp) inp.value = random4Digit;
  document.getElementById("roomPasscode").value = random4Digit;
  connectWithEasyCode();
};

window.shareEasyCodeLink = function() {
  const code = (document.getElementById("magicRoomCodeInput").value || "").trim();
  if (!code) {
    generateEasyCode();
    return;
  }
  const exp = sessionLockDeadline || (Date.now() + THREE_HOURS_MS);
  const url = window.location.origin + window.location.pathname + "#code=" + encodeURIComponent(code) + "&lock=" + exp;
  navigator.clipboard.writeText(url).catch(function(){});
  appendChatBubble("SYSTEM", "📲 Direct Link Copy Ho Gaya! Dost ko yeh link bhejein ya sirf Code [" + code + "] bata dein.", "clone");
};

// Smart Symmetric Auto-Host / Auto-Guest Connection using ONLY the 4-Digit Code!
window.connectWithEasyCode = function() {
  const rawCode = (document.getElementById("magicRoomCodeInput").value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!rawCode) {
    alert("Kripya 4-digit code dalein ya 'Generate Code' button dabayein!");
    return;
  }
  document.getElementById("magicRoomCodeInput").value = rawCode;
  document.getElementById("roomPasscode").value = rawCode;

  if (!sessionLockDeadline || Date.now() > sessionLockDeadline) {
    startThreeHourLockTimer(Date.now() + THREE_HOURS_MS);
  }

  const hostPeerId = "animatrix-v11-code-" + rawCode;
  const badge = document.getElementById("simpleConnBadge");
  if (badge) {
    badge.style.color = "#ffbe3d";
    badge.textContent = "CONNECTING CODE " + rawCode + "...";
  }

  if (window.peerInstance) {
    try { window.peerInstance.destroy(); } catch (e) {}
  }

  // Step A: Try claiming the Host Peer ID for this code.
  // If nobody is on this code yet, we become Host and wait.
  // If our friend is ALREADY on this code ('unavailable-id'), we automatically connect to them as Guest!
  const candidatePeer = new Peer(hostPeerId, { config: RTC_ICE_CONFIG });
  window.peerInstance = candidatePeer;

  candidatePeer.on("open", function() {
    if (badge) {
      badge.style.color = "#00f5a0";
      badge.textContent = "CODE " + rawCode + " READY";
    }
    appendChatBubble("SYSTEM", "✅ Code [" + rawCode + "] Active Hai! Ab apne dost ko apne phone/laptop mein Code [" + rawCode + "] daal kar 'CONNECT NOW' dabane bolein.", "clone");
  });

  candidatePeer.on("connection", function(conn) {
    bindEasyDataChannel(conn, rawCode);
  });

  candidatePeer.on("call", function(incomingCall) {
    handleIncomingMediaCall(incomingCall);
  });

  candidatePeer.on("error", function(err) {
    if (err && err.type === "unavailable-id") {
      // Host already exists on this code! Automatically join them as Guest!
      try { candidatePeer.destroy(); } catch (e) {}
      const guestPeer = new Peer({ config: RTC_ICE_CONFIG });
      window.peerInstance = guestPeer;

      guestPeer.on("open", function() {
        remotePeerIdTarget = hostPeerId;
        const conn = guestPeer.connect(hostPeerId, { reliable: true });
        bindEasyDataChannel(conn, rawCode);
      });

      guestPeer.on("call", function(incomingCall) {
        handleIncomingMediaCall(incomingCall);
      });
    } else {
      if (badge) badge.textContent = "RETRYING...";
    }
  });
};

function bindEasyDataChannel(conn, code) {
  window.activeConn = conn;
  remotePeerIdTarget = conn.peer;

  conn.on("open", function() {
    const badge = document.getElementById("simpleConnBadge");
    if (badge) {
      badge.style.color = "#00f5a0";
      badge.textContent = "🟢 CONNECTED (" + code + ")";
    }
    const myName = document.getElementById("myChatName").value || "Friend";
    conn.send({ type: "HELLO_JOIN", sender: myName, lockAt: sessionLockDeadline });
    appendChatBubble("CONNECTED", "🎉 Code [" + code + "] Connect Ho Gaya! Ab aap niche Message bhej sakte hain ya upar 📞 VOICE CALL / 📹 VIDEO CALL daba sakte hain!", "clone");
  });

  conn.on("data", async function(pkt) {
    if (!pkt || typeof pkt !== "object") return;

    if (pkt.type === "HELLO_JOIN") {
      if (pkt.lockAt && pkt.lockAt > Date.now()) {
        startThreeHourLockTimer(pkt.lockAt);
      }
      appendChatBubble("ONLINE", "🟢 " + (pkt.sender || "Dost") + " aapke saath Code [" + code + "] par jud gaya hai!", "clone");
      return;
    }

    if (pkt.type === "DIRECT_CHAT") {
      const inLang = document.getElementById("incomingTranslateSelect").value;
      let translated = "";
      if (inLang && inLang !== "none") {
        try {
          const r = await callCloudAIWithShifter("Translate into " + inLang + ". Output ONLY translation.", pkt.text, 200);
          translated = r.content.trim();
        } catch (e) {}
      }
      appendChatBubble(pkt.sender || "Friend", pkt.text, pkt.isClone ? "clone" : "peer", translated);

      if (!pkt.isClone && document.getElementById("cloneActiveToggle") && document.getElementById("cloneActiveToggle").checked) {
        const persona = document.getElementById("clonePersonaInput").value.trim();
        const myName = document.getElementById("myChatName").value || "Gourav";
        try {
          const res = await callCloudAIWithShifter(
            "You are the AI Human Clone of " + myName + ". Instructions: " + persona + ". Reply naturally in 1-2 short sentences.",
            pkt.text, 200
          );
          const reply = res.content.trim();
          appendChatBubble("🤖 " + myName + "'s Clone", reply, "clone");
          conn.send({ type: "DIRECT_CHAT", sender: "🤖 " + myName + " (Clone)", text: reply, isClone: true });
        } catch (e) {}
      }
    }
  });

  conn.on("close", function() {
    const badge = document.getElementById("simpleConnBadge");
    if (badge) {
      badge.style.color = "#ffbe3d";
      badge.textContent = "DISCONNECTED";
    }
    appendChatBubble("STATUS", "⚠ Dost disconnect ho gaya. Dubara 'CONNECT NOW' dabayein.", "clone");
  });
}

window.sendSimpleChatMsg = async function(customMsg) {
  if (sessionLockDeadline > 0 && Date.now() > sessionLockDeadline) {
    lockEntireSessionNow();
    return;
  }
  const inp = document.getElementById("chatInputBox");
  const raw = customMsg !== undefined ? customMsg : (inp ? inp.value.trim() : "");
  if (!raw) return;
  if (customMsg === undefined && inp) inp.value = "";

  const myName = document.getElementById("myChatName").value || "Me";
  const outLang = document.getElementById("outgoingTranslateSelect").value;
  let textToSend = raw;
  let transPreview = "";

  if (outLang && outLang !== "none") {
    try {
      const r = await callCloudAIWithShifter("Translate into " + outLang + ". Output ONLY translation.", raw, 200);
      transPreview = r.content.trim();
      textToSend = transPreview + " (" + raw + ")";
    } catch (e) {}
  }

  appendChatBubble(myName + " (You)", raw, "me", transPreview);

  if (window.activeConn && window.activeConn.open) {
    window.activeConn.send({
      type: "DIRECT_CHAT",
      sender: myName,
      text: textToSend,
      isClone: false
    });
  } else {
    appendChatBubble("TIP", "💡 Abhi koi dost connected nahi hai. Left mein 'CONNECT NOW' dabayein, ya AI Clone jawab de raha hai...", "clone");
    if (document.getElementById("cloneActiveToggle") && document.getElementById("cloneActiveToggle").checked) {
      await triggerAIHumanCloneReply(raw, false);
    }
  }
};

// Override global sendEncryptedChatMessage so scheduler also uses the new direct channel
window.sendEncryptedChatMessage = window.sendSimpleChatMsg;

// ---------------- RELIABLE VOICE & VIDEO CALL WITH SMART FALLBACK ----------------
async function getBestLocalStream(wantVideo) {
  if (wantVideo) {
    try {
      return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (videoErr) {
      // Fallback to audio-only if webcam is busy or unavailable
      appendChatBubble("CALL", "ℹ️ Camera busy ya unavailable hai — Voice Call (Mic) se connect kiya ja raha hai.", "clone");
      return await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    }
  }
  return await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
}

window.initiateReliableCall = async function(wantVideo) {
  if (sessionLockDeadline > 0 && Date.now() > sessionLockDeadline) {
    lockEntireSessionNow();
    return;
  }
  const targetPeer = (window.activeConn && window.activeConn.peer) || remotePeerIdTarget;
  if (!window.peerInstance || !targetPeer) {
    appendChatBubble("CALL", "⚠ Call lagane se pehle Left side mein 4-digit Code daal kar '🟢 CONNECT NOW' dabayein!", "clone");
    return;
  }

  try {
    document.getElementById("callStatusPill").textContent = wantVideo ? "📹 CALLING VIDEO..." : "📞 CALLING VOICE...";
    window.localMediaStream = await getBestLocalStream(wantVideo);
    document.getElementById("videoCallStage").style.display = "grid";
    document.getElementById("localVideo").srcObject = window.localMediaStream;

    const call = window.peerInstance.call(targetPeer, window.localMediaStream, {
      metadata: { video: Boolean(wantVideo), caller: document.getElementById("myChatName").value || "Friend" }
    });
    window.activeMediaCall = call;

    call.on("stream", function(remoteStream) {
      document.getElementById("callStatusPill").textContent = "🟢 ON CALL";
      document.getElementById("remoteVideo").srcObject = remoteStream;
      const aud = document.getElementById("remoteAudioFallback");
      if (aud) aud.srcObject = remoteStream;
    });

    call.on("close", function() {
      terminateReliableCall();
    });
  } catch (err) {
    appendChatBubble("CALL ERROR", "⚠ Mic/Camera permission allow karein (Browser address bar mein lock icon par click karke Mic/Camera Allow karein).", "clone");
  }
};

function handleIncomingMediaCall(call) {
  incomingPendingCall = call;
  const callerName = (call.metadata && call.metadata.caller) || "Dost";
  const isVid = call.metadata && call.metadata.video;
  const banner = document.getElementById("incomingCallBanner");
  const txt = document.getElementById("incomingCallText");
  if (txt) {
    txt.textContent = (isVid ? "📹 Incoming Video Call from " : "📞 Incoming Voice Call from ") + callerName;
  }
  if (banner) banner.style.display = "flex";
}

window.acceptIncomingCallNow = async function() {
  if (!incomingPendingCall) return;
  const call = incomingPendingCall;
  incomingPendingCall = null;
  const banner = document.getElementById("incomingCallBanner");
  if (banner) banner.style.display = "none";

  try {
    const wantVideo = call.metadata && call.metadata.video;
    window.localMediaStream = await getBestLocalStream(wantVideo);
    document.getElementById("videoCallStage").style.display = "grid";
    document.getElementById("localVideo").srcObject = window.localMediaStream;

    call.answer(window.localMediaStream);
    window.activeMediaCall = call;
    document.getElementById("callStatusPill").textContent = "🟢 ON CALL";

    call.on("stream", function(remoteStream) {
      document.getElementById("remoteVideo").srcObject = remoteStream;
      const aud = document.getElementById("remoteAudioFallback");
      if (aud) aud.srcObject = remoteStream;
    });

    call.on("close", function() {
      terminateReliableCall();
    });
  } catch (err) {
    appendChatBubble("CALL ERROR", "⚠ Call uthane ke liye Mic/Camera permission allow karein: " + err.message, "clone");
  }
};

window.terminateReliableCall = function() {
  const banner = document.getElementById("incomingCallBanner");
  if (banner) banner.style.display = "none";
  if (window.activeMediaCall) {
    try { window.activeMediaCall.close(); } catch (e) {}
    window.activeMediaCall = null;
  }
  if (window.localMediaStream) {
    window.localMediaStream.getTracks().forEach(function(t) { t.stop(); });
    window.localMediaStream = null;
  }
  const stage = document.getElementById("videoCallStage");
  if (stage) stage.style.display = "none";
  const pill = document.getElementById("callStatusPill");
  if (pill) pill.textContent = "READY";
};

// Auto-read #code=... from URL if friend clicked shared link
window.addEventListener("load", function() {
  setTimeout(function() {
    const hash = window.location.hash || "";
    if (hash.includes("code=")) {
      openAppView("chat");
      const mCode = hash.match(/code=([^&]+)/);
      const mLock = hash.match(/lock=(\d+)/);
      if (mLock) {
        const lockTs = parseInt(mLock[1], 10);
        if (Date.now() > lockTs) {
          lockEntireSessionNow();
          return;
        }
        startThreeHourLockTimer(lockTs);
      }
      if (mCode) {
        document.getElementById("magicRoomCodeInput").value = decodeURIComponent(mCode[1]);
        connectWithEasyCode();
      }
    } else {
      const savedLock = parseInt(localStorage.getItem("animatrix_3h_deadline") || "0", 10);
      if (savedLock > 0) {
        startThreeHourLockTimer(savedLock);
      } else {
        startThreeHourLockTimer(Date.now() + THREE_HOURS_MS);
      }
    }
  }, 500);
});
