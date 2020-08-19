
import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
  displayedColumns = ['id','name','mail','role','location'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public data = [];

  constructor() {
    
    const users: UserData[] = [
      {id: 1, name: 'Tanmay Shrivastava', mail:'tanmays1@gmail.com', role:'Clerk',location:'Pune'},
      {id: 2, name: 'Rakesh Chauhan', mail:'rchauhan31@gmail.com', role:'HR',location:'Chennai'},
      {id: 3, name: 'Vishal Anand', mail:'vand1989@gmail.com', role:'Tech',location:'Pune'},
      {id: 4, name: 'Akash Rajput', mail:'a.rajput101@gmail.com', role:'Designer',location:'Bangalore'},
      {id: 5, name: 'Anand Prakash', mail:'anandp03@gmail.com', role:'Sales Rep',location:'Mumbai'},
      {id: 6, name: 'Avinash Mishra', mail:'avi.mishra8@gmail.com', role:'Tech',location:'Gurgaon'},
      {id: 7, name: 'Sanjeev Kumar', mail:'sanjeev.kumar1@gmail.com', role:'Tech',location:'Kolkata'},
      {id: 8, name: 'Dinesh Shukla', mail:'shukladinesh99@gmail.com', role:'Sales Rep',location:'Pune'},
      {id: 9, name: 'Vikram Singh', mail:'vikrams12@gmail.com', role:'Clerk',location:'Mumbai'},
      {id: 10, name: 'Anil Dixit', mail:'dikshit.anil4@gmail.com', role:'Designer',location:'Kolkata'},
      {id: 11, name: 'Nazam Abbas', mail:'nazam.ab1@gmail.com', role:'Sales Rep',location:'Gurgaon'},
      {id: 12, name: 'Amreen Kaur', mail:'amrn.k78@gmail.com', role:'HR',location:'Bangalore'},
      {id: 13, name: 'Akashi Rajput', mail:'akashir2000@gmail.com', role:'Tech',location:'Bangalore'},
      {id: 14, name: 'Sanvi Sharma', mail:'ssharma1992@gmail.com', role:'Designer',location:'Chennai'},
      {id: 15, name: 'Pallavi Andotra', mail:'pallavi.andotra9@gmail.com', role:'Clerk',location:'Chennai'},
    ];
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {

    

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.location.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

