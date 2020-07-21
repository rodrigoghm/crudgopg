$(document).ready(function() {
    console.log("Entro al document ready!")

    // -- Evaluacion del grid principal
    showGrid();

    // -- call click a href
    $("a").on("click", function(){
        console.log("Entro al click button!")
        var ide = ($(this).attr('id'));
        console.log("<id_delete> ==> " + ide)
        array = ide.split("-")
        if (array[0] == "new_record") {
            // -- agrega un nuevo registro
            cleanFormInsert();
            // -- actualiza los nodos padre. <PID>
            updatePID();
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

    // -- click al boton de editar taxonomy
    $("#bedit_taxonomy").click(function(){
        console.log("Entro al click button de Editar Registro!")
        var r = false;
        console.log("hedit_id ===> " + $("#hedit_id").val())
        $.when(existName($("#hedit_id").val())).done(function(r){
            if (r === 'true') {
                $.notify("Nombre de categoria de taxonomia ya existente!", {position:"bottom right",className:"error"});
            }
            else
            {
                console.log("actualizando registro ....")
                updateRecord();
                $("#ocultos").html("")
                cleanFormEdit();
                showGrid();
            }
            return false;
        });
        
        return false;
    });


    $("#binsert_taxonomy").submit(function(e) {
        return false;
    });

    $("#bedit_taxonomy").submit(function(e) {
        return false;
    });


});


function funcBotonesGrilla(t){
    var idattr = t.id;
    
    array = idattr.split("-")
    console.log("array[0]===> " + array[0])
    if (array[0] == "show")
    {   
        console.log("Mostrar Registro!");
        $('.form-group').find('label').removeClass('js-hide-label').addClass('js-unhighlight-label');
        
        // carga valores en el formulario.
        $("#rt_finsert_name").val($("#gname_" + array[1]).html())
        if ($("#gpid_" + array[1]).html()!="")
            $("#rt_finsert_pid").val($("#gname_" + $("#gpid_" + array[1]).html()).html() + " [" + $("#gpid_" + array[1]).html() + "]")
        else
            $("#rt_finsert_pid").val("")
        $("#rt_finsert_order").val($("#gorder_" + array[1]).html())
      
        $("#rt_finsert_desc").val($("#hdesc_" + array[1]).val())
    }
    else if(array[0] == "edit")
    {
        console.log("Editar Registro!");
        
        $('.form-group').find('label').removeClass('js-hide-label').addClass('js-unhighlight-label');
        console.log("RODRIGOOOOOO -> " + array[1])
        // carga valores en el formulario.
        $("#rt_fedit_name").val($("#gname_" + array[1]).html())
        if ($("#gpid_" + array[1]).html()!="")
            updatePID(1, $("#gpid_" + array[1]).html(), array[1]);
        else
            updatePID(1, 0, array[1]);
        $("#rt_fedit_order").val($("#gorder_" + array[1]).html())
        $("#rt_fedit_desc").val($("#hdesc_" + array[1]).val())
        $("#hedit_id").val(array[1])
        console.log("#hedit_id ===> " + $("#hedit_id").val())
    }
    else if (array[0] == "delete")
    {   
        console.log("Borrar el primero!")
        $("#register_delete").html("")
        $("#register_delete").html(array[1])
    }
}

function showGrid(){
    console.log("IN showGrid()")
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
    console.log("IN printGrid()")
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

            // -- elimina todos los registros de la tabla
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
                html = html.concat("<td id='gid_" + var_id + "'>" + var_id + "</td>");
                html = html.concat("<td id='gpid_" + var_id + "'>" + var_pid + "</td>");
                html = html.concat("<td id='gorder_" + var_id + "'>" + var_order + "</td>");
                html = html.concat("<td id='gname_" + var_id + "'>" + var_name + "</td>");
                html = html.concat("<td class=\"text-center\"><a class='btn btn-success btn-xs btnGrilla' id=\"show-"+ var_id +"\" href=\"#\" data-toggle=\"modal\" data-target=\"#ViewTaxonomy\"><span class=\"glyphicon glyphicon-zoom-in\"></span> Show</a> <a class='btn btn-info btn-xs btnGrilla' id=\"edit-"+var_id+"\" href=\"#\" data-toggle=\"modal\" data-target=\"#EditTaxonomy\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</a> <a href=\"#\" id=\"delete-"+ var_id +"\" class=\"btn btn-danger btn-xs btnGrilla\" data-toggle=\"modal\" data-target=\"#flipFlopDelete\"><span class=\"glyphicon glyphicon-remove\"></span> Del</a></td>");
                html = html.concat("</tr>");

                $("#ocultos").append('<input type="hidden" id="hdesc_' + var_id + '" name="hdesc_' + var_id + '" value="' + var_description + '" />');

                // se concatena la tupla
                $('#tcontent tbody').append(html)

            });
        }
    }).done(function(){
       $(".btnGrilla").on( "click", function() {
        funcBotonesGrilla(this);
      });
       
    });

}

// -- funcion que busca un registro existente por el nombre de la categoria de taxonomia.
function existName(idN=0)
{
    console.log("<idN> -> " + idN)
    if (($("#finsert_name").val()!= "")||($("#fedit_name").val()!= ""))
    {
        if (idN==0)
        {
            // -- Insert de un registro
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
        }
        else{
            // -- Edicion de un registro
            return $.ajax({
                type:"POST",
                url: "/receiver",
                data: "opc=e4da3b7fbbce2345d7772b0674a318d5&vname=" + $("#fedit_name").val() + "&vid=" + idN,
                dataType: "json",
                success: function(datos)
                {   
                    //console.log("datos ===> [" + datos +"]")
                    if (datos == "true")
                    {
                        console.log("func <existName> ==> return true");
                        return true;
                    }
                    
                    console.log("func <existName> ==> return false");
                    return false;
                }
            });
        }
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
function updateRecord()
{
    if ($("#fedit_name").val()!= "")
    {
        $.ajax({
            type:"POST",
            url: "/receiver",
            data: "opc=1679091c5a880faf6fb5e6087eb1b2dc&vid=" + $("#hedit_id").val() + "&vpid="+ $("#fedit_pid").val() +"&vorder="+ $("#rt_fedit_order").val() +"&vname="+ $("#rt_fedit_name").val() +"&vdesc=" + $("#rt_fedit_desc").val() ,
            dataType: "json",
            success: function(datos)
            {   
                console.log(datos)
                if (datos == "true")
                {
                    $('#Btn_Cerrar-2').trigger('click');
                    $.notify("Registro actualizado exitosamente", {position:"bottom right",className:"success"});
                }
                else
                    $.notify("Registro no actualizado", {position:"bottom right",className:"error"});
            }
        });
    } else {
        document.forms['contact-form'].reportValidity();
    }
}



// -- Funcion que actualiza el Select de los PID
    // -- f == 0 Si es el formulario de insercion
    // -- f <> 0 Si es el formulario de edicion
    // -- d : indica el valor por default
function updatePID(f = 0, def = 0, omitted = 0)
{
    console.log("<updatePID> -> " + f + " || def -> " + def + " || omitted -> " + omitted);
    $.ajax({
        type:"POST",
        url: "/receiver",
        data: "opc=c4ca4238a0b923820dcc509a6f75849b" ,
        dataType: "json",
        success: function(datos)
        {   
            var option = ""
            var obj = $.parseJSON(datos)

            if (f==0)
            {
                $("#finsert_pid option").each(function(){
                    $(this).remove();
                });
                $("#finsert_pid").append(new Option("N/A", "", true, true))
            } else {
                $("#fedit_pid option").each(function(){
                    $(this).remove();
                });
                if (def == 0 ){
                    $("#fedit_pid").append(new Option("N/A", "", true, true))
                } else{
                    $("#fedit_pid").append(new Option("N/A", "", false, false))
                }
            }

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
                    if (f==0)
                        $("#finsert_pid").append(new Option(var_name, var_id, false, false))
                    else
                    {
                        if (omitted!=var_id)
                        {
                            if (var_id == def) {
                                $("#fedit_pid").append(new Option(var_name, var_id, true, true))
                            } else {
                                $("#fedit_pid").append(new Option(var_name, var_id, false, false))
                            }
                        }
                    }
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

// -- funcion que limpia el formulario de Edicion.
function cleanFormEdit()
{
    $("#hedit_id").val("");
    $("#rt_fedit_name").val("");
    $("#fedit_pid").val("");
    $("#rt_fedit_order").val("");
    $('#fedit_order option:contains("N/A")').prop('selected',true);
    $('#fedit_pid option:contains("N/A")').prop('selected',true);

    //limpieza de los label del form
    $('.form-label').each(function(){
        $(this).addClass('js-hide-label');
    }); 
}