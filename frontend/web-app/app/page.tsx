import Listing from "./auctions/Listing";

export default function Home() {
  return (
    <div>
      <h3 className='text-3xl font-semibold'>
        <Listing/>
      </h3>
    </div>
  )
}
