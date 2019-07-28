import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthStoreFacadeService } from '../store/services/auth-store-facade.service';

import { LayoutModule } from './layout/layout.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutModule,
  ],
  exports: [
    LayoutModule,
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AuthStoreFacadeService,
      ],
    };
  }
}
