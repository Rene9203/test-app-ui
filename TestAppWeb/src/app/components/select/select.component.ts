import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export class SelectOption {
  textField?: string;
  valueField?: string;
  placeHolder?: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: Array<any>;
  @Input() options: SelectOption;
  private disabled: boolean;
  val: any;

  get value(): number {
    return this.val;
  }

  constructor() {
    this.options = {textField: 'value', valueField: 'id', placeHolder: 'Seleccione una Opción'};
    this.disabled = false;
  }

  onChange: any = () => {
  };

  onTouch: any = () => {
  };

  set value(val) {

    this.val = val;

    this.onChange(val);

    //this.onTouch(val);

  }

  writeValue(value: any) {

    this.value = value;

  }

  registerOnChange(fn: any) {

    this.onChange = fn;

  }

  registerOnTouched(fn: any) {

    this.onTouch = fn;

  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
