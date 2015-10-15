$(function () {
    'use strict'

    QUnit.module('Sortable', {
        beforeEach: function () {
            Store.clear()
            $('#container1').removeData(Sortable.DATA_KEY)
        }
    })

    QUnit.test('end method', function (assert) {
        var sortable = new Sortable($('#container1'))
        var $item = $('#item1')

        sortable._moveGhost(
            $item,
            $('#item1').position().top + 10,
            $('#item1').position().left + 10
        )

        sortable._getMask()

        sortable.end()

        assert.ok($('#container1').find('.sortable-ghost').length === 0, 'Ghost is removed')
        assert.ok($('#container1').find('.sortable-mask').length === 0, 'Mask is removed')
    })

})
