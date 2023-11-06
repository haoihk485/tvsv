import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid"

const Pagination = ({ pageHandle, page, totalPage }) => {
    return (
        <div>
            {totalPage && <div className='flex justify-center items-center mt-3'>
                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${((totalPage <= 3 || page === 0) ? "hidden" : "")}`}
                    onClick={() => { pageHandle('first') }}>
                    <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
                </button>
                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === 0) ? "hidden" : ""}`}
                    onClick={() => { pageHandle('prev') }}>{page}</button>
                <button className='bg-[#C12C85] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#C12C85]/80'>{page + 1}</button>
                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === totalPage - 1) ? "hidden" : ""}`}
                    onClick={() => { pageHandle('next') }}>{page + 2}</button>
                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${((totalPage <= 3 || page === totalPage - 1) ? "hidden" : "")}`}
                    onClick={() => { pageHandle('final') }}>
                    <ChevronDoubleRightIcon></ChevronDoubleRightIcon>
                </button>
            </div>}
        </div>
    )
}

export default Pagination