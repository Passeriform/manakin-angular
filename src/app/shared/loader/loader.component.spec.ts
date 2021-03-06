import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonicLoaderComponent } from './harmonic-loader.component';

describe('HarmonicLoaderComponent', () => {
	let component: HarmonicLoaderComponent;
	let fixture: ComponentFixture<HarmonicLoaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HarmonicLoaderComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HarmonicLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
