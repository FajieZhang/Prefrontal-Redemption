/**
 * 抗数字成瘾系统前端核心控制逻辑 (App.js)
 * 遵循意向实现理论、微摩擦神经阻断与自决理论交互架构
 * 
 * 核心功能：
 * 1. 每次离开后台返回桌面后再进入时自动重置为引导/调息界面
 * 2. Phase 0 觉察卡片（简明引导用户下意识误触行为与接下来要做的事情）
 * 3. 三段呼吸时间自定义（吸气、屏息、呼气独立增减与主流预设芯片）
 * 4. 1000条学术核校级典籍名言语料库防脱敏曝光算法
 */

(function () {
  'use strict';

  // --- 1. 配置与默认状态 ---
  const DEFAULT_SETTINGS = {
    camouflage: 'bili',     // 'bili' | 'douyin' | 'xhs'
    breath_inhale: 6,       // 吸气秒数 (默认 6s)
    breath_hold: 6,         // 屏息秒数 (默认 6s)
    breath_exhale: 6,       // 呼气秒数 (默认 6s)
    sound: true,
    vibrate: true
  };

  const CAMOUFLAGE_PRESETS = {
    bili: {
      name: '哔哩哔哩',
      themeColor: '#FB7299',
      accentColor: '#FB7299',
      appScheme: 'bilibili://',
      webUrl: 'https://m.bilibili.com'
    },
    douyin: {
      name: '抖音',
      themeColor: '#000000',
      accentColor: '#24F6F0',
      appScheme: 'snssdk1128://',
      webUrl: 'https://www.douyin.com'
    },
    xhs: {
      name: '小红书',
      themeColor: '#FF2442',
      accentColor: '#FF2442',
      appScheme: 'xhsdiscover://',
      webUrl: 'https://www.xiaohongshu.com'
    }
  };

  // --- 2. 状态持久化管理 ---
  function getSettings() {
    try {
      const saved = localStorage.getItem('zen_anti_settings');
      let settings = saved ? Object.assign({}, DEFAULT_SETTINGS, JSON.parse(saved)) : Object.assign({}, DEFAULT_SETTINGS);

      // 兼容旧版本设置平滑迁移
      if (typeof settings.breath_inhale === 'undefined') {
        if (settings.breath_duration) {
          const step = Math.max(3, Math.round(settings.breath_duration / 3));
          settings.breath_inhale = step;
          settings.breath_hold = step;
          settings.breath_exhale = step;
        } else {
          settings.breath_inhale = 6;
          settings.breath_hold = 6;
          settings.breath_exhale = 6;
        }
      }
      return settings;
    } catch (e) {
      return Object.assign({}, DEFAULT_SETTINGS);
    }
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem('zen_anti_settings', JSON.stringify(settings));
    } catch (e) {}
  }

  function getStats() {
    const today = new Date().toISOString().split('T')[0];
    const defaultStats = {
      total_resisted: 0,
      total_proceeded: 0,
      streak_days: 0,
      last_active_date: '',
      today_date: today,
      today_count: 0,
      category_counts: {}
    };

    try {
      const saved = localStorage.getItem('zen_anti_stats');
      let stats = saved ? Object.assign({}, defaultStats, JSON.parse(saved)) : defaultStats;

      // 日期重置检查
      if (stats.today_date !== today) {
        // 计算连胜天数 (若昨日活跃则 streak+1，否则看是否断签)
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (stats.last_active_date !== yesterday && stats.last_active_date !== today) {
          stats.streak_days = 0;
        }
        stats.today_date = today;
        stats.today_count = 0;
      }
      return stats;
    } catch (e) {
      return defaultStats;
    }
  }

  function saveStats(stats) {
    try {
      localStorage.setItem('zen_anti_stats', JSON.stringify(stats));
    } catch (e) {}
  }

  function getExposureCounts() {
    try {
      const saved = localStorage.getItem('zen_anti_exposures');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  function recordQuoteExposure(quoteId) {
    try {
      const exposures = getExposureCounts();
      exposures[quoteId] = (exposures[quoteId] || 0) + 1;
      localStorage.setItem('zen_anti_exposures', JSON.stringify(exposures));
    } catch (e) {}
  }

  // --- 3. Web Audio API 正念磬音合成器 (纯客户端，无外部依赖) ---
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // 播放静心颂钵音 (Singing Bowl / Chime)
  function playZenBell(freq = 432, duration = 2.4) {
    const settings = getSettings();
    if (!settings.sound) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio play prevented:', e);
    }
  }

  // 播放成功解脱和弦
  function playSuccessChord() {
    const settings = getSettings();
    if (!settings.sound) return;

    const notes = [528, 660, 792, 1056]; // 纯净高频和弦
    notes.forEach((freq, idx) => {
      setTimeout(() => playZenBell(freq, 2.8), idx * 120);
    });
  }

  // 触觉反馈 (Vibration API)
  function triggerHaptic(pattern = [30]) {
    const settings = getSettings();
    if (settings.vibrate && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // --- 4. 智能语料挑选算法 (千条名言防脱敏与分类平衡) ---
  function selectOptimalQuote() {
    if (typeof QUOTES_DATABASE === 'undefined' || !QUOTES_DATABASE.length) {
      return {
        id: 0,
        content: "胜人者有力，自胜者强。",
        author: "老子",
        source_work: "《道德经·第三十三章》",
        category: "self_discipline",
        reflection_prompt: "滑动屏幕是手指的本能，但停下来才是真正掌控自我的力量。你现在能赢过无意识的冲动吗？"
      };
    }

    const exposures = getExposureCounts();
    let minExp = Infinity;
    QUOTES_DATABASE.forEach(q => {
      const exp = exposures[q.id] || 0;
      if (exp < minExp) minExp = exp;
    });

    const candidatePool = QUOTES_DATABASE.filter(q => (exposures[q.id] || 0) <= minExp + 1);
    const chosen = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    recordQuoteExposure(chosen.id);
    return chosen;
  }

  // --- 5. 背景微粒子动效 (Ambient Particles) ---
  function initParticleCanvas() {
    const canvas = document.getElementById('canvas-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let particles = [];
    const PARTICLE_COUNT = 32;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.4})`;
        ctx.fill();
      });
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // 爆发庆祝粒子
    window.burstCelebrationParticles = function () {
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: w / 2,
          y: h / 2,
          r: Math.random() * 3.5 + 1.5,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          alpha: 1
        });
      }
    };
  }

  // --- 6. 核心流程状态机 ---
  let currentTimer = null;
  let introTimer = null;
  let currentQuote = null;
  let lastHiddenTimestamp = 0;

  const UI = {
    phaseBadge: document.getElementById('phase-badge'),
    countdownBar: document.getElementById('countdown-bar'),
    timerText: document.getElementById('timer-text'),
    phaseIntro: document.getElementById('phase-0-intro'),
    phaseBreathing: document.getElementById('phase-1-breathing'),
    phaseQuote: document.getElementById('phase-2-quote'),
    phaseResolution: document.getElementById('resolution-screen'),
    btnStartBreath: document.getElementById('btn-start-breath'),
    introCountdownTip: document.getElementById('intro-countdown-tip'),
    breathStateText: document.getElementById('breath-text'),
    breathSubTimer: document.getElementById('breath-sub-timer'),
    dotInhale: document.getElementById('dot-inhale'),
    dotHold: document.getElementById('dot-hold'),
    dotExhale: document.getElementById('dot-exhale'),
    quoteContent: document.getElementById('quote-content'),
    quoteAuthor: document.getElementById('quote-author'),
    quoteSource: document.getElementById('quote-source'),
    quoteCategoryTag: document.getElementById('quote-category-tag'),
    reflectionPrompt: document.getElementById('reflection-prompt'),
    phaseLockedHint: document.getElementById('phase-locked-hint'),
    btnResistSuccess: document.getElementById('btn-resist-success'),
    statTodayCount: document.getElementById('stat-today-count'),
    statTotalCount: document.getElementById('stat-total-count'),
    btnRestart: document.getElementById('btn-restart'),
    disguiseName: document.getElementById('current-disguise-name'),
    camIndicator: document.getElementById('btn-cam-indicator'),
    breathTotalPreview: document.getElementById('breath-total-preview'),
    valInhale: document.getElementById('val-inhale'),
    valHold: document.getElementById('val-hold'),
    valExhale: document.getElementById('val-exhale')
  };

  function setBreathStep(stepIndex, remainInStep, stepDuration) {
    const dots = [UI.dotInhale, UI.dotHold, UI.dotExhale];
    dots.forEach((dot, idx) => {
      if (dot) dot.classList.toggle('active', idx === stepIndex);
    });

    if (UI.breathSubTimer) {
      UI.breathSubTimer.textContent = `${remainInStep}s`;
    }

    const cues = [
      `深吸气 (${stepDuration}秒)...`,
      `屏息觉察 (${stepDuration}秒)...`,
      `徐徐呼气 (${stepDuration}秒)...`
    ];
    if (UI.breathStateText) {
      UI.breathStateText.textContent = cues[stepIndex] || cues[0];
    }
  }

  // --- Phase 0: 觉察时刻引导卡片 ---
  function startIntroFlow() {
    clearInterval(currentTimer);
    clearInterval(introTimer);

    if (UI.phaseIntro) UI.phaseIntro.classList.add('active');
    UI.phaseBreathing.classList.remove('active');
    UI.phaseQuote.classList.remove('active');
    UI.phaseResolution.classList.remove('active');

    UI.phaseBadge.textContent = '觉察时刻 · 暂停本能';
    UI.btnResistSuccess.disabled = true;
    UI.phaseLockedHint.classList.add('active');
    UI.phaseLockedHint.innerHTML = `<span class="lock-icon">🔒</span><span>觉察冲动停顿片刻，准备开始调息...</span>`;

    const settings = getSettings();
    const inhale = Math.max(2, parseInt(settings.breath_inhale, 10) || 6);
    const hold = Math.max(0, parseInt(settings.breath_hold, 10) || 0);
    const exhale = Math.max(2, parseInt(settings.breath_exhale, 10) || 6);

    if (UI.dotInhale) UI.dotInhale.textContent = `吸气 ${inhale}s`;
    if (UI.dotHold) UI.dotHold.textContent = `屏息 ${hold}s`;
    if (UI.dotExhale) UI.dotExhale.textContent = `呼气 ${exhale}s`;

    let introRemain = 3;
    if (UI.introCountdownTip) {
      UI.introCountdownTip.textContent = `${introRemain} 秒后将自动开始...`;
    }
    UI.timerText.textContent = `${introRemain}s`;
    UI.countdownBar.style.width = '0%';

    const introStart = Date.now();
    const introTotalMs = 3500; // 3.5秒自动过渡

    introTimer = setInterval(() => {
      const elapsed = Date.now() - introStart;
      const progress = Math.min(100, (elapsed / introTotalMs) * 100);
      const remainSec = Math.max(1, Math.ceil((introTotalMs - elapsed) / 1000));

      UI.countdownBar.style.width = `${progress}%`;
      UI.timerText.textContent = `${remainSec}s`;
      if (UI.introCountdownTip) {
        UI.introCountdownTip.textContent = `${remainSec} 秒后将自动开始...`;
      }

      if (elapsed >= introTotalMs) {
        clearInterval(introTimer);
        startBreathingFlow();
      }
    }, 100);
  }

  // --- Phase 1: 3段自定义深呼吸调息 ---
  function startBreathingFlow() {
    clearInterval(currentTimer);
    clearInterval(introTimer);

    const settings = getSettings();
    const inhale = Math.max(2, parseInt(settings.breath_inhale, 10) || 6);
    const hold = Math.max(0, parseInt(settings.breath_hold, 10) || 0);
    const exhale = Math.max(2, parseInt(settings.breath_exhale, 10) || 6);
    const breathDuration = inhale + hold + exhale;
    const quoteReadDuration = 6; // 典籍默读反思时间
    const totalDuration = breathDuration + quoteReadDuration;

    // 动态同步 CSS 呼吸动画周期
    document.documentElement.style.setProperty('--breath-total', `${breathDuration}s`);

    // 准备随机最优名言
    currentQuote = selectOptimalQuote();
    populateQuoteUI(currentQuote);

    // 切换至阶段 1
    if (UI.phaseIntro) UI.phaseIntro.classList.remove('active');
    UI.phaseBreathing.classList.add('active');
    UI.phaseQuote.classList.remove('active');
    UI.phaseResolution.classList.remove('active');

    UI.phaseBadge.textContent = '第 1 阶段 · 调息阻断';
    UI.phaseLockedHint.classList.add('active');
    UI.phaseLockedHint.innerHTML = `<span class="lock-icon">🔒</span><span>${inhale}-${hold}-${exhale} 正念呼吸中，重连理智前额叶...</span>`;

    if (UI.dotInhale) UI.dotInhale.textContent = `吸气 ${inhale}s`;
    if (UI.dotHold) UI.dotHold.textContent = `屏息 ${hold}s`;
    if (UI.dotExhale) UI.dotExhale.textContent = `呼气 ${exhale}s`;

    UI.btnResistSuccess.disabled = true;
    UI.countdownBar.style.width = '0%';
    UI.timerText.textContent = `${totalDuration}s`;

    // 播放起始磬音与触觉
    playZenBell(432, 2.5);
    triggerHaptic([40, 60, 40]);

    setBreathStep(0, inhale, inhale);

    let lastStep = -1;
    const startTime = Date.now();

    currentTimer = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(100, (elapsed / totalDuration) * 100);
      const remain = Math.max(0, Math.ceil(totalDuration - elapsed));

      UI.countdownBar.style.width = `${progress}%`;
      UI.timerText.textContent = `${remain}s`;

      // 阶段 1: 3 步呼吸节律循环 (吸气 / 屏气 / 呼气)
      if (elapsed < breathDuration) {
        let step = 0;
        let remainInStep = 0;
        let stepDuration = inhale;

        if (elapsed < inhale) {
          step = 0;
          stepDuration = inhale;
          remainInStep = Math.max(1, Math.ceil(inhale - elapsed));
        } else if (elapsed < inhale + hold) {
          step = 1;
          stepDuration = hold;
          remainInStep = Math.max(1, Math.ceil((inhale + hold) - elapsed));
        } else {
          step = 2;
          stepDuration = exhale;
          remainInStep = Math.max(1, Math.ceil(breathDuration - elapsed));
        }

        setBreathStep(step, remainInStep, stepDuration);

        // 每次进入新呼吸节点时轻微触觉与音律提示
        if (step !== lastStep) {
          lastStep = step;
          if (step === 1) {
            playZenBell(528, 1.8);
            triggerHaptic([30, 40]);
          } else if (step === 2) {
            playZenBell(396, 2.0);
            triggerHaptic([30, 40]);
          }
        }
      }

      // 切换至阶段 2: 浮现典籍名言与苏格拉底自省 (呼吸完成后)
      if (elapsed >= breathDuration && !UI.phaseQuote.classList.contains('active') && !UI.phaseResolution.classList.contains('active')) {
        UI.phaseBreathing.classList.remove('active');
        UI.phaseQuote.classList.add('active');
        UI.phaseBadge.textContent = '第 2 阶段 · 典籍自省';
        UI.phaseLockedHint.innerHTML = `<span class="lock-icon">🔒</span><span>用心默读典籍箴言，稍后即可确认觉察...</span>`;
        playZenBell(660, 2.2);
        triggerHaptic([25, 60, 25]);
      }

      // 切换至阶段 3: 解锁确认按钮 (到达 totalDuration 时)
      if (elapsed >= totalDuration) {
        clearInterval(currentTimer);
        unlockPhaseThree();
      }
    }, 100);
  }

  function unlockPhaseThree() {
    UI.phaseBadge.textContent = '第 3 阶段 · 觉察完成';
    UI.phaseLockedHint.classList.remove('active');

    UI.btnResistSuccess.disabled = false;

    // 清脆空灵磬音告知身心已就绪
    playZenBell(792, 1.8);
    triggerHaptic([30, 50, 30]);
  }

  function populateQuoteUI(quote) {
    if (!quote) return;
    UI.quoteContent.textContent = quote.content;
    UI.quoteAuthor.textContent = quote.author;
    UI.quoteSource.textContent = quote.source_work;
    UI.reflectionPrompt.textContent = quote.reflection_prompt;

    const theme = (typeof THEME_INFO !== 'undefined' && THEME_INFO[quote.category]) || {
      name: "自律与内在控制",
      tag: "自胜者强",
      color: "#4ade80"
    };
    UI.quoteCategoryTag.textContent = theme.tag;
    UI.quoteCategoryTag.style.color = theme.color;
    UI.quoteCategoryTag.style.borderColor = theme.color + '44';
    UI.quoteCategoryTag.style.backgroundColor = theme.color + '18';
  }

  // --- 7. 用户决策交互 (放下手机，夺回专注) ---
  function handleResistSuccess() {
    const stats = getStats();
    stats.total_resisted += 1;
    stats.today_count += 1;
    stats.last_active_date = new Date().toISOString().split('T')[0];

    // 记录分类滋养
    if (currentQuote && currentQuote.category) {
      stats.category_counts[currentQuote.category] = (stats.category_counts[currentQuote.category] || 0) + 1;
    }
    saveStats(stats);

    // 视听庆贺
    playSuccessChord();
    triggerHaptic([40, 80, 40, 80, 50]);
    if (window.burstCelebrationParticles) {
      window.burstCelebrationParticles();
    }

    // 切换至小绿苗战报界面
    UI.phaseQuote.classList.remove('active');
    UI.phaseBreathing.classList.remove('active');
    if (UI.phaseIntro) UI.phaseIntro.classList.remove('active');
    UI.phaseResolution.classList.add('active');

    UI.statTodayCount.textContent = stats.today_count;
    UI.statTotalCount.textContent = stats.total_resisted;

    UI.phaseBadge.textContent = '阻断成功 · 夺回专注';
    UI.btnResistSuccess.disabled = true;
  }

  // --- 8. 伪装主题切换逻辑 ---
  function applyCamouflage(key) {
    const preset = CAMOUFLAGE_PRESETS[key] || CAMOUFLAGE_PRESETS.bili;
    document.title = preset.name;
    UI.disguiseName.textContent = preset.name;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', preset.themeColor);

    const appDot = document.querySelector('.app-dot');
    if (appDot) {
      appDot.style.backgroundColor = preset.accentColor;
      appDot.style.boxShadow = `0 0 8px ${preset.accentColor}`;
    }

    document.querySelectorAll('.theme-option-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.app === key);
    });
  }

  // --- 9. 呼吸时间设置与预设芯片同步 ---
  function updateBreathSettingsUI() {
    const s = getSettings();
    const inh = s.breath_inhale;
    const hld = s.breath_hold;
    const exh = s.breath_exhale;
    const total = inh + hld + exh;

    if (UI.valInhale) UI.valInhale.textContent = inh;
    if (UI.valHold) UI.valHold.textContent = hld;
    if (UI.valExhale) UI.valExhale.textContent = exh;

    if (UI.breathTotalPreview) {
      UI.breathTotalPreview.textContent = `吸 ${inh}s · 屏 ${hld}s · 呼 ${exh}s (共 ${total}秒)`;
    }

    const presetStr = `${inh},${hld},${exh}`;
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.preset === presetStr);
    });
  }

  // --- 10. 统计战报渲染 ---
  function renderStatsModal() {
    const stats = getStats();
    document.getElementById('stats-total-resisted').textContent = stats.total_resisted;
    document.getElementById('stats-streak-days').textContent = stats.streak_days;

    const savedMins = stats.total_resisted * 25;
    document.getElementById('stats-saved-time').textContent = savedMins >= 60 ? `${(savedMins / 60).toFixed(1)} 小时` : `${savedMins} 分钟`;

    const todayResistedEl = document.getElementById('stats-today-resisted');
    if (todayResistedEl) todayResistedEl.textContent = stats.today_count;

    const container = document.getElementById('category-bars');
    container.innerHTML = '';

    if (typeof THEME_INFO !== 'undefined') {
      let maxCount = 1;
      Object.keys(THEME_INFO).forEach(k => {
        const c = stats.category_counts[k] || 0;
        if (c > maxCount) maxCount = c;
      });

      Object.keys(THEME_INFO).forEach(catKey => {
        const info = THEME_INFO[catKey];
        const count = stats.category_counts[catKey] || 0;
        const pct = Math.max(5, (count / maxCount) * 100);

        const row = document.createElement('div');
        row.className = 'category-row';
        row.innerHTML = `
          <div class="cat-label-wrap">
            <span>${info.name}</span>
            <span>${count} 次</span>
          </div>
          <div class="cat-bar-bg">
            <div class="cat-bar-fill" style="width: ${pct}%; background-color: ${info.color};"></div>
          </div>
        `;
        container.appendChild(row);
      });
    }
  }

  // --- 11. 回到桌面与切回应用自动重置机制 (核心需求 1) ---
  function handleAppResume() {
    // 当用户从桌面再次点开应用，或者从后台切回应用时：
    // 1. 如果停留在小绿苗战报页 (resolution-screen)
    // 2. 或者在后台离开超过 2 秒
    // 自动重置到觉察与呼吸引导流程，无需手动刷新
    const isAtResolution = UI.phaseResolution && UI.phaseResolution.classList.contains('active');
    const wasAwayLongEnough = lastHiddenTimestamp > 0 && (Date.now() - lastHiddenTimestamp > 2000);

    if (isAtResolution || wasAwayLongEnough) {
      startIntroFlow();
    }
  }

  // --- 12. 事件绑定与初始化 ---
  function bindEvents() {
    // 决策按钮
    UI.btnResistSuccess.addEventListener('click', handleResistSuccess);
    UI.btnRestart.addEventListener('click', startIntroFlow);

    // Phase 0 引导卡片：点击立即开始调息
    if (UI.btnStartBreath) {
      UI.btnStartBreath.addEventListener('click', () => {
        clearInterval(introTimer);
        startBreathingFlow();
      });
    }

    // 模态弹窗开关
    const modals = {
      'btn-guide': 'modal-guide',
      'btn-show-guide-banner': 'modal-guide',
      'btn-stats': 'modal-stats',
      'btn-settings': 'modal-settings'
    };

    Object.keys(modals).forEach(btnId => {
      const btn = document.getElementById(btnId);
      const modalId = modals[btnId];
      const modal = document.getElementById(modalId);
      if (btn && modal) {
        btn.addEventListener('click', () => {
          if (modalId === 'modal-stats') renderStatsModal();
          if (modalId === 'modal-settings') updateBreathSettingsUI();
          modal.classList.add('active');
        });
      }
    });

    // 模态弹窗关闭
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.close;
        const target = document.getElementById(modalId);
        if (target) target.classList.remove('active');
      });
    });

    // 点击遮罩关闭
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    // 指南 Tab 切换
    document.querySelectorAll('.tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const targetId = tabBtn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        tabBtn.classList.add('active');
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add('active');
      });
    });

    // 声音与震动开关
    const soundBtn = document.getElementById('btn-sound');
    const soundSwitch = document.getElementById('switch-sound');
    const vibrateSwitch = document.getElementById('switch-vibrate');

    function updateSoundUI(enabled) {
      if (soundBtn) soundBtn.style.opacity = enabled ? '1' : '0.4';
      if (soundSwitch) soundSwitch.checked = enabled;
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const s = getSettings();
        s.sound = !s.sound;
        saveSettings(s);
        updateSoundUI(s.sound);
        if (s.sound) playZenBell(432, 1);
      });
    }

    if (soundSwitch) {
      soundSwitch.addEventListener('change', (e) => {
        const s = getSettings();
        s.sound = e.target.checked;
        saveSettings(s);
        updateSoundUI(s.sound);
      });
    }

    if (vibrateSwitch) {
      vibrateSwitch.addEventListener('change', (e) => {
        const s = getSettings();
        s.vibrate = e.target.checked;
        saveSettings(s);
        if (s.vibrate) triggerHaptic([50]);
      });
    }

    // 3段呼吸步进调节按钮 (+ / -)
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action; // 'inc' | 'dec'
        const target = btn.dataset.target; // 'inhale' | 'hold' | 'exhale'
        const key = `breath_${target}`;
        const s = getSettings();
        let val = parseInt(s[key], 10) || 6;

        if (action === 'inc') {
          val = Math.min(15, val + 1);
        } else if (action === 'dec') {
          const minVal = target === 'hold' ? 0 : 2; // 屏息允许为0s
          val = Math.max(minVal, val - 1);
        }

        s[key] = val;
        saveSettings(s);
        updateBreathSettingsUI();
        triggerHaptic([20]);
      });
    });

    // 呼吸预设芯片 (6-6-6, 4-7-8, 4-4-4)
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const parts = chip.dataset.preset.split(',').map(n => parseInt(n, 10));
        if (parts.length === 3) {
          const s = getSettings();
          s.breath_inhale = parts[0];
          s.breath_hold = parts[1];
          s.breath_exhale = parts[2];
          saveSettings(s);
          updateBreathSettingsUI();
          triggerHaptic([25]);
        }
      });
    });

    // 伪装主题切换
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const appKey = btn.dataset.app;
        const s = getSettings();
        s.camouflage = appKey;
        saveSettings(s);
        applyCamouflage(appKey);
      });
    });

    // 清除统计数据
    const resetBtn = document.getElementById('btn-reset-stats');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有本地战报与坚持记录吗？')) {
          localStorage.removeItem('zen_anti_stats');
          localStorage.removeItem('zen_anti_exposures');
          renderStatsModal();
          alert('数据已重置。');
        }
      });
    }

    // 安装提示 Banner 逻辑
    const banner = document.getElementById('banner-pwa-tip');
    const dismissBannerBtn = document.getElementById('btn-dismiss-banner');
    if (dismissBannerBtn && banner) {
      dismissBannerBtn.addEventListener('click', () => {
        banner.classList.add('hidden');
        sessionStorage.setItem('zen_pwa_banner_dismissed', '1');
      });
    }

    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone || sessionStorage.getItem('zen_pwa_banner_dismissed')) {
      if (banner) banner.classList.add('hidden');
    }

    // 生命周期事件监听：切回前台时自动重置 (针对手机端桌面回到应用)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        lastHiddenTimestamp = Date.now();
      } else if (document.visibilityState === 'visible') {
        handleAppResume();
        lastHiddenTimestamp = 0;
      }
    });

    window.addEventListener('pageshow', () => {
      handleAppResume();
    });

    window.addEventListener('focus', () => {
      handleAppResume();
    });
  }

  // --- 13. Service Worker 注册 ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch(err => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    }
  }

  // --- 初始化启动 ---
  window.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    const settings = getSettings();
    applyCamouflage(settings.camouflage);

    const soundSwitch = document.getElementById('switch-sound');
    if (soundSwitch) soundSwitch.checked = settings.sound;
    const vibrateSwitch = document.getElementById('switch-vibrate');
    if (vibrateSwitch) vibrateSwitch.checked = settings.vibrate;

    updateBreathSettingsUI();
    bindEvents();
    registerServiceWorker();

    // 开启第一轮：先显示觉察引导 (Phase 0)
    startIntroFlow();
  });

})();
