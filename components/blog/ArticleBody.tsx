import { FiArrowRight } from 'react-icons/fi'
import type { BlogBlock, BlogListItem, BlogSection } from '@/lib/data/blog'
import { RichText } from './RichText'
import styles from './Blog.module.css'

function ListItem({ item }: { item: BlogListItem }) {
  if (typeof item === 'string') return <li><RichText text={item} /></li>
  return (
    <li>
      <strong className={styles.lead}><RichText text={item.lead} /></strong> <RichText text={item.text} />
    </li>
  )
}

function headingId(number?: string) {
  return number ? `section-${number.replace(/\./g, '-')}` : undefined
}

const frameworkStages = [
  { title: 'Drivers', items: ['AI tools', 'Firm AI adoption', 'Macro conditions'] },
  { title: 'Tasks', items: ['AI augments a task', 'AI replaces a task'] },
  { title: 'Hiring decisions', items: ['How many juniors firms hire', 'How firms screen applicants'] },
  { title: 'Graduate outcomes', items: ['Getting shortlisted', 'Getting hired', 'Time to first job'] },
]

const frameworkModerators = [
  'School recognition',
  'Location relative to hiring hubs',
  'Skill signals: portfolios, certifications, internships',
]

function FrameworkFigure() {
  return (
    <figure className={styles.figure}>
      <div className={styles.framework}>
        <ol className={styles.stages}>
          {frameworkStages.map((stage, index) => (
            <li key={stage.title} className={styles.stage}>
              <p className={styles.stageTitle}>{stage.title}</p>
              <ul>
                {stage.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              {index < frameworkStages.length - 1 && (
                <FiArrowRight className={styles.stageArrow} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
        <div className={styles.moderators}>
          <p className={styles.moderatorsTitle}>Moderators</p>
          <p className={styles.moderatorsNote}>Change how strongly each hiring decision lands on a given graduate</p>
          <ul>
            {frameworkModerators.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <figcaption className={styles.figureCaption}>
        <strong>Figure 1.</strong> Conceptual framework of the study.
      </figcaption>
    </figure>
  )
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={styles.paragraph}>
          {block.lead && <><strong className={styles.lead}><RichText text={block.lead} /></strong> </>}
          <RichText text={block.text} />
        </p>
      )
    case 'heading': {
      const Heading = block.level === 3 ? 'h3' : 'h4'
      return (
        <Heading id={headingId(block.number)} className={block.level === 3 ? styles.subheading : styles.minorHeading}>
          {block.number && <><span className={styles.headingNumber}>{block.number}</span>{' '}</>}
          <RichText text={block.text} />
        </Heading>
      )
    }
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className={styles.list}>
          {block.items.map((item, index) => <ListItem key={index} item={item} />)}
        </List>
      )
    }
    case 'table':
      return (
        <div className={styles.tableBlock}>
          <table className={styles.table}>
            <caption>
              <strong>{block.label}.</strong> <RichText text={block.caption} />
            </caption>
            <thead>
              <tr>
                {block.columns.map(column => <th key={column} scope="col"><RichText text={column} /></th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} data-label={block.columns[cellIndex]}>
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && <p className={styles.tableNote}><RichText text={block.note} /></p>}
        </div>
      )
    case 'framework':
      return <FrameworkFigure />
    case 'references':
      return (
        <ul className={styles.references}>
          {block.items.map(item => <li key={item}><RichText text={item} /></li>)}
        </ul>
      )
  }
}

export function ArticleSection({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className={styles.articleSection} aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
        {section.label && <><span className={styles.sectionLabel}>{section.label}</span>{' '}</>}
        {section.title}
      </h2>
      {section.blocks.map((block, index) => <Block key={index} block={block} />)}
    </section>
  )
}
