import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedContactListComponent } from './mixed-contact-list.component';

describe('MixedUserListComponent', () => {
  let component: MixedContactListComponent;
  let fixture: ComponentFixture<MixedContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
