import { htmlResponse } from '@/lib/site-html'
import { renderServicesPage } from '@/lib/templates/services'

export const dynamic = 'force-static'

export function GET() {
  return htmlResponse(renderServicesPage())
}
