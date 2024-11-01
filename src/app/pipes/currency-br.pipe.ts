import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBR'
})
export class CurrencyBRPipe implements PipeTransform {
  transform(value: number | string, currencySymbol: string = 'R$'): string {
    if (value == null || isNaN(Number(value))) {
      return '';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    return `${currencySymbol} ${numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
