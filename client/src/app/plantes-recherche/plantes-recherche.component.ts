import { Component, OnInit } from '@angular/core';
import { Plante } from '../../../../common/tables/Plante';
import { CommunicationService } from "./../communication.service";
@Component({
  selector: 'app-plantes-recherche',
  templateUrl: './plantes-recherche.component.html',
  styleUrls: ['./plantes-recherche.component.css']
})
export class PlantesRechercheComponent implements OnInit {
  title = 'Rechercher une plante';
  searchText = '';
  rechercheEnvoi = false;
  plantes:Plante[] = [];
  plantesNoms:string[];
  constructor( private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getNomPlantes();
  }
  public getPlantes(): void {
    this.communicationService.getPlantes(this.searchText).subscribe((plantes: Plante[]) => {
      this.plantes = plantes;
      this.rechercheEnvoi = true;
    });
  }
  public getNomPlantes(): void {
    this.communicationService.getNomPlantes().subscribe((plantes: any) => {
      this.plantesNoms = plantes.plantesNoms as string[];
    });
  }

}