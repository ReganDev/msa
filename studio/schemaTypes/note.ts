import {defineField, defineType} from 'sanity'
import {WarningOutlineIcon} from '@sanity/icons/WarningOutline'

/**
 * The shaded panel inside an article, used for "Get urgent help if…" advice
 * or anything that should stand apart from the main text.
 */
export const note = defineType({
  name: 'note',
  title: 'Highlighted note',
  type: 'object',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Optional, e.g. "Get urgent help if"',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
    prepare: ({title, subtitle}) => ({title: title || 'Highlighted note', subtitle}),
  },
})
