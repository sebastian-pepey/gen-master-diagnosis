IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'mantnqn')
	BEGIN
		CREATE DATABASE [mantnqn]
	END
	GO
		USE [mantnqn];
	GO

-- Creación de Tablas
if object_id('central') is not null
	CREATE TABLE central(
		id_central INT not null,
		nombre_central TEXT,
		id_localidad INT,
		cant_maq INT
		CONSTRAINT [PK_central] PRIMARY KEY (id_central)
	);

if object_id('central') is not null
	CREATE TABLE maquina(
		id_maquina INT PRIMARY KEY not null,
		id_modelo_maquina INT,
		id_central INT
		CONSTRAINT [PK_central] FOREIGN KEY (id_central) REFERENCES central(id_central)
	);
