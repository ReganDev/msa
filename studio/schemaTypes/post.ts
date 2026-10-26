import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

/**
 * A blog post. Kept deliberately small: the site design is text-first, so
 * there is no image field. Matthew's photo, the date shown as "Posted … ago"
 * and the reading time are all added by the website automatically.
 */
export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description:
        'The end of the page address, e.g. /blog/runners-knee. Click Generate after writing the title. Avoid changing it once the post is live — old links would break.',
      type: 'slug',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      description:
        'One or two sentences. Shown under the title in the blog list and in Google search results.',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .warning('Keep it under 200 characters so Google shows it in full.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      description: 'Shown on the site as "Posted … ago". A future date keeps the post hidden until then.',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet list', value: 'bullet'},
            {title: 'Numbered list', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Address',
                    description: 'A full web address (https://…) or a page on this site (/booking).',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({type: 'note'}),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt'},
    prepare: ({title, date}) => ({title, subtitle: date}),
  },
})
