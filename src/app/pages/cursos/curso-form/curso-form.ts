import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { NivelService } from '../../../services/nivel.service';
import { TipoCursoService } from '../../../services/tipo-curso.service';
import { AulaService } from '../../../services/aula.service';
import { Nivel } from '../../../models/nivel.model';
import { TipoCurso } from '../../../models/tipo-curso.model';
import { Aula } from '../../../models/aula.model';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './curso-form.html',
  styleUrl: './curso-form.css'
})
export class CursoFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  niveles: Nivel[] = [];
  tiposCurso: TipoCurso[] = [];
  aulas: Aula[] = [];

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private nivelService: NivelService,
    private tipoCursoService: TipoCursoService,
    private aulaService: AulaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracionHoras: [0, [Validators.required, Validators.min(1)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      idNivel: [null, Validators.required],
      idTipoCurso: [null, Validators.required],
      idAula: [null]
    });
  }

  ngOnInit(): void {
    this.loadDropdowns();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.cursoService.getById(this.id).subscribe((data: Curso) => this.form.patchValue(data));
    }
  }

  loadDropdowns(): void {
    this.nivelService.getAll().subscribe((data: Nivel[]) => this.niveles = data);
    this.tipoCursoService.getAll().subscribe((data: TipoCurso[]) => this.tiposCurso = data);
    this.aulaService.getAll().subscribe((data: Aula[]) => this.aulas = data);
  }

  guardar(): void {
    if (this.form.invalid) return;
    const data: Curso = {
      ...this.form.value,
      idCurso: this.id ?? undefined
    };

    if (this.id) {
      this.cursoService.update(this.id, data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    } else {
      this.cursoService.create(data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    }
  }

  cerrar(): void {
    this.router.navigate(['/cursos']);
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
