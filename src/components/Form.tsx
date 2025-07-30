import React, { useState } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';

// Form Field Components
export const FormField = ({ label, error, children, required = false }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
);

export const TextInput = ({ placeholder, error, ...props }) => (
    <input
        {...props}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
            }`}
    />
);

export const TextArea = ({ placeholder, error, ...props }) => (
    <textarea
        {...props}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${error ? 'border-red-500' : 'border-gray-300'
            }`}
    />
);

export const Select = ({ placeholder, options, error, ...props }) => (
    <select
        {...props}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
            }`}
    >
        <option value="">{placeholder}</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

export const FileInput = ({ multiple, accept = "image/*", error, onChange }) => {
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        onChange(multiple ? files : files[0]);

        // Create previews
        const newPreviews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setPreviews(multiple ? newPreviews : newPreviews.slice(0, 1));
    };

    const removeFile = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);

        if (multiple) {
            const newFiles = previews.filter((_, i) => i !== index).map(p => p.file);
            onChange(newFiles);
        } else {
            onChange(null);
        }
    };

    return (
        <div className="space-y-3">
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${error ? 'border-red-300' : 'border-gray-300'
                }`}>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                    <label className="cursor-pointer">
                        <span className="text-sm text-gray-600">
                            Click to upload {multiple ? 'images' : 'image'}
                        </span>
                        <input
                            type="file"
                            multiple={multiple}
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative">
                            <Image
                                src={preview.url}
                                alt={`Preview ${index}`}
                                width={24}
                                height={24}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const ColorInput = ({ error, ...props }) => (
    <div className="flex items-center space-x-2">
        <input
            {...props}
            type="color"
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
        />
        <input
            {...props}
            type="text"
            placeholder="#000000"
            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                }`}
        />
    </div>
);

// Dynamic Field Renderer
export const DynamicField = ({ field, register, control, errors }) => {
    const error = errors[field.name];
    const commonProps = {
        ...register(field.name, field.validations),
        placeholder: field.placeholder,
        error
    };

    switch (field.type) {
        case 'text':
            return <TextInput {...commonProps} />;

        case 'textarea':
            return <TextArea {...commonProps} />;

        case 'number':
            return <TextInput {...commonProps} type="number" />;

        case 'select':
            return <Select {...commonProps} options={field.options} />;

        case 'color':
            return (
                <Controller
                    name={field.name}
                    control={control}
                    rules={field.validations}
                    render={({ field: controllerField }) => (
                        <ColorInput {...controllerField} error={error} />
                    )}
                />
            );

        case 'file':
            return (
                <Controller
                    name={field.name}
                    control={control}
                    rules={field.validations}
                    render={({ field: controllerField }) => (
                        <FileInput
                            multiple={field.multiple}
                            error={error}
                            onChange={controllerField.onChange}
                            value={controllerField.value}
                        />
                    )}
                />
            );

        default:
            return <TextInput {...commonProps} />;
    }
};

// Nested Fields Array Component
export const NestedFieldsArray = ({ field, control, register, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: field.name
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{field.placeholder}</h3>
                <button
                    type="button"
                    onClick={() => {
                        const emptyObject = field.fields.reduce((acc, f) => {
                            acc[f.name] = '';
                            return acc;
                        }, {});
                        append(emptyObject);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add {field.placeholder.slice(0, -1)}</span>
                </button>
            </div>

            {fields.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">{field.placeholder.slice(0, -1)} {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {field.fields.map((nestedField) => (
                            <FormField
                                key={nestedField.name}
                                label={nestedField.placeholder}
                                required={nestedField.validations?.required}
                                error={errors[field.name]?.[index]?.[nestedField.name]}
                            >
                                <DynamicField
                                    field={{
                                        ...nestedField,
                                        name: `${field.name}.${index}.${nestedField.name}`
                                    }}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                />
                            </FormField>
                        ))}
                    </div>
                </div>
            ))}

            {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No {field.placeholder.toLowerCase()} added yet. Click &quot;Add {field.placeholder.slice(0, -1)}&quot; to get started.
                </div>
            )}
        </div>
    );
};