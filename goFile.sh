#!/bin/bash

# /********************************************************************************/
# /*                              goFile.sh                                       */
# /*                                                                              */
# /* Descripcion: Crea Ficheros Golang nuevos con cabeceras personalizadas.       */
# /*                                                                              */
# /*                                                                              */
# /* Autor  : Rodrigo G. Higuera M. (RGHM)                                        */
# /* Fecha  : 27/06/2020 17.35                                                    */
# /*                                                                              */
# /********************************************************************************/
# /********************************************************************************/
# /* Ejecucion:                                                                   */
# /*                                                                              */
# /*   ./UxGitPull.sh      => Esta llamada muestra la opciones de uso de la shell */
# /*   ./UxGitPull.sh -h   => Esta llamada muestra la opciones de uso de la shell */
# /*   ./UxGitPull.sh -s   => Lista los diferentes repositorios almacenados.      */
# /*   ./UxGitPull.sh -n X => Realiza git pull al repo Nro. X                     */
# /*                                                                              */
# /********************************************************************************/

#/*********************************************************************************/
#/*************************   CONFIGURACION DE PARAMETROS   ***********************/
#/*********************************************************************************/
strDate=$(date '+%d/%m/%Y  %H:%M');
strDate2=$(date '+%Y.%m.%d %H:%M');
strDateV=$(date '+%Y%m%d.%H%M%S');
V="${strDateV}.0001"
year=$(date '+%Y');
nameFichero=$1
max_lenght_field=0
lineOut=""
author="Rodrigo G. Higuera M.(RGHM)"
authorSpace="Rodrigo_G._Higuera_M._(RGHM)"
email="<rodrigoghm@gmail.com>"
#/*********************************************************************************/

# -- Funcion que completa con espacios un string
CompletaEspacios()
{
	max_lenght_field=$2
	varInput=`echo "$1" | sed -r 's/[_]+/ /g'`
    lenght_string=0
	lenght_string=`echo -n "${varInput}" | wc -c`
	car=" "
	str=""
	lineOut=""
	while [ ${lenght_string} -le ${max_lenght_field} ]; do
		str="${str}${car}"
		let lenght_string+=1
	done
	lineOut="${varInput}"${str}
}

#-- Imprime la cabecera a mostrar en la Shell
print_head()
{
	echo "/********************************************************************************/"    >  ${nameFichero}
	Line1="${nameFichero}"
	CompletaEspacios ${Line1} 47                                                                    
	echo "/*                              ${lineOut}*/"                                          >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	echo "/* Descripcion:                                                                 */"    >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	Line2="${authorSpace}"
	CompletaEspacios ${Line2} 67                                                                    
	echo "/* Autor  : ${lineOut}*/"                                                              >> ${nameFichero}
	echo "/* Fecha  : ${strDate}                                                   */"           >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	echo "/* C0pyl3ft - ${year} | Open Source License                                        */" >> ${nameFichero}
	echo "/********************************************************************************/"    >> ${nameFichero}
	echo "/********************************************************************************/"    >> ${nameFichero}
	echo "/* Ejecucion:                                                                   */"    >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	echo "/*                                                                              */"    >> ${nameFichero}
	echo "/********************************************************************************/"	 >> ${nameFichero}
	
	echo ""                                                                                      >> ${nameFichero}
}

print_bodyGO()
{
	echo "package main"    >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo "/**********************************/" >> ${nameFichero}
	echo "/******** Import Packages *********/" >> ${nameFichero}
	echo "/**********************************/" >> ${nameFichero}
	echo "import ("        >> ${nameFichero}
	echo "	\"fmt\""       >> ${nameFichero}
	echo ")"               >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/******** Definicion de Estructuras - Inicio *********/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo " "                                                       >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/********** Definicion de Estructuras - Fin **********/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/***** Definicion de Constantes Globales - Inicio ****/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "const VERSION = \"${V}\""                                >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/****** Definicion de Constantes Globales - Fin ******/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/****** Definicion de Variables Globales - Inicio ****/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo " "                                                       >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo "/******* Definicion de Variables Globales - Fin ******/" >> ${nameFichero}
	echo "/*****************************************************/" >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo " "               >> ${nameFichero}
	echo "/*"              >> ${nameFichero}
	echo "*"               >> ${nameFichero}
	echo "* @author   ${author} ${email}"    >> ${nameFichero}
	echo "* @date     ${strDate2}"           >> ${nameFichero}
	echo "* @version  ${V}"                  >> ${nameFichero}
	echo "* @Company  © Development ${year}" >> ${nameFichero}
	echo "*"               >> ${nameFichero}
	echo "*/"              >> ${nameFichero}
	echo "func main() {"   >> ${nameFichero}
	echo ""                >> ${nameFichero}
	echo "}"               >> ${nameFichero}
}


# /********************************   INICIO   *************************************/
# clear

# -- se cargan la estructura del programa.
print_head
print_bodyGO

# -- se cambiar permisologia del archivo creado.
chmod 775 ${nameFichero}

# -- Libera las variables declaradas
unset strDate
unset strDate2
unset strDateV
unset V
unset year
unset nameFichero
unset max_lenght_field
unset lineOut
unset author
unset authorSpace
unset email

# --- salida exitosa del programa
exit 0
#/********************************   FIN   *************************************/
