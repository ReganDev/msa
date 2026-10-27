import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Orpington Osteopaths',

  projectId: 'tgfsg74o',
  dataset: 'production',

  // No Vision (GROQ query) tool: the Studio is for writing posts, not for
  // poking at the dataset, and Matthew is the main user.
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
