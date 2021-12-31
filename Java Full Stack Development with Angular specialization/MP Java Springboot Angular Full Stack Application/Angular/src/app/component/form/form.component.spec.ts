import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { FormComponent } from './form.component';


const expectedRes = {status: "success"};

class MockDataService {

  public registerPatient(patientDetails): Observable<any> {
    return of(expectedRes);
  }
}

@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }

const mockRoutes = [
  {
    path: 'form',
    component: MockComponent
  },
  {
    path: 'patientList',
    component: MockComponent
  }
];

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let location: Location;
  let firstnameCtrl: AbstractControl;
  let lastnameCtrl: AbstractControl;
  let genderCtrl: AbstractControl;
  let dobCtrl: AbstractControl;
  let mobileCtrl: AbstractControl;
  let emailCtrl: AbstractControl;

  let addUser;
  let noRecordsFound;

  let errorAlertNoFirstname = HTMLElement;
  let errorAlertMinlengthFirstname = HTMLElement;
  let errorAlertMaxlengthFirstname = HTMLElement;

  let errorAlertNoGender = HTMLElement;

  let errorAlertNoDob = HTMLElement;

  let errorAlertNoMobile = HTMLElement;
  let errorAlertNumberMobile = HTMLElement;
  let errorAlertMaxlengthMobile = HTMLElement;

  let mobileErrMsg = HTMLElement;

  let errorAlertNoEmail = HTMLElement;
  let errorAlertPatternEmail = HTMLElement;

  let elemSubmitBtn = HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent, MockComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(mockRoutes),
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);

    errorAlertNoFirstname = fixture.nativeElement.querySelector('#error-no-firstname');
    errorAlertMinlengthFirstname = fixture.nativeElement.querySelector('#error-minlength-firstname');
    errorAlertMaxlengthFirstname = fixture.nativeElement.querySelector('#error-maxlength-firstname');

    errorAlertNoGender = fixture.nativeElement.querySelector('#error-no-gender');
    errorAlertNoDob = fixture.nativeElement.querySelector('#error-no-dob');
    errorAlertNoMobile = fixture.nativeElement.querySelector('#error-no-mobile');
    errorAlertNumberMobile = fixture.nativeElement.querySelector('#error-number-mobile');
    errorAlertMaxlengthMobile = fixture.nativeElement.querySelector('#error-maxlength-mobile');

    errorAlertNoEmail = fixture.nativeElement.querySelector('#error-no-email');

    elemSubmitBtn = fixture.nativeElement.querySelector('#submit-btn');
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('All validation errors should be hidden and form should be invalid by default', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.complexForm.valid).toBeFalsy();

      expect(errorAlertNoFirstname).toBeFalsy();
      expect(errorAlertMinlengthFirstname).toBeFalsy();
      expect(errorAlertMaxlengthFirstname).toBeFalsy();
      expect(errorAlertNoGender).toBeFalsy();
      expect(errorAlertNoDob).toBeFalsy();
      expect(errorAlertNoMobile).toBeFalsy();
      expect(errorAlertNumberMobile).toBeFalsy();
      expect(errorAlertMaxlengthMobile).toBeFalsy();
      expect(errorAlertNoEmail).toBeFalsy();
    });
  }));

  it('should display no name validation error when the field kept as null(dirty)', fakeAsync(() => {
    fixture.whenStable().then(() => {
      firstnameCtrl = component.complexForm.controls['name'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#firstname');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoFirstname = fixture.nativeElement.querySelector('#error-no-firstname');
      errorAlertMinlengthFirstname = fixture.nativeElement.querySelector('#error-minlength-firstname');
      errorAlertMaxlengthFirstname = fixture.nativeElement.querySelector('#error-maxlength-firstname');
      expect(firstnameCtrl.valid).toBeFalsy();
      expect(errorAlertNoFirstname).toBeTruthy();
      expect(errorAlertMinlengthFirstname).toBeFalsy();
      expect(errorAlertMaxlengthFirstname).toBeFalsy();
      expect(fixture.nativeElement.querySelector('#error-no-firstname').textContent.trim()).toBe('You must include a name.');
    });
  }));

  it('should display name minimum length validation error when the field has less than 3 length', fakeAsync(() => {
    fixture.whenStable().then(() => {
      firstnameCtrl = component.complexForm.controls['name'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#firstname');
      elemInput.value = 'aa';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertMinlengthFirstname = fixture.nativeElement.querySelector('#error-minlength-firstname');
      errorAlertNoFirstname = fixture.nativeElement.querySelector('#error-no-firstname');
      errorAlertMaxlengthFirstname = fixture.nativeElement.querySelector('#error-maxlength-firstname');
      expect(firstnameCtrl.valid).toBeFalsy();
      expect(errorAlertMinlengthFirstname).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-minlength-firstname').textContent.trim()).toBe('Your name must be at least 3 characters long.');
      expect(errorAlertNoFirstname).toBeFalsy();
      expect(errorAlertMaxlengthFirstname).toBeFalsy();
    });
  }));

  it('should display name maximum length validation error when the field has greater than 20 length', fakeAsync(() => {
    fixture.whenStable().then(() => {
      firstnameCtrl = component.complexForm.controls['name'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#firstname');
      elemInput.value = 'aaffffffffffffffffffffffff';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertMinlengthFirstname = fixture.nativeElement.querySelector('#error-minlength-firstname');
      errorAlertNoFirstname = fixture.nativeElement.querySelector('#error-no-firstname');
      errorAlertMaxlengthFirstname = fixture.nativeElement.querySelector('#error-maxlength-firstname');
      expect(firstnameCtrl.valid).toBeFalsy();
      expect(errorAlertMinlengthFirstname).toBeFalsy();
      expect(errorAlertNoFirstname).toBeFalsy();
      expect(errorAlertMaxlengthFirstname).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-maxlength-firstname').textContent.trim()).toBe('Your name cannot exceed 20 characters.');
    });
  }));

  it('gender field validity', () => {
    let errors = {};
    genderCtrl = component.complexForm.controls['gender'];
    expect(genderCtrl.valid).toBeFalsy();

    errors = genderCtrl.errors || {};
    expect(errors['required']).toBeTruthy();

    genderCtrl.setValue('male');
    errors = genderCtrl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('gender validation gets pass when clicking male radio button', fakeAsync(() => {
    genderCtrl = component.complexForm.controls['gender'];
    fixture.nativeElement.querySelector('#male').click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      errorAlertNoGender = fixture.nativeElement.querySelector('#error-no-gender');
      expect(genderCtrl.valid).toBeTruthy();
      expect(errorAlertNoGender).toBeFalsy();
    });
  }));


  it('gender validation gets pass when clicking female radio button', fakeAsync(() => {
    genderCtrl = component.complexForm.controls['gender'];
    fixture.nativeElement.querySelector('#female').click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      errorAlertNoGender = fixture.nativeElement.querySelector('#error-no-gender');
      expect(genderCtrl.valid).toBeTruthy();
      expect(errorAlertNoGender).toBeFalsy();
    });
  }));

  it('should display no date of birth validation error when the field kept as null(dirty)', fakeAsync(() => {
    fixture.whenStable().then(() => {
      dobCtrl = component.complexForm.controls['dob'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#date-input');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoDob = fixture.nativeElement.querySelector('#error-no-dob');
      expect(dobCtrl.valid).toBeFalsy();
      expect(errorAlertNoDob).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-no-dob').textContent.trim()).toBe('You must select a valid date of birth.');
    });
  }));

  it('Date of birth validation gets pass when the field has valid value', fakeAsync(() => {
    fixture.whenStable().then(() => {
      dobCtrl = component.complexForm.controls['dob'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#date-input');
      elemInput.value = '2018-12-25';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoDob = fixture.nativeElement.querySelector('#error-no-dob');
      expect(dobCtrl.valid).toBeTruthy();
      expect(errorAlertNoDob).toBeFalsy();
    });
  }));


  it('mobile field validity', () => {
    let errors = {};
    mobileCtrl = component.complexForm.controls['mobile'];
    expect(mobileCtrl.valid).toBeFalsy();

    errors = mobileCtrl.errors || {};
    expect(errors['required']).toBeTruthy();

    mobileCtrl.setValue('123456');
    errors = mobileCtrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    mobileCtrl.setValue('12345678901343');
    errors = mobileCtrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    mobileCtrl.setValue('1234567a9');
    errors = mobileCtrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    mobileCtrl.setValue('1234567890');
    errors = mobileCtrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  // it('should display no mobile number validation error when the field has kept as null(dirty)', fakeAsync(() => {
  //   fixture.whenStable().then(() => {
  //   addUser = fixture.nativeElement.querySelector('#form-container');
  //     mobileCtrl = component.complexForm.controls['mobile'];
  //     const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
  //     elemInput.value = '';
  //     elemInput.dispatchEvent(new Event('input'));
  //     expect(component.complexForm.valid).toBeFalsy();
  //     tick();
  //     fixture.detectChanges();
  //     errorAlertNoMobile = fixture.nativeElement.querySelector('#error-no-mobile');
  //     errorAlertNumberMobile = fixture.nativeElement.querySelector('#error-number-mobile');
  //     errorAlertMaxlengthMobile = fixture.nativeElement.querySelector('#error-maxlength-mobile');
  //     expect(mobileCtrl.valid).toBeFalsy();
  //     expect(errorAlertNoMobile).toBeTruthy();
  //     expect(errorAlertNumberMobile).toBeFalsy();
  //     expect(errorAlertMaxlengthMobile).toBeFalsy();
  //     expect(fixture.nativeElement.querySelector('#error-no-mobile').textContent.trim()).toBe('You must include mobile number.');
  //   });
  // }));

  it('should display mobile number pattern validation error when the field has value', fakeAsync(() => {
    fixture.whenStable().then(() => {
      mobileCtrl = component.complexForm.controls['mobile'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput.value = '123456';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoMobile = fixture.nativeElement.querySelector('#error-no-mobile');
      errorAlertNumberMobile = fixture.nativeElement.querySelector('#error-number-mobile');
      errorAlertMaxlengthMobile = fixture.nativeElement.querySelector('#error-maxlength-mobile');
      expect(mobileCtrl.valid).toBeFalsy();
      expect(errorAlertNoMobile).toBeFalsy();
      expect(errorAlertNumberMobile).toBeTruthy();
      expect(errorAlertMaxlengthMobile).toBeFalsy();
      expect(fixture.nativeElement.querySelector('#error-number-mobile').textContent.trim()).toBe('You must enter a valid 10 digit mobile number.');
    });
  }));

  // it('should display mobile maximun length validation error when the field has greater than 10 length', fakeAsync(() => {
  //   fixture.whenStable().then(() => {
  //     mobileCtrl = component.complexForm.controls['mobile'];
  //     const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
  //     elemInput.value = '1234567890123';
  //     elemInput.dispatchEvent(new Event('input'));
  //     expect(component.complexForm.valid).toBeFalsy();
  //     tick();
  //     fixture.detectChanges();
  //     errorAlertNoMobile = fixture.nativeElement.querySelector('#error-no-mobile');
  //     errorAlertNumberMobile = fixture.nativeElement.querySelector('#error-number-mobile');
  //     errorAlertMaxlengthMobile = fixture.nativeElement.querySelector('#error-maxlength-mobile');
  //     expect(mobileCtrl.valid).toBeFalsy();
  //     expect(errorAlertNoMobile).toBeFalsy();
  //     expect(errorAlertNumberMobile).toBeFalsy();
  //     expect(errorAlertMaxlengthMobile).toBeTruthy();
  //     expect(fixture.nativeElement.querySelector('#error-maxlength-mobile').textContent.trim()).toBe('Your mobile number should not exceed 10 digits.');
  //   });
  // }));

  it('should display email pattern validation error', fakeAsync(() => {
    fixture.whenStable().then(() => {
      emailCtrl = component.complexForm.controls['email'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput.value = 'sd.dss@sf.';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertPatternEmail = fixture.nativeElement.querySelector('#error-pattern-email');
      expect(emailCtrl.valid).toBeFalsy();
      expect(errorAlertPatternEmail).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-pattern-email').textContent.trim()).toBe('You must enter a valid Email ID.');
    });
  }));

  it('should not display email validation error when the email field is valid', fakeAsync(() => {
    fixture.whenStable().then(() => {
      emailCtrl = component.complexForm.controls['email'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput.value = 'sd.dss@sf.in';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.complexForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertPatternEmail = fixture.nativeElement.querySelector('#error-pattern-email');
      expect(emailCtrl.valid).toBeTruthy();
      expect(errorAlertPatternEmail).toBeFalsy();
    });
  }));

  it('should call submitform method for valid form', fakeAsync(() => {
    component.complexForm.controls['name'].setValue('xxxxxxx');
    component.complexForm.controls['gender'].setValue('male');
    component.complexForm.controls['dob'].setValue('2018-12-25');
    component.complexForm.controls['mobile'].setValue('8870783265');
    component.complexForm.controls['email'].setValue('xxxxx@gmail.com');
    expect(component.complexForm.valid).toBeTruthy();
    spyOn(component, 'submitForm').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#submit-btn').click();
      fixture.detectChanges();
      expect(component.submitForm).toHaveBeenCalled();
    });
  }));

  it('should navigate to PatientList page after successful registration', fakeAsync(() => {
    component.complexForm.controls['name'].setValue('xxxxxxx');
    component.complexForm.controls['gender'].setValue('male');
    component.complexForm.controls['dob'].setValue('2018-12-25');
    component.complexForm.controls['mobile'].setValue('8870783265');
    component.complexForm.controls['email'].setValue('xxxxx@gmail.com');
    spyOn(component, 'submitForm').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then((() => {
      fixture.nativeElement.querySelector('#submit-btn').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/patientList');
      });
    }));

  }));

});
