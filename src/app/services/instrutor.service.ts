import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Instrutor } from '../models/instrutor';

@Injectable({
  providedIn: 'root'
})
export class InstrutorService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Instrutor[]> {
    return this.http.get<Instrutor[]>(`${API_CONFIG.baseUrl}instrutores`)
  }

}
