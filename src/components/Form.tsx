import React, { useEffect, useState } from 'react';
import NestedFieldsArray from './inputs/NestedFieldsArray';

const InputField = ({ field, formData, setFormData, errors, handleChange, value }) => {
    const { name, placeholder, type, options, col } = field;
    const [previews, setPreviews] = useState([]);


    const baseInputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
    const errorClasses = errors[name] ? "border-red-500 focus:ring-red-500" : "";

    // const handleChange = (e) => {
    //     const value = type === 'checkbox' ? e.target.checked : e.target.value;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        value={formData[name] || ''}
                        onChange={(e) => handleChange(name, e.target.value)}
                        className={`${baseInputClasses} ${errorClasses} bg-white`}
                    >
                        <option value="">{placeholder}</option>
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        value={formData[name] || ''}
                        placeholder={placeholder}
                        rows={4}
                        onChange={(e) => handleChange(name, e.target.value)}
                        className={`${baseInputClasses} ${errorClasses} resize-vertical`}
                    />
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData[name] || false}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-gray-700 font-medium">{placeholder}</label>
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{placeholder}</label>
                        {options?.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={formData[name] === option.value}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label className="text-gray-700">{option.label}</label>
                            </div>
                        ))}
                    </div>
                );
            case 'file':
                const isMultiple = field.multiple || false;
                return (
                    <div>
                        <input
                            type="file"
                            multiple={isMultiple}
                            accept="image/*"
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const previews = files.map(file => URL.createObjectURL(file));
                                handleChange(name, isMultiple ? files : files[0]);
                                setPreviews(previews);
                            }}
                            className={`${baseInputClasses} ${errorClasses}`}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {previews?.map((src, idx) => (
                                <img key={idx} src={src} alt="preview" className="h-20 rounded object-cover" />
                            ))}
                        </div>
                    </div>
                );

            case "nested-fields-array":
                return (
                    <NestedFieldsArray
                        field={field}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            default:
                return (
                    <input
                        type={type}
                        value={value || formData[name] || ''}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(name, e.target.value)}
                        className={`${baseInputClasses} ${errorClasses}`}
                    />
                );
        }
    };

    return (
        <div style={{ "grid-column": col ? ` span ${col}` : 'span 12' }}>
            {renderInput()}
            {
                errors[name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
                )
            }
        </div >
    );
};

const Form = ({
    steps = [],
    onSubmit,
    submitButtonText = "Submit",
    nextButtonText = "Next",
    prevButtonText = "Previous",
    className = ""
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        variants: [{
            dialColor: "#000",
            strapColor: "#000",
            stock: 0
        }]
    });
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateCurrentStep = () => {
        const currentStepData = steps[currentStep];
        const newErrors = {};
        let isValid = true;

        currentStepData.sections.forEach(section => {
            section.fields.forEach(field => {
                if (field.type !== 'checkbox' && (!formData[field.name] === '')) {
                    newErrors[field.name] = `${field.placeholder} is required`;
                    isValid = false;
                }
            });
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateCurrentStep() && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setErrors({});
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handleSubmit = () => {
        if (validateCurrentStep()) {
            if (onSubmit) {
                onSubmit(formData);
            } else {
                console.log('Form Data:', formData);
            }
        }
    };

    useEffect(() => {
        console.log({ formData });
    }, [formData])

    const showStepNavigation = steps.length > 1;

    return (
        <div className={`max-w-2xl mx-auto py-6 bg-white ${className}`}>
            {/* Step Navigation */}
            {showStepNavigation && (
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`text-sm uppercase tracking-wide ${index === currentStep
                                    ? 'font-bold text-gray-900 border-b-2 border-blue-500 pb-2'
                                    : 'font-medium text-gray-500'
                                    }`}
                            >
                                {step.name}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Form Content */}
            <div className="space-y-8">
                {steps[currentStep]?.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            {section.label}
                        </h3>
                        <div className="grid grid-cols-12 gap-4">
                            {section.fields.map((field, fieldIndex) => (
                                <InputField
                                    key={fieldIndex}
                                    field={field}
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleChange={handleChange}
                                    errors={errors}
                                />
                            )
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center pt-6">
                    <div>
                        {showStepNavigation && currentStep > 0 && (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                {prevButtonText}
                            </button>
                        )}
                    </div>

                    <div>
                        {showStepNavigation && currentStep < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                            >
                                <span>{nextButtonText}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-gray-400 text-white rounded-lg cursor-pointer"
                            >
                                {submitButtonText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form