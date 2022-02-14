import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OfficeWorkerModel} from "../../../core/models/office-worker-model";

@Injectable({
  providedIn: 'root'
})
export class OfficeWorkerHttpService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  GetAll(officeId: string): Observable<OfficeWorkerModel[]> {
    return this.httpClient.get<OfficeWorkerModel[]>(`${this.baseUrl}/officeWorkers/${officeId}`);
  }

  GetById(officeWorkerId: string): Observable<OfficeWorkerModel> {
    return this.httpClient.get<OfficeWorkerModel>(`${this.baseUrl}/officeWorker/${officeWorkerId}`);
  }

  Upsert(model: OfficeWorkerModel): Observable<OfficeWorkerModel> {
    return this.httpClient.post<OfficeWorkerModel>(`${this.baseUrl}/officeWorkers`, model);
  }

  Update(model: OfficeWorkerModel): Observable<string> {
    return this.httpClient.put<string>(`${this.baseUrl}/officeWorker/${model.officeWorkerId}`, model);
  }

  Delete(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/officeWorker/${id}`);
  }
}
