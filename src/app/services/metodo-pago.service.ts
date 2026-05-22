import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MetodoPago } from '../models/metodo-pago.model';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private apiUrl = '/api/MetodosPago';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: MetodoPago): Observable<MetodoPago> {
    return this.http.post<MetodoPago>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: MetodoPago): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
