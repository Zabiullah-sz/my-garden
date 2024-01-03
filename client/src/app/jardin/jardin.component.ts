import { Component, OnInit } from '@angular/core';
import { CommunicationService } from "./../communication.service";
import { Jardin } from '../../../../common/tables/Jardin';

@Component({
  selector: 'app-jardin',
  templateUrl: './jardin.component.html',
  styleUrls: ['./jardin.component.css']
})
export class JardinComponent implements OnInit {

  public jardins: Jardin[] = [];

  public constructor(private communicationService: CommunicationService) {}
  
    public ngOnInit(): void {
      this.getJardin();
    }
    // private refresh() {
    //   this.getJardin();
    // }
      
    public getJardin(): void {
      this.communicationService.getJardins().subscribe((jardins: Jardin[]) => {
        this.jardins = jardins;
      });
    }

}
