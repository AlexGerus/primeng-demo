import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Table, TableModule } from 'primeng/table';
import { Product, PRODUCTS } from './product';
import { CardModule } from 'primeng/card';

export const invalidNameValidator = (nameRe: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = nameRe.test(control.value);
    return invalid ? { invalidName: { value: control.value } } : null;
  };
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Button, FormsModule, ReactiveFormsModule, InputTextModule, ButtonDirective, InputMaskModule, CheckboxModule, RadioButtonModule, DropdownModule, CalendarModule, TableModule, CardModule, NgOptimizedImage],
  template: `
    <div>
      <h2>Template Driven Form</h2>
      <form #form="ngForm" (ngSubmit)="onSubmit(form)" novalidate>
        <input name="first" ngModel required/>
        <button>Submit</button>
      </form>
      <p>Value: {{ form.value | json }}</p>

      <h2>Reactive Forms</h2>
      <form (ngSubmit)="onSubmitReactive()" [formGroup]="profileForm">
        <input formControlName="first" type="text"/>
        <button type="submit">Submit</button>
      </form>
      <p>Value: {{ profileForm.value | json }}</p>

      <h2>PrimeNG Reactive Forms</h2>
      <form (ngSubmit)="onSubmitReactivePrimeNg()" [formGroup]="profileFormPrimeNg">
        <input formControlName="first" pInputText/>
        <button pButton type="submit">Submit</button>
      </form>
      <p>Value: {{ profileFormPrimeNg.value | json }}</p>

      <h2>Contact Form</h2>
      <form (ngSubmit)="onSubmitContactForm()" [formGroup]="contactForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input formControlName="name" id="name" pInputText type="text"/>
          <ng-container *ngIf="contactForm.controls.name as name">
            <small *ngIf="name.dirty && name.hasError('required')" class="p-error">
              This field is required
            </small>
            <small *ngIf="name.dirty && name.hasError('minlength')" class="p-error">
              Name must be at least 4 characters long
            </small>
            <small *ngIf="name.dirty && name.hasError('invalidName')" class="p-error">
              Name cannot be "{{ name.errors?.['invalidName'].value }}"
            </small>
          </ng-container>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <p-inputMask
            formControlName="phone"
            id="phone"
            mask="(999)-999-9999"
            placeholder="(999)-999-9999"
          />
        </div>
        <div class="form-group">
          <p-checkbox
            [binary]="true"
            formControlName="subscribe"
            label="Subscribe to newsletter"
          />
        </div>
        <div class="form-group">
          <p-radioButton
            *ngFor="let gender of genders"
            formControlName="gender"
            label="{{ gender.label }}"
            name="gender"
            value="{{ gender.value }}"
          />
        </div>
        <div class="form-group">
          <p-dropdown
            [filter]="true"
            [options]="cities"
            [showClear]="true"
            filterBy="name"
            formControlName="selectedCity"
            optionLabel="name"
            placeholder="Choose a city"
          />
        </div>
        <div class="form-group">
          <p-calendar [iconDisplay]="'input'" [showIcon]="true" dateFormat="dd.mm.yy" formControlName="calendar"/>
        </div>
        <div class="form-group">
          <p-calendar [iconDisplay]="'input'" [readonlyInput]="true" [showIcon]="true" dateFormat="dd.mm.yy"
                      formControlName="range" selectionMode="range"/>
        </div>
        <button pButton type="submit">Submit</button>

      </form>
      <p>Value: {{ contactForm.value | json }}</p>

      <h1>Flexbox</h1>

      <div class="flex flex-wrap gap-7">
        <div class="text-center p-3 bg-primary">Flex Item 1</div>
        <div class="text-center p-3 bg-primary">Flex Item 2</div>
        <div class="text-center p-3 bg-primary">Flex Item 3</div>
      </div>

      <h1>Grid</h1>

      <div class="grid">
        <div class="col-12 md:col-6 lg:col-3">
          <div class="text-center p-3 bg-primary">Flex Item 1</div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
          <div class="text-center p-3 bg-primary">Flex Item 2</div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
          <div class="text-center p-3 bg-primary">Flex Item 3</div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
          <div class="text-center p-3 bg-primary">Flex Item 4</div>
        </div>
      </div>

      <h1>Table</h1>

      <p-table [tableStyle]="{ 'min-width': '50rem' }" [value]="products">
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template let-product pTemplate="body">
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </p-table>

      <h1>Dynamic Table</h1>

      <p-table [columns]="cols" [tableStyle]="{ 'min-width': '50rem' }" [value]="products">
        <ng-template let-columns pTemplate="header">
          <tr>
            <th *ngFor="let col of columns">{{ col.header }}</th>
          </tr>
        </ng-template>
        <ng-template let-columns="columns" let-rowData pTemplate="body">
          <tr>
            <td *ngFor="let col of columns">
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </p-table>

      <h1>Table with Sorting</h1>

      <p-table [tableStyle]="{ 'min-width': '50rem' }" [value]="products">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="name">Name
              <p-sortIcon field="name"></p-sortIcon>
            </th>
            <th pSortableColumn="price">Price
              <p-sortIcon field="price"></p-sortIcon>
            </th>
          </tr>
        </ng-template>
        <ng-template let-product pTemplate="body">
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </ng-template>
      </p-table>

      <h1>Table with Filtering</h1>

      <p-table #dt [globalFilterFields]="['name', 'price']" [tableStyle]="{ 'min-width': '50rem' }"
               [value]="products">
        <ng-template pTemplate="caption">
          <div class="flex">
            <button (click)="dt.clear()" class="p-button-outlined" icon="pi pi-filter-slash" label="Clear"
                    pButton></button>
            <span class="p-input-icon-left ml-auto">
            <i class="pi pi-search"></i>
            <input (input)="applyFilter($event, 'contains')" pInputText placeholder="Search keyword" type="text"/>
          </span>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th>
              <input (input)="applyFilter($event, 'contains', 'name')" pInputText placeholder="Search by Name"
                     type="text"/>
            </th>
            <th>
              <input (input)="applyFilter($event, 'contains', 'price')" pInputText placeholder="Search by Price"
                     type="text"/>
            </th>
          </tr>
        </ng-template>
        <ng-template let-product pTemplate="body">
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7">No products found.</td>
          </tr>
        </ng-template>
      </p-table>

      <h1>Table with Paginator</h1>

      <p-table [paginator]="true" [rowsPerPageOptions]="[5,10,20]" [rows]="10"
               [tableStyle]="{ 'min-width': '50rem' }" [value]="fullProducts">
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template let-product pTemplate="body">
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <div class="flex flex-wrap gap-4">
      <p-card *ngFor="let product of products"
              [header]="product.name" [style]="{width: '300px'}">
        <img alt="{{ product.name }}" src="../assets/placeholder.png" style="width: 100%"/>
        <div class="flex flex-column">
          <p>{{ product.description }}</p>
          <h3>\${{ product.price }}</h3>
          <button label="Add to cart" pButton type="button"></button>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      .form-group {
        margin: 2rem 0;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      p-radioButton {
        padding-right: 1rem;
      }

      small {
        display: block;
        margin-top: 0.5rem;
      }
    `,
  ],
})
export class AppComponent {
  profileForm = new FormGroup({
    first: new FormControl('')
  });

  profileFormPrimeNg = new FormGroup({
    first: new FormControl('')
  });

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), invalidNameValidator(/test/i)]),
    phone: new FormControl(''),
    subscribe: new FormControl(false),
    gender: new FormControl(''),
    selectedCity: new FormControl(null),
    calendar: new FormControl(null),
    range: new FormControl(null),
  });

  genders = [
    { value: 'm', label: 'Male' },
    { value: 'f', label: 'Female' },
  ];

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  products: Product[] = PRODUCTS.slice(0, 5);
  fullProducts: Product[] = PRODUCTS;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'category', header: 'Category' },
  ];

  @ViewChild('dt')
  dataTable!: Table;

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onSubmitReactive() {
    console.log(this.profileForm.value);
  }

  onSubmitReactivePrimeNg() {
    console.log(this.profileFormPrimeNg.value);
  }

  onSubmitContactForm() {
    console.log(this.contactForm);
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsDirty();
      });
    }
  }

  applyFilter(event: Event, action: string, field?: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!field) {
      this.dataTable.filterGlobal(filterValue, action);
    } else {
      this.dataTable.filter(filterValue, field, action);
    }
  }
}
