import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostPage } from './post.page';
import { PostPageRoutingModule } from './post-routing.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PostPageRoutingModule,
    PipesModule
  ],
  declarations: [PostPage]
})
export class PostPageModule {}
