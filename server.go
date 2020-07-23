/********************************************************************************/
/*                              server.go                                       */
/*                                                                              */
/* Descripcion:                                                                 */
/*                                                                              */
/*                                                                              */
/* Autor  : Rodrigo G. Higuera M. (RGHM)                                        */
/* Fecha  : 04/07/2020  22:13                                                   */
/*                                                                              */
/* C0pyl3ft - 2020 | Open Source License                                        */
/********************************************************************************/
/********************************************************************************/
/* Ejecucion:                                                                   */
/*                                                                              */
/*                                                                              */
/********************************************************************************/

package main

/**********************************/
/******** Import Packages *********/
/**********************************/
import (
	"crudgopg/cfg"
	"crudgopg/model"
	"log"
	"net/http"

	_ "github.com/lib/pq"
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
const VERSION = "20200704.221352.0001"

/*****************************************************/
/****** Definicion de Constantes Globales - Fin ******/
/*****************************************************/

/*****************************************************/
/****** Definicion de Variables Globales - Inicio ****/
/*****************************************************/

/*****************************************************/
/******* Definicion de Variables Globales - Fin ******/
/*****************************************************/

func callURL(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Path[1:]

	http.ServeFile(w, r, page)
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.04 22:13
* @version  20200704.221352.0001
* @Company  © Development 2020
*
 */
func main() {

	// -- Funciones Handler.
	http.HandleFunc("/", callURL)
	http.HandleFunc("/receiver", model.ProcessAjax)

	log.Fatal(http.ListenAndServe(cfg.PortWEB, nil))
}
