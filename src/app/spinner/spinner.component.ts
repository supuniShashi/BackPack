import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SpinnerService} from "./spinner-service.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnChanges {
  @Input() inputValue = 1;
  @Input() minValue = 1;
  @Input() maxValue: number;
  @Input() plusDisable: boolean;
  @Input() minusDisable: boolean;
  @Input() disabledInput: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.setSpinnerValue(this.inputValue);
  }

  ngOnInit() {
    if (this.minValue == this.maxValue || this.disabledInput) {
      this.minusDisable = true;
      this.plusDisable = true;
    }
    if (this.minValue == this.inputValue) {
      this.minusDisable = true;
    }
    if (this.maxValue == this.inputValue) {
      this.plusDisable = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  clickPlus() {
    if (this.inputValue >= this.maxValue || this.plusDisable) {
      return;
    }
    this.inputValue++;
    if (this.inputValue == this.maxValue) {
      this.plusDisable = true;
    }
    this.minusDisable = false;
    this.spinnerService.setSpinnerValue(this.inputValue)
  }

  clickMinus() {
    if (this.inputValue <= this.minValue || this.minusDisable) {
      return;
    }
    this.inputValue--;
    if (this.inputValue == this.minValue) {
      this.minusDisable = true;
    }
    this.plusDisable = false;
    this.spinnerService.setSpinnerValue(this.inputValue);
  }

  onChange(newValue) {
    if (this.minValue >= newValue.target.value) {
      this.inputValue = this.minValue;
      this.plusDisable = false;
      this.minusDisable = true;
    } else if (this.maxValue && this.maxValue <= newValue.target.value) {
      this.inputValue = this.maxValue;
      this.plusDisable = true;
      this.minusDisable = false;
    } else {
      this.inputValue = newValue.target.value;
      this.plusDisable = false;
      this.minusDisable = false;
    }
    this.spinnerService.setSpinnerValue(+(this.inputValue));
  }

}
