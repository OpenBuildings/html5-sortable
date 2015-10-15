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

    var Cursor = 'sortable-cursor'

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
        this.$cursor  = $([])
    }

    // getters

    Sortable.NAME = NAME

    Sortable.DATA_KEY = DATA_KEY

    Sortable.EVENT_KEY = EVENT_KEY

    /**
     * Clear artefacts like mask and ghost and update
     */
    Sortable.prototype.end = function () {
        this.$cursor.removeClass(Cursor)
    }

    /**
     * Move the ghost element of a widget inside the grid.
     * Pass a mouse x and y coords, relative to the grid
     *
     * @param  {jQuery} $cursor
     */
    Sortable.prototype.cursor = function ($cursor) {
        this.end()
        this.$cursor = $cursor.addClass(Cursor)
    }

    /**
     * Move the ghost element of a widget inside the grid.
     * Pass a mouse x and y coords, relative to the grid
     *
     * @param  {jQuery} $widget
     * @param  {jQuery} $cursor
     */
    Sortable.prototype.reposition = function ($widget, $cursor) {
        if ($cursor.parent().is($widget.parent()) && $cursor.index() > $widget.index()) {
            $widget.insertAfter($cursor)
        } else {
            $widget.insertBefore($cursor)
        }
    }

    // private
    // ------------------------------------------------------------------------

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

        .on(Event.OVER, Selector.ITEM, function (event) {
            var $widget = $(Store.get(event.originalEvent))
            var $this = $(this)
            var $sortable = $this.parent()

            if ($widget.length) {
                event.preventDefault()

                $sortable[NAME]('cursor', $this)
            }
        })

        .on(Event.END, Selector.CONTAINER, function () {
            $(this)[NAME]('end')
        })

        .on(Event.LEAVE, Selector.CONTAINER, function (event) {
            if ($(event.target).is(Selector.ITEM)) {
                event.preventDefault()
                $(this)[NAME]('end')
            }
        })

        .on(Event.DROP, Selector.ITEM, function (event) {
            var $widget = $(Store.get(event.originalEvent))

            if ($widget.length) {
                var $this = $(this)
                var $sortable = $this.parent()

                event.preventDefault()

                $sortable[NAME]('reposition', $widget, $this)
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
