import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  path = environment.api.path;
  constructor(readonly http: HttpClient) { }

  getCurrencies () {
    return this.http.get(`${this.path}/symbols`).pipe(
      map((results: any) => results.symbols)
    );
  }

  convert(amount: number, from: string, to: string) {
    return this.http.get(`${this.path}/convert?to=${to}&from=${from}&amount=${amount}`);
  }
}
