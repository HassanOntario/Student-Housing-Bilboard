'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUsersByStatus, updateApprovalStatus } from '@/lib/firestore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { UserProfile, ApprovalStatus } from '@/types';
import styles from './admin.module.css';

type Tab = 'pending' | 'approved' | 'rejected';

export default function AdminPage() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<Tab>('pending');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (status: Tab) => {
    setLoading(true);
    const data = await getUsersByStatus(status);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(tab);
  }, [tab]);

  const handleAction = async (uid: string, status: 'approved' | 'rejected') => {
    await updateApprovalStatus(uid, status);
    // Re-fetch the current tab
    fetchUsers(tab);
  };

  if (profile?.role !== 'admin') {
    return <p className={styles.empty}>Access denied. Admin only.</p>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner inline />
      ) : users.length === 0 ? (
        <p className={styles.empty}>No {tab} users.</p>
      ) : (
        <div className={styles.list}>
          {users.map((u) => (
            <div key={u.uid} className={styles.card}>
              <div className={styles.info}>
                <span className={styles.name}>
                  {u.displayName || 'No name'}
                </span>
                <span className={styles.detail}>{u.email}</span>
                <span className={styles.detail}>
                  Student # {u.studentNumber || '—'} · {u.phone || '—'}
                </span>
              </div>

              {tab === 'pending' && (
                <div className={styles.actions}>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAction(u.uid, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction(u.uid, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
