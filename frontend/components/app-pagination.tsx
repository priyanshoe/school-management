'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Post {
  id: number;
  body: string;
}


export function PaginationList(props:{
        data: any[];
        start: number;
        setStart: (val: number) => void;
        end: number;
        setEnd: (val: number) => void;
        rows: number
    }){
      
      return (
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                props.start === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                props.setStart(props.start - props.rows);//35
                props.setEnd(props.end - props.rows);//42
              }} />
          </PaginationItem>
          
        <PaginationItem>
          <PaginationLink href="#" >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-purple-300" href="#" isActive>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                props.end >= props.data.length ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                props.setStart(props.start + props.rows); //7,14,21,28,35,42,
                props.setEnd(props.end + props.rows); //14,21,28,35,42,49
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}
