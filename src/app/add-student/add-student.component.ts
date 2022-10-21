import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: studentForm = new studentForm();

  @ViewChild("studentForm")
  studentForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddStudent(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {

      const updatedData = {
        first_name: this.addStudentForm.FirstName,
        last_name: this.addStudentForm.LastName,
        gender: this.addStudentForm.gender,
        Age: this.addStudentForm.Age,
        mobile_Number: this.addStudentForm.Phone,
        address: this.addStudentForm.Address,
      };
      this.httpProvider.saveStudent(updatedData).subscribe(async data => {
        if (data != null && data.body != null) {
         
          
          
              this.toastr.success("added");
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
          
        
        }
      },
        async error => {
          this.toastr.error("contact admin");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class studentForm {
  FirstName: string = '';
  LastName: string = '';
  gender: string = '';
  Age: string = '';
  Phone: string = '';
  Address: string = '';
}