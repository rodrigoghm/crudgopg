-- ---------------------------------------------------------------------*
--     Autor:   Ing. Rodrigo G. Higuera M.                              *
-- ---------------------------------------------------------------------*
--     Schema      : "WorkshopGo"                                       *
--     Descripción : Crea las Estructura de una tabla taxonomica.       *
--                                                                      *
--     Creación    : 11 de Julio de 2020. Rv0.1                         *
--                                                                      *
--     © 2020 - Sodimac S.A. - Taller Go                                *
-- ---------------------------------------------------------------------*


-- ------------------------------------------------------------------------------------------------------------------*
--                             LISTADO DE TABLAS DE TALLER DE GOLANG                                                 *
-- ------------------------------------------------------------------------------------------------------------------*
--   Nombre:                                 |                                     Descripción:                      *
-- ------------------------------------------------------------------------------------------------------------------*
--  WorkshopGo.taxonomy                      |  Tabla Taxonomica para cargar informacion general del sistema.        *
-- ------------------------------------------------------------------------------------------------------------------*

CREATE SCHEMA "WorkshopGo" AUTHORIZATION postgres;

COMMENT ON SCHEMA "WorkshopGo" IS '::: Schema Principal Para el Taller de Go - Sodimac 2020 :::';


-----------------------------------*
-- Table: Categorias de Taxonomia  *
-----------------------------------*

CREATE TABLE "WorkshopGo".taxonomy
(
  id            bigint NOT NULL ,
  pid           bigint ,
  orden         smallint ,
  nombre        varchar(30) NOT NULL ,
  descripcion   varchar(75) ,
  CONSTRAINT wg_taxonomy_pkey PRIMARY KEY ( id ),
  CONSTRAINT wg_taxonomy_ukey UNIQUE ( nombre )
);

COMMENT ON TABLE  "WorkshopGo".taxonomy IS 'Tabla Taxonomica para cargar informacion general del sistema.';
COMMENT ON COLUMN "WorkshopGo".taxonomy.id           IS 'Identificador de la categoria.'; 
COMMENT ON COLUMN "WorkshopGo".taxonomy.pid          IS 'Padre del Identificador.';  
COMMENT ON COLUMN "WorkshopGo".taxonomy.orden        IS 'Orden del categorizador.';  
COMMENT ON COLUMN "WorkshopGo".taxonomy.nombre       IS 'Nombre del Categorizador.';  
COMMENT ON COLUMN "WorkshopGo".taxonomy.descripcion  IS 'Descripcion de categorizador.';  
