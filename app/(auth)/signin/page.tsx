import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';
import styles from './signin.module.css';

export default function SignInPage() {
  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <Image src="/icons/logo.svg" alt="Logo" width={64} height={64} />
      </div>
      <AuthForm />
    </div>
  );
}
