import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AiService } from './ai/ai-service';
import { AutoPlayer } from './game-control/auto-player';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AiService,
    AutoPlayer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
