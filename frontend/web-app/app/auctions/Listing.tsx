'use client'
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import { Auction } from "@/types";
import { getData } from "../actions/auctionAction";
import Filters from "./Filters";


export default function Listing() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    
    useEffect(() => {
        getData(pageNumber, pageSize).then(data =>{
            setAuctions(data.results);
            setPageCount(data.pageCount);
        })
    },[pageNumber, pageSize]);

    if(auctions.length === 0) return (<div><h3>Loading...</h3></div>)

    return (
        <>
            <Filters pageSize={pageSize} setPageSize={setPageSize}/>
            <div className="grid grid-cols-4 gap-6">
                {auctions.map((auction:any) => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}      
            </div>
            <div className="flex justify-center mt-4">
                <AppPagination currentPage={pageNumber} pageCount={pageCount} pageChanged={setPageNumber}/>
            </div>
        </>
        
    )
}
