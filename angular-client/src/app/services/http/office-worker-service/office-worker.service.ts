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
    return this.httpClient.get<OfficeWorkerModel[]>(`${this.baseUrl}/officeWorkers?officeId=${officeId}`);
  }

  GetById(officeWorkerId: string): Observable<OfficeWorkerModel> {
    return this.httpClient.get<OfficeWorkerModel>(`${this.baseUrl}/officeWorkers?_id=${officeWorkerId}`);
  }

  Upsert(model: OfficeWorkerModel): Observable<OfficeWorkerModel> {
    return this.httpClient.post<OfficeWorkerModel>(`${this.baseUrl}/officeWorkers`, model);
  }

  Update(model: OfficeWorkerModel): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/officeWorkers?_id=${model._id}`, model);
  }

  Delete(id: string): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/offieceWorkers?id=${id}`);
  }
}
