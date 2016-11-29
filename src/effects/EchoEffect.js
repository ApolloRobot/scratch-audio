/*

An echo effect

0 mutes the effect
Values up to 100 set the echo feedback amount,
increasing the time it takes the echo to fade away

Clamped 0-100

*/

var Tone = require('tone');

function EchoEffect () {
    Tone.Effect.call(this);

    this.value = 0;

    this.delay = new Tone.FeedbackDelay(0.25, 0.5);

    this.effectSend.chain(this.delay, this.effectReturn);
}

Tone.extend(EchoEffect, Tone.Effect);

EchoEffect.prototype.set = function (val) {
    this.value = val;

    this.value = this.clamp(this.value, 0, 100);

    // mute the effect if value is 0
    if (this.value == 0) {
        this.wet.value = 0;
    } else {
        this.wet.value = 1;
    }

    var feedback = (this.value / 100) * 0.75;
    this.delay.feedback.rampTo(feedback, 1/60);
};

EchoEffect.prototype.changeBy = function (val) {
    this.set(this.value + val);
};

EchoEffect.prototype.clamp = function (input, min, max) {
    return Math.min(Math.max(input, min), max);
};

module.exports = EchoEffect;

