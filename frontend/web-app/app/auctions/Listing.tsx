'use client'
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import { Auction, PagedResult } from "@/types";
import { getData } from "../actions/auctionAction";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import qs from 'query-string';


export default function Listing() {
    const [data, setData] = useState<PagedResult<Auction>>();
    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    }));
    
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params});
    
    function setPageNumber(pageNumber: number){
        setParams({pageNumber});
    }

    useEffect(() => {
        getData(url).then(data =>{
            setData(data);
        })
    },[url]);

    if(!data) return <p>Loading...</p>;

    return (
        <>
            <Filters/>
            <div className="grid grid-cols-4 gap-6">
                {data.results.map((auction:any) => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}      
            </div>
            <div className="flex justify-center mt-4">
                <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount} pageChanged={setPageNumber}/>
            </div>
        </>
        
    )
}
