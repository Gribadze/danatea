const editButtons = $('[data-edit]'),
    deleteButtons = $('[data-delete]'),
    addButton = $('#addButton'),
    listContainer = $('[data-list]');

let prevData = [];

function toggleEditMode(event) {
    prevData = [];
    const delBtn = $('[data-delete='+$(this).data('edit')+']');
    const fields = $(this).closest('tr').find('p');
    let val = fields.attr('contenteditable') !== "true" ? "true" : "false";

    fields.attr('contenteditable', val);
    fields.focus();

    $(this).find('span').toggleClass('glyphicon-edit');
    $(this).find('span').toggleClass('glyphicon-check');

    delBtn.find('span').toggleClass('glyphicon-trash');
    delBtn.find('span').toggleClass('glyphicon-remove');

    $(this).toggleClass('btn-primary');
    $(this).toggleClass('btn-success');

    const data = $.map(fields.toArray(), function(field) { prevData.push(field.innerHTML); return field.innerHTML; });
    const list = listContainer.data('list');

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
    const editBtn = $('[data-edit='+$(this).data('delete')+']');
    const fields = $(this).closest('tr').find('p');
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
    const list = listContainer.data('list');
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
    const addBtn = $('[data-add]');
    if (addBtn.length > 0) return;
    var dataTable = $('[data-list] .table');
    var colsCount = dataTable.find('tr:first-child').find('th').length;
    var newRow = '<tr>';
    for (var i = 0; i < colsCount-1; i++) {
        newRow += '<td><p contenteditable="true" class="data-field"></p></td>';
    }
    newRow += '<td><button type="button" class="btn btn-success" data-add><span class="glyphicon glyphicon-ok"></span></button></td></tr>';

    dataTable.append(newRow);

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