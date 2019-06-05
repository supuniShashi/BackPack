import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private subjectSpinner = new BehaviorSubject<number>(1);

  setSpinnerValue(value: number) {
    this.subjectSpinner.next(value);
  }

  getSpinnerValue(): Observable<number> {
    return this.subjectSpinner.asObservable();
  }

  getSpinnerInstantValue(): number {
    return this.subjectSpinner.getValue();
  }
}
