// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule'u içe aktarma
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule // HttpClientModule'u burada ekleyin
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    

    expect(app).toBeTruthy();
  });

  it(`should have as title 'AltayStok'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AltayStok');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('AltayStok app is running!');
  });
});
