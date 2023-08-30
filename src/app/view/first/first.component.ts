import { Component, inject, Inject, Optional } from '@angular/core';
import { Constants, CONSTANTS_PROVIDER } from '../../core/services/constants.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ConfigOptionsService } from '../../core/services/config-options.service';
import { GeneratedString, GeneratorFactory } from '../../core/services/generator.factory';
import { GeneratorService } from '../../core/services/generator.service';
import { GenIdGeneratorService } from '../../core/services/gen-id-generator.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  standalone: true,
  providers: [
    {
      provide: CONSTANTS_PROVIDER,
      useValue: {
        App: 'Shop',
        Ver: '1.0',
        API_URL: 'https://shop-production-api.westus.cloudapp.azure.com',
      },
    },
    {
      provide: GeneratedString,
      useFactory: GeneratorFactory(12),
      deps: [GeneratorService],
    },
    GenIdGeneratorService,
    ConfigOptionsService,
    LocalStorageService,
  ],
})
export class FirstComponent {
  // with inject
  private configOptionsService = inject(ConfigOptionsService);
  private localStorageService = inject(LocalStorageService, { optional: true });

  // inside constructor
  constructor(
    @Inject(CONSTANTS_PROVIDER) private readonly constantData: Constants,
    @Inject(GeneratedString) private readonly generatedString: string,
    @Optional() private readonly genIdService: GenIdGeneratorService,
  ) {}
}
