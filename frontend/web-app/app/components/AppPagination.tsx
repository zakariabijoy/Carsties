'use client'
import React from 'react'
import { Pagination } from "flowbite-react";

type Props = {
    currentPage: number;
    pageCount: number;
    pageChanged: (page:number) => void;
}
export default function AppPagination({currentPage, pageCount, pageChanged}:Props) {
    return (
    <Pagination 
        currentPage={currentPage} 
        totalPages={pageCount} 
        onPageChange={(e:any) => pageChanged(e)} 
        className='text-blue-500 mb-5'
    />
    )
}
