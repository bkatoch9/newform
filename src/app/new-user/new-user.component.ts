import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  public data = [];
  

  constructor(private interaction_service: InteractionService) { 
    }
  

  ngOnInit() 
  {
    
    this.interaction_service.data$.subscribe({
      next:data =>{ 
        // console.log(data);
        this.data = data;
      },
      error:err=> {console.log(err)},
      complete:() =>{}
    });
    
}
}

