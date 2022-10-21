import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:5002/";

var httpLink = {
  getAllStudent: apiUrl + "studentmanagement",
  deleteStudentById: apiUrl + "studentmanagement/",
  getStudentDetailById: apiUrl + "studentmanagement/",
  updateStudentDetailById: apiUrl + "studentmanagement/",
  saveStudent: apiUrl + "studentmanagement"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllStudent(): Observable<any> {
    return this.webApiService.get(httpLink.getAllStudent);
  }

  public deleteStudentById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteStudentById + model);
  }

  public getStudentDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getStudentDetailById + model);
  }

  public saveStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveStudent, model);
  }

  public updateStudent(model: any): Observable<any> {
    return this.webApiService.put(httpLink.updateStudentDetailById + model.id, model);
  }
  
}
