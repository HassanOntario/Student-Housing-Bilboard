'use client';

import type { ApprovalStatus } from '@/types';
import styles from './StatusBanner.module.css';

interface StatusBannerProps {
  status: ApprovalStatus;
}

const messages: Record<ApprovalStatus, { icon: string; text: string }> = {
  pending: {
    icon: '⏳',
    text: 'Your account is pending admin approval. You can browse but some features are restricted.',
  },
  approved: {
    icon: '✅',
    text: 'Your account has been approved. Welcome!',
  },
  rejected: {
    icon: '❌',
    text: 'Your account was not approved. Please contact support.',
  },
};

export default function StatusBanner({ status }: StatusBannerProps) {
  const msg = messages[status];
  return (
    <div className={`${styles.banner} ${styles[status]}`}>
      <span className={styles.icon}>{msg.icon}</span>
      <span>{msg.text}</span>
    </div>
  );
}
