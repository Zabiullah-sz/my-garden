import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Jardin } from '../../../common/tables/Jardin';
import { Parcelle } from "../../../common/tables/Parcelle";
import { Variete } from "../../../common/tables/Variete";
import { Sol } from "../../../common/tables/Sol";
import { Semencier } from "../../../common/tables/Semencier";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getVarieteById(varieteId: number,bio:string): Observable<Variete> {
    return this.http
      .get<Variete>(this.BASE_URL + `/variete?id=${varieteId}&bio=${bio}`)
      .pipe(catchError(this.handleError<Variete>("getVarieteById")));
  }
  public getVarietes(): Observable<Variete[]> {
    return this.http
      .get<Variete[]>(this.BASE_URL + "/varietes")
      .pipe(catchError(this.handleError<Variete[]>("getVarietes")));
  }
  public getVarietesNom(): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + "/varietes/names")
      .pipe(catchError(this.handleError<any>("getVarietesNom")));
  }
  public deleteVariete(varieteId:number,semencierId:number,estBiologique:boolean): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + `/varietes?id=${varieteId}&semencier=${semencierId}&bio=${estBiologique ? 'true':'false'}`, {})
      .pipe(catchError(this.handleError<number>("deleteVariete")));
  }
  public getSols(): Observable<Sol[]> {
    return this.http
      .get<Sol[]>(this.BASE_URL + "/sols")
      .pipe(catchError(this.handleError<Sol[]>("getSols")));
  }
  public getSemenciers(): Observable<Semencier[]> {
    return this.http
      .get<Semencier[]>(this.BASE_URL + "/semenciers")
      .pipe(catchError(this.handleError<Semencier[]>("getSemenciers")));
  }
  public updateVariete(variete: Variete): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/varietes", variete)
      .pipe(catchError(this.handleError<number>("updateVariete")));
  }
  public addVariete(variete: Variete): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/varietes", variete)
      .pipe(catchError(this.handleError<number>("addVariete")));
  }
  public getJardins(): Observable<Jardin[]> {
    return this.http
      .get<Jardin[]>(this.BASE_URL + "/jardins")
      .pipe(catchError(this.handleError<Jardin[]>("getJardins")));
  }

  public getJardinNom(jardinId:number): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + `/jardins/name/${jardinId}`)
      .pipe(catchError(this.handleError<any>("getJardinNom")));
  }
  public getParcellesRangs(jardinId:number): Observable<Parcelle[]> {
    return this.http
      .get<Parcelle[]>(this.BASE_URL + `/jardins/${jardinId}`)
      .pipe(catchError(this.handleError<Parcelle[]>("getParcellesRangs")));
  }
  public getPlantes(motRecherche:string): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + `/plantes?value=${motRecherche}`)
      .pipe(catchError(this.handleError<any>("getPlantes")));
  }
  public getNomPlantes(): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + `/plantes/names`)
      .pipe(catchError(this.handleError<any>("getNomPlantes")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
