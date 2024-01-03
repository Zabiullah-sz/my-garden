import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Jardin } from "../../../common/tables/Jardin";
import { Parcelle } from "../../../common/tables/Parcelle";
import { Rang } from "../../../common/tables/Rang";
import { Plante } from "../../../common/tables/Plante";

import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Variete } from "../../../common/tables/Variete";
import { Sol } from "../../../common/tables/Sol";
import { Semencier } from "../../../common/tables/Semencier";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  getVariete(result: pg.QueryResult): Variete[] {
    const varietes: Variete[] = [];
    let i = 0;
    while (i < result.rowCount) {
      let varieteDb = result.rows[i];
      const variete = {
        id: varieteDb.varieteid,
        nom: varieteDb.varietenom,
        anneeMiseEnMarche: varieteDb.anneemiseenmarchée,
        semis: varieteDb.semis,
        plantation: varieteDb.plantation,
        entretien: varieteDb.entretien,
        recolte: varieteDb.recolte,
        periodeMiseEnPlace: varieteDb.periodemiseenplace,
        periodeRecolte: varieteDb.perioderecolte,
        commentaireGeneral: varieteDb.commentairegeneral,
        estBiologique: varieteDb.estbiologique,
        semencier: {
          id: varieteDb.semencierid,
          nom: varieteDb.semenciernom,
          siteWeb: varieteDb.siteweb,
        },
        solsAdaptes: [] as Sol[],
      };
      const productionId = varieteDb.idproduction;
      let prodId = varieteDb.idproduction;
      while (i < result.rowCount && productionId === prodId) {
        variete.solsAdaptes.push({
          id: varieteDb.solid,
          type: varieteDb.soltype,
        });
        i++;
        if (i === result.rowCount) break;
        varieteDb = result.rows[i];
        prodId = varieteDb.idproduction;
      }
      varietes.push(variete);
    }
    return varietes;
  }
  public get router(): Router {
    const router: Router = Router();

    // ======= VARIETE ROUTES =======
    router.get("/variete", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getVarieteById(req.query.id, req.query.bio)
        .then((result: pg.QueryResult) => {
          const variete = this.getVariete(result);
          res.json(variete[0]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.get("/varietes", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getVarietes()
        .then((result: pg.QueryResult) => {
          const varietes = this.getVariete(result);
          res.json(varietes);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.post("/varietes", (req: Request, res: Response, _: NextFunction) => {
      const variete: Variete = req.body as Variete;

      this.databaseService
        .addVariete(variete)
        .then((result: pg.QueryResult) => {
          res.status(201).send("CREATED");
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.put("/varietes", (req: Request, res: Response, _: NextFunction) => {
      const variete: Variete = req.body as Variete;

      this.databaseService
        .updateVariete(variete)
        .then((result: pg.QueryResult) => {
          res.status(201).send("CREATED");
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.delete(
      "/varietes",
      (req: Request, res: Response, _: NextFunction) => {
        const varieteId = req.query.id as number;
        const estBio = req.query.bio as string;
        const semencier = req.query.semencier as number;
        this.databaseService
          .deleteVariete(varieteId, semencier, estBio)
          .then((result: pg.QueryResult) => {
            res.status(201).send("CREATED");
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.get(
      "/varietes/names",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getVarietesNom()
          .then((result: pg.QueryResult) => {
            const varietesNoms: string[] = result.rows.map(
              (variete) => variete.varietenom
            );
            res.json({ noms: varietesNoms });
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.get("/sols", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getSols()
        .then((result: pg.QueryResult) => {
          const sols: Sol[] = result.rows.map((sol) => ({
            id: sol.solid,
            type: sol.soltype,
          }));
          res.json(sols);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.get(
      "/semenciers",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getSemenciers()
          .then((result: pg.QueryResult) => {
            const semenciers: Semencier[] = result.rows.map((semencier) => ({
              id: semencier.semencierid,
              nom: semencier.semenciernom,
              siteWeb: semencier.siteweb,
            }));
            res.json(semenciers);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    // ======= JARDINS ROUTES =======
    router.get("/jardins", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getGardensDetails()
        .then((result: pg.QueryResult) => {
          const jardins: Jardin[] = result.rows.map((jardin: any) => ({
            id: jardin.jardinid,
            name: jardin.jardinname,
            surface: jardin.surface,
            typeDeSol: jardin.typedesol,
            hauteurMaximale: jardin.hauteurmaximale,
            potagerFlag: jardin.potagerflag,
            vergerFlag: jardin.vergerflag,
            ornementFlag: jardin.ornementflag,
          }));
          res.json(jardins);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    router.get(
      "/jardins/:id",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getParcellesRangs(req.params.id)
          .then((result: pg.QueryResult) => {
            const parcelles: Parcelle[] = [];
            let parcelleId = 1;
            let i = 0;
            while (i !== result.rowCount) {
              let parcelleInfos: any = result.rows[i] as any;
              const parcelle: Parcelle = {
                longitude: parcelleInfos.longitude,
                latitude: parcelleInfos.latitude,
                dimensions: parcelleInfos.dimensions,
              } as Parcelle;
              const rangs: Rang[] = [];
              while (
                i < result.rowCount &&
                parcelleInfos.parcelleid === parcelleId
              ) {
                const rang: Rang = {
                  id: parcelleInfos.rangid,
                  estEnJachere: parcelleInfos.estenjachere,
                  dateMiseEnJachere: parcelleInfos.datemiseenjachere,
                  longitude: parcelleInfos.longituderang,
                  latitude: parcelleInfos.latituderang,
                } as Rang;
                if (!parcelleInfos.estenjachere) {
                  rang.varietePlante = {
                    nom: parcelleInfos.varietenom,
                    anneeMiseEnMarche: parcelleInfos.anneemiseenmarchée,
                    semis: parcelleInfos.semis,
                    plantation: parcelleInfos.plantation,
                    entretien: parcelleInfos.entretien,
                    recolte: parcelleInfos.recolte,
                    periodeMiseEnPlace: parcelleInfos.periodemiseenplace,
                    periodeRecolte: parcelleInfos.perioderecolte,
                    commentaireGeneral: parcelleInfos.commentairegeneral,
                  } as Variete;
                }
                rangs.push(rang);
                i++;
                parcelleInfos = result.rows[i];
              }
              parcelle.rangs = rangs;
              parcelles.push(parcelle);
              parcelleId++;
            }
            res.json(parcelles);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.get(
      "/jardins/name/:id",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getJardinName(req.params.id)
          .then((result: pg.QueryResult) => {
            res.json(result.rows[0]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.get(
      "/plantes/names",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getPlantesNoms()
          .then((result: pg.QueryResult) => {
            const plantesNoms: string[] = result.rows.map(
              (plante) => plante.plantenom
            );
            res.json({ plantesNoms: plantesNoms });
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );
    router.get("/plantes", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getPlantesRecherche(req.query.value)
        .then((result: pg.QueryResult) => {
          const plantes: Plante[] = result.rows.map((plante: any) => ({
            nomLatin: plante.nomlatin,
            nom: plante.plantenom,
            nomVariete: plante.varietenom,
            categorie: plante.catégorie,
            type: plante.plantetype,
            sousType: plante.soustype,
          }));
          res.json(plantes);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    return router;
  }
}
