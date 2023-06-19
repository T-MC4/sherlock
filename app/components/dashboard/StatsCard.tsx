import KPIItem from "./KPIItem"
import type { FC } from 'react'
import type { StatType } from "~/interfaces"

interface Props {
  data: StatType
  onOpenModal: any
}

const StatsCard: FC<Props> = ({data, onOpenModal}) => {
  return (
  <div className="px-2 mx-auto mt-8 mb-10 max-w-[360px]">
    <div className="text-xl font-bold text-center"><strong>{data.title}</strong></div>
    <div className="mt-8 w-full mx-auto">
      {data.kpiList.map((item, index) => (
        <div key={index} onClick={() => onOpenModal(item)}>
          <KPIItem data={item} />
        </div>
      ))}
    </div>
  </div>
  )
}

export default StatsCard
