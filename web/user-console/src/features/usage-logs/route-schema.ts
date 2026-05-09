import z from 'zod'

const logTypeValues = ['0', '1', '2', '3', '4', '5', '6'] as const

export const usageLogsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  type: z.array(z.enum(logTypeValues)).optional().catch([]),
  filter: z.string().optional().catch(''),
  model: z.string().optional().catch(''),
  token: z.string().optional().catch(''),
  channel: z.string().optional().catch(''),
  group: z.string().optional().catch(''),
  username: z.string().optional().catch(''),
  requestId: z.string().optional().catch(''),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
})

export type UsageLogsSearch = z.infer<typeof usageLogsSearchSchema>
export type UsageLogsSearchInput = z.input<typeof usageLogsSearchSchema>
