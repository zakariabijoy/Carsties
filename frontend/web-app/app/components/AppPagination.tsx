'use client'
import React, { useState } from 'react'
import { Pagination } from "flowbite-react";

type Props = {
    currentPage: number;
    pageCount: number;
}
export default function AppPagination({currentPage, pageCount}:Props) {
    const [pageNumber, setPageNumber] = useState(currentPage);
    return (
    <Pagination 
        currentPage={pageNumber} 
        totalPages={pageCount} 
        onPageChange={(e:any) => setPageNumber(e)} 
        className='text-blue-500 mb-5'
    />
    )
}
