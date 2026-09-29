// Домино по-одесски — Phaser 4
const W = 480, H = 800, TL = 52, TH = 28;
const PIPS = {0:[],1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],
  5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
const SAY = {
  start: ["Ша! Раздали. Таки начинаем!", "Костяшки на столе, нервы в кулаке. Поехали!", "Одесса-мама, благослови эту партию!", "Играем честно. Ну, почти честно. Это же Одесса!", "Садитесь, не стойте над душой. Сейчас будет весело!"],
  coin: ["Орёл или решка? Только без одесских штучек!", "Кидаем монету. Кто первый — тот и красавчик!", "Монетка решает всё. Ну, почти всё!", "Выбирайте, не тяните. Время — деньги, а деньги — монетка!", "Шо выпадет, то и будет. Как на Привозе: как повезёт!"],
  you: ["Ваш ход, не тяните резину!", "Ну шо вы сидите, как на Привозе без товара? Ходите!", "Ваш ход, дорогой. Одесса ждёт!", "Смотрите на костяшки внимательно, они вас не укусят.", "Шо вы так долго думаете? Тут не шахматы, тут домино!", "Ходите уже, у меня чай стынет!", "Ваша очередь. Покажите, на что способны!", "Таки шо вы задумались? Вам подсказать? Не скажу!", "Не спешите, но и не засыпайте. Ваш ход!"],
  bot: ["Бот думает, шо он умный…", "Ход бота. Я вас умоляю, не смотрите ему в карты!", "Бот шевелит мозгами. Слышите, как скрипит?", "Ша, тихо. Бот сосредоточился!", "Бот делает вид, шо у него есть стратегия.", "Бот чешет затылок. Опасный момент!", "Подождите, бот считает. Он у нас медленный, зато старательный."],
  botPlay: ["Бот: «Таки да, и не иначе!»", "Бот: «Шо вы мне тут показываете?»", "Бот: «Я вас умоляю, вот вам!»", "Бот: «Кушайте, не обляпайтесь!»", "Бот: «А шо, так можно было?»", "Бот: «Это вам не на Привозе торговаться!»", "Бот: «Получите и распишитесь!»", "Бот: «Ой, шо я делаю, шо я делаю…»", "Бот: «Один момент — и вы уже в проигрыше!»"],
  botDraw: ["Бот пошёл на Привоз — шо-нибудь да найдёт.", "Бот: «Ой вэй, опять на Привоз!»", "Бот роется в привозе, как на Староконном рынке.", "Бот: «Нет у меня нужного, придётся брать со склада!»", "Бот: «Шо за жизнь, шо за жизнь…» и лезет за костяшкой.", "Бот торгуется с привозом и, кажется, проигрывает.", "Бот: «Дайте мне что-нибудь приличное!»"],
  botPass: ["Бот пасует: «Ша, я не при делах!»", "Бот пропускает ход и делает вид, шо так и надо.", "Бот: «У меня нет, и не спрашивайте!»", "Бот развёл руками: «Шо я могу сделать?»", "Бот пасует. Такого позора Одесса не видела!", "Бот: «Пропускаю. Но я вернусь!»", "Бот в растерянности: ни костяшки, ни привоза."],
  draw: ["Идите на Привоз, там есть всё, кроме совести.", "Берите, берите. Не дорого, для своих!", "Привоз работает без выходных и перерывов на обед.", "Ну шо, взяли? Теперь ищите, куда её приткнуть!", "Костяшка с Привоза — самая свежая, только сегодня завезли!", "Ой, шо-то вы бледный. Берите ещё, полегчает!", "Таки покупайте, покупайте, для вас скидка!"],
  bad: ["Шо вы мне тут суёте? Не подходит!", "Не морочьте мне голову, туда оно не лезет!", "Ой, та не смешите мою бабушку! Не тот край!", "Это не ваша костяшка. Ну, то есть ваша, но не сюда!", "Шо вы творите? Читайте цифры, дорогой!", "Таки нет. Присмотритесь: там другая цифра!", "Вы шо, слепой на оба глаза? Не подходит!", "Ша! Не так быстро. Эта костяшка сюда не годится."],
  pass: ["Привоз пуст. Пропускайте, дорогой.", "Ни костяшки, ни привоза. Пасуйте!", "Тут даже Привоз развёл руками. Пропускаем!", "Нема чого взяти. Передавайте ход!", "Шо поделать, бывает и такое. Ход пропускаем."],
  win: ["Таки вы выиграли! Гуляем на Дерибасовской! 🎉", "Ай, молодец! Бот идёт учить матчасть.", "Победа! Тащите шампанское с Привоза!", "Вы гений домино! Одесса вами гордится!", "Красиво сыграли! Бот в шоке, а я в восторге!", "Шоб вы так жили! Победа за вами!", "Ай да вы! Записывайте в летописи Одессы!"],
  lose: ["Бот выиграл. Не переживайте, на Привозе цены выросли ещё хуже.", "Проиграли? Ша, бывает. Сыграем ещё!", "Бот победил. Но мы ему это ещё припомним!", "Ой, не расстраивайтесь. Одесса и не такое переживала!", "Проигрыш — это не конец света, это повод налить чаю.", "Бот выиграл. Но вы всё равно красавчик!", "Не грустите! Реванш — это святое!"],
  draw0: ["Ничья! Как в Одессе: все довольны и никто не доволен.", "Ничья, шо тут скажешь. Разошлись мирно!", "Поровну! Такое бывает только в Одессе."]
};
const FONT = '"Segoe UI", Roboto, Arial, sans-serif';
const pick = a => a[Math.floor(Math.random() * a.length)];
const pips = t => t[0] + t[1];

class Sfx {
  constructor() { this.on = true; this.ctx = null; }
  get c() {
    if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (A) this.ctx = new A(); }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }
  tone(f, d, type = 'sine', v = 0.15, f2 = f, delay = 0) {
    const c = this.c; if (!c || !this.on) return;
    const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d);
  }
  noise(d, v, fc, delay = 0) {
    const c = this.c; if (!c || !this.on) return;
    const n = Math.floor(c.sampleRate * d), b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = b; f.type = 'bandpass'; f.frequency.value = fc; g.gain.value = v;
    s.connect(f).connect(g).connect(c.destination); s.start(c.currentTime + delay);
  }
  clack() { this.noise(0.07, 0.5, 1800); this.tone(200, 0.09, 'triangle', 0.25, 90); }
  draw() { this.noise(0.18, 0.3, 700); }
  nope() { this.tone(170, 0.22, 'sawtooth', 0.12, 110); }
  coin() { this.tone(1300, 0.12, 'sine', 0.12); this.tone(1700, 0.2, 'sine', 0.12, 1700, 0.12); }
  win() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.18, f, i * 0.14)); }
  lose() { [392, 330, 262].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.18, f * 0.98, i * 0.2)); }
}

class Game extends Phaser.Scene {
  constructor() { super('game'); }

  create() {
    this.sfx = this.game.sfx || (this.game.sfx = new Sfx());
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a1f);
    this.add.text(W / 2, 22, 'ДОМИНО ПО-ОДЕССКИ', { fontFamily: FONT, fontSize: '20px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    const bub = this.add.graphics(); bub.fillStyle(0x2a2a35).fillRoundedRect(20, 46, 440, 64, 8);
    bub.fillStyle(0x007bff).fillRect(20, 46, 4, 64);
    this.status = this.add.text(W / 2, 78, '', { fontFamily: FONT, fontSize: '16px', fontStyle: 'bold', color: '#fff', align: 'center', wordWrap: { width: 410 } }).setOrigin(0.5);
    this.botLabel = this.add.text(24, 122, '', { fontFamily: FONT, fontSize: '14px', color: '#aaa' });
    this.botGfx = this.add.graphics();
    const bz = this.add.graphics(); bz.fillStyle(0x111115).fillRoundedRect(10, 190, 460, 380, 8);
    bz.lineStyle(2, 0x3a3a4a).strokeRoundedRect(10, 190, 460, 380, 8);
    this.add.text(24, 600, 'Ваши костяшки — нажмите, чтобы сходить:', { fontFamily: FONT, fontSize: '13px', color: '#aaa' });
    this.markL = this.add.text(0, 0, 'ЛЕВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#007bff', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.markR = this.add.text(0, 0, 'ПРАВ', { fontFamily: FONT, fontSize: '11px', backgroundColor: '#28a745', color: '#fff', padding: { x: 3, y: 1 } }).setOrigin(0.5).setDepth(20).setVisible(false);
    this.bazar = this.btn(105, 762, 190, 'Привоз', 0x28a745, () => this.takeBazar());
    this.passB = this.btn(105, 762, 190, 'Пропустить ход', 0xdc3545, () => this.pass()).setVisible(false);
    this.btn(300, 762, 120, 'Заново', 0x007bff, () => this.scene.restart());
    this.snd = this.btn(420, 762, 60, this.sfx.on ? '🔊' : '🔇', 0x555566, () => {
      this.sfx.on = !this.sfx.on; this.snd.t.setText(this.sfx.on ? '🔊' : '🔇');
    });
    this.sideBtns = [];
    this.newGame();
  }

  btn(x, y, w, label, color, cb) {
    const c = this.add.container(x, y), g = this.add.graphics();
    const t = this.add.text(0, 0, label, { fontFamily: FONT, fontSize: '17px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    c.add([g, t]); c.t = t; c.setSize(w, 44);
    c.setEnabled = e => { g.clear(); g.fillStyle(e ? color : 0x444444).fillRoundedRect(-w / 2, -22, w, 44, 8); t.setColor(e ? '#fff' : '#888'); c.en = e; };
    c.setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (c.en) { this.sfx.c; cb(); } });
    c.setEnabled(true);
    return c;
  }

  say(k, extra = '') { this.status.setText(typeof k === 'string' && SAY[k] ? pick(SAY[k]) + extra : k); }

  makeTile(l, r, x, y) {
    const c = this.add.container(x, y), g = this.add.graphics();
    g.fillStyle(0xfdfdfd).fillRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    g.lineStyle(1, 0x111111).strokeRoundedRect(-TL / 2, -TH / 2, TL, TH, 5);
    g.lineStyle(2, 0x777777).lineBetween(0, -TH / 2 + 4, 0, TH / 2 - 4);
    g.fillStyle(0x111115);
    [[l, -TL / 4], [r, TL / 4]].forEach(([n, cx]) => PIPS[n].forEach(([gx, gy]) => g.fillCircle(cx + gx * 6, gy * 6, 2.3)));
    c.add(g); c.setSize(TL, TH);
    return c;
  }

  newGame() {
    const deck = [];
    for (let i = 0; i <= 6; i++) for (let j = i; j <= 6; j++) deck.push([i, j]);
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    this.hp = deck.splice(0, 7); this.hb = deck.splice(0, 7); this.pool = deck;
    this.board = []; this.hobj = []; this.over = false; this.busy = true; this.turn = null;
    this.hp.forEach(t => this.hobj.push(this.makeHandObj(t)));
    this.layoutHand(); this.drawBot(); this.updateButtons();
    this.say('coin');
    const coin = this.add.text(W / 2, 380, '🪙', { fontFamily: FONT, fontSize: '64px' }).setOrigin(0.5);
    const hb = this.btn(150, 470, 140, 'Орёл', 0x007bff, () => flip('h'));
    const tb = this.btn(330, 470, 140, 'Решка', 0x007bff, () => flip('t'));
    const flip = guess => {
      hb.destroy(); tb.destroy(); this.sfx.coin();
      const res = Math.random() < 0.5 ? 'h' : 't';
      this.tweens.add({ targets: coin, scaleX: -1, duration: 150, yoyo: true, repeat: 5, onComplete: () => {
        coin.setText(res === 'h' ? 'О' : 'Р');
        this.turn = guess === res ? 'p' : 'b';
        this.status.setText((res === 'h' ? 'Орёл! ' : 'Решка! ') + (this.turn === 'p' ? 'Вы ходите первым, таки везёт!' : 'Первым ходит бот, шоб он был здоров.'));
        this.time.delayedCall(1300, () => { coin.destroy(); this.busy = false; this.next(true); });
      } });
    };
  }

  makeHandObj(t) {
    const o = this.makeTile(t[0], t[1], W / 2, 700); o.setAngle(90).setScale(1.25); o.tile = t;
    o.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.tap(o));
    return o;
  }

  layoutHand() {
    const n = this.hobj.length, sp = Math.min(46, 440 / Math.max(n, 1));
    this.hobj.forEach((o, i) => {
      const lift = this.turn === 'p' && !this.over && this.canPlay(o.tile) ? -12 : 0;
      this.tweens.add({ targets: o, x: W / 2 + (i - (n - 1) / 2) * sp, y: 690 + lift, duration: 250 });
      o.setDepth(i);
    });
  }

  drawBot() {
    this.botLabel.setText('Соперник (бот), костяшек: ' + this.hb.length);
    this.botGfx.clear().fillStyle(0x2a2a35).lineStyle(1, 0x555566);
    const n = this.hb.length, sp = Math.min(30, 420 / Math.max(n, 1));
    for (let i = 0; i < n; i++) {
      const x = W / 2 + (i - (n - 1) / 2) * sp;
      this.botGfx.fillRoundedRect(x - 10, 142, 20, 36, 3).strokeRoundedRect(x - 10, 142, 20, 36, 3);
    }
  }

  ends() { return this.board.length ? { l: this.board[0].l, r: this.board[this.board.length - 1].r } : null; }
  canPlay(t) { const e = this.ends(); return !e || t[0] === e.l || t[1] === e.l || t[0] === e.r || t[1] === e.r; }
  hasMove(h) { return h.some(t => this.canPlay(t)); }

  updateButtons() {
    const mine = this.turn === 'p' && !this.busy && !this.over;
    const no = mine && !this.hasMove(this.hp);
    this.bazar.t.setText('Привоз (' + this.pool.length + ')');
    this.bazar.setEnabled(no && this.pool.length > 0);
    this.bazar.setVisible(!(no && this.pool.length === 0));
    this.passB.setEnabled(true); this.passB.setVisible(no && this.pool.length === 0);
  }

  next(first) {
    this.clearSide();
    if (this.checkEnd()) return;
    this.updateButtons(); this.layoutHand();
    if (this.turn === 'p') this.say('you');
    else { this.say('bot'); this.time.delayedCall(1000, () => this.botMove()); }
  }

  tap(o) {
    if (this.turn !== 'p' || this.busy || this.over) return;
    this.clearSide();
    const t = o.tile;
    if (!this.canPlay(t)) { this.sfx.nope(); this.say('bad'); this.tweens.add({ targets: o, angle: { from: 80, to: 100 }, duration: 60, yoyo: true, repeat: 2, onComplete: () => o.setAngle(90) }); return; }
    const e = this.ends();
    if (!e) return this.place('p', o, 'r');
    const cl = t[0] === e.l || t[1] === e.l, cr = t[0] === e.r || t[1] === e.r;
    if (cl && cr && e.l !== e.r) {
      this.say('Костяшка подходит с обеих сторон. Куда ставим?');
      this.sideBtns = [this.btn(130, 590 - 0, 180, '◀ Влево (' + e.l + ')', 0x007bff, () => this.place('p', o, 'l')),
                       this.btn(350, 590, 180, 'Вправо (' + e.r + ') ▶', 0x28a745, () => this.place('p', o, 'r'))];
      this.sideBtns.forEach(b => b.setDepth(50).y = 584);
    } else this.place('p', o, cl && !cr ? 'l' : 'r');
  }
  clearSide() { this.sideBtns.forEach(b => b.destroy()); this.sideBtns = []; }

  place(who, ho, side) {
    this.clearSide(); this.busy = true;
    const t = ho.tile, e = this.ends(); let l, r;
    if (!e) { l = t[0]; r = t[1]; }
    else if (side === 'r') { l = t[0] === e.r ? t[0] : t[1]; r = l === t[0] ? t[1] : t[0]; }
    else { r = t[1] === e.l ? t[1] : t[0]; l = r === t[1] ? t[0] : t[1]; }
    const from = { x: ho.x, y: ho.y }; ho.destroy();
    if (who === 'p') { this.hobj = this.hobj.filter(x => x !== ho); this.hp = this.hp.filter(x => x !== t); }
    else this.hb = this.hb.filter(x => x !== t);
    const obj = this.makeTile(l, r, from.x, from.y).setAngle(90).setScale(who === 'p' ? 1.25 : 1);
    const item = { l, r, obj };
    side === 'l' && e ? this.board.unshift(item) : this.board.push(item);
    this.drawBot(); this.renderBoard(true);
    this.sfx.draw();
    this.time.delayedCall(320, () => {
      this.sfx.clack(); this.cameras.main.shake(80, 0.002);
      this.tweens.add({ targets: obj, scale: { from: 1.15, to: 1 }, duration: 150 });
      this.busy = false; this.turn = who === 'p' ? 'b' : 'p'; this.layoutHand();
      this.time.delayedCall(250, () => this.next());
    });
    this.layoutHand();
  }

  pos(i, n) {
    const row = Math.floor(i / 8), col = i % 8, rev = row % 2, rows = Math.ceil(n / 8);
    return { x: 44 + (rev ? 7 - col : col) * 56, y: 380 + (row - (rows - 1) / 2) * 52, a: rev ? 180 : 0 };
  }

  renderBoard(anim) {
    const n = this.board.length;
    this.board.forEach((it, i) => {
      const p = this.pos(i, n), dbl = it.l === it.r;
      it.obj.setDepth(5);
      this.tweens.add({ targets: it.obj, x: p.x, y: p.y, angle: p.a + (dbl ? 90 : 0), scale: 1, duration: anim ? 300 : 0, ease: 'Cubic.easeOut' });
    });
    if (!n) return;
    const a = this.pos(0, n), b = this.pos(n - 1, n);
    this.markL.setPosition(a.x, a.y - 24).setVisible(true); this.markR.setPosition(b.x, b.y + 24).setVisible(true);
  }

  botMove() {
    if (this.over) return;
    const opts = this.hb.filter(t => this.canPlay(t));
    if (opts.length) {
      opts.sort((a, b) => pips(b) - pips(a));
      const t = opts[0], e = this.ends(), cl = e && (t[0] === e.l || t[1] === e.l), cr = !e || t[0] === e.r || t[1] === e.r;
      const side = cr && (!cl || Math.random() < 0.5) ? 'r' : 'l';
      this.say('botPlay');
      const ho = this.makeTile(t[0], t[1], W / 2, 160).setVisible(false); ho.tile = t;
      return this.place('b', ho, side);
    }
    if (this.pool.length) {
      this.hb.push(this.pool.pop()); this.sfx.draw(); this.drawBot(); this.say('botDraw'); this.updateButtons();
      return void this.time.delayedCall(700, () => this.botMove());
    }
    this.say('botPass'); this.turn = 'p'; this.time.delayedCall(900, () => this.next());
  }

  takeBazar() {
    if (this.turn !== 'p' || this.busy || !this.pool.length || this.hasMove(this.hp)) return;
    const t = this.pool.pop(); this.hp.push(t); this.sfx.draw(); this.say('draw');
    const o = this.makeHandObj(t); o.setPosition(105, 762); this.hobj.push(o);
    this.updateButtons(); this.layoutHand();
  }

  pass() { this.turn = 'b'; this.say('pass'); this.next(); }

  checkEnd() {
    const fin = (msg, key, snd) => {
      this.over = true; this.turn = null; this.say(msg + ' ' + pick(SAY[key])); snd(); this.updateButtons(); this.layoutHand(); return true;
    };
    if (!this.hp.length) return fin('Домино!', 'win', () => this.sfx.win());
    if (!this.hb.length) return fin('Бот выложил всё!', 'lose', () => this.sfx.lose());
    if (this.board.length && !this.pool.length && !this.hasMove(this.hp) && !this.hasMove(this.hb)) {
      const a = this.hp.reduce((s, t) => s + pips(t), 0), b = this.hb.reduce((s, t) => s + pips(t), 0);
      const k = a < b ? 'win' : a > b ? 'lose' : 'draw0';
      return fin('РЫБА! Очки: вы ' + a + ', бот ' + b + '.', k, () => (k === 'lose' ? this.sfx.lose() : this.sfx.win()));
    }
    return false;
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO, width: W, height: H, parent: 'game', backgroundColor: '#1a1a1f',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: Game
});

// Подгонка холста под реальный размер окна (адресная строка на телефоне меняет высоту)
const refit = () => setTimeout(() => game.scale.refresh(), 50);
window.addEventListener('resize', refit);
window.addEventListener('orientationchange', refit);
refit(); setTimeout(refit, 500);
