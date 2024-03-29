import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { authContext } from '../Context/Authprovider';


const AddProducts = () => {

    const [imageData, setImageData] = useState('')


    const { user } = useContext(authContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    

    const onSubmit = data => {

        

// If you give picture then the following route will be render =>



        const userName = user.displayName;
        const userEmail = user.email;
        const productName = data.name;
        const category = data.category;
        const image = imageData
        console.log('new Image' , image)
        const price = data.price;
        const location = data.location;
        const condition = data.condition;
        const number = data.mobileNumber;
        const description = data.description;

        const productInformation = {
            userName,
            userEmail,
            productName,
            category,
            price,
            location,
            condition,
            number,
            image,
            description,
        }



        fetch('https://last-assignment-server3.vercel.app/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productInformation)
        })
            .then(res => res.json())
            .then(newData => {
                console.log('data', newData)
                if (newData.acknowledged) {
                    toast.success('You Successfully Added the Product !')

                    if(data.image.length){
                        const image = data.image[0]
                        const formData = new FormData();
                        formData.append('image',image)
                        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
                        
                        fetch(url,{
                            method:'POST',
                            body:formData
                        })
                        .then(res =>res.json())
                        .catch(err =>console.log('err',err))
                        .then(imgData=>{
                            console.log('imgdata',imgData)
                            
                            if(imgData.success){
                                setImageData(imgData.data.url)
                            }
                        })
                    }
                }
                else {
                    toast.error(newData.message)
                }
            })


            

    };
    return (
        <div className='flex items-center justify-center mr-20 pr-20 h-screen'>
            <div className="flex flex-col max-w-md p-6 rounded-md shadow sm:p-10 light:bg-gray-900 light:text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Add A Product</h1>
                    <p className="text-sm dark:text-gray-400">You Can Add A Product Whatever You Want!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label for="text" className="block mb-2 text-sm">Product Name</label>
                            <input type="text" {...register("name", { required: true })} placeholder="Please Insert Product Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100" />
                            {errors.name && <span className='text-red-400'>{errors.name?.message}</span>}
                        </div>
                        <div>
                            <label for="text" className="block mb-2 text-sm">Product Category</label>
                            <select type="text" {...register("category", { required: true })} placeholder="Please Insert Product Category" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100">
                                <option>Samsung</option>
                                <option>VIVO</option>
                                <option>iPhone</option>
                                <option>Nokia</option>
                                <option>Motorola</option>
                               
                            </select>
                        </div>
                        <div>
                            <label for="text" className="block mb-2 text-sm">Price</label>
                            <input type="text" {...register("price", { required: true })} placeholder="Please Insert Product Price" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100" />
                        </div>
                        <div>
                            <label for="text" className="block mb-2 text-sm">Location</label>
                            <select {...register("location", { required: true })} className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100">
                                <option disabled>Please Select A Location</option>
                                <option>Dhaka</option>
                                <option>Rajshahi</option>
                                <option>Chattagram</option>
                                <option>Khulna</option>
                                <option>Barishal</option>
                                <option>Ranjpur</option>
                            </select>
                        </div>
                        <div>
                            <label for="text" className="block mb-2 text-sm">Product Condition</label>
                            <select {...register("condition", { required: true })} className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100">
                                <option disabled>Please Select A Condition</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                               
                            </select>
                        </div>
                    
                        <div>
                            <label for="number" className="block mb-2 text-sm">Mobile Number</label>
                            <input type="number" {...register("mobileNumber", { required: true })} placeholder="Please Insert Mobile Number" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100" />
                        </div>
                        <div>
                            <label for="image" className="block mb-2 text-sm">Product Image</label>
                            <input type="file" {...register("image", { required: true })} placeholder="Please Insert Mobile Number" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100" />
                        </div>
                        <div>
                            <label for="text" className="block mb-2 text-sm">Description</label>
                            <textarea name="text" {...register("description", { required: true })} placeholder="Please Write Some Description" className="w-full px-10 py-5 border rounded-md dark:border-gray-700 light:bg-gray-900 light:text-gray-100" />
                        </div>





                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Add Product</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;