"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Event class that mimics native DOM events.
 *
 * @class
 * @memberof PIXI.interaction
 */
var InteractionEvent = function () {
  /**
   *
   */
  function InteractionEvent() {
    _classCallCheck(this, InteractionEvent);

    /**
     * Which this event will continue propagating in the tree
     *
     * @member {boolean}
     */
    this.stopped = false;

    /**
     * The object to which event is dispatched.
     *
     * @member {PIXI.DisplayObject}
     */
    this.target = null;

    /**
     * The object whose event listener’s callback is currently being invoked.
     *
     * @member {PIXI.DisplayObject}
     */
    this.currentTarget = null;

    /*
     * Type of the event
     *
     * @member {string}
     */
    this.type = null;

    /*
     * InteractionData related to this event
     *
     * @member {PIXI.interaction.InteractionData}
     */
    this.data = null;
  }

  /**
   * Prevents event from reaching any objects other than the current object.
   *
   */


  InteractionEvent.prototype.stopPropagation = function stopPropagation() {
    this.stopped = true;
  };

  /**
   * Prevents event from reaching any objects other than the current object.
   *
   * @private
   */


  InteractionEvent.prototype._reset = function _reset() {
    this.stopped = false;
    this.currentTarget = null;
    this.target = null;
  };

  return InteractionEvent;
}();

exports.default = InteractionEvent;
//# sourceMappingURL=InteractionEvent.js.map