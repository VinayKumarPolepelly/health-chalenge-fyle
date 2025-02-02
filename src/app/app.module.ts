import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // ✅ Required for [(ngModel)]
import { CommonModule } from '@angular/common'; // ✅ Required for *ngFor

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, CommonModule], // ✅ Add these
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
