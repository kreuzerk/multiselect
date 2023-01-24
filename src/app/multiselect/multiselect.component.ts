import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  HostListener,
  QueryList
} from "@angular/core";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition, OverlayModule} from "@angular/cdk/overlay";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MultiselectOptionComponent} from "./option/multiselect-option.component";
import {startWith} from "rxjs";

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OverlayModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements ControlValueAccessor, AfterContentInit {

  @ContentChildren(MultiselectOptionComponent) options: QueryList<MultiselectComponent> | undefined;

  open = false;
  value: { [key: string]: boolean } = {};
  displayValue = '';

  private contolValueAccessorOnChange: ((value: { [key: string]: boolean }) => void) | undefined;
  private contolValueAccessorOnTouched: (() => void) | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.options?.changes.pipe(
      startWith(this.options),
    ).subscribe(o => {
      o.toArray().forEach((o: MultiselectOptionComponent) => {
        o.checked = this.value[o.name];
        this.setupOptionListener(o);
        this.updateDisplayValue();
      });
    });
  }

  private setupOptionListener(option: MultiselectOptionComponent) {
    option.valueChange.subscribe((value: boolean) => {
      this.value[option.name] = value;
      this.contolValueAccessorOnChange?.(this.value);
      this.updateDisplayValue();
    });
  }

  private updateDisplayValue() {
    this.displayValue = Object.keys(this.value).filter(key => this.value[key]).join(', ');
    this.cdr.markForCheck();
  }

  openOverlay() {
    this.open = true;
  }

  closeOverlay() {
    this.open = false;
  }

  registerOnChange(fn: any): void {
    this.contolValueAccessorOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.contolValueAccessorOnTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;

    if(this.options){
      this.updateDisplayValue();
    }
  }
}
