import React from 'react';

function Filter({ filterText, onFilter }) {
  const handleChange = (e) => onFilter(e.target.value);

  return (
    <form className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={filterText}
        onChange={handleChange}
        className="form-control form-control-lg"
      />
    </form>
  );
}

export default Filter;
