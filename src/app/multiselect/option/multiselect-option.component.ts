import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'multiselect-option',
  templateUrl: './multiselect-option.component.html',
  styleUrls: ['./multiselect-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ],
  standalone: true
})
export class MultiselectOptionComponent implements OnInit {

  @Input() name: string = '';
  @Output() valueChange = new EventEmitter<boolean>();

  @HostListener('click') click() {
    this.checked = !this.checked;
    this.valueChange.emit(this.checked);
  }

  checked = false;

  ngOnInit(): void {
    if (!this.name) {
      throw new Error('name is required for the multiselect option');
    }
  }
}
