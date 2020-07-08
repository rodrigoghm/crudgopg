$(document).ready(function() {
    console.log("Entro al document ready!")

    $("a").on("click", function(){
        console.log("Entro al click button!")
        var id_delete = ($(this).attr('id'));
        console.log("<id_delete> ==> " + id_delete)
        array = id_delete.split("-")
        if (array[0]=="delete")
        {   
            $("#register_delete").html("")
            $("#register_delete").html(array[1])
        } else if (array[0] == "new_record") {
            console.log("Add registro!")
            $("#tcontent tr:last").after('<tr id="row_4"><td>4</td><td>New</td><td>New Row</td><td class="text-center"><a class="btn btn-info btn-xs" id="edit-4" href="#" data-toggle="modal" data-target="#flipFlop"><span class="glyphicon glyphicon-edit"></span> Edit</a> <a href="#" id="delete-4" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#flipFlopDelete"><span class="glyphicon glyphicon-remove"></span> Del</a></td></tr>');
            
        }
    });

    $("#ConfirmaDelete").click(function(){
        console.log("Entro al click button de Eliminar!")
        var id_delete = $("#register_delete").text()
        console.log("A eliminar row ==> " + id_delete)
        var name_row = "row_" + id_delete
        $("#" + name_row).remove();
    });
});