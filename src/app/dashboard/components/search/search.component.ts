import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { concat, fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

// Services
import { PlacesService } from 'src/app/core/services/places.service';

// Models
import Place from 'src/app/core/model/place';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Output() onToggleSearchingDialog = new EventEmitter();
  @Output() onLocationSelect = new EventEmitter<Place>();

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  places$: Observable<Place[]>;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.places$ = this.placesService.getPlaces();
  }

  ngAfterViewInit(): void {
    const searchPlaces$ = fromEvent<any>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => this.getPlaces(search))
    );

    const initialPlaces$ = this.getPlaces();

    this.places$ = concat(initialPlaces$, searchPlaces$);
  }

  private getPlaces(search = ''): Observable<Place[]> {
    return this.placesService.getPlaces(search);
  }

  public selectLocation(place: Place): void {
    this.onLocationSelect.emit(place);
  }

  @HostListener('document:keydown.escape')
  closeSearchingDialog() {
    this.onToggleSearchingDialog.emit();
  }
}
