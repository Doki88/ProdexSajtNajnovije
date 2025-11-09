import React, { useState } from 'react';

export default function CatalogSearchSelect({ onSelect }) {
   const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      //const res = await fetch(`http://localhost:5000/api/catalogs/search?q=${value}`);
      const res = await fetch(`https://prodexmd.ba/api//catalogs/search?q=${value}`);
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (catalog) => {
    if (!selected.find(c => c._id === catalog._id)) {
      const newSelected = [...selected, catalog];
      setSelected(newSelected);
      onSelect(newSelected); // Notify parent
    }
    setQuery('');
    setResults([]);
  };

  const removeSelected = (id) => {
    const newSelected = selected.filter(c => c._id !== id);
    setSelected(newSelected);
    onSelect(newSelected); // Notify parent
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={handleSearch}
        placeholder="Dodaj kataloge..."
      />
      {results.length > 0 && (
        <ul className="list-group position-absolute z-index-3">
          {results.map(catalog => (
            <li key={catalog._id} className="list-group-item list-group-item-action"
                onClick={() => handleSelect(catalog)}>
              {catalog.name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2">
        {selected.map(c => (
          <span key={c._id} className="badge bg-primary me-2">
            {c.name}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              onClick={() => removeSelected(c._id)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
}
