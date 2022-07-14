import { z } from 'zod'

const taskFormSchemaValidator = z.object({
  task: z
    .string()
    .min(5, 'Mínimo de 5 caracteres')
    .max(100, 'Máximo de 100 caracteres'),
  minuteAmount: z.number().min(0, 'Mín. 5').max(60, 'Max. 60'),
})

type TaskFormFields = z.infer<typeof taskFormSchemaValidator>

export { taskFormSchemaValidator }
export type { TaskFormFields }
