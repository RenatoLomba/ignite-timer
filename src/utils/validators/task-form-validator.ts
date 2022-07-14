import { z } from 'zod'

const MAX_CYCLE_MINUTES = 60
const MIN_CYCLE_MINUTES = 5

const taskFormSchemaValidator = z.object({
  task: z
    .string()
    .min(5, 'Mínimo de 5 caracteres')
    .max(100, 'Máximo de 100 caracteres'),
  minuteAmount: z
    .number()
    .min(MIN_CYCLE_MINUTES, 'Mín. 5')
    .max(MAX_CYCLE_MINUTES, 'Max. 60'),
})

type TaskFormFields = z.infer<typeof taskFormSchemaValidator>

export { taskFormSchemaValidator, MIN_CYCLE_MINUTES, MAX_CYCLE_MINUTES }
export type { TaskFormFields }
