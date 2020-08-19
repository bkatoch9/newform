import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InteractionService } from "../interaction.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']

})
export class UsersComponent  {

  arr1 = ["ID", "NAME", "MAIL", "ROLE", "LOCATION"];
  arr2 = [];
  displayedColumns = [];
  
  dataSource: any = [];
  
  @ViewChild('MatPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public data = [];
  

  constructor(private interaction_service: InteractionService) {

  }
  
  ngOnInit() {
    
    this.interaction_service.data$.subscribe({
      next: data => {
        
        this.data = data;
        this.arr2 = this.data;
        this.displayedColumns = this.data[0];
        // console.log(this.data);
        let obj = {};
        let curValue: any = [];
        for (let i = 1; i < this.arr2.length; i++) {
          for (let j = 0; j < this.arr1.length; j++) {
            obj[this.arr1[j]] = this.arr2[i][j];
          }
          this.dataSource.push(obj);
          
          obj = {}; 
          
        }
        
        
        console.log("dataSource", this.dataSource);
        
        
      },
      error: err => { console.log(err) },
      complete: () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
    

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.LOCATION.toLowerCase().includes(filter);
    };
    
  }

  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface UserData {
  id: number;
  name: string;
  mail: string;
  role: string;
  location: string;
}