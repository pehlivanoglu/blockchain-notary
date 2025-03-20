import React from 'react';

const DynamicField = ({ field, onRemove, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.name}
        </label>
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={field.value}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={`Enter ${field.name}`}
      />
    </div>
  );
}

export default DynamicField;