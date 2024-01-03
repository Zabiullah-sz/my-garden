import { Component, OnInit } from "@angular/core";
import { Variete } from "../../../../common/tables/Variete";
import { CommunicationService } from "./../communication.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-variete",
  templateUrl: "./variete.component.html",
  styleUrls: ["./variete.component.css"],
})
export class VarieteComponent implements OnInit {
  public varietes: Variete[] = [];
  deleteLaunch:boolean = false;
  public constructor(private router: Router,private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getVarietes();
  }
  onSelect(varieteId: number,estBiologique:boolean){
    this.router.navigate([`/modifier-variete/${varieteId}/${estBiologique}`]);
  }
  public getVarietes(): void {
    this.communicationService.getVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes;
    });
  }
  supprimerVariete(varieteId: number,semencierId:number,estBiologique:boolean):void{
    this.communicationService.deleteVariete(varieteId,semencierId,estBiologique).subscribe((res: any) => {
      this.deleteLaunch = true;
      setTimeout(()=>this.deleteLaunch = false,2000);
      this.getVarietes();
    });
  }
}
