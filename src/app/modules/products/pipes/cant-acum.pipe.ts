import { Pipe, PipeTransform } from '@angular/core';
import { Lote } from 'src/app/models/lote.model';

@Pipe({
  name: 'cantAcum',
})
export class CantAcumPipe implements PipeTransform {
  transform(lotes: Lote[]): number {
    return lotes.reduce((a, i) => a + i.cant, 0);
  }
}
