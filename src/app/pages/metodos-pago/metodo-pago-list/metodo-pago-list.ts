import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MetodoPago } from '../../../models/metodo-pago.model';
import { MetodoPagoService } from '../../../services/metodo-pago.service';

@Component({
  selector: 'app-metodo-pago-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './metodo-pago-list.html',
})
export class MetodoPagoListComponent implements OnInit {
  metodos: MetodoPago[] = [];
  constructor(private service: MetodoPagoService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: MetodoPago[]) => this.metodos = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
