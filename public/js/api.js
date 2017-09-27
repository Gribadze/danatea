var editButtons = $('[data-edit]'),
    deleteButtons = $('[data-delete]'),
    addButton = $('#addButton'),
    listContainer = $('[data-list]');

var prevData = [];

function toggleEditMode(event) {
    prevData = [];
    var delBtn = $('[data-delete='+$(this).data('edit')+']');
    var fields = $(this).closest('tr').find('p');
    var val = fields.attr('contenteditable') !== "true" ? "true" : "false";

    fields.attr('contenteditable', val);
    fields.focus();

    $(this).find('span').toggleClass('glyphicon-edit');
    $(this).find('span').toggleClass('glyphicon-check');

    delBtn.find('span').toggleClass('glyphicon-trash');
    delBtn.find('span').toggleClass('glyphicon-remove');

    $(this).toggleClass('btn-primary');
    $(this).toggleClass('btn-success');

    var data = $.map(fields.toArray(), function(field) { prevData.push(field.innerHTML); return field.innerHTML; });
    var list = listContainer.data('list');

    if (val === "false") {
        $.ajax({
            url: '/api/update.php',
            type: 'post',
            data: {
                list: list,
                id: $(this).data('edit'),
                values: data
            },
            success: function(msg) {
                alert(msg);
                location.reload();
            }
        })
    }
}

function deleteRec(event) {
    var editBtn = $('[data-edit='+$(this).data('delete')+']');
    var fields = $(this).closest('tr').find('p');
    if (fields.attr('contenteditable') === "true") {
        fields.each(function (index) {
            this.innerHTML = prevData[index];
        });
        fields.attr('contenteditable', "false");
        $(this).find('span').toggleClass('glyphicon-trash');
        $(this).find('span').toggleClass('glyphicon-remove');

        editBtn.find('span').toggleClass('glyphicon-edit');
        editBtn.find('span').toggleClass('glyphicon-check');

        editBtn.toggleClass('btn-primary');
        editBtn.toggleClass('btn-success');

        return;
    }
    var list = listContainer.data('list');
    if (confirm('Вы действительно хотите удалить запись')) {
        $.ajax({
            url: '/api/delete.php',
            type: 'post',
            data: {
                list: list,
                id: $(this).data('delete')
            },
            success: function(msg) {
                alert(msg);
                location.reload();
            }
        })
    }
}

function addRow(event) {
    if ($('[data-add]').length > 0) return;
    var dataTable = $('[data-list] .table');
    var colsCount = dataTable.find('tr:first-child').find('th').length;
    var newRow = '<tr>';
    for (var i = 0; i < colsCount-1; i++) {
        newRow += '<td><p contenteditable="true" class="data-field"></p></td>';
    }
    newRow += '<td><button type="button" class="btn btn-success" data-add><span class="glyphicon glyphicon-ok"></span></button></td></tr>';

    dataTable.append(newRow);
    var addBtn = $('[data-add]');

    addBtn.on('click', function (event) {
        var fields = $(this).closest('tr').find('p');
        var data = $.map(fields.toArray(), function(field) { prevData.push(field.innerHTML); return field.innerHTML; });
        var list = listContainer.data('list');

        $.ajax({
            url: '/api/add.php',
            type: 'post',
            data: {
                list: list,
                values: data
            },
            success: function(msg) {
                alert(msg);
                location.reload();
            }
        })
    });

    dataTable.find('tr:last-child').find('td:first-child p').focus();
}

function init() {
    editButtons.on('click', toggleEditMode);
    deleteButtons.on('click', deleteRec);
    addButton.on('click', addRow);
}

$(function() {
    init();
});