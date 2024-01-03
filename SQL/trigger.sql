CREATE TABLE IF NOT EXISTS Historique (
	jardinId INTEGER NOT NULL,
	parcelleId INTEGER NOT NULL,
	rangId INTEGER NOT NULL,
    varieteId VARCHAR(50) NOT NULL, 
    dateAjout DATE NOT NULL);

CREATE OR REPLACE FUNCTION historique_variete() RETURNS TRIGGER AS $$
	DECLARE idV INTEGER := (SELECT idVariete FROM Plante WHERE nomLatin = NEW.nomLatin);
    BEGIN
        INSERT INTO Historique VALUES (NEW.jardinId,NEW.parcelleId,NEW.rangId,idV,current_date);
        RETURN NEW;
    END $$ LANGUAGE plpgsql;
CREATE TRIGGER historique AFTER INSERT ON CultiverPlante
FOR EACH ROW EXECUTE FUNCTION historique_variete();