import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspeccionrecoleccionPage } from './inspeccionrecoleccion.page';

describe('InspeccionrecoleccionPage', () => {
  let component: InspeccionrecoleccionPage;
  let fixture: ComponentFixture<InspeccionrecoleccionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionrecoleccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspeccionrecoleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
