/********************************************************************************/
/*                              receiver.go                                     */
/*                                                                              */
/* Descripcion:                                                                 */
/*                                                                              */
/*                                                                              */
/* Autor  : Rodrigo G. Higuera M. (RGHM)                                        */
/* Fecha  : 11/07/2020  21:24                                                   */
/*                                                                              */
/* C0pyl3ft - 2020 | Open Source License                                        */
/********************************************************************************/
/********************************************************************************/
/* Ejecucion:                                                                   */
/*                                                                              */
/*                                                                              */
/********************************************************************************/

package model

/**********************************/
/******** Import Packages *********/
/**********************************/
import (
	"crudgopg/cfg"
	"crudgopg/public"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

/*****************************************************/
/******** Definicion de Estructuras - Inicio *********/
/*****************************************************/

/*****************************************************/
/********** Definicion de Estructuras - Fin **********/
/*****************************************************/

/*****************************************************/
/***** Definicion de Constantes Globales - Inicio ****/
/*****************************************************/

/*****************************************************/
/****** Definicion de Constantes Globales - Fin ******/
/*****************************************************/

/*****************************************************/
/****** Definicion de Variables Globales - Inicio ****/
/*****************************************************/

/*****************************************************/
/******* Definicion de Variables Globales - Fin ******/
/*****************************************************/

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.11 21:24
* @version  20200711.212451.0001
* @Company  © Development 2020
*
 */
func ProcessAjax(w http.ResponseWriter, r *http.Request) {
	// -- Inicio de conexion a PostgreSQL
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", cfg.Host, cfg.Port, cfg.User, cfg.Passwd, cfg.DBname)
	fmt.Println(psqlInfo)
	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Conectado a PostgreSQL!")

	if r.Method == "POST" {
		o := r.FormValue("opc")

		if o == "cfcd208495d565ef66e7dff9f98764da" {
			// -- Cantidad de registros taxonomicos con el mismo nombre
			Fname := r.FormValue("vname")
			fmt.Println("opc ZERO")
			cw := fmt.Sprintf(" nombre = '%s'", Fname)
			cont := SelectCountSQL("\"WorkshopGo\".taxonomy", cw, db)
			var res bool
			if cont > 0 {
				res = true
			} else {
				res = false
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(strconv.FormatBool(res))
		} else if o == "c4ca4238a0b923820dcc509a6f75849b" {
			// -- busqueda de todos los nodos principales. (de las categorias de taxonomia)
			rs, esql := SelectWhereSQL("\"WorkshopGo\".taxonomy", "id, pid, orden, nombre, descripcion", "pid IS NULL", db)

			if esql == nil {
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(rs)
			} else {
				vacio := ""
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(vacio)
			}
		} else if o == "c81e728d9d4c2f636f067f89cc14862c" {
			// -- Insert de una nueva categoria.
			var Fid, Fpid, Forder, Fname, Fdesc string

			NewId := SelectCountSQL("\"WorkshopGo\".taxonomy", "", db)
			if public.IsNumeric(strconv.Itoa(NewId)) && NewId >= 0 {
				NewId = NewId + 1
				Fid = strconv.Itoa(NewId)
			} else {
				vacio := ""
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(vacio)
			}

			if public.IsNumeric(r.FormValue("vpid")) {
				Fpid = r.FormValue("vpid")
			} else {
				Fpid = "NULL"
			}

			if public.IsNumeric(r.FormValue("vorder")) {
				Forder = r.FormValue("vorder")
			} else {
				Forder = "1"
			}

			Fname = "'" + r.FormValue("vname") + "'"

			if r.FormValue("vdesc") == "" {
				Fdesc = "NULL"
			} else {
				Fdesc = "'" + r.FormValue("vdesc") + "'"
			}

			flag := insertSQL("\"WorkshopGo\".taxonomy", "id, pid, orden, nombre, descripcion", Fid+", "+Fpid+", "+Forder+", "+Fname+", "+Fdesc, db)
			w.Header().Set("Content-Type", "application/json")
			fmt.Println("Insert")
			fmt.Println("===============")
			fmt.Println(strconv.FormatBool(flag))
			json.NewEncoder(w).Encode(strconv.FormatBool(flag))
		} else if o == "eccbc87e4b5ce2fe28308fd9f2a7baf3" {
			// -- cantidad de registros en la tabla de taxonomia.
			count := SelectCountSQL("\"WorkshopGo\".taxonomy", "", db)

			var res bool
			if count > 0 {
				res = true
			} else {
				res = false
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(strconv.FormatBool(res))

		} else if o == "a87ff679a2f3e71d9181a67b7542122c" {
			// -- busqueda de todos los nodos principales. (de las categorias de taxonomia)
			rs, esql := SelectSQL("\"WorkshopGo\".taxonomy", "id, pid, orden, nombre, descripcion", "id ASC", db)

			if esql == nil {
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(rs)
			} else {
				vacio := ""
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(vacio)
			}

		}

	}

}
