'use client';

import { useState, type FormEvent } from 'react';
import type { ResidenceFilters, ResidenceStyle } from '@/types';
import styles from './Filters.module.css';

interface FiltersProps {
  filters: ResidenceFilters;
  onChange: (filters: ResidenceFilters) => void;
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const [local, setLocal] = useState<ResidenceFilters>(filters);

  const apply = (e?: FormEvent) => {
    e?.preventDefault();
    onChange(local);
  };

  const reset = () => {
    const cleared: ResidenceFilters = {};
    setLocal(cleared);
    onChange(cleared);
  };

  return (
    <form className={styles.sidebar} onSubmit={apply}>
      <h2 className={styles.title}>Filters</h2>

      {/* Search */}
      <div className={styles.group}>
        <label className="label" htmlFor="filter-search">
          Search
        </label>
        <input
          id="filter-search"
          className="input"
          type="text"
          placeholder="Name, description…"
          value={local.search ?? ''}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
        />
      </div>

      {/* Residence Style */}
      <div className={styles.group}>
        <label className="label" htmlFor="filter-style">
          Residence Style
        </label>
        <select
          id="filter-style"
          className="input"
          value={local.style ?? ''}
          onChange={(e) =>
            setLocal({ ...local, style: (e.target.value as ResidenceStyle) || '' })
          }
        >
          <option value="">All styles</option>
          <option value="traditional">Traditional</option>
          <option value="traditional-plus">Traditional Plus</option>
          <option value="suite">Suite</option>
          <option value="studio">Studio</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>

      {/* Price range */}
      <div className={styles.group}>
        <label className="label">Price Range ($/mo)</label>
        <div className={styles.row}>
          <input
            className="input"
            type="number"
            placeholder="Min"
            min={0}
            value={local.minPrice ?? ''}
            onChange={(e) =>
              setLocal({
                ...local,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Max"
            min={0}
            value={local.maxPrice ?? ''}
            onChange={(e) =>
              setLocal({
                ...local,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary">
          Apply
        </button>
        <button type="button" className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  );
}
