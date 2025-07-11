import Form from "@/components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
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
                        { name: "price", placeholder: "Price", type: "number" },
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
                                { label: "Kids", value: "KIDS" }
                            ]
                        },
                    ]
                },
            ]
        },
    ];

    const handleFormSubmit = async (data: any) => {
        try {
            console.log('Form submitted with data:', data);
            const res = await axios({
                method: "post",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/products",
                data,
            })
            alert(`Product Created! \n Title: \t $${res.data.data.title}\n `);
            router.push("/")
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

export default Create