--Lister toutes les plantes qui sont actuellement dans les rangs d’un jardin
SELECT * FROM CultiverPlante NATURAL JOIN Plante;
--Lister le nombre de rangs minimum et maximum sur les parcelles d’un jardin donné
SELECT MIN(mycount) AS minRang,MAX(mycount) AS maxrangs FROM (SELECT COUNT(rangId) AS myCount
FROM (SELECT * FROM Parcelle NATURAL JOIN Rang WHERE jardinId = 1) AS myrangs
GROUP BY parcelleId) as rangsparparcelle;
-- Lister les détails des parcelles qui ont la variété de plante A et la variété de plante B
SELECT x.jardinid,x.parcelleid FROM
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='Rosaceae') AS x INTERSECT
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='tuberosum');
-- Lister les détails des parcelles qui ont la variété de plante A ou la variété de plante B
SELECT x.jardinid,x.parcelleid FROM
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='Rosaceae') AS x UNION
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='tuberosum');
-- Lister les détails des parcelles qui ont la variété de plante A mais pas la variété de plante B
SELECT x.jardinid,x.parcelleid FROM
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='Rosaceae') AS x EXCEPT
(SELECT jardinId,parcelleId FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.idvariete = v.varieteid))
WHERE varietenom='tuberosum');
-- Lister tous les rangs d’un jardin donné avec leurs variétés de plantes s’ils sont cultivés. Dans le cas contraire, affichez null. 
SELECT r.jardinid,r.parcelleid,r.rangid,r.estenjachere,r.datemiseenjachere,r.longituderang,r.latituderang,x.varietenom 
FROM (SELECT * FROM Rang WHERE jardinid = 1) AS r FULL JOIN
(SELECT jardinId,parcelleId,rangId,varieteNom FROM ((SELECT jardinId,parcelleId,rangId,idVariete FROM CultiverPlante NATURAL JOIN Plante) AS cult 
INNER JOIN Variete v ON (cult.jardinid = 1 AND cult.idvariete = v.varieteid))) AS x 
ON (r.rangid = x.rangid AND r.parcelleid = x.parcelleid AND r.jardinid = x.jardinid) ORDER BY r.jardinid,r.parcelleid,r.rangid;
-- Quel est le nombre de jardins uniquement avec des semences biologiques ?
SELECT COUNT(*) AS jardinsbio FROM (SELECT jardinid FROM CultiverPlante NATURAL JOIN ProductionVariete WHERE estbiologique = TRUE EXCEPT
SELECT jardinid FROM CultiverPlante NATURAL JOIN ProductionVariete WHERE estbiologique = FALSE) AS jbio;
-- Lister tous les jardins qui ont au moins un rang en jachère
SELECT j.jardinid,j.jardinname,j.surface FROM Jardin j NATURAL JOIN 
(SELECT * FROM Rang WHERE estenjachere = TRUE) AS rangJ GROUP BY j.jardinid;
-- Quelles sont les menaces auxquelles sont sensibles les plantes fougères ?
SELECT f.plantenom,m.description FROM (SELECT * FROM Plante WHERE plantenom = 'Fougère') AS f NATURAL JOIN Menace m;
-- Quelles sont les plantes de la variété tuberosum ?
SELECT p.nomlatin,p.plantenom,p.catégorie,p.plantetype,p.soustype,v.varieteid,v.varietenom 
FROM Plante p INNER JOIN Variete v ON (p.idvariete = v.varieteid) WHERE varietenom = 'tuberosum';