import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from "../../services/main/main.service";
import { MatTable } from "@angular/material/table";
import { MixedContact } from "../../types/types";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";
import { SessionService } from "../../services/session/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-mixed-user-list',
  templateUrl: './mixed-contact-list.component.html',
  styleUrls: ['./mixed-contact-list.component.css']
})
export class MixedContactListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns = ['githubId', 'name', 'email', 'githubUser', 'githubLocation', 'freshdeskId', 'freshdeskTimeZone'];
  mixedContactList: Array<MixedContact> = [];

  constructor(private sessionService: SessionService, private mainService: MainService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sessionService.isLoggedIn()
      .subscribe(
        (authResponse) => {
          if (!authResponse.content) {
            console.log(authResponse);
            this.router.navigate(['']);
          }
        },
        (error) => { console.log(error) }
      );
    this.mainService.getMixedContactList()
      .subscribe(
        (mixedContactList) => {
          this.mixedContactList = mixedContactList;
          this.table.renderRows();
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '30%',
      data: this.mixedContactList
    });

    dialogRef.afterClosed()
      .subscribe(() => { console.log('Dialog have been closed') });

    dialogRef.componentInstance.eventEmitter
      .subscribe(
        (mixedContact) => {
          this.mixedContactList.push(mixedContact);
          this.table.renderRows();
        }
      );
  }
}
