(function() {
  // ========== AUDIO SETUP (8-bit sounds) ==========
  let audioCtx = null;
  
  function initAudio() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {
      console.warn('Web Audio API tidak didukung.');
    }
  }

  function playClickSound() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 1046;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.12);
    
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 523;
    const gain2 = audioCtx.createGain();
    gain2.gain.setValueAtTime(0.1, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start();
    osc2.stop(now + 0.15);
  }

  function playHoverSound() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 784;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.06);
  }

  let lastHoverSound = 0;
  function throttledHoverSound() {
    const now = performance.now();
    if (now - lastHoverSound < 80) return;
    lastHoverSound = now;
    playHoverSound();
  }

  // ========== PERSONA FINDER (60+ variasi) ==========
  const form = document.getElementById('personaForm');
  const namaInput = document.getElementById('nama');
  const hobiSelect = document.getElementById('hobi');
  const angkaInput = document.getElementById('angka');
  const personaResult = document.getElementById('personaResult');
  const personaSubtext = document.getElementById('personaSubtext');

  function generatePersona(nama, hobi, angka) {
    const displayName = nama.trim() === '' ? 'Penjelajah' : nama.trim();
    let num = parseInt(angka, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10) num = 10;
    const namePart = displayName.split(' ')[0];
    
    const personaMap = {
      coding: {
        1:'The Rookie Coder',2:'The Bug Squasher',3:'The Algorithm Novice',
        4:'The Junior Dev',5:'The Code Weaver',6:'The Logic Wizard',
        7:'The Software Architect',8:'The Full-Stack Sage',9:'The Tech Visionary',
        10:'The Digital Demiurge'
      },
      design: {
        1:'The Pixel Dabbler',2:'The Color Picker',3:'The Doodle Artist',
        4:'The Layout Tinkerer',5:'The UI Crafter',6:'The Visual Storyteller',
        7:'The Creative Director',8:'The Aesthetic Oracle',9:'The Design Virtuoso',
        10:'The Supreme Artisan'
      },
      music: {
        1:'The Humming Bard',2:'The Rhythm Tapper',3:'The GarageBand Hero',
        4:'The Melody Maker',5:'The Harmony Weaver',6:'The Sonic Sculptor',
        7:'The Virtuoso',8:'The Audio Alchemist',9:'The Maestro',
        10:'The Celestial Composer'
      },
      writing: {
        1:'The Scribbler',2:'The Note Taker',3:'The Word Slinger',
        4:'The Plot Twister',5:'The Prose Poet',6:'The Narrative Weaver',
        7:'The Storyteller',8:'The Wordsmith',9:'The Literary Sage',
        10:'The Chronicler of Worlds'
      },
      gaming: {
        1:'The Button Masher',2:'The Casual Raider',3:'The Quest Taker',
        4:'The Tactical Noob',5:'The Skilled Strategist',6:'The PvP Veteran',
        7:'The Dungeon Master',8:'The Speedrunner',9:'The Esports Gladiator',
        10:'The Legendary Hero'
      },
      sports: {
        1:'The Weekend Jogger',2:'The Gym Newbie',3:'The Active Spirit',
        4:'The Team Player',5:'The Agile Athlete',6:'The Endurance Beast',
        7:'The Competitive Ace',8:'The Iron Champion',9:'The Olympic Hopeful',
        10:'The GOAT'
      }
    };
    
    const hobbyKey = hobi in personaMap ? hobi : 'coding';
    const personaTitle = personaMap[hobbyKey][num] || 'The Creative Soul';
    const hobbyLabels = { coding:'Coding', design:'Design', music:'Musik', writing:'Menulis', gaming:'Gaming', sports:'Olahraga' };
    const hobbyLabel = hobbyLabels[hobi] || hobi;
    const subMessage = `✨ ${namePart}, dengan hobi ${hobbyLabel} dan angka ${num}, personamu adalah:`;
    return { mainPersona: personaTitle, subMessage };
  }

  function updatePersonaOutput(event) {
    if (event) event.preventDefault();
    const nama = namaInput.value.trim();
    const hobi = hobiSelect.value;
    const angka = angkaInput.value;
    if (!hobi) {
      personaResult.textContent = '⚠️ Pilih hobi';
      personaSubtext.textContent = 'Hobi diperlukan untuk menemukan persona.';
      return;
    }
    let num = parseInt(angka, 10);
    if (isNaN(num) || num < 1 || num > 10) {
      personaResult.textContent = '🔢 1–10 saja';
      personaSubtext.textContent = 'Masukkan angka keberuntungan 1 sampai 10.';
      return;
    }
    const { mainPersona, subMessage } = generatePersona(nama, hobi, num);
    personaResult.textContent = mainPersona;
    personaSubtext.textContent = subMessage;
  }

  // ========== EVENT LISTENERS ==========
  form.addEventListener('submit', (e) => {
    playClickSound();
    updatePersonaOutput(e);
  });

  document.querySelectorAll('.pixel-btn, .pixel-link').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      initAudio();
    });
  });

  document.querySelectorAll('.pixel-btn, .pixel-link, .pixel-input, .pixel-select').forEach(el => {
    el.addEventListener('mouseenter', throttledHoverSound);
  });

  angkaInput.addEventListener('input', function() {
    let val = parseInt(this.value, 10);
    if (this.value !== '') {
      if (val < 1) this.value = 1;
      if (val > 10) this.value = 10;
    }
  });
})();