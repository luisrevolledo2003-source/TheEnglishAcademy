import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AulaService } from '../../../services/aula.service';
import { Aula } from '../../../models/aula.model';

@Component({
  selector: 'app-aula-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './aula-form.html',
})
export class AulaFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  constructor(private fb: FormBuilder, private service: AulaService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({ nombre: ['', Validators.required], capacidad: [0, [Validators.required, Validators.min(1)]] });
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) { this.id = +idParam; this.service.getById(this.id).subscribe((data: Aula) => this.form.patchValue(data)); }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Aula = { ...this.form.value, idAula: this.id ?? undefined };
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
    this.router.navigate(['/aulas']);
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
