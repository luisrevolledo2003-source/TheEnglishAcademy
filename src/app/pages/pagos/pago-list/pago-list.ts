import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pago } from '../../../models/pago.model';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-pago-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pago-list.html',
})
export class PagoListComponent implements OnInit {
  pagos: Pago[] = [];
  constructor(private service: PagoService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Pago[]) => this.pagos = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
