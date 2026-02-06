import RegistrationForm from '@/components/registration/RegistrationForm';
import styles from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.card}>
      <RegistrationForm />
    </div>
  );
}
