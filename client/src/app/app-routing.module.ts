import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { JardinComponent } from "./jardin/jardin.component";
import { JardinDetailsComponent } from "./jardin-details/jardin-details.component";
import { PlantesRechercheComponent } from "./plantes-recherche/plantes-recherche.component";
import { VarieteComponent } from "./variete/variete.component";
import { AjouterVarieteComponent } from "./ajouter-variete/ajouter-variete.component";
import { ModifierVarieteComponent } from "./modifier-variete/modifier-variete.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "varietes", component: VarieteComponent },
  { path: "ajouter-variete", component: AjouterVarieteComponent },
  { path: "modifier-variete/:id/:bio", component: ModifierVarieteComponent },
  { path: "jardins", component: JardinComponent },
  { path: "jardins/:id", component: JardinDetailsComponent },
  { path: "plantes", component: PlantesRechercheComponent },
  { path: "varietes", component: VarieteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
