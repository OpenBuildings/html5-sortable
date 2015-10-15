$(function () {
    'use strict'

    QUnit.module('Sortable', {
        beforeEach: function () {
            Store.clear()
            $('#container1').removeData(Sortable.DATA_KEY)
        }
    })

    QUnit.test('update method with field set', function (assert) {
        var sortable = new Sortable($('#container1'), { field: 'input' })

        $('#item1 input').val(10)
        $('#item2 input').val(2)

        sortable.update()

        var values = $.map($('#container1 input'), function (item) {
            return parseInt(item.value, 10)
        })

        assert.deepEqual(values, [0, 1, 2, 3, 4], 'Should set back proper field values')
    })

    QUnit.test('update method without field set', function (assert) {
        var sortable = new Sortable($('#container1'))

        $('#item1 input').val(10)
        $('#item2 input').val(2)

        sortable.update()

        var values = $.map($('#container1 input'), function (item) {
            return parseInt(item.value, 10)
        })

        assert.deepEqual(values, [10, 2, 2, 3, 4], 'Should remain the same')
    })

    QUnit.test('cursor method', function (assert) {
        var sortable = new Sortable($('#container1'))

        sortable.cursor($('#item1'))

        assert.ok($('#container1').find('.sortable-cursor').is('#item1'), 'Cursor is on item1')

        sortable.cursor($('#item2'))

        assert.ok($('#container1').find('.sortable-cursor').is('#item2'), 'Cursor is on item2')
    })

    QUnit.test('reposition event', function (assert) {
        var sortable = new Sortable($('#container1'))
        var done = assert.async()

        $('#container1').on('sort', function (event, $moved, $old) {
            assert.ok($moved.is('#item1'))
            assert.ok($old.is('#item2'))
            done()
        })

        sortable.reposition($('#item1'), $('#item2'))
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

    QUnit.test('Constructor with default options', function (assert) {
        var $container = $('#container1')
        var sortable = $container.html5Sortable().data(Sortable.DATA_KEY)

        assert.equal(
            sortable,
            $container.html5Sortable().data(Sortable.DATA_KEY),
            'Set the html5Sortable object as data object'
        )

        assert.deepEqual(
            sortable.options(),
            $.extend(Sortable.Default, { arrange: 'html5-sortable' }),
            'Set DEFAULTS to options'
        )
    })

    QUnit.test('Constructor with custom options and modifiable options', function (assert) {
        var $container = $('#container1')

        var expectedParams = {
            field: '.field',
            cursor: '.other-cursor'
        }

        $container.html5Sortable({
            arrange: 'html5-sortable',
            field: '.field',
            cursor: '.other-cursor'
        })

        var sortable = $container.data(Sortable.DATA_KEY)

        assert.equal(sortable.options().field, '.field', 'Match the passed option for field')
        assert.equal(sortable.options().cursor, '.other-cursor', 'Match the passed option for cursor')

        $container.html5Sortable('option', 'field', '.field2')
        $container.html5Sortable('option', 'cursor', '.third-cursor')

        assert.equal(sortable.options().field, '.field2', 'Match the changed option for field')
        assert.equal(sortable.options().cursor, '.third-cursor', 'Match the changed option for cursor')
    })

})
