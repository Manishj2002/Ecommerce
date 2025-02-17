import React, { useState } from 'react'
import { useGetTopProductQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import SmallProduct from './SmallProduct'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
    const { data, isLoading } = useGetTopProductQuery()
    console.log(data)
    const [activeTab, setActiveTab] = useState(1)

    if (isLoading) {
        return <Loader />
    }

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <section className='mt-5'>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`} onClick={() => handleTabClick(1)}>
                    Write a review
                </div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`} onClick={() => handleTabClick(2)}>
                    All reviews
                </div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ""}`} onClick={() => handleTabClick(3)}>
                    Related products
                </div>
            </section>

            <section>
                {activeTab === 1 && (
                    <div className='mt-4'>
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className='my-2'>
                                    <label htmlFor="rating" className='block text-xl mb-2'>Rating</label>
                                    <select id="rating" required value={rating} onChange={(e) => setRating(e.target.value)} className='p-2 xl:w-[40rem] rounded-lg border text-black'>
                                        <option value=""></option>
                                        <option value="1">Inferior</option>
                                        <option value="2">Decent</option>
                                        <option value="3">Great</option>
                                        <option value="4">Excellent</option>
                                        <option value="5">Exceptional</option>
                                    </select>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="comment" className='block text-xl mb-2'>Comment</label>
                                    <textarea id="comment" rows={3} required value={comment} onChange={(e) => setComment(e.target.value)} className='p-2 xl:w-[40rem] rounded-lg border text-black'></textarea>
                                    <button type='submit' disabled={loadingProductReview} className='bg-pink-600 px-4 py-2 rounded-lg text-white'>Submit</button>
                                </div>
                            </form>
                        ) : (
                            <p>Please <Link to='/login'>Sign In</Link> to write a review</p>
                        )}
                    </div>
                )}
            </section>

            <section>
                {activeTab === 2 && (
                    <>
                        <div>
                            {product?.reviews?.length === 0 && <p>No Reviews</p>}
                        </div>
                        <div>
                            {product?.reviews?.map((review) => (
                                <div key={review._id} className='bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem]'>
                                    <div className='flex justify-between'>
                                        <strong className='text-[#B0B0B0]'>{review.name}</strong>
                                        <p className='text-[#B0B0B0]'>{review.createdAt ? review.createdAt.substring(0, 10) : 'Date not available'}</p>
                                    </div>
                                    <p className='my-4'>{review.comment}</p>
                                    <Ratings value={review.rating} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>

            <section>
                {activeTab === 3 && (
                    <section className='ml-4 flex flex-wrap'>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            data?.map((product) => (
                                <SmallProduct key={product._id} product={product} />
                            ))
                        )}
                    </section>
                )}
            </section>
        </div>
    )
}

export default ProductTabs
