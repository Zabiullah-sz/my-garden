import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Variete } from "../../../common/tables/Variete";

@injectable()
export class DatabaseService {
  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "jardindb",
    password: "Mim$@819",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= Variete =======

  public async getVarieteById(varieteId: number,estBio:boolean): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM (SELECT * FROM (SELECT * FROM PLANTESDB.Variete v NATURAL JOIN PLANTESDB.ProductionVariete p WHERE v.varieteid = ${varieteId} AND p.estbiologique = ${estBio}) AS v NATURAL JOIN PLANTESDB.Semencier) as vs
    NATURAL JOIN (SELECT * FROM (SELECT * FROM PLANTESDB.SolsVariete) AS sv NATURAL JOIN PLANTESDB.Sol) AS s ORDER BY idproduction;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getVarietes(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM (SELECT * FROM (SELECT * FROM PLANTESDB.Variete NATURAL JOIN PLANTESDB.ProductionVariete) AS v NATURAL JOIN PLANTESDB.Semencier) as vs
    NATURAL JOIN (SELECT * FROM (SELECT * FROM PLANTESDB.SolsVariete) AS sv NATURAL JOIN PLANTESDB.Sol) AS s ORDER BY varieteid;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getVarietesNom(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT varietenom FROM PLANTESDB.Variete;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async addVariete(variete: Variete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    // Insert Variete
    let query = `INSERT INTO PLANTESDB.Variete(varieteNom,anneeMiseEnMarchée,semis, plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral) 
    VALUES ('${variete.nom}','${variete.anneeMiseEnMarche}','${variete.semis}','${variete.plantation}','${variete.entretien}'
    ,'${variete.recolte}','${variete.periodeMiseEnPlace}','${variete.periodeRecolte}','${variete.commentaireGeneral}');`;
    let res = await client.query(query);

    // Insert ProductionVariete
    query = `SELECT varieteid FROM PLANTESDB.Variete;`;
    res = await client.query(query);
    const varieteId = parseInt((res.rows[res.rowCount-1] as any).varieteid);
    query = `INSERT INTO PLANTESDB.ProductionVariete(semencierId,varieteId,estBiologique)
     VALUES (${variete.semencier.id},${varieteId},${variete.estBiologique});`;
    res = await client.query(query);

    // Insert SolsType
    for(const sol of variete.solsAdaptes){
      query = `INSERT INTO PLANTESDB.SolsVariete VALUES (${varieteId},${sol.id});`;
      res = await client.query(query);
    }
    client.release();
    return res;
  }
  public async deleteVariete(varieteId: number,semencierId:number,estBio:string): Promise<pg.QueryResult> {

    const client = await this.pool.connect();
    let query = `SELECT COUNT(*) FROM PLANTESDB.ProductionVariete WHERE varieteid = ${varieteId};`;
    let res = await client.query(query);
    const countVarietes = parseInt(res.rows[0].count);
    if(countVarietes !== 1){
        query = `DELETE FROM PLANTESDB.ProductionVariete WHERE varieteid = ${varieteId} AND semencierid = ${semencierId} AND estbiologique = ${estBio};`;
        res = await client.query(query);
    }else{
    query = `DELETE FROM PLANTESDB.Variete WHERE varieteid = '${varieteId}';`;
    res = await client.query(query);}
    client.release();
    return res;
  }
  public async updateVariete(variete: Variete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    // update Variete
    const varieteUpdate = [];
    varieteUpdate.push(`varietenom = '${variete.nom}'`);
    varieteUpdate.push(`anneemiseenmarchée = '${variete.anneeMiseEnMarche}'`);
    varieteUpdate.push(`semis = '${variete.semis}'`);
    varieteUpdate.push(`plantation = '${variete.plantation}'`);
    varieteUpdate.push(`entretien = '${variete.entretien}'`);
    varieteUpdate.push(`recolte = '${variete.recolte}'`);
    varieteUpdate.push(`periodemiseenplace = '${variete.periodeMiseEnPlace}'`);
    varieteUpdate.push(`perioderecolte = '${variete.periodeRecolte}'`);
    varieteUpdate.push(`commentairegeneral = '${variete.commentaireGeneral}'`);

    let query = `UPDATE PLANTESDB.Variete SET ${varieteUpdate.join(
      ", "
    )} WHERE varieteid = ${variete.id} ;`;
    let res = await client.query(query);
    
    // update Semencier
    const semencierUpdate = [];
    semencierUpdate.push(`semenciernom = '${variete.semencier.nom}'`);
    semencierUpdate.push(`siteweb = '${variete.semencier.siteWeb}'`);

    query = `UPDATE PLANTESDB.Semencier SET ${semencierUpdate.join(
      ", "
    )} WHERE semencierid = ${variete.semencier.id} ;`;
    res = await client.query(query);

    // update ProductionVariete
    const bioUpdate = `estBiologique = ${variete.estBiologique}`;

    query = `UPDATE PLANTESDB.ProductionVariete SET ${bioUpdate} WHERE semencierid = ${variete.semencier.id} 
    AND varieteid = ${variete.id} ;`;
    res = await client.query(query);

    // update SolsType
    query = `DELETE FROM PLANTESDB.SolsVariete WHERE varieteid = '${variete.id}';`;
    res = await client.query(query);
    for(const sol of variete.solsAdaptes){
      query = `INSERT INTO PLANTESDB.SolsVariete VALUES (${variete.id},${sol.id});`;
      res = await client.query(query);
    }
    client.release();
    return res;
  }
  public async getSols(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM PLANTESDB.Sol;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getSemenciers(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM PLANTESDB.Semencier;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  // ======= GARDEN =======
  public async getGardensDetails(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM PLANTESDB.Jardin NATURAL JOIN PLANTESDB.JardinDetails;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getJardinName(jardinId: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT jardinName FROM PLANTESDB.Jardin WHERE PLANTESDB.Jardin.jardinId = ${jardinId};`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getParcellesRangs(jardinId: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `
    SELECT parcelleId,longitude,latitude,dimensions,rangId, longitudeRang,latitudeRang,estEnJachere,dateMiseEnJachere,varieteNom,
    anneeMiseEnMarchée,semis,plantation,entretien,recolte,periodeMiseEnPlace,periodeRecolte,commentaireGeneral
    FROM 
      (SELECT p.jardinId,p.parcelleId,p.longitude,p.latitude,p.dimensions,r.rangId,r.estEnJachere,r.dateMiseEnJachere,
      r.longitudeRang,r.latitudeRang 
      FROM PLANTESDB.Parcelle p INNER JOIN PLANTESDB.Rang r
        ON( p.jardinId = ${jardinId} AND r.parcelleId = p.parcelleId AND r.jardinId = p.jardinId )) AS parRang 
    NATURAL LEFT OUTER JOIN 
      (SELECT * FROM 
        (SELECT * FROM PLANTESDB.CultiverPlante NATURAL JOIN PLANTESDB.Plante) 
      AS cp INNER JOIN PLANTESDB.Variete v ON (cp.idvariete = v.varieteid)) AS c 
    ORDER BY parcelleId,rangId;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getPlantesNoms(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT planteNom FROM PLANTESDB.Plante;`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }
  public async getPlantesRecherche(recherche: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT p.nomlatin,p.plantenom,v.varietenom,p.catégorie,p.plantetype,p.soustype 
    FROM (SELECT * FROM PLANTESDB.Plante WHERE planteNom LIKE '%${recherche}%') AS p
    INNER JOIN PLANTESDB.Variete v ON (p.idvariete = v.varieteid);`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }

}
