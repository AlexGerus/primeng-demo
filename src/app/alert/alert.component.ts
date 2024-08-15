import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      alert works!
    </p>
  `,
  styles: [
  ]
})
export class AlertComponent {

}
