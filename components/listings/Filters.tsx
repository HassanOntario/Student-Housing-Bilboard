'use client';

import { useState, type FormEvent } from 'react';
import type { ListingFilters, ListingType, ResidenceArea } from '@/types';
import styles from './Filters.module.css';

interface FiltersProps {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const [local, setLocal] = useState<ListingFilters>(filters);

  const apply = (e?: FormEvent) => {
    e?.preventDefault();
    onChange(local);
  };

  const reset = () => {
    const cleared: ListingFilters = {};
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
          placeholder="Address, title…"
          value={local.search ?? ''}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
        />
      </div>

      {/* Type */}
      <div className={styles.group}>
        <label className="label" htmlFor="filter-type">
          Type
        </label>
        <select
          id="filter-type"
          className="input"
          value={local.type ?? ''}
          onChange={(e) =>
            setLocal({ ...local, type: e.target.value as ListingType | '' })
          }
        >
          <option value="">All types</option>
          <option value="room">Room</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
        </select>
      </div>

      {/* Residence Area */}
      <div className={styles.group}>
        <label className="label" htmlFor="filter-area">
          Location
        </label>
        <select
          id="filter-area"
          className="input"
          value={local.residenceArea ?? ''}
          onChange={(e) =>
            setLocal({
              ...local,
              residenceArea: e.target.value as ResidenceArea | '',
            })
          }
        >
          <option value="">All locations</option>
          <option value="near-campus">Near Campus</option>
          <option value="downtown">Downtown</option>
          <option value="old-north">Old North</option>
          <option value="masonville">Masonville</option>
          <option value="other">Other</option>
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

      {/* Bedrooms */}
      <div className={styles.group}>
        <label className="label" htmlFor="filter-bedrooms">
          Bedrooms (min)
        </label>
        <input
          id="filter-bedrooms"
          className="input"
          type="number"
          placeholder="Any"
          min={0}
          value={local.bedrooms ?? ''}
          onChange={(e) =>
            setLocal({
              ...local,
              bedrooms: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
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
