import CarImage from "./CarImage"
import CountdownTimer from "./CountdownTimer"

type Props ={
    auction: any
}

export default function AuctionCard({auction} : Props) {
  return (
    <a href="#" className="group">
        <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
            <div>
                <CarImage imageUrl={auction.imageUrl}/>
                <div className="absolute bottom-0 left-2">
                    <CountdownTimer auctionEnd={auction.auctionEnd}/>
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm">{auction.year}</p>
        </div>
    </a>
  )
}
