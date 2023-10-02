import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForbiddenComponent } from './page-forbidden.component';

describe('PageForbiddenComponent', () => {
  let component: PageForbiddenComponent;
  let fixture: ComponentFixture<PageForbiddenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageForbiddenComponent],
    });
    fixture = TestBed.createComponent(PageForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
