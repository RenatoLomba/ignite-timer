import type { DefaultThemeColors } from '../../styles/themes/default'

type StatusTypes = 'in-progress' | 'done' | 'suspended'

type StatusColorsType = Record<StatusTypes, DefaultThemeColors>

type StatusTextsType = Record<StatusTypes, string>

const STATUS_COLORS: StatusColorsType = {
  'in-progress': 'yellow-500',
  done: 'green-300',
  suspended: 'red-700',
}

const STATUS_TEXTS: StatusTextsType = {
  'in-progress': 'Em andamento',
  done: 'Concluído',
  suspended: 'Interrompido',
}

export { STATUS_COLORS, STATUS_TEXTS }

export type { StatusTypes }
