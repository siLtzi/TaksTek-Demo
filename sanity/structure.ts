import { StructureBuilder } from 'sanity/structure'
import { Settings, FileText, Menu } from 'lucide-react'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      
      S.divider(),
      
      // Pages
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.documentTypeList('page')
            .title('Pages')
        ),
      
      // Navigation
      S.listItem()
        .title('Navigation')
        .icon(Menu)
        .child(
          S.documentTypeList('navigation')
            .title('Navigation Menus')
        ),
    ])
