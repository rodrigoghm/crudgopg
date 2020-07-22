/********************************************************************************/
/*                              goFile.go                                       */
/*                                                                              */
/* Descripcion:                                                                 */
/*                                                                              */
/*                                                                              */
/* Autor  : Rodrigo G. Higuera M. (RGHM)                                        */
/* Fecha  : 21/07/2020  11:22                                                   */
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
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"time"
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
const VERSION = "20200721.112233.0001"

const (
	layoutISO = "2006-01-02 13:21:00"
)

/*****************************************************/
/****** Definicion de Constantes Globales - Fin ******/
/*****************************************************/

/*****************************************************/
/****** Definicion de Variables Globales - Inicio ****/
/*****************************************************/
var author string = "Rodrigo G. Higuera M. <rodrigoghm@gmail.com>"
var fechaSystem, Y string
var versionFile string
var PathFile string = "/home/higuerar/go/src/crudgopg/"
var nameFile string
var cl int = 0

/*****************************************************/
/******* Definicion de Variables Globales - Fin ******/
/*****************************************************/

func writeFile(line string) {
	if _, err := os.Stat(PathFile); os.IsNotExist(err) {
		fmt.Println("def")
		f, err := os.Create(PathFile)
		if err != nil {
			fmt.Println("Error ", err)
			f.Close()
			return
		}

		fmt.Fprintln(f, line)
	} else {
		// -- Si el fichero ya existe.
		x := fmt.Sprintf("cat %s | wc -l", PathFile)
		out, err := exec.Command("bash", "-c", x).Output()
		if err != nil {
			fmt.Printf("Error ==> [%s]", err)
		}
		fmt.Println("OUT===>" + string(out))

		line := line + " " + string(out)
		// -- open input file
		f, err := os.OpenFile(PathFile, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Println(err)
		}

		// -- close fi on exit and check for its returned error
		defer func() {
			if err := f.Close(); err != nil {
				panic(err)
			}
		}()

		if _, err := f.WriteString(line); err != nil {
			log.Println(err)
		}
	}
}

func completaEspaciosString(line string, car byte) string {
	maxLine := 78

	for i := len(line); i < maxLine; i++ {
		line = line + string(car)
	}

	return line
}

func PrintLineFichero(line, fichero string) {
	var c string
	if cl == 0 {
		c = fmt.Sprintf("echo %s > %s", line, fichero)
	} else {
		c = fmt.Sprintf("echo %s >> %s", line, fichero)
	}

	_, err := exec.Command("bash", "-c", c).Output()
	if err != nil {
		fmt.Printf("Error ==> [%s]", err)
	} else {
		cl++
	}
}

func printHeaderFileGo(fichero string) {
	lineAuthor := completaEspaciosString("  @ Autor  : "+author, ' ')
	lineFecha := completaEspaciosString("  @ Fecha  : "+fechaSystem, ' ')
	lineTitle := completaEspaciosString("                              "+nameFile, ' ')
	//fmt.Println("lineAuthor ==> [/*" + lineAuthor + "*/]")
	//fmt.Println("lineFecha  ==> [/*" + lineFecha + "*/]")
	PrintLineFichero("\"/********************************************************************************/\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/*"+lineTitle+"*/\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/* +++ Descripcion:                                                             */\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/*"+lineAuthor+"*/\"", fichero)
	PrintLineFichero("\"/*"+lineFecha+"*/\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/* C0pyl3ft - 2020 | Open Source License                                        */\"", fichero)
	PrintLineFichero("\"/********************************************************************************/\"", fichero)
	PrintLineFichero("\"/********************************************************************************/\"", fichero)
	PrintLineFichero("\"/* Ejecucion :                                                                  */\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/*                                                                              */\"", fichero)
	PrintLineFichero("\"/********************************************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)

}

func printBodyFileGo(fichero string) {
	strVersion := fmt.Sprintf("%s", versionFile)
	packImport := fmt.Sprintf("'\t''\"%s\"'", "fmt")
	PrintLineFichero("\"package main\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/**********************************/\"", fichero)
	PrintLineFichero("\"/******** Import Packages *********/\"", fichero)
	PrintLineFichero("\"/**********************************/\"", fichero)
	PrintLineFichero("\"import (\"", fichero)
	//PrintLineFichero("   '\"fmt\"'", fichero)
	PrintLineFichero(packImport, fichero)
	PrintLineFichero("\")\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/******** Definicion de Estructuras - Inicio *********/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/******** Definicion de Estructuras - Fin ************/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/***** Definicion de Constantes Globales - Inicio ****/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("   const VERSION = '\""+strVersion+"\"'", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/***** Definicion de Constantes Globales - Fin *******/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/****** Definicion de Variables Globales - Inicio ****/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"/****** Definicion de Variables Globales - Fin ******/\"", fichero)
	PrintLineFichero("\"/*****************************************************/\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"/*\"", fichero)
	PrintLineFichero("\"*\"", fichero)
	PrintLineFichero("\"* @author   "+author+"\"", fichero)
	PrintLineFichero("\"* @date     "+fechaSystem+"\"", fichero)
	PrintLineFichero("\"* @version  "+versionFile+"\"", fichero)
	PrintLineFichero("\"* @Company  © Development "+Y+"\"", fichero)
	PrintLineFichero("\"*\"", fichero)
	PrintLineFichero("\"*/\"", fichero)
	PrintLineFichero("\"func main() {\"", fichero)
	PrintLineFichero("\"\"", fichero)
	PrintLineFichero("\"}\"", fichero)
	PrintLineFichero("\"\"", fichero)
}

/*
*
* @author   Rodrigo G. Higuera M.(RGHM) <rodrigoghm@gmail.com>
* @date     2020.07.21 11:22
* @version  20200721.112233.0001
* @Company  © Development 2020
*
 */
func main() {
	fmt.Println("::: Inicio :::")

	dt := time.Now()
	fechaSystem = dt.Format("2006.01.02 15:04:05")
	v1 := string(dt.Format("20060102"))
	v2 := strconv.Itoa(dt.Hour()) + strconv.Itoa(dt.Minute()) + strconv.Itoa(dt.Second())
	Y = strconv.Itoa(dt.Year())
	versionFile = v1 + "." + v2 + "." + "0001"

	// -- se recibe nombre por parametro de nombre de fichero
	argCount := len(os.Args[1:])
	if argCount >= 1 {
		fn := os.Args[1]
		// -- fmt.Println(fn)
		nameFile = fn
	} else {
		nameFile = "nuevo_" + string(dt.Format("20060102")) + ".go"
	}

	printHeaderFileGo(PathFile + nameFile)
	printBodyFileGo(PathFile + nameFile)
	fmt.Println("::: Fin :::")
}
