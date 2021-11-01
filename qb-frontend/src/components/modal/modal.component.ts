import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MainService } from "../../services/main/main.service";
import { MixedContact } from "../../types/types";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter<MixedContact>();
  @Input() inputData = {
    username: '',
    freshdeskOrg: 'newaccount1635183192879'
  }

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  createContact() {
    console.log(this.inputData);
    this.mainService.createContactFromGithub(this.inputData)
      .subscribe(
        result => {
          this.eventEmitter.emit(<MixedContact>result);
        },
        (error) => {
          this.eventEmitter.error(error);
        }
      );
  }

}
