import { Pipe, PipeTransform } from '@angular/core';
import { Lote } from 'src/app/models/lote.model';

@Pipe({
  name: 'cantOutAvailable',
})
export class CantOutAvailablePipe implements PipeTransform {
  transform(lotes: Lote[]): number {
    return lotes.reduce((a, i) => a + (i.cant - i.cant_out), 0);
  }
}
