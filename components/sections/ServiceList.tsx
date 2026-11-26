import styles from './List.module.css'

export const services = [
  { title: 'Web products', description: 'Clear interfaces, reliable APIs, and the data that connects them.', detail: 'React · Next.js · Python · PostgreSQL' },
  { title: 'AI systems', description: 'Assistants and agent workflows with the right context, tools, and checks.', detail: 'Context engineering · RAG · Tool calling' },
  { title: 'Mobile experiences', description: 'Useful apps that feel at home in everyday routines.', detail: 'React Native · Expo · Native integrations' },
]

export function ServiceList() {
  return (
    <dl className={`${styles.list} ${styles.relaxed}`}>
      {services.map(service => (
        <div className={styles.defRow} key={service.title}>
          <dt className={styles.defTitle}>{service.title}</dt>
          <dd className={styles.defValue}>
            <p className={styles.rowText}>{service.description}</p>
            <p className={styles.rowMeta}>{service.detail}</p>
          </dd>
        </div>
      ))}
    </dl>
  )
}
