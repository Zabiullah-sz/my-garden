import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { JardinComponent } from './jardin/jardin.component';
import { JardinDetailsComponent } from './jardin-details/jardin-details.component';
import { PlantesRechercheComponent } from './plantes-recherche/plantes-recherche.component';
import { VarieteComponent } from './variete/variete.component';
import { AjouterVarieteComponent } from './ajouter-variete/ajouter-variete.component';
import { ModifierVarieteComponent } from './modifier-variete/modifier-variete.component';


@NgModule({
  declarations: [
    AppComponent,
    JardinComponent,
    JardinDetailsComponent,
    PlantesRechercheComponent,
    VarieteComponent,
    AjouterVarieteComponent,
    ModifierVarieteComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
