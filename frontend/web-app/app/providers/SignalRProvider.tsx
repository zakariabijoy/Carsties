"use client";

import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import { getDetailedViewData } from "../actions/auctionAction";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

type Props = {
  children: ReactNode;
  user: User | null;
};
export default function SignalRProvider({ children, user }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to notofication hub");

          connection.on("BidPlaced", (bid: Bid) => {
            console.log("Bid placed event received");
            if (bid.bidStatus.includes("Accepted")) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }
            addBid(bid);
          });

          connection.on("AuctionCreated", (auction: Auction) => {
            if (user?.username !== auction.seller) {
              return toast(<AuctionCreatedToast auction={auction} />, {
                duration: 10000,
              });
            }
          });
        })
        .catch((err) => console.log(err));

      connection.on("AuctionFinished", (finishedAuction: AuctionFinished) => {
        console.log("Auction finished event received");
        const auction = getDetailedViewData(finishedAuction.auctionId);
        return toast.promise(
          auction,
          {
            loading: "Loading",
            success: (auction) => (
              <AuctionFinishedToast
                finishedAuction={finishedAuction}
                auction={auction}
              />
            ),
            error: (err) => "Auction finished!",
          },
          { success: { duration: 10000, icon: null } }
        );
      });
    }

    return () => {
      connection?.stop;
    };
  }, [connection, setCurrentPrice, addBid, user?.username]);

  return children;
}
