import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/adminuser/admin.service';


@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.scss']
})
export class CreatecategoryComponent implements OnInit {
  name:string="";
  //  to indicated success or failure while creating a category
  success:string = '';
  failure:string = "";
  constructor(public admin:AdminService) { }
  
  ngOnInit(): void {
  }

  onSubmit() {
    // all validations
    if(!this.name) {
      this.failure = "Provide all fields";
      return;
    }
    this.admin.createCategory(this.name).subscribe({
      next: (data:any) => {
       if(data) {
         this.success = `Successfully created '${data.category.name}' category`;
         this.failure = "";
         this.name = "";
       }
      },
      error: (err) => {
        this.success = "";
        this.failure = err.error.error;
      }
    })
  }

}
