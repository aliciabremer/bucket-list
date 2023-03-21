import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IItem } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(username: string):Observable<IItem[]> {
    return this.http.get<IItem[]>(`${environment.baseURL}item/items/${username}`);
  }

  createItem(payload: any) {
    return this.http.post(`${environment.baseURL}item/create`, payload);
  }

  markComplete(id: string, complete: boolean) {
    return this.http.post(`${environment.baseURL}item/complete/${id}`, {complete: complete});
  }

  editItem(payload:IItem) {
    const { ['_id']: id, ...newPayload } = payload;
    return this.http.post(`${environment.baseURL}item/edit/${id}`, newPayload);
  }

  deleteItem(id: string) {
    return this.http.post(`${environment.baseURL}item/delete/${id}`, {});
  }

}
