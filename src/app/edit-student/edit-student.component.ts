import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  editStudentForm: studentForm = new studentForm();

  @ViewChild('studentForm')
  studentForm!: NgForm;

  isSubmitted: boolean = false;
  studentId: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.getStudentDetailById();
  }

  getStudentDetailById() {
    this.httpProvider.getStudentDetailById(this.studentId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.editStudentForm.id = resultData.id;
            this.editStudentForm.FirstName = resultData.first_name;
            this.editStudentForm.LastName = resultData.last_name;
            this.editStudentForm.gender = resultData.gender;
            this.editStudentForm.Age = resultData.Age;
            this.editStudentForm.Phone = resultData.mobile_Number;
            this.editStudentForm.Address = resultData.address;
          }
        }
      },
      (error: any) => {}
    );
  }

  EditStudent(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      const updatedData = {
        id: this.editStudentForm.id,
        first_name: this.editStudentForm.FirstName,
        last_name: this.editStudentForm.LastName,
        gender: this.editStudentForm.gender,
        Age: this.editStudentForm.Age,
        mobile_Number: this.editStudentForm.Phone,
        address: this.editStudentForm.Address,
      };
      this.httpProvider.updateStudent(updatedData).subscribe(
        async (data) => {
          if (data != null && data.body != null) {
            this.toastr.success('updated');
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          }
        },
        async (error) => {
          this.toastr.error("contact Admin");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

export class studentForm {
  id: number = 0;
  FirstName: string = '';
  LastName: string = '';
  gender: string = '';
  Age: string = '';
  Phone: string = '';
  Address: string = '';
}
