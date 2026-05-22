import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PagoService } from '../../../services/pago.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { Estudiante } from '../../../models/estudiante.model';
import { MetodoPago } from '../../../models/metodo-pago.model';
import { Pago } from '../../../models/pago.model';

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pago-form.html',
})
export class PagoFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  estudiantes: Estudiante[] = [];
  metodos: MetodoPago[] = [];
  constructor(
    private fb: FormBuilder,
    private service: PagoService,
    private estudianteService: EstudianteService,
    private metodoPagoService: MetodoPagoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      monto: [0, [Validators.required, Validators.min(1)]],
      fechaPago: ['', Validators.required],
      estadoTransaccion: ['', Validators.required],
      idEstudiante: [null, Validators.required],
      idMetodoPago: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.estudianteService.getAll().subscribe(data => this.estudiantes = data);
    this.metodoPagoService.getAll().subscribe(data => this.metodos = data);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe((data: Pago) => {
        const date = new Date(data.fechaPago).toISOString().split('T')[0];
        this.form.patchValue({ ...data, fechaPago: date });
      });
    }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Pago = { ...this.form.value, idPago: this.id ?? undefined };
    if (this.id) {
      this.service.update(this.id, data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    } else {
      this.service.create(data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    }
  }

  cerrar(): void {
    this.router.navigate(['/pagos']);
  }

  private onSaved(): void {
    alert(this.id ? 'Registro actualizado correctamente.' : 'Registro guardado correctamente.');
    this.cerrar();
  }

  private onSaveError(err: any): void {
    console.error(err);
    alert('No se pudo guardar el registro. Revise los datos e intente nuevamente.');
  }
}
