import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  data :[];
  usersForm: FormGroup;
  name1: FormControl;
  role1: FormControl;
  email1: FormControl;
  location1: FormControl;
  
  
  ngOnInit(){
    this.name1 = new FormControl('',Validators.required);
    this.role1 = new FormControl('',Validators.required);
    this.email1 = new FormControl('',(Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")));
    this.location1 = new FormControl('',Validators.required);
    

    this.usersForm = new FormGroup({
      name: this.name1,
      role: this.role1,
      email: this.email1,
      location: this.location1,

    });
  }

  get email(){
    return this.usersForm.get('email')
  }
  get name(){
    return this.usersForm.get('name')
  }
  get role(){
    return this.usersForm.get('role');
  }
  get location(){
    return this.usersForm.get('location');
  }

  // constructor(private fb: FormBuilder) { }

  constructor(private dataService_service: DataServiceService) {}


  onSubmit() {
    
    //console.log("form",this.usersForm.value);
    this.data = (this.usersForm.value);
    
    let obj = {};
    obj["id"] = Math.floor((Math.random() * 100) + 1);
    obj["name"] = this.data["name"];
    obj["role"] = this.data["role"];
    obj["email"] = this.data["email"];
    obj["location"] = this.data["location"];
    
    console.log("values",this.data);
    this.dataService_service.data1.next(this.data);

  }
}
