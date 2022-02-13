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
    return this.httpClient.get<OfficeModel>(`${this.baseUrl}/office?_id=${id}`);
  }

  Upsert(model: OfficeModel): Observable<OfficeModel> {
    console.log(model);
    return this.httpClient.post<OfficeModel>(`${this.baseUrl}/offices`, model);
  }

  Update(model: OfficeModel): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/offices?officeId=` + model._id, model);
  }

  Delete(id: string): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/offiece?id=${id}`);
  }
}
