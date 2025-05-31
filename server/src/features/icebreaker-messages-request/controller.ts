import type { InputDto } from './use-case/input.dto'
import { UseCase } from './use-case'
import type { PresenterDriverPort } from './use-case/adapters/presenter'
import { PresenterAdapter } from './use-case/adapters/presenter'
import type { RepositoryDriverPort } from './use-case/adapters/repository'
import { RepositoryAdapter } from './use-case/adapters/repository'
import type { ServiceDriverPort } from './use-case/adapters/service'
import { ServiceAdapter } from './use-case/adapters/service'

export class Controller {
  constructor(
    private serviceDriver: ServiceDriverPort,
    private repositoryDriver: RepositoryDriverPort,
    private presenterDriver: PresenterDriverPort,
  ) {
    // empty
  }

  public async executeImpl(input: InputDto): Promise<void> {
    const service = new ServiceAdapter(this.serviceDriver)
    const repository = new RepositoryAdapter(this.repositoryDriver)
    const presenter = new PresenterAdapter(this.presenterDriver)

    const useCase = new UseCase(service, repository, presenter)
    await useCase.execute(input)
  }
}
