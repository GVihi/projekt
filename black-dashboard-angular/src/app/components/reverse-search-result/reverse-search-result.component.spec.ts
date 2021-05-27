import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseSearchResultComponent } from './reverse-search-result.component';

describe('ReverseSearchResultComponent', () => {
  let component: ReverseSearchResultComponent;
  let fixture: ComponentFixture<ReverseSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
