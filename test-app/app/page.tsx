'use client'
import React, { useState, useCallback, useMemo } from "react"

const Child = React.memo(({value}: {value: number}) => {
  return (
    <p>
      Fibonacci: {value}
    </p>
  )
})

const Parent = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(prev => prev + 1), []);

  const fibonacciValue = useMemo(() => {
    const computeFibonacci = (n: number): number => {
      if (n <= 1) return n;
      return computeFibonacci(n - 1) + computeFibonacci(n - 2);
    } 
    return computeFibonacci(count)
  }, [count])

  return (
    <div>
      <Child value={fibonacciValue} />
      <button onClick={increment}>Increment {count}</button>
    </div>
  )
}

export default Parent;