import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { my_CONFIG } from '@my/services/config.service';

@NgModule()
export class myModule
{
    constructor(@Optional() @SkipSelf() parentModule: myModule)
    {
        if ( parentModule )
        {
            throw new Error('myModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : myModule,
            providers: [
                {
                    provide : my_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
