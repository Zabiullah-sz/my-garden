-- jardin 1
INSERT INTO Jardin(jardinName,surface) VALUES ('Jardin botanique', 1000);
INSERT INTO JardinDetails VALUES (1, 'Sableux', 10,TRUE,TRUE ,TRUE);

INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (1, 145.34, 123.43,100);
ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,1, FALSE,100, 100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,1, FALSE,150, 100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,1, FALSE,200, 100);

ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (1, 160.45, 187.54,100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,2, FALSE,200, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,2, FALSE,250, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,2, FALSE,300, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (1,2, TRUE,'2022-02-11',350, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,2, FALSE,400, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,2, FALSE,450, 200);

ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (1, 160.45, 187.54,100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (1,3, TRUE, '2021-12-18',300, 300);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (1,3, TRUE, '2022-03-24',350, 300);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,3, FALSE,400, 300);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (1,3, FALSE,450, 300);

ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (1, 503.54, 628.92,50);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (1,4, TRUE, '2021-11-23',400, 400);
--jardin 2
INSERT INTO Jardin(jardinName,surface) VALUES ('Jardin du Mont-Royal', 500);
INSERT INTO JardinDetails VALUES (2, 'Humifère', 0,TRUE,FALSE ,TRUE);
ALTER SEQUENCE Parcelle_parcelleId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (2, 200.54, 205.45,100);
ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,1, FALSE,200, 250);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,1, FALSE,200, 300);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (2,1, TRUE, '2022-02-15',300, 400);

ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (2, 160.45, 187.54,100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,2, FALSE,200, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (2,2, TRUE, '2022-04-10',250, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,2, FALSE,300, 200);

ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (2, 160.45, 187.54,100);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere,dateMiseEnJachere, longitudeRang,latitudeRang) VALUES (2,3, TRUE, '2022-03-02',200, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,3, FALSE,250, 200);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (2,3, FALSE,300, 200);
--jardin 3
INSERT INTO Jardin(jardinName,surface) VALUES ('Jardin floral', 500);
INSERT INTO JardinDetails(jardinId,typeDeSol,ornementFlag,potagerFlag,vergerFlag) VALUES (3, 'Fertile',TRUE,FALSE ,FALSE);
ALTER SEQUENCE Parcelle_parcelleId_seq RESTART WITH 1;
INSERT INTO Parcelle(jardinId,longitude,latitude, dimensions) VALUES (3, 405.45, 508.32,300);
ALTER SEQUENCE Rang_rangId_seq RESTART WITH 1;
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (3,1, FALSE,200, 250);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (3,1, FALSE,200, 300);
INSERT INTO Rang(jardinId,parcelleId,estEnJachere, longitudeRang,latitudeRang) VALUES (3,1,FALSE,300, 400);
-- variete
INSERT INTO Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
VALUES ('tuberosum', '2020-02-03', 'Le semis se fait en pleine terre en mars et avril',
		'La plantation des jeunes plants en pleine terre peut se faire toute l année, en dehors des périodes de gel',
	   'Ne pas faire d apport de compost ou de fumier à la plantation pour ne pas le faire pourrir.',
		'La récolte s effectue au fur et à mesure des besoins.Elle peut se récolter presque toute l année mais plus difficilement l hiver.',
		'2022-03-25','2022-08-12','Peut facilement se planter dans un potager un pot ou une jardinière.');
		
INSERT INTO Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
VALUES ('Rosaceae', '2019-04-13', 'Enterrer, dans un pot de terre, le noyau dès que l abricot est consommé et le laisser à l extérieur.',
		'La plantation se fait du mois d octobre au mois de mars, hors périodes de gel.',
	   'Le désherbage au pied doit être effectué régulièrement pour éviter la prolifération des champignons et des maladies',
		'Les fruits se récoltent à maturité dès qu ils commencent à dégager leur parfum.',
		'2020-04-12','2020-08-05','Les fleurs apparaissent au printemps et sont de couleur blanche et rose. 
		Le grand problème est que cette floraison précoce est très sensible aux gelées, surtout les nocturnes.');

INSERT INTO Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
VALUES ('Rutaceae', '2021-05-08', 'Les semis s effectuent au printemps et sous abri chaud. Ils sont très longs à lever et surtout aléatoires.',
		'Le trou de plantation doit mesurer 100 cm en tous sens. ',
	   'le tuteurage est également nécessaire car les branches supportent difficilement le poids des fruits.',
		'Les fruits se récoltent du mois de novembre au mois de janvier.',
		'2021-03-12','2020-11-25','C est un gourmand en eau qui demande des arrosages réguliers pendant toute sa période de végétation.');

INSERT INTO Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
VALUES ('Solanaceae Juss', '2018-05-01', 'Au semis, les graines doivent être à peine recouvertes de terre affinée, un simple plombage est suffisant.',
		'Les plantations se font au printemps. Pour une installation au jardin, il faut attendre mi-mai pour que tous les risques de gelées soient écartés.',
	   'C est un gourmand en eau et du printemps à l automne les arrosages doivent être réguliers et fréquents afin de maintenir la terre toujours humide.',
		'La fructification commence environ 18 mois après le semi',
		'2021-04-30','2020-12-14','Les fruits mûrs se consomment comme des fruits ou des légumes, crus ou cuits. Ils peuvent également être mis en conserve.');

INSERT INTO Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
VALUES ('Dryopteridaceae', '2022-03-01', 'Semer les spores (que l on peut récupérer sous les frondes) en automne sous châssis et mettre en place au printemps.',
		'1 à 2 cm de recouvrement du semis avec de la terre affinée',
	   'Couper les frondes qui sont sèches au fur et à mesure.',
		' La récolte commence dès que les crosses commencent à sortir de leurs écailles',
		'2021-09-30','2022-06-23','Un paillage installé au pied des fougères permet de conserver l humidité de la terre.');

SELECT * FROM Variete;
-- sol
INSERT INTO Sol(solType) VALUES ('Humifère');
INSERT INTO Sol(solType) VALUES ('Argileux');
INSERT INTO Sol(solType) VALUES ('Fertile');
INSERT INTO Sol(solType) VALUES ('Sableux');
INSERT INTO Sol(solType) VALUES ('Limoneux');
-- sols adaptés a la variété
INSERT INTO SolsVariete(varieteId,solId) VALUES (1,1);
INSERT INTO SolsVariete(varieteId,solId) VALUES (1,3);
INSERT INTO SolsVariete(varieteId,solId) VALUES (2,2);
INSERT INTO SolsVariete(varieteId,solId) VALUES (2,4);
INSERT INTO SolsVariete(varieteId,solId) VALUES (3,2);
INSERT INTO SolsVariete(varieteId,solId) VALUES (3,4);
INSERT INTO SolsVariete(varieteId,solId) VALUES (4,3);
INSERT INTO SolsVariete(varieteId,solId) VALUES (4,4);
INSERT INTO SolsVariete(varieteId,solId) VALUES (5,1);
INSERT INTO SolsVariete(varieteId,solId) VALUES (5,2);
--recuperer les sols ou la variete est bien adapté
--SELECT * FROM Variete NATURAL JOIN (SELECT * FROM Sol NATURAL JOIN SolsVariete) AS mySols;
--plantes
INSERT INTO Plante VALUES (1, 'Allium Tuberosum', 'Ciboulette','fleur','Vivace bulbeuse','floraison aérienne');
INSERT INTO Plante VALUES (1, 'Solanum tuberosum', 'Pomme de terre','légume','Vivace','herbacée');
INSERT INTO Plante VALUES (2,'Prunus armeniaca','Abricotier','racine','arbre fruitier','fruits à noyau');
INSERT INTO Plante VALUES (2, 'Prunus Persica Nectarina','Nectarinier','racine','arbre fruitier','fruits à noyau');
INSERT INTO Plante VALUES (2, 'Rosa','Rosier','fleur','Vivace épineux','floraison aérienne');
INSERT INTO Plante VALUES (3, 'Citrus Grandis','Pamplemoussier','racine','arbre fruitier','fruits avec pepins');
INSERT INTO Plante VALUES (3, 'Citrus Aurantium','Oranger Amer','racine','arbre fruitier','fruits avec pepins');
INSERT INTO Plante VALUES (4, 'Cyphomandra','Tomate en arbre','graines','arbre fruitier','fruits avec graines');
INSERT INTO Plante VALUES (5, 'Pteridium Aquilinum','Fougère','spores','Vivace','rhizome très rustique');
-- menaces
INSERT INTO Menace(nomLatinPlante,description) VALUES ('Pteridium Aquilinum','Araignées rouges');
INSERT INTO Menace(nomLatinPlante,description) VALUES ('Pteridium Aquilinum','cicadelles');
-- semencier
INSERT INTO Semencier(semencierNom,siteWeb) VALUES ('Dupont','semencierdupont.ca');
INSERT INTO Semencier(semencierNom,siteWeb) VALUES ('Tremblay','semenciertremblay.ca');
INSERT INTO Semencier(semencierNom,siteWeb) VALUES ('Hakimi','leshakimis.ca');
INSERT INTO Semencier(semencierNom,siteWeb) VALUES ('Shair Zaie','jardindezabi.ca');
INSERT INTO Semencier(semencierNom,siteWeb) VALUES ('Rayan','jardinsrayan.ca');
-- production de variete par un semencier
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (1,1,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (1,1,FALSE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (2,1,TRUE);

INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (4,2,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (3,2,TRUE);

INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (3,3,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (2,4,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (3,4,FALSE);

INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (5,4,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (5,5,TRUE);
INSERT INTO ProductionVariete(semencierId,varieteId,estBiologique) VALUES (5,5,FALSE);
SELECT * FROM (SELECT * FROM ProductionVariete NATURAL JOIN Variete) AS myVar 
NATURAL JOIN (SELECT * FROM ProductionVariete NATURAL JOIN Semencier) AS mySols;
--cultivation de plantes
SELECT p.nomlatin,p.idvariete,v.idproduction FROM Plante p INNER JOIN ProductionVariete v ON (p.idvariete = v.varieteid) ;
--jardin1
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Prunus Persica Nectarina',1,1,1,'plant',4);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Allium Tuberosum',1,1,2,'semis',1);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Citrus Aurantium',1,1,3,'greffe',6);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Prunus armeniaca',1,2,1,'plant',4);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Cyphomandra',1,2,2,'plant',7);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Citrus Grandis',1,2,3,'plant',6);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Cyphomandra',1,2,5,'spores',10);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Citrus Grandis',1,2,6,'spores',11);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Rosa',1,3,3,'semis',4);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Solanum tuberosum',1,3,4,'légume',2);
--jardin 2
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Prunus armeniaca',2,1,1,'plant',5);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Citrus Aurantium',2,1,2,'plant',6);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Rosa',2,2,1,'semis',5);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Prunus Persica Nectarina',2,2,3,'plant',5);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Allium Tuberosum',2,3,2,'semis',3);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Citrus Grandis',2,3,3,'plant',6);
--jardin 3
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Rosa',3,1,1,'semis',4);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Rosa',3,1,2,'semis',4);
INSERT INTO CultiverPlante(nomLatin,jardinId,parcelleId,rangId,typeMiseEnPlace,idProduction) VALUES ('Rosa',3,1,3,'semis',4);