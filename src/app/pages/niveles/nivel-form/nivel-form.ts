import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NivelService } from '../../../services/nivel.service';
import { Nivel } from '../../../models/nivel.model';

@Component({
  selector: 'app-nivel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './nivel-form.html',
  styleUrl: './nivel-form.css'
})
export class NivelFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private nivelService: NivelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.nivelService.getById(this.id).subscribe((data: Nivel) => this.form.patchValue(data));
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    const data: Nivel = {
      ...this.form.value,
      idNivel: this.id ?? undefined
    };

    if (this.id) {
      this.nivelService.update(this.id, data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    } else {
      this.nivelService.create(data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    }
  }

  cerrar(): void {
    this.router.navigate(['/niveles']);
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
