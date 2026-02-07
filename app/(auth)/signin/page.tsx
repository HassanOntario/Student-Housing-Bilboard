import AuthForm from '@/components/auth/AuthForm';
import styles from './signin.module.css';

export default function SignInPage() {
  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <div
          style={{
            width: 64,
            height: 64,
            background: 'var(--uottawa-garnet)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.75rem',
          }}
        >
          uO
        </div>
      </div>
      <AuthForm />
    </div>
  );
}
