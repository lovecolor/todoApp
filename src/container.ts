import { getAppConfig } from "./config"
import { getAppLinks } from "./links"
import { createApiClient } from "./services/api/createApiClient"
import { createAppApiClient } from "./services/api/createAppApiClient"

const config = getAppConfig()
const links = getAppLinks()
const apiClient = createAppApiClient(createApiClient({ baseURL: config.api.host }))

export const getAppContainer = () => ({
  config,
  links,
  apiClient,
})
