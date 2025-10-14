"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Card {
  id: string
  imageUrl: string
  alt: string
  title: string
}

interface CardContextType {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

export function CardProvider({ children }: { children: ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    {
      id: "1",
      imageUrl:
        "https://i.ibb.co/4ZWcP129/1.png",
      alt: "Elegant Invitation",
      title: "Elegant Invitation",
    },
    {
      id: "2",
      imageUrl:
        "https://i.ibb.co/TMbhBRcL/2.png",
      alt: "Modern Design",
      title: "Modern Design",
    },
    {
      id: "3",
      imageUrl:
        "https://i.ibb.co/spXBFdSm/3.png",
      alt: "Vintage Style",
      title: "Vintage Style",
    },
    {
      id: "4",
      imageUrl:
        "https://i.ibb.co/N2TCN0bC/4.png",
      alt: "Minimalist",
      title: "Minimalist",
    },
    {
      id: "5",
      imageUrl:
        "https://i.ibb.co/jZkh6q1M/5.png",
      alt: "Floral Design",
      title: "Floral Design",
    },
    {
      id: "6",
      imageUrl:
        "https://i.ibb.co/6cc7mksr/6.png",
      alt: "Geometric",
      title: "Geometric",
    },
    {
      id: "7",
      imageUrl:
        "https://i.ibb.co/bjV35jNQ/7.png",
      alt: "Luxury Gold",
      title: "Luxury Gold",
    },
    {
      id: "8",
      imageUrl:
        "https://i.ibb.co/PZ7WLs7g/8.png",
      alt: "Rustic Style",
      title: "Rustic Style",
    },
    {
      id: "9",
      imageUrl:
        "https://i.ibb.co/qLR5bQRM/9.png",
      alt: "Dark Modern",
      title: "Dark Modern",
    },
    {
      id: "10",
      imageUrl:
        "https://i.ibb.co/PdNhw3K/10.png",
      alt: "Colorful Party",
      title: "Colorful Party",
    },
    {
      id: "11",
      imageUrl:
        "https://i.ibb.co/zWpN1nqJ/11.png",
      alt: "Geometric",
      title: "Geometric",
    },
    {
      id: "12",
      imageUrl:
        "https://i.ibb.co/fVYnCXgR/12.png",
      alt: "Luxury Gold",
      title: "Luxury Gold",
    },
    {
      id: "13",
      imageUrl:
        "https://i.ibb.co/1G6jZWcZ/13.png",
      alt: "Rustic Style",
      title: "Rustic Style",
    },
    {
      id: "14",
      imageUrl:
        "https://i.ibb.co/xKG7m905/14.png",
      alt: "Dark Modern",
      title: "Dark Modern",
    },
    {
      id: "15",
      imageUrl:
        "https://i.ibb.co/7dJzR3xK/15.png",
      alt: "Colorful Party",
      title: "Colorful Party",
    },
    {
      id: "16",
      imageUrl:
        "https://i.ibb.co/NdJ1csXB/16.png",
      alt: "Elegant Script",
      title: "Elegant Script",
    },
    {
      id: "17",
      imageUrl:
        "https://i.ibb.co/8L2Sdt5Q/17.png",
      alt: "Watercolor Art",
      title: "Watercolor Art",
    },
    {
      id: "18",
      imageUrl:
        "https://i.ibb.co/mC1zxJYq/18.png",
      alt: "Botanical",
      title: "Botanical",
    },
    {
      id: "19",
      imageUrl:
        "https://i.ibb.co/wryzsKs4/20.png",
      alt: "Art Deco",
      title: "Art Deco",
    },
    {
      id: "20",
      imageUrl:
        "https://i.ibb.co/1fvnxL3L/19.png",
      alt: "Marble Luxury",
      title: "Marble Luxury",
    },
  ]

  return <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>{children}</CardContext.Provider>
}

export function useCard() {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error("useCard must be used within a CardProvider")
  }
  return context
}
