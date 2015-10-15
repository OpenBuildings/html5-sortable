$(function () {
    'use strict'

    QUnit.module('Sortable', {
        beforeEach: function () {
            Store.clear()
            $('#container1').removeData(Sortable.DATA_KEY)
        }
    })

    QUnit.test('cursor method', function (assert) {
        var sortable = new Sortable($('#container1'))

        sortable.cursor($('#item1'))

        assert.ok($('#container1').find('.sortable-cursor').is('#item1'), 'Cursor is on item1')

        sortable.cursor($('#item2'))

        assert.ok($('#container1').find('.sortable-cursor').is('#item2'), 'Cursor is on item2')
    })

    QUnit.test('reposition method', function (assert) {
        var sortable = new Sortable($('#container1'))

        assert.ok($('#item1').index() === 0, 'Original position of item1 is 0')
        assert.ok($('#item2').index() === 1, 'Original position of item2 is 1')

        sortable.reposition($('#item1'), $('#item2'))

        assert.ok($('#item1').index() === 1, 'Item1 repositioned to is 1')
        assert.ok($('#item2').index() === 0, 'Item2 repositioned to is 0')

        sortable.reposition($('.other-item'), $('#item2'))

        assert.ok($('.other-item').index() === 0, 'Other item repositioned to is 0')
        assert.ok($('#item2').index() === 1, 'Item2 repositioned to is 1')
        assert.ok($('#item1').index() === 2, 'Item1 repositioned to is 2')
    })

    QUnit.test('end method', function (assert) {
        var sortable = new Sortable($('#container1'))

        sortable.cursor($('#item1'))

        assert.ok($('#container1').find('.sortable-cursor').length === 1, 'Cursor is visible')

        sortable.end()

        assert.ok($('#container1').find('.sortable-ghost').length === 0, 'Cursor is removed')
    })

})
