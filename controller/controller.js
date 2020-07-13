$(document).ready(function() {
    console.log("Entro al document ready!")

    // -- Evaluacion del grid principal
    showGrid();
    

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

            // -- demo
            // $("#tcontent tr:last").after('<tr id="row_4"><td>4</td><td>New</td><td>New Row</td><td class="text-center"><a class="btn btn-info btn-xs" id="edit-4" href="#" data-toggle="modal" data-target="#flipFlop"><span class="glyphicon glyphicon-edit"></span> Edit</a> <a href="#" id="delete-4" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#flipFlopDelete"><span class="glyphicon glyphicon-remove"></span> Del</a></td></tr>');
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
        var r = false;
        $.when(existName()).done(function(r){
            if (r === 'true') {
                //$('#Btn_Cancel-1').trigger('click');
                $.notify("Nombre de Categoria de Taxonomia Existente!", {position:"bottom right",className:"error"});
            }
            else
            {
                insertRecord();
                showGrid();
            }
            return false;
        });

        return false;
    });

    $("#binsert_taxonomy").submit(function(e) {
        return false;
    });


});

function showGrid(){
    $.ajax({
        type:"POST",
        url: "/receiver",
        data: "opc=eccbc87e4b5ce2fe28308fd9f2a7baf3",
        dataType: "json",
        success: function(datos)
        {   
            if (datos == "true")
            {
                // -- printgrid
                printGrid();
                $("#main_grid").show("slow");
                $("#no_data_grid").hide();
                
            } else{
                $("#main_grid").hide("slow");
                $("#no_data_grid").show("slow");
            }
            
            
        }
    });
}

// -- Funcion que dibuja el grid principal de datos.
function printGrid(){
    $.ajax({
        type:"POST",
        url: "/receiver",
        data: "opc=a87ff679a2f3e71d9181a67b7542122c",
        dataType: "json",
        success: function(datos)
        {   
            var html   = ""
            var option = ""
            var obj = $.parseJSON(datos)

            $("#tcontent").find("tr:gt(0)").remove();
            

            $.each(obj, function(key, value){
                //console.log("key ==> [" + key + "] || Value ==> [" + value + "]")
                var_id     = ""
                var_pid    = ""
                var_order  = ""
                var_name   = ""
                var_description = ""
                $.each(value, function(llave, valor){
                    //console.log("llave ==> [" + llave + "] || valor ==> [" + valor + "]")
                    
                    var_id    = (llave == "Id")     ? valor : var_id;
                    var_pid   = (llave == "Pid")    ? valor : var_pid;
                    var_order = (llave == "Order")  ? valor : var_order;
                    var_name  = (llave == "Name")   ? valor : var_name;
                    var_description  = (llave == "Description") ? valor : var_description;
                    var_pid   = (var_pid == 0)      ? "" : var_pid;
                });

                html = "<tr id=\"row_" + var_id + "\">";
                html = html.concat("<td>" + var_id + "</td>");
                html = html.concat("<td>" + var_pid + "</td>");
                html = html.concat("<td>" + var_order + "</td>");
                html = html.concat("<td>" + var_name + "</td>");
                html = html.concat("<td class=\"text-center\"><a class='btn btn-success btn-xs' id=\"show-"+ var_id +"\" href=\"#\" data-toggle=\"modal\" data-target=\"#flipFlop\"><span class=\"glyphicon glyphicon-zoom-in\"></span> Show</a> <a class='btn btn-info btn-xs' id=\"edit-"+var_id+"\" href=\"#\" data-toggle=\"modal\" data-target=\"#flipFlop\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</a> <a href=\"#\" id=\"delete-"+ var_id +"\" class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#flipFlopDelete\"><span class=\"glyphicon glyphicon-remove\"></span> Del</a></td>");
                html = html.concat("</tr>");

                // se concatena la tupla
                $('#tcontent tbody').append(html)

            });

            
         
        }
    });

}

// -- funcion que busca un registro existente por el nombre de la categoria de taxonomia.
function existName()
{
    if ($("#finsert_name").val()!= "")
    {
        return $.ajax({
            type:"POST",
            url: "/receiver",
            data: "opc=cfcd208495d565ef66e7dff9f98764da&vname=" + $("#finsert_name").val(),
            dataType: "json",
            success: function(datos)
            {   
                //console.log("datos ===> [" + datos +"]")
                if (datos == "true")
                {
                    //console.log("return true");
                    return true;
                }
                
                //console.log("return false");
                return false;
            }
        });
    } else {
        document.forms['contact-form'].reportValidity();
    }
}

// -- Funcion que actualiza el Select de los PID
function insertRecord()
{
    if ($("#finsert_name").val()!= "")
    {
        $.ajax({
            type:"POST",
            url: "/receiver",
            data: "opc=c81e728d9d4c2f636f067f89cc14862c&vpid="+ $("#finsert_pid").val() +"&vorder="+ $("#finsert_order").val() +"&vname="+ $("#finsert_name").val() +"&vdesc=" + $("#finsert_desc").val() ,
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
        data: "opc=c4ca4238a0b923820dcc509a6f75849b" ,
        dataType: "json",
        success: function(datos)
        {   
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