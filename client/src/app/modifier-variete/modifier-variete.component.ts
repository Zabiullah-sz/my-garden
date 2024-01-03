import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommunicationService } from "../communication.service";
import { Variete } from "../../../../common/tables/Variete";
import { Sol } from "../../../../common/tables/Sol";

@Component({
  selector: "app-modifier-variete",
  templateUrl: "./modifier-variete.component.html",
  styleUrls: ["./modifier-variete.component.css"],
})
export class ModifierVarieteComponent implements OnInit {
  varieteId: number;
  estBio: string;
  variete: Variete = {
    id: 0,
    nom: "",
    anneeMiseEnMarche: "",
    semis: "",
    plantation: "",
    entretien: "",
    recolte: "",
    periodeMiseEnPlace: "",
    periodeRecolte: "",
    commentaireGeneral: "",
    semencier: { id: 0, nom: "", siteWeb: "" },
    estBiologique: false,
    solsAdaptes: [],
  };
  solsType: Sol[] = [];
  solsAdaptes: string[];
  modifierSuccess: boolean = false;
  missingAtt: string[] = [];
  constructor(
    private route: ActivatedRoute,
    public communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.varieteId = parseInt(this.route.snapshot.paramMap.get("id") as string);
    this.estBio = this.route.snapshot.paramMap.get("bio") as string;
    this.getVariete();
  }

  public getVariete(): void {
    this.communicationService
      .getVarieteById(this.varieteId, this.estBio)
      .subscribe((variete: Variete) => {
        this.variete = variete;
        this.variete.anneeMiseEnMarche =
          this.variete.anneeMiseEnMarche.substring(0, 10);
        this.variete.periodeMiseEnPlace =
          this.variete.periodeMiseEnPlace.substring(0, 10);
        this.variete.periodeRecolte = this.variete.periodeRecolte.substring(
          0,
          10
        );
        this.solsAdaptes = this.variete.solsAdaptes.map((sol) => sol.type);
      });
    this.communicationService.getSols().subscribe((sols: Sol[]) => {
      this.solsType = sols;
    });
  }

  missingAttributs() {
    const temp: any = this.variete;
    for (const key in temp) {
      if (temp[key] === "") {
        this.missingAtt.push(key);
      }
    }
    if (this.variete.semencier.siteWeb === "") {
      this.missingAtt.push("siteWeb");
    }

    if (this.variete.semencier.nom === "") {
      this.missingAtt.push("nomSemencier");
    }
  }

  onSubmit() {
    this.missingAtt = [];
    this.variete.solsAdaptes = this.solsType.filter((sol) =>
      this.solsAdaptes.includes(sol.type)
    );
    this.missingAttributs();
    if (this.missingAtt.length !== 0) return;
    this.communicationService
      .updateVariete(this.variete)
      .subscribe((res: any) => {
        this.modifierSuccess = true;
      });
  }
}
