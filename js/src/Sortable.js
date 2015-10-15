/* ----
 * Html5 Sortable
 * http://github.com/clippings/html5-sortable
 * ----
 * Copyright 2015 Clippings Ltd.
 * Licensed under BSD (https://github.com/clippings/html5-sortable/blob/master/LICENSE)
 * ----
 */

 /* exported Sortable */

var Sortable = (function ($) {

    'use strict'

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME                = 'html5Sortable'
    var DATA_KEY            = 'html5.sortable'
    var EVENT_KEY           = '.' + DATA_KEY

    var Event = {
        START   : 'dragstart.' + EVENT_KEY + ' touchstart. ' + EVENT_KEY,
        OVER    : 'dragover.' + EVENT_KEY + ' touchmove. ' + EVENT_KEY,
        END     : 'dragend.' + EVENT_KEY + ' touchcancel. ' + EVENT_KEY,
        DROP    : 'drop.' + EVENT_KEY + ' touchend. ' + EVENT_KEY,
        LEAVE   : 'dragleave.' + EVENT_KEY
    }

    var Selector = {
        CONTAINER : '[data-arrange="html5-sortable"]',
        ITEM      : '[data-arrange="html5-sortable"] > [draggable]'
    }

    var Default = {
        resize: true,
        overlap: false,
        compact: true
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    /**
     * @param  {jQuery} element
     */
    function Sortable(element) {
        this.$element = $(element)
        this.$mask    = $([])
        this.$ghost   = $([])
    }

    // getters

    Sortable.NAME = NAME

    Sortable.DATA_KEY = DATA_KEY

    Sortable.EVENT_KEY = EVENT_KEY

    /**
     * Clear artefacts like mask and ghost and update
     */
    Sortable.prototype.end = function () {
        this._removeMask()
        this._removeGhost()
    }

    // private
    // ------------------------------------------------------------------------

    /**
     * Move the ghost element of a widget inside the grid.
     * Pass a mouse x and y coords, relative to the grid
     *
     * @param  {jQuery} $widget
     * @param  {Number} mouseX
     * @param  {Number} mouseY
     */
    Sortable.prototype._moveGhost = function ($widget, mouseX, mouseY) {
        var $oldGhost = this.$ghost

        this.$ghost = this.$element.children('[draggable]').filter(function () {
            var $child = $(this)

            return mouseX >= $child.position().left
                && mouseX <= $child.position().left + $child.width()
                && mouseY >= $child.position().top
                && mouseY <= $child.position().top + $child.height()
        })

        $oldGhost.removeClass('sortable-ghost')
        this.$ghost.addClass('sortable-ghost')
    }

    /**
     * Remove the ghost element for this grid
     *
     * @param  {jQuery} $widget
     */
    Sortable.prototype._removeGhost = function () {
        if (this.$ghost.length) {
            this.$ghost.removeClass('sortable-ghost')
        }
    }

    /**
     * Move the widget to its corresponding ghost position
     *
     * @param  {jQuery} $widget
     */
    Sortable.prototype._moveToGhost = function ($widget) {
        if (this.$ghost.index() > $widget.index()) {
            $widget.insertAfter(this.$ghost)
        } else {
            $widget.insertBefore(this.$ghost)
        }
    }

    /**
     * Get the mask of the grid. Create one if there is none.
     *
     * @return {jQuery}
     */
    Sortable.prototype._getMask = function () {
        if (this.$mask.length) {
            this.$mask = $('<div class="sortable-mask" data-html5-sortable="mask"></div>')
            this.$element.append(this.$mask)
        }

        return this.$mask
    }

    /**
     * Remove the mask
     */
    Sortable.prototype._removeMask = function () {
        if (this.$mask.length) {
            this.$mask.remove()
        }
    }

    // static

    Sortable._jQueryInterface = function (config, a1, a2, a3) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data(DATA_KEY)

            if (!data) {
                data = new Sortable(this)
                $this.data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                data[config](a1, a2, a3)
            }
        })
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
        .on(Event.START, Selector.ITEM, function (event) {
            Store.set(event.originalEvent, this)
        })

        .on(Event.OVER, Selector.CONTAINER, function (event) {
            var original = event.originalEvent
            var $widget = $(Store.get(original))

            if ($widget.length) {
                var pos = original.touches ? original.touches[0] : original
                var $this = $(this)
                var mouseX = pos.pageX - $this.offset().left
                var mouseY = pos.pageY - $this.offset().top
                var container = $this[NAME]().data(DATA_KEY)

                event.preventDefault()

                container._getMask()
                container._moveGhost($widget, mouseX, mouseY)
            }
        })

        .on(Event.END, Selector.CONTAINER, function () {
            $(this)[NAME]('end')
        })

        .on(Event.LEAVE, Selector.CONTAINER, function (event) {
            event.preventDefault()

            if ($(event.target).data('html5-sortable') === 'mask') {
                $(this)[NAME]('end')
            }
        })

        .on(Event.DROP, Selector.CONTAINER, function (event) {
            var $widget = $(Store.get(event.originalEvent))

            if ($widget.length) {
                var $this = $(this)
                var container = $this[NAME]().data(DATA_KEY)

                event.preventDefault()

                container._moveToGhost($widget)
                container.end()
            }
        })

    /**
    * ------------------------------------------------------------------------
    * jQuery
    * ------------------------------------------------------------------------
    */

    $.fn[NAME]          = Sortable._jQueryInterface
    $.fn[NAME].Sortable = Sortable

    return Sortable

})(jQuery)
