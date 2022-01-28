import { Pipe, PipeTransform } from '@angular/core';
import { Lote } from 'src/app/models/lote.model';

@Pipe({
  name: 'cantOutAcum',
})
export class CantOutAcumPipe implements PipeTransform {
  transform(lotes: Lote[]): number {
    return lotes.reduce((a, i) => a + i.cant_out, 0);
  }
}
