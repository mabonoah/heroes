import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/api/api.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Hero } from '../../hero';
import { HeroesService } from '../../heroes.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Output() advancedFilter: EventEmitter<boolean> = new EventEmitter(true);
  advancedFilterState: boolean = false;
  displayedColumns: string[] = ['name', 'phone', 'email', 'date', 'country', 'company'];
  hereos: Hero[] = [];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource();
  queryParams: any = {};

  constructor(
    private api: APIService,
    private liveAnnouncer: LiveAnnouncer,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    public heroesService: HeroesService
  ) {
    this.onUpdateQueryParams();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getHeroes(): void {
    this.api.getHeroes()
      .subscribe((hereos: Hero[]) => {
        this.hereos = hereos;
        if (Object.keys(this.queryParams).length) this.filterUsingQueryParams();
        else this.setDataSource(hereos);
      })
  }

  private setDataSource(hereos: Hero[]): void {
    this.dataSource.data = hereos;
  }


  private onUpdateQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.filterUsingQueryParams()
    });
  }

  private filterUsingQueryParams(): void {
    const keys: string[] = Object.keys(this.queryParams);
    if (!this.hereos || !this.hereos.length) return;
    if (!keys || !keys.length) {
      this.setDataSource(this.hereos);
      this.openSnackBar('All heroes are listed!');
      return;
    }
    const data = JSON.parse(JSON.stringify(this.hereos));
    // Filter
    const filteredHereos: Hero[] = data.filter((hero: any) => {
      let isValidHero: boolean = true;
      let propertyValue: string;
      keys.map((key) => {
        propertyValue = hero[key];
        if (!propertyValue.includes(this.queryParams[key])) isValidHero = false;
      });
      if (isValidHero) return hero;
    });
    // Update data source
    this.setDataSource(filteredHereos);
    // Open snack bar
    if (filteredHereos.length)
      this.openSnackBar('Heroes are filtered successfully!');
    else
      this.openSnackBar('Filterers data not matching!');
  }

  private openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message, 'Dynamic filter');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

}