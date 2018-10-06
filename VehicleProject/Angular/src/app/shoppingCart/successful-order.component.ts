import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../dataSharingService';


@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css']
})
export class SuccessfulOrderComponent implements OnInit {

  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.cartNumber.next(0);
  }

}
