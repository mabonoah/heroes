import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent implements OnInit {
  queryParams: Params = {};
  countries: string[] = [
    "Saudi Arabia", "Serbia", "Russian Federation",
    "Poland", "Saint Barthélemy", "Réunion",
    "Pakistan", "Monaco", "South Africa",
    "Haiti", "Iceland", "Greece"
  ];
  form: FormGroup = this.fb.group({
    name: [''],
    phone: [''],
    email: ['', Validators.email],
    date: [''],
    country: [''],
    company: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.setFormUsingQueryParams();
  }

  ngOnInit(): void {
  }

  private setFormUsingQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.form.patchValue(params);
    });
  }

  onSubmit(): void {
    this.setQueryParams(this.form.value);
    this.applyQueryParams();
  }

  private setQueryParams(data: any) {
    this.queryParams = {};
    for (const prop in data) {
      if (data[prop])
        this.queryParams[prop] = data[prop];
    }
  }

  private applyQueryParams(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.queryParams
      });
  }
}
