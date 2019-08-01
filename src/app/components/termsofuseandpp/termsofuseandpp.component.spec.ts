import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofuseandppComponent } from './termsofuseandpp.component';

describe('TermsofuseandppComponent', () => {
  let component: TermsofuseandppComponent;
  let fixture: ComponentFixture<TermsofuseandppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsofuseandppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofuseandppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
