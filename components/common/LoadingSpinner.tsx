import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  /** If true, renders inline instead of as a full-screen overlay */
  inline?: boolean;
}

export default function LoadingSpinner({ inline = false }: LoadingSpinnerProps) {
  return (
    <div className={`${styles.overlay} ${inline ? styles.inline : ''}`}>
      <div className={styles.spinner} />
    </div>
  );
}
