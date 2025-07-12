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
                    ]
                },
            ]
        },
    ];
    // eslint-disable-next-line
    const handleFormSubmit = async (data: any) => {
        try {
            console.log('Form submitted with data:', data);
            const res = await axios({
                method: "post",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/products",
                data: {
                    ...data, price: { retail: data.retailPrice, display: data.displayPrice }
                },
            })
            alert(`Product Created! \n Title: \t $${res.data.data.title}\n `);
            router.push("/admin/Products")
            // eslint-disable-next-line
        } catch (error: any) {
            alert(error?.response?.data?.message || "Could not create product please try again")
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