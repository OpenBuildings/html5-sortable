
.. title:: Html5 Sortable

============================
Html5 Sortable Documentation
============================

This jQuery plugin allows sorting out a list of elements using native HTML5 drag-n-drop. It supports mobile devices natively with touch events.

With only a minimal marckup and using only the built in `drag and drop <https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop />`_ of browsers (`Supported in IE 8+ <http://caniuse.com/#feat=dragndrop/>`_)

.. code-block:: html

    <div data-arrange="html5-sortable">
        <div draggable="true">1</div>
        <div draggable="true">2</div>
        <div draggable="true">3</div>
        <div draggable="true">4</div>
        <div draggable="true">5</div>
    </div>

And here is how this will look in action:

.. raw:: html

    <div
     data-arrange="html5-sortable"
     class="row sortable-container">
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-default">Item 1</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-primary">Item 2</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-success">Item 3</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-info">Item 4</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-warning">Item 5</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <span class="h3 label label-danger">Item 6</span>
                    <i class="glyphicon glyphicon-move pull-right"></i>
                </div>
            </div>
        </div>
    </div>


Instalation
-----------

Download the `latest release <https://github.com/clippings/html5-sortable/releases/latest />`_ and use the ``html5-sortable.js``.

Default styles can be found in ``html5-sortable.css``, though they are only for styling the cursor.

Options
-------

==============  ============================================================
Option          Description
==============  ============================================================
cursor          A custom class for the cursor, defaults to "sortable-cursor"
field           Optional selector for an input, explaind in Update fields
==============  ============================================================

Options can be set with html data attributes or with javascript

.. code-block:: html

    <div
     data-arrange="html5-sortable"
     data-cursor="..."
     data-field="...">
        ...
    </div>

.. code-block:: javascript

    $('...').html5Sortable({
        cursor: '...',
        field: '...'
    })


Events
------

You can bind to sortable events, apart from the normal draggable events that you can use yourself (dragstart, dragend etc.), There is also a custom "sort" event that triggers after an item have been moved.

.. code-block:: javascript

    $('...').on('sort', function (event, cursor) {

        // The item that was moved
        console.log(event.target)

        // The item that was holding the "cursor"
        console.log(cursor)
    })

Update fields
-------------

Most of the time when you want to sort items you'll need to save their position somehow, you can use the sort event to do that yourself, but this plugin provides a built in way to do that.

You can pass a selector that will point to an input in each item, when items are sorted these inputs are updated automatically with an integer.

.. code-block:: html

    <div
     data-arrange="html5-sortable"
     data-field=".my-sort-input">
        <div draggable="true">
            <input type="hidden" class="my-sort-input">
        </div>
        <div draggable="true">
            <input type="hidden" class="my-sort-input">
        </div>
        <div draggable="true">
            <input type="hidden" class="my-sort-input">
        </div>
    </div>

Here's how this will look in action:

.. raw:: html

    <div
     data-arrange="html5-sortable"
     data-field="input"
     class="row sortable-container">
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="input-group">
                      <span class="input-group-addon">Item 1</span>
                      <input
                       type="text"
                       class="form-control"
                       value="0">
                    </div>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="input-group">
                      <span class="input-group-addon">Item 2</span>
                      <input
                       type="text"
                       class="form-control"
                       value="1">
                    </div>
                </div>
            </div>
        </div>
        <div
         draggable="true"
         class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="input-group">
                      <span class="input-group-addon">Item 2</span>
                      <input
                       type="text"
                       class="form-control"
                       value="2">
                    </div>
                </div>
            </div>
        </div>
    </div>

Methods
-------

There are also several public methods that you can use for a more low-level control

.. code-block:: javascript

    // Set an arbitrary item to be the cursor
    $('...').html5Sortable('cursor', $cursor)

    // Move an item to a given position, updating field values
    $('...').html5Sortable('reposition', $item, $cursor)

    // Clear the current cursor
    $('...').html5Sortable('end')

    // Update an option value on the fly
    $('...').html5Sortable('option', 'field', '.new-input-selector')

    // Force an update of the field values
    $('...').html5Sortable('update')


.. toctree::
    :hidden:

    index
