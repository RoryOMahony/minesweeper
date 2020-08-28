import React from 'react'
import "../Flex.css"
import NumberDisplay from './NumberDisplay'

const GameInfo = ({game}) => {
  return (
    <div className="flex-row flex-main-axis-space-between">
      <NumberDisplay number={game.flagsAvailable}></NumberDisplay>
      <NumberDisplay number={game.score}></NumberDisplay>
    </div>
  )
}

export default GameInfo;