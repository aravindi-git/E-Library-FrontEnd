import { Component , Inject , HostListener , ChangeDetectionStrategy , Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: []
})


export class ConfirmDialogComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string,
      confirmText: string,
      message: string,
      title: string} ,
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>
  ){}


  public cancel(): void  {
    this.close(false);
  }

  public close(value: any): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
    public onEsc(): void {
    this.close(false);
  }

}
