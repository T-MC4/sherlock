import type { FC } from 'react'
import type { KPIType } from '~/interfaces'
import * as Icons from 'react-icons/bs'
import { FONT_SIZE_BREAKPOINTS } from '~/constants/data'

type IconType = keyof typeof Icons

interface Props {
  data: KPIType
}

const KPIItem: FC<Props> = ({data}) => {
  const Icon = Icons[data.icon as IconType]
  const valueFontSize = FONT_SIZE_BREAKPOINTS.find((item: any) => (
    item.size * (data.value?.toString().length ?? 1) > 100
  ))?.name ?? 'text-lg'

  return (
    <div className='my-6 px-3 xl:px-5 rounded-md hover:bg-gray-700 hover:text-white transition-all cursor-pointer flex items-center bg-white h-[65px]'>
      <div><Icon size={26} /></div>
      <div className='ml-4 mr-2 text-left'>
        <h1 className='font-bold'>{data.title}</h1>
        <div className='text-xs'>{data.description}</div>
      </div>
      <h1 className={`ml-auto ${valueFontSize} font-extrabold text-right`}>{data.value ?? 0}{data.unit ?? ''}</h1>
    </div>
  )
}

export default KPIItem