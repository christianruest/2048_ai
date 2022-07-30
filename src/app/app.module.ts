import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AiService } from './ai/ai-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
