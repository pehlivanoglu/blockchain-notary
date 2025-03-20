import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import DynamicField from '../components/forms/DynamicField';
import AddFieldModal from '../components/forms/AddFieldModal';
import { createTransaction } from '../services/transaction';

const NewTransaction = () => {
  const [formData, setFormData] = useState({
    composerRole: '',
    recipientRole: '',
    recipientNid: '',
    recipientFullName: '',
    recipientPhoneNumber: '',
  });

  const [dynamicFields, setDynamicFields] = useState([
    // { id: 'field-name', name: 'Field Name', value: '' },
    // { id: 'field-value', name: 'Field Value', value: '' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddField = (fieldName, fieldValue) => {
    setDynamicFields(prev => [
      ...prev,
      { id: Date.now(), name: fieldName, value: fieldValue }
    ]);
  };

  const handleRemoveField = (id) => {
    // Prevent removing default fields
    if (id === 'field-name' || id === 'field-value') {
      toast.error('Cannot remove default fields');
      return;
    }
    setDynamicFields(prev => prev.filter(field => field.id !== id));
  };

  const handleDynamicFieldChange = (id, value) => {
    setDynamicFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dynamicData = {};
    dynamicFields.forEach(field => {
      dynamicData[field.name] = field.value;
    });

    const transactionData = {
      formData,
      fields : dynamicData
    };

    try {
      await createTransaction(transactionData);
      toast.success('Transaction request sent successfully!');
      // Reset form
      setFormData({
        composerRole: '',
        recipientRole: '',
        recipientNid: '',
        recipientFullName: '',
        recipientPhoneNumber: '',
      });
      // Reset dynamic fields to default values
      setDynamicFields([
        // { id: 'field-name', name: 'Field Name', value: '' },
        // { id: 'field-value', name: 'Field Value', value: '' }
      ]);
    } catch (error) {
      toast.error(error.message || 'Failed to create transaction');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Composer Role
            </label>
            <input
              type="text"
              name="composerRole"
              value={formData.composerRole}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Role
            </label>
            <input
              type="text"
              name="recipientRole"
              value={formData.recipientRole}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient TCKN
            </label>
            <input
              type="text"
              name="recipientNid"
              value={formData.recipientNid}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Full Name
            </label>
            <input
              type="text"
              name="recipientFullName"
              value={formData.recipientFullName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Phone Number
            </label>
            <input
              type="tel"
              name="recipientPhoneNumber"
              value={formData.recipientPhoneNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Additional Fields</h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Field
            </button>
          </div>

          {dynamicFields.map(field => (
            <DynamicField
              key={field.id}
              field={field}
              onRemove={handleRemoveField}
              onChange={handleDynamicFieldChange}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Transaction
        </button>
      </form>

      <AddFieldModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddField}
      />
    </div>
  );
};

export default NewTransaction;