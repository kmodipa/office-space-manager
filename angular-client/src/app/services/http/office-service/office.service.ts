import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {OfficeModel} from "../../../core/models/office-model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OfficeHttpService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  GetAll(): Observable<OfficeModel[]> {
    return this.httpClient.get<OfficeModel[]>(`${this.baseUrl}/offices`);
  }

  GetById(id: string): Observable<OfficeModel> {
    // return this.httpClient.get<OfficeModel>(`${this.baseUrl}/offices?_id=${id}`);
    return this.httpClient.get<OfficeModel>(`${this.baseUrl}/office/${id}`);
  }

  Upsert(model: OfficeModel): Observable<OfficeModel> {
    console.log(model);
    return this.httpClient.post<OfficeModel>(`${this.baseUrl}/office`, model);
  }

  Update(model: OfficeModel): Observable<string> {
    return this.httpClient.put<string>(`${this.baseUrl}/office/` + model.officeId, model);
  }

  Delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/office/${id}`);
  }
}
