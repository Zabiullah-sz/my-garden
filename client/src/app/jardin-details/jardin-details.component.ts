import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommunicationService } from "./../communication.service";
import { Parcelle } from '../../../../common/tables/Parcelle';
@Component({
  selector: "app-jardin-details",
  templateUrl: "./jardin-details.component.html",
  styleUrls: ["./jardin-details.component.css"],
})
export class JardinDetailsComponent implements OnInit {
  public parcelles: Parcelle[] = [];
  public jardinId: number;
  public jardinNom: string;
  constructor(private route: ActivatedRoute,private communicationService: CommunicationService) {}

  ngOnInit() {
    this.jardinId = parseInt(this.route.snapshot.paramMap.get("id") as string);
    this.getJardin();
  }
    public getJardin(): void {
      this.communicationService.getJardinNom(this.jardinId).subscribe((jardinNom: any) => {
        this.jardinNom = jardinNom.jardinname as string;
      });
      this.communicationService.getParcellesRangs(this.jardinId).subscribe((parcelles: Parcelle[]) => {
        this.parcelles = parcelles;
      });
    }
}
