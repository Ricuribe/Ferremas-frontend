import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent {
  status: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.status = this.route.snapshot.paramMap.get('status');
  }


}
