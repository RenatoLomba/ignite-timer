import { FC } from 'react'

import { StatusBadgeWrapper } from './styles'
import { StatusTypes, STATUS_TEXTS } from './types'

interface IStatusBadgeProps {
  status?: StatusTypes
}

export const StatusBadge: FC<IStatusBadgeProps> = ({
  status = 'in-progress',
}) => {
  return (
    <StatusBadgeWrapper status={status}>
      {STATUS_TEXTS[status]}
    </StatusBadgeWrapper>
  )
}
