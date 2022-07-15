import { differenceInSeconds } from 'date-fns'
import { FC, useEffect } from 'react'

import { useCycles } from '../..'
import { CountdownContainer } from './styles'

const SECONDS_ON_A_MINUTE = 60

export const Countdown: FC = () => {
  const { activeCycle, endActiveCycle, secondsPassed, changeSecondsPassed } =
    useCycles()

  const totalSeconds = activeCycle
    ? activeCycle.minuteAmount * SECONDS_ON_A_MINUTE
    : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minuteAmount = Math.floor(currentSeconds / SECONDS_ON_A_MINUTE)
  const secondAmount = (currentSeconds % SECONDS_ON_A_MINUTE)
    .toString()
    .padStart(2, '0')

  const countdownMinutes = String(minuteAmount).padStart(2, '0')
  const countdownSeconds = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    let countdownInterval: number

    if (activeCycle) {
      countdownInterval = setInterval(() => {
        const secondsPassedFromStart = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsPassedFromStart >= totalSeconds) {
          endActiveCycle()
        } else {
          changeSecondsPassed(secondsPassedFromStart)
        }
      }, 1000)
    }

    return () => {
      clearInterval(countdownInterval!)
    }
  }, [activeCycle, totalSeconds, endActiveCycle, changeSecondsPassed])

  useEffect(() => {
    if (!activeCycle) return

    document.title = `${countdownMinutes}:${countdownSeconds} - ${activeCycle.task} | Ignite Timer`

    return () => {
      document.title = 'Ignite Timer'
    }
  }, [countdownMinutes, countdownSeconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{countdownMinutes[0]}</span>
      <span>{countdownMinutes[1]}</span>

      <span className="separator">:</span>

      <span>{countdownSeconds[0]}</span>
      <span>{countdownSeconds[1]}</span>
    </CountdownContainer>
  )
}
