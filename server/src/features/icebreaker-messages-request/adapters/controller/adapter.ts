import type { InputDto } from '../../use-case'
import { UseCase } from '../../use-case'
import type { ServiceDriverPort } from '../service'
import { ServiceAdapter } from '../service'
import type { PresenterDriverPort } from '../presenter'
import { PresenterAdapter } from '../presenter'
import type { RepositoryDriverPort } from '../repository'
import { RepositoryAdapter } from '../repository'

export class Adapter {
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
