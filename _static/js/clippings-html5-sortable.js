// LICENSE: BSD-3-Clause
// http://git.io/vZkLP

 var Html5Sortable = (function ($) {

'use strict'

/* exported Sortable */

var Sortable = (function ($) {

    

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME                = 'html5Sortable'
    var DATA_KEY            = 'html5-sortable'
    var EVENT_KEY           = '.' + DATA_KEY

    var Event = {
        START   : 'dragstart' + EVENT_KEY + ' touchstart ' + EVENT_KEY,
        OVER    : 'dragover' + EVENT_KEY + ' touchmove ' + EVENT_KEY,
        END     : 'dragend' + EVENT_KEY + ' touchcancel ' + EVENT_KEY,
        DROP    : 'drop' + EVENT_KEY + ' touchend ' + EVENT_KEY,
        LEAVE   : 'dragleave' + EVENT_KEY,
        SORT    : 'sort'
    }

    var Selector = {
        CONTAINER : '[data-arrange="html5-sortable"]',
        ITEM      : '[data-arrange="html5-sortable"] > [draggable]'
    }

    var Default = {
        cursor: 'sortable-cursor',
        field: false
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    /**
     * @param  {jQuery} element
     * @param  {Object} options
     */
    function Sortable(element, options) {
        this.$element = $(element)
        this._options  = this._getOptions(options || {})
        this.$cursor  = $([])
    }

    // getters

    Sortable.NAME = NAME

    Sortable.DATA_KEY = DATA_KEY

    Sortable.EVENT_KEY = EVENT_KEY

    Sortable.Default = Default

    Sortable.prototype.options = function () {
        return this._options
    }

    // public

    /**
     * Update an option directly
     *
     * @param  {String} name
     * @param  {mixed} value
     */
    Sortable.prototype.option = function (name, value) {
        this._options[name] = value
    }

    /**
     * Clear cursor
     */
    Sortable.prototype.end = function () {
        this.$cursor.removeClass(this._options.cursor)
    }

    /**
     * Set an item to be the current "cursor"
     *
     * @param  {jQuery} $cursor
     */
    Sortable.prototype.cursor = function ($cursor) {
        this.end()
        this.$cursor = $cursor.addClass(this._options.cursor)
    }

    /**
     * Swap two elements, trigger sort event and update field values
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

        $widget.trigger(Event.SORT, [$cursor])

        this.update()
    }

    /**
     * Update all sortable field values
     */
    Sortable.prototype.update = function () {
        var field = this._options.field

        if (field) {
            this.$element.children('[draggable]').each(function () {
                $(this).find(field).val($(this).index())
            })
        }
    }

    // private
    // ------------------------------------------------------------------------

    Sortable.prototype._getOptions = function (options) {
        return $.extend(true, {}, Default, options)
    }

    // static

    Sortable._jQueryInterface = function (config, a1, a2, a3) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data(DATA_KEY)
            var _config = $.extend(
                true,
                {},
                Default,
                $this.data(),
                typeof config === 'object' && config
            )

            if (!data) {
                data = new Sortable(this, _config)
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

/* exported Store */

/**
 * A class to store / retrieve element inside of dataTransfer object of an event
 * Fall back to a static variable if dataTransfer is not available
 */
var Store = (function () {

    

    var Store = {}

    /**
     * Genrate a time based random number
     *
     * @return {Number}
     */
    Store.getRandomNumber = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100))
    }

    /**
     * Make sure the item has an id to quickly find it
     * Do not override existing ids
     *
     * @param  {Element} item
     * @return {String}
     */
    Store.getId = function (item) {
        if (!item.id) {
            item.id = 'draggable-' + this.getRandomNumber()
        }

        return item.id
    }

    /**
     * Clear internal storage variable
     */
    Store.clear = function () {
        this.item = null
    }

    /**
     * Save the element
     *
     * @param {Event}    event
     * @param {Element}  item
     */
    Store.set = function (event, item) {

        this.item = JSON.stringify({
            Draggable: this.getId(item)
        })

        if (event.dataTransfer) {
            event.dataTransfer.setData('text', this.item)
        }
    }

    /**
     * Retrieve stored element
     *
     * @param  {Event}   event
     * @return {Element}
     */
    Store.get = function (event) {
        var dataString = (event.dataTransfer && event.dataTransfer.getData('text')) || this.item

        if (dataString) {
            var data = JSON.parse(dataString)
            return document.getElementById(data.Draggable)
        }
    }

    return Store
})()

return Sortable

})(jQuery)
//# sourceMappingURL=clippings-html5-sortable.js.map