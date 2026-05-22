import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HorarioService } from '../../../services/horario.service';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { Horario } from '../../../models/horario.model';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './horario-form.html',
})
export class HorarioFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  cursos: Curso[] = [];
  constructor(private fb: FormBuilder, private service: HorarioService, private cursoService: CursoService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({ dia: ['', Validators.required], horaInicio: ['', Validators.required], horaFin: ['', Validators.required], idCurso: [null, Validators.required] });
  }
  ngOnInit(): void {
    this.cursoService.getAll().subscribe(data => this.cursos = data);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) { this.id = +idParam; this.service.getById(this.id).subscribe((data: Horario) => this.form.patchValue(data)); }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Horario = { ...this.form.value, idHorario: this.id ?? undefined };
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
    this.router.navigate(['/horarios']);
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
