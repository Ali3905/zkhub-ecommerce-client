"use client"
import { DynamicField, FormField, NestedFieldsArray } from "@/components/Form";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            variants: []
        }
    });

    const categoryOptions = [
        { value: 'airpods', label: 'Air Pods' },
        { value: 'mobileCovers', label: 'Mobile Covers' },
        { value: 'cables', label: 'Cables' },
        { value: 'chargers', label: 'Chargers' },
    ];

    const formFields = [
        { name: "title", placeholder: "Title", type: "text", validations: { required: "Title is required" } },
        { name: "subTitle", placeholder: "Sub Title", type: "text", validations: { required: "Sub title is required" } },
        { name: "description", placeholder: "Description", type: "textarea", validations: { required: "Description is required" } },
        { name: "price.retail", placeholder: "Retail Price", type: "number", validations: { required: "Retail price is required", min: { value: 0, message: "Price must be positive" } } },
        { name: "price.display", placeholder: "Display Price", type: "number", validations: { required: "Display price is required", min: { value: 0, message: "Price must be positive" } } },
        { name: "category", placeholder: "Category", type: "select", validations: { required: "Category is required" }, options: categoryOptions },
        { name: "subCategory", placeholder: "Sub Category", type: "text", validations: { required: "Sub category is required" } },
        { name: "brandName", placeholder: "Brand", type: "text", validations: { required: "Brand name is required" } },
        { name: 'coverImage', placeholder: 'Upload Cover Image', type: 'file', multiple: false, validations: { required: "Cover image is required" } },
        { name: 'images', placeholder: 'Upload Images', type: 'file', multiple: true, validations: { required: "Product images are required" } },
    ];

    const variantsField = {
        name: "variants",
        placeholder: "Variants",
        type: "nested-fields-array",
        fields: [
            { name: "color", placeholder: "Color", type: "color", validations: { required: "Color is required" } },
            { name: "model", placeholder: "Model", type: "text" },
            { name: "stock", placeholder: "Stock", type: "number", validations: { required: "Stock is required", min: { value: 0, message: "Stock must be non-negative" } } },
        ],
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Append basic fields
            for (const key in data) {
                if (key === 'images' && Array.isArray(data[key])) {
                    data.images.forEach((file) => {
                        formData.append('images', file);
                    });
                } else if (key === 'coverImage') {
                    formData.append('coverImage', data[key]);
                } else if (key === 'variants') {
                    data.variants.forEach((variant, i) => {
                        formData.append(`variants[${i}][color]`, variant.color);
                        formData.append(`variants[${i}][model]`, variant.model);
                        formData.append(`variants[${i}][stock]`, variant.stock);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }

            // Append price object
            formData.append('price[retail]', data.price.retail);
            formData.append('price[display]', data.price.display);

            // Simulate API call
            //   await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await axios({
                method: "post",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/products",
                data: formData,
            })

            alert(`Product Created Successfully!\nTitle: ${res.data.data.title}`);
            reset();
        } catch (error) {
            alert("Could not create product, please try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
                <p className="text-gray-600 mt-2">Fill in the details to create a new product</p>
            </div>

            <div className="space-y-8">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                        <div key={field.name} className={field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}>
                            <FormField
                                label={field.placeholder}
                                required={field.validations?.required}
                                error={errors[field.name]}
                            >
                                <DynamicField
                                    field={field}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                />
                            </FormField>
                        </div>
                    ))}
                </div>

                {/* Variants Section */}
                <div className="border-t pt-8">
                    <NestedFieldsArray
                        field={variantsField}
                        control={control}
                        register={register}
                        errors={errors}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {isSubmitting && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{isSubmitting ? 'Creating...' : 'Create Product'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProductPage;