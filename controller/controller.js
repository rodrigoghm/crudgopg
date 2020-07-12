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
            // -- agrega un nuevo registro
            cleanFormInsert();
            // -- actualiza los nodos padre. <PID>
            updatePID();

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

    // -- click al boton de agregar nuevo registro.
    $("#binsert_taxonomy").click(function(){
        console.log("Entro al click button de Insert Registro!")
        //this.reportValidity();
        insertRecord();
        return false;
    });

    $("#binsert_taxonomy").submit(function(e) {
        return false;
    });


});

// -- Funcion que actualiza el Select de los PID
function insertRecord()
{
    if ($("#finsert_name").val()!= "")
    {
        $.ajax({
            type:"POST",
            url: "/receiver",
            data: "opc=2&vpid="+ $("#finsert_pid").val() +"&vorder="+ $("#finsert_order").val() +"&vname="+ $("#finsert_name").val() +"&vdesc=" + $("#finsert_desc").val() ,
            dataType: "json",
            success: function(datos)
            {   
                console.log(datos)
                if (datos == "true")
                {
                    $('#Btn_Cancel-1').trigger('click');
                    $.notify("Registro ingresado exitosamente", {position:"bottom right",className:"success"});
                }
                else
                    $.notify("Registro no ingresado", {position:"bottom right",className:"error"});
            }
        });
    } else {
        document.forms['contact-form'].reportValidity();
    }
}

// -- Funcion que actualiza el Select de los PID
function updatePID()
{
    $.ajax({
        type:"POST",
        url: "/receiver",
        data: "opc=1" ,
        dataType: "json",
        success: function(datos)
        {   
            var html = ""
            var option = ""
            var obj = $.parseJSON(datos)

            $("#finsert_pid option").each(function(){
                $(this).remove();
            });
            $("#finsert_pid").append(new Option("N/A", "", true, true))

            $.each(obj, function(key, value){
                //console.log("key ==> [" + key + "] || Value ==> [" + value + "]")
                option     = ""
                var_id     = ""
                var_name   = ""
                $.each(value, function(llave, valor){
                    //console.log("llave ==> [" + llave + "] || valor ==> [" + valor + "]")
                    var_name = (llave == "Name") ? valor : var_name;
                    var_id   = (llave == "Id")   ? valor : var_id;
                });
                console.log("Saliendo Boss")
                if ((var_name!="")&&(var_id!=""))
                {
                    console.log("add option")
                    $("#finsert_pid").append(new Option(var_name, var_id, false, false))
                }
            });
        }
    });
    
    console.log("Se supone que aca deberiamos de llamar a AJAX!");
}



// -- funcion que limpia el formulario de Insert.
function cleanFormInsert()
{
    $("#finsert_name").val("");
    $("#finsert_desc").val("");
    $('#finsert_order option:contains("N/A")').prop('selected',true);

    //limpieza de los label del form
    $('.form-label').each(function(){
        $(this).addClass('js-hide-label');
    }); 
}