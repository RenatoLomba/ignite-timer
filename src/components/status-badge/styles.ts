import styled, { DefaultTheme } from 'styled-components'

import { StatusTypes, STATUS_COLORS } from './types'

interface IGetStatusColorParams {
  theme: DefaultTheme
  status?: StatusTypes
}

const getStatusColor = ({
  theme,
  status = 'in-progress',
}: IGetStatusColorParams) => {
  return theme.colors[STATUS_COLORS[status]]
}

interface IStatusBadgeWrapperProps {
  status?: StatusTypes
}

export const StatusBadgeWrapper = styled.span<IStatusBadgeWrapperProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    background: ${({ theme, status }) => getStatusColor({ theme, status })};
    border-radius: 50%;
  }
`
