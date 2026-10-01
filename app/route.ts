import { htmlResponse } from '@/lib/site-html'
import { renderHomePage } from '@/lib/templates/home'

export const dynamic = 'force-static'

export function GET() {
  return htmlResponse(renderHomePage())
}
