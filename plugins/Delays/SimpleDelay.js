/*globals BasePlugin */
var SimpleDelay = function (factory, owner) {
    // This attaches the base plugin items to the Object
    BasePlugin.call(this, factory, owner);

    /* USER MODIFIABLE BEGIN */

    // Place your code between this line...


    var input = this.context.createGain(),
        output = this.context.createGain(),
        delay = this.context.createDelay(),
        dry = this.context.createGain(),
        wet = this.context.createGain();

    input.connect(dry);
    dry.connect(output);
    input.connect(delay);
    delay.connect(wet);
    wet.connect(output);

    var delayParam = this.parameters.createNumberParameter("Delay", 10, 10, 500);
    delayParam.update = function (e) {
        return e / 1000.0;
    };
    delayParam.translate = function (e) {
        return e * 1000.0;
    };
    delayParam.bindToAudioParam(delay.delayTime);

    var mixParam = this.parameters.createNumberParameter("Dry/Wet", 50, 0, 100);
    mixParam.trigger = function () {

        var g = mixParam.value / 100.0;
        dry.gain.value = 1 - g;
        wet.gain.value = g;
    };

    this.addInput(input);
    this.addOutput(output);

    // ... and this line!
    /* USER MODIFIABLE END */
    (function () {
        var i;
        for (i = 0; i < this.numOutputs; i++) {
            var node = this.context.createAnalyser();
            this.features.push(node);
            this.outputs[i].connect(node);
        }
    })();
};

// Also update the prototype function here!
SimpleDelay.prototype = Object.create(BasePlugin.prototype);
SimpleDelay.prototype.constructor = SimpleDelay;
SimpleDelay.prototype.name = "SimpleDelay";
SimpleDelay.prototype.version = "1.0.0";
SimpleDelay.prototype.uniqueID = "JSSD";
