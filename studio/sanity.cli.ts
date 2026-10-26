import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tgfsg74o',
    dataset: 'production'
  },
  // Studio address: https://orpingtonosteopaths.sanity.studio
  studioHost: 'orpingtonosteopaths',
  deployment: {
    appId: 'nzgmj7yri8s4gvvf29zdqsci',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
