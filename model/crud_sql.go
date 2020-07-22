/********************************************************************************/
/*                              crud_sql.go                                     */
/*                                                                              */
/* Descripcion:                                                                 */
/*                                                                              */
/*                                                                              */
/* Autor  : Rodrigo G. Higuera M. (RGHM)                                        */
/* Fecha  : 11/07/2020  21:54                                                   */
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
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
)

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.04 19:15
* @version  20200704.191557.0001
* @Company  © Development 2020
*
* @func insertSQL : Funcion que realiza la operacion de Insert en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el insert.
*			* fields <string> : Campos a insertar.
*			* values <string> : Valores a insertar.
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func insertSQL(table, fields, values string, db *sql.DB) bool {
	sql := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", table, fields, values)
	log.Println(sql)

	_, err := db.Exec(sql)

	if err != nil {
		panic(err)
		return false
	}

	return true
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.04 19:15
* @version  20200704.191557.0001
* @Company  © Development 2020
*
* @func insertSQL : Funcion que realiza la operacion de Update en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el insert.
*			* set <string> : Campos a insertar.
*			* where <string> : Valores a insertar.
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func updateSQL(table, set, where string, db *sql.DB) bool {
	sql := fmt.Sprintf("UPDATE %s SET %s WHERE %s ", table, set, where)
	log.Println(sql)

	_, err := db.Exec(sql)

	if err != nil {
		panic(err)
		return false
	}

	return true
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.21 23:47
* @version  20200721.234700.0001
* @Company  © Development 2020
*
* @func deleteSQL : Funcion que realiza la operacion de Delete en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el delete.
*			* where <string>  : clausula where para eliminar registros.
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func deleteSQL(table, where string, db *sql.DB) bool {
	sql := fmt.Sprintf("DELETE FROM %s WHERE %s ", table, where)
	log.Println(sql)

	_, err := db.Exec(sql)

	if err != nil {
		panic(err)
		return false
	}

	return true
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.11 22:05
* @version  20200704.191557.0001
* @Company  © Development 2020
*
* @func insertSQL : Funcion que realiza la operacion de Insert en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el insert.
*			* where <string>  : Clausula Where de la sentencia SQL.
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func SelectCountSQL(table, where string, db *sql.DB) int {
	var sql string
	if where == "" {
		sql = fmt.Sprintf("SELECT COUNT(*) as cont FROM %s;", table)
	} else {
		sql = fmt.Sprintf("SELECT COUNT(*) as cont FROM %s WHERE %s;", table, where)
	}
	log.Println(sql)
	row := db.QueryRow(sql)
	cont := 0
	err := row.Scan(&cont)

	if err != nil {
		panic(err)
		return -1
	}

	return cont
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.11 22:05
* @version  20200704.191557.0001
* @Company  © Development 2020
*
* @func insertSQL : Funcion que realiza la operacion de Insert en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el insert.
*			* fields <string> : Campos a insertar.
*			* order_by <string> : Clausula SQL de Order by
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func SelectSQL(table, fields, order_by string, db *sql.DB) (string, error) {
	var sql string
	if order_by == "" {
		sql = fmt.Sprintf("SELECT %s FROM %s;", fields, table)
	} else {
		sql = fmt.Sprintf("SELECT %s FROM %s ORDER BY %s;", fields, table, order_by)
	}
	log.Println(sql)
	fmt.Println("Entre a SelectSQL")
	rows, err := db.Query(sql)

	if err != nil {
		panic(err)
	}

	var sDTO_taxonomy = make([]DTO_Taxonomy, 0)
	var t DTO_Taxonomy
	var b NullInt64
	var a, c int
	var d string
	var e NullString
	n := 0
	for rows.Next() {
		n = n + 1
		fmt.Println("Ciclo <<" + strconv.Itoa(n) + ">>")
		fmt.Println("=============================")
		err = rows.Scan(&a, &b, &c, &d, &e)

		if err != nil {
			panic(err)
		}

		t.Id = a
		if b.Valid {
			t.Pid = int(b.Int64)
		} else {
			t.Pid = 0
		}

		if e.Valid {
			t.Description = e.String
		} else {
			t.Description = ""
		}

		t.Order = c
		t.Name = d

		fmt.Println(t)
		sDTO_taxonomy = append(sDTO_taxonomy, t)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	content, error := json.Marshal(sDTO_taxonomy)
	return string(content), error
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.11 22:05
* @version  20200704.191557.0001
* @Company  © Development 2020
*
* @func insertSQL : Funcion que realiza la operacion de Insert en DDBB.
*			* table  <string> : Tabla que se accedera para hacer el insert.
*			* fields <string> : Campos a insertar.
*			* values <string> : Valores a insertar.
*			* where <string>  : Clausula where de la sentencia SQL.
*			* db <*sql.DB>    : Instancia de BBDD abierta.
 */
func SelectWhereSQL(table, fields, where string, db *sql.DB) (string, error) {
	sql := fmt.Sprintf("SELECT %s FROM %s WHERE %s;", fields, table, where)
	log.Println(sql)
	rows, err := db.Query(sql)

	if err != nil {
		panic(err)
	}

	var sDTO_taxonomy = make([]DTO_Taxonomy, 0)
	var t DTO_Taxonomy
	var b NullInt64
	var a, c int
	var d string
	var e NullString
	n := 0
	for rows.Next() {
		n = n + 1
		err = rows.Scan(&a, &b, &c, &d, &e)

		if err != nil {
			panic(err)
		}

		t.Id = a
		if b.Valid {
			t.Pid = int(b.Int64)
		} else {
			t.Pid = 0
		}

		if e.Valid {
			t.Description = e.String
		} else {
			t.Description = ""
		}

		t.Order = c
		t.Name = d

		fmt.Println(t)
		sDTO_taxonomy = append(sDTO_taxonomy, t)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	content, error := json.Marshal(sDTO_taxonomy)
	return string(content), error
}
