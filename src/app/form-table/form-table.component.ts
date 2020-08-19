import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements AfterViewInit {
  arr1 = ["id", "name", "role", "email", "location"];
  arr2 = [];

  dataSource: any = [];
  public data2 = [];
  
  
  constructor(private dataService_service: DataServiceService){}
   
  
ngOninit(){

}

ngAfterViewInit(){
  this.dataService_service.data1$.subscribe({
    next: data =>{
      this.data2 = data;
      this.dataSource = this.data2;
      console.log("dataSource", this.dataSource);
    },
    error: err => {console.log(err)},
    complete : ()=>{}
  });
}

}



