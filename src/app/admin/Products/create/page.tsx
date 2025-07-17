"use client"
import Form from "@/components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
    const router = useRouter()
    const steps = [
        {
            name: "Create Product",
            sections: [
                {
                    label: "Create Product",
                    fields: [
                        { name: "title", placeholder: "Title", type: "text" },
                        { name: "subTitle", placeholder: "Sub Title", type: "text" },
                        { name: "description", placeholder: "Description", type: "textarea" },
                        { name: "retailPrice", placeholder: "Retail Price", type: "number" },
                        { name: "displayPrice", placeholder: "Display Price", type: "number" },
                        {
                            name: "category", placeholder: "Category", type: "select", options: [
                                { label: "Garments", value: "GARMENTS" },
                                { label: "Footwear", value: "FOOTWEAR" },
                                { label: "Watches", value: "WATCHES" },
                            ]
                        },
                        { name: "subCategory", placeholder: "Sub Category", type: "text" },
                        {
                            name: "gender", placeholder: "Gender", type: "select", options: [
                                { label: "Male", value: "MALE" },
                                { label: "Female", value: "FEMALE" },
                                { label: "Unisex", value: "UNISEX" }
                            ]
                        },
                        {
                            name: "strapType", placeholder: "Strap Type", type: "select", options: [
                                { label: "Chain", value: "CHAIN" },
                                { label: "Belt", value: "BELT" },
                            ]
                        },
                        {
                            name: "variants",
                            placeholder: "Variants",
                            type: "nested-fields-array",
                            fields: [
                                { name: "dialColor", placeholder: "Dial Color", type: "color" },
                                { name: "strapColor", placeholder: "Strap Color", type: "color" },
                                { name: "stock", placeholder: "Stock", type: "number" },
                            ]
                        },
                        { name: "brandName", placeholder: "Brand", type: "text" },
                        {
                            type: 'file',
                            name: 'coverImage',
                            placeholder: 'Upload Cover Image',
                            col: 12,
                            multiple: false,
                        },
                        {
                            type: 'file',
                            name: 'images',
                            placeholder: 'Upload Image',
                            col: 12,
                            multiple: true,
                        },

                    ]
                },
            ]
        },
    ];
    // eslint-disable-next-line
    const handleFormSubmit = async (data: any) => {
        try {
            const formData = new FormData();

            // Append basic fields
            for (const key in data) {
                if (
                    key === 'images' && Array.isArray(data[key])
                ) {
                    data.images.forEach((file: File) => {
                        formData.append('images', file);
                    });
                } else if (key === 'coverImage') {
                    formData.append('coverImage', data[key]);
                } else if (key === 'variants') {
                    data.variants.forEach((variant, i) => {
                        formData.append(`variants[${i}][dialColor]`, variant.dialColor);
                        formData.append(`variants[${i}][strapColor]`, variant.strapColor);
                        formData.append(`variants[${i}][stock]`, variant.stock);
                    });

                } else {
                    // Append all other fields
                    formData.append(key, data[key]);
                }
            }

            // Append price object
            formData.append('price[retail]', data.retailPrice);
            formData.append('price[display]', data.displayPrice);



            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST_URL}/products`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            alert(`Product Created! \n Title: \t $${res.data.data.title}\n `);
            router.push("/admin");
            // eslint-disable-next-line
        } catch (error: any) {
            alert(error?.response?.data?.message || "Could not create product, please try again");
        }
    };


    return (
        <div className="flex-grow">
            <Form
                steps={steps}
                onSubmit={handleFormSubmit}
                submitButtonText="Create Product"
                nextButtonText="Continue"
                prevButtonText="Back"
                className='max-w-none px-[100px]'
            />
        </div>
    );
};

export default CreateProductPage