import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  personnes: any[] = [];
  personneForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.personneForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sports: this.fb.array([])
    });
  }
  ajouterPersonne() {
    if (this.personneForm.valid) {
      this.personnes.push(this.personneForm.value);
      this.personneForm.reset();
    }
  }
  supprimerPersonne(index: number) {
    this.personnes.splice(index, 1);
  }
  get sportsFormArray() {
    return this.personneForm.get('sports') as FormArray;
  }

  ajouterSport() {
    this.sportsFormArray.push(this.fb.control(''));
  }

  supprimerSport(index: number) {
    this.sportsFormArray.removeAt(index);
  }
  affichersport(){
    console.log(this.personneForm.value);
  }
}
