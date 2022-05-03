import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { finalize, map, Observable, startWith } from 'rxjs';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styles: [
  ]
})
export class ConverterComponent implements OnInit {
  loading = false;
  currencies: any;
  amountControl = new FormControl('', [Validators.required]);
  baseSymbolControl = new FormControl('', [Validators.required]);
  conversionSymbolControl = new FormControl('', [Validators.required]);
  baseSymbols: any[] = [];
  conversionSymbols: any[] = [];
  filteredBaseSymbols!: Observable<any[]>;
  filteredConversionSymbols!: Observable<any[]>;
  conversionResults: any;

  constructor(readonly converter: ConverterService) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.filteredBaseSymbols = this.baseSymbolControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'base')),
    );
    this.filteredConversionSymbols = this.conversionSymbolControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'conversion')),
    );
  }

  getCurrencies() {
    this.loading = true;
    this.converter.getCurrencies().pipe(
      finalize(() => this.loading = false)
    ).subscribe(currencies => {
      this.currencies = Object.keys(currencies).map(key => ({ symbol: key, description: currencies[key]}));;
      this.baseSymbols = this.currencies;
      this.conversionSymbols = this.currencies;
    });
  }

  convert() {
    this.loading = true;
    this.converter.convert(
      this.amountControl.value,
      this.baseSymbolControl.value,
      this.conversionSymbolControl.value
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe(res => {
      this.conversionResults = res;
    });
  }

  swapConversionCurrency() {
    if (this.baseSymbolControl.valid && this.conversionSymbolControl.valid) {
      const baseCurrency = this.conversionSymbolControl.value;
      const conversionCurrency = this.baseSymbolControl.value;
      this.baseSymbolControl.patchValue(baseCurrency);
      this.conversionSymbolControl.patchValue(conversionCurrency);
    }
  }

  confirmCurrencyExists(control: FormControl) {
    setTimeout(() => {
      const matchedCurrency = this.currencies.find((x: any) => x.symbol.toLowerCase() === control.value.toLowerCase());
      if (!matchedCurrency) {
        control.patchValue('');
      }
    }, 250);

  }

  private _filter(value: string, symbolType: 'base' | 'conversion'): any[] {
    const filterValue = value.toLowerCase();
    const currenciesToFilter = symbolType === 'base' ? this.baseSymbols : this.conversionSymbols;
    return currenciesToFilter.filter(option => option.symbol.toLowerCase().includes(filterValue));
  }

}
