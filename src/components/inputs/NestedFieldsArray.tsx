"use client";
import React from "react";

const NestedFieldsArray = ({ field, formData, setFormData }) => {
    const nestedValues = formData[field.name] || [];

    const handleChange = (index, key, value) => {
        const updated = [...nestedValues];
        updated[index] = {
            ...updated[index],
            [key]: value,
        };
        setFormData((prev) => ({
            ...prev,
            [field.name]: updated,
        }));
    };

    const addGroup = () => {
        const newGroup = {};
        field.fields.forEach((f) => {
            newGroup[f.name] = f.type === "number" ? 0 : "";
        });
        setFormData((prev) => ({
            ...prev,
            [field.name]: [...(prev[field.name] || []), newGroup],
        }));
    };

    const removeGroup = (index) => {
        const updated = nestedValues.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            [field.name]: updated,
        }));
    };

    return (
        <div className="col-span-12 space-y-4 border border-gray-300 p-4 rounded-md">
            <label className="font-medium text-gray-700 text-sm">{field.placeholder}</label>
            {nestedValues.map((group, index) => (
                <div key={index} className="flex gap-4 ">
                    {field.fields.map((nestedField, i) => (
                        <div key={i} className="flex-grow">
                        <input
                            type={nestedField.type}
                            value={group[nestedField.name] || ""}
                            onChange={(e) => handleChange(index, nestedField.name, e.target.value)}
                            placeholder={nestedField.placeholder}
                            className="w-full h-full px-3 py-2 border border-gray-300 rounded"
                        />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => removeGroup(index)}
                        className="text-red-500 font-semibold text-xl"
                        title="Remove"
                    >
                        &times;
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + Add Variant
            </button>
        </div>
    );
};

export default NestedFieldsArray;
