import { Component, OnInit } from "@angular/core";
import { Semencier } from "../../../../common/tables/Semencier";
import { Sol } from "../../../../common/tables/sol";
import { Variete } from "../../../../common/tables/Variete";
import { CommunicationService } from "../communication.service";

const FIVE_SECOND: number = 5000;

@Component({
  selector: "app-ajouter-variete",
  templateUrl: "./ajouter-variete.component.html",
  styleUrls: ["./ajouter-variete.component.css"],
})
export class AjouterVarieteComponent implements OnInit {
  variete: Variete = {} as Variete;
  semencier: string = "Dupont";
  semenciers: Semencier[] = [];
  solsType: Sol[] = [];
  solsAdaptes: string[];
  isSubmitted = false;

  constructor(public communicationService: CommunicationService) {}

  ngOnInit() {
    this.variete.estBiologique = false;
    this.getInfos();
  }

  onSubmit() {
    this.variete.semencier = this.semenciers.find(
      (semencier) => semencier.nom === this.semencier
    ) as Semencier;
    this.variete.solsAdaptes = this.solsType.filter((sol) =>
      this.solsAdaptes.includes(sol.type)
    );
    this.communicationService.addVariete(this.variete).subscribe(() => {
      this.isSubmitted = true;
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
    setTimeout(() => {
      this.isSubmitted = false;
    }, FIVE_SECOND);

    if(this.isSubmitted){
      setTimeout(() => {
        this.variete = {} as Variete;
      }, 10);
    }
  }
  getInfos(): void {
    this.communicationService.getSols().subscribe((sols: Sol[]) => {
      this.solsType = sols;
    });
    this.communicationService
      .getSemenciers()
      .subscribe((semenciers: Semencier[]) => {
        this.semenciers = semenciers;
      });
  }
}
