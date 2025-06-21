import { BentoContainer } from '../shared/BentoContainer'
import ApplicationStatusChart from '../charts/CircleChart'

export const CircleChartWrapper = () => {
  return (
    <BentoContainer>
      <ApplicationStatusChart />
    </BentoContainer>
  )
}
