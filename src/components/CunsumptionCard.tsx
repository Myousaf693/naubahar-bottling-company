import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { ConsumptionCardPropsType } from '@/lib/interfaces/types';
const CunsumptionCard:React.FC<ConsumptionCardPropsType> = (props) => {
  const extractColor = props.iconcolor.split('-').slice(1).join('-');
  return (
    <div className={`bg-white border-l-3 dark:bg-gray-400 dark:text-white border-${extractColor} w-[23%] hover:scale-102 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-400 cursor-pointer`}>
      <div className="mb-4 flex items-center text-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium dark:text-white">{props.period}</h3>
        <span
          className={`flex items-center p-1 rounded-full text-xs font-medium ${props.direction ==="Up" ? 'bg-green-200 text-green-700': 'bg-red-200 text-red-700'}`}
        >
          {props.direction ==="Up" ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
           
          {props.percentage}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className={props.iconcolor}>
          <props.icon size={40}/>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-[#1F5897] dark:text-white">{props.value}</div>
          <div className="text-gray-500 text-sm dark:text-white">{props.unit}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-gray-500">
        <span className='text-xs dark:text-white'>{props.updated}</span>
      </div>
    </div>
  )
}

export default CunsumptionCard
