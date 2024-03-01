export function getFinalState(baseState, queue) {
    let finalState = baseState;
  
    queue.map((n) => {
      if (typeof n === 'function') {
        finalState = n(finalState)
      } else if (typeof n === 'number') {
        finalState = n
      } else {
        throw(`queue type not implemented: ${typeof n}`)
      }
      
    })
  
    return finalState;
  }
  