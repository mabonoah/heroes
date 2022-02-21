import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/api/api.service';
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
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource();

  constructor(
    private api: APIService,
    private liveAnnouncer: LiveAnnouncer,
    public heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getHeroes(): void {
    this.api.getHeroes()
      .subscribe((hereos: Hero[]) => this.dataSource.data = hereos);
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